/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { liskSepoliaNetwork } from "../connection";
import axios from "axios";
import useContract from "./useContract";
import { replaceSpecialCharacters } from "../utils/helpers";

const useCreateNews = () => {
  const { address, status, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const contract = useContract(true);

  return useCallback(
    async (title, body, upload) => {
      try {
        const formData = new FormData();

        // Inspect the contents of formData
        // for (let [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }
        //Submit Here
        // 1. Check if user connected.
        if (!address) {
          toast.error("Connect your wallet.");
        }
        // 2. Check if Connected to the right Network.
        if (Number(chainId) !== liskSepoliaNetwork.chainId) {
          toast.error("Invalid Network Selected");
        }

        // 1. Upload image to IPFS via Pinata
        const pinataOptions = {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
            "Content-Type": "application/json",
          },
        };

        //Image FormData
        const imageUpload = new FormData();
        imageUpload.append("file", upload);

        const imageUploadRes = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
              pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
              pinata_secret_api_key: import.meta.env.VITE_PINATA_API_SECRET,
            },
            body: imageUpload,
          }
        );
        const response = await imageUploadRes.json();

        console.log("Image Uploaded to IPFS", response);

        const imageCID = response.IpfsHash;
        console.log("Image uploaded to IPFS:", imageCID);

        // 2. Create metadata JSON
        const metadata = {
          title: title,
          body: body,
          image: `https://amaranth-impressed-python-515.mypinata.cloud/ipfs/${imageCID}`,
          timestamp: new Date().toISOString(),
        };

        const pinataPayload = {
          pinataContent: metadata, // Your actual JSON content to upload
          pinataMetadata: {
            name: replaceSpecialCharacters(title),
          },
        };

        // 3. Upload metadata to Pinata
        const metadataUploadRes = await axios.post(
          "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          JSON.stringify(pinataPayload),
          pinataOptions
        );

        console.log("Metadata Uploaded to IPFS", metadataUploadRes);

        const metadataCID = metadataUploadRes.data.IpfsHash;
        // console.log("Metadata uploaded to IPFS:", metadataCID);

        //Send meta to blockchain.
        const estimatedGas = await contract.createNews.estimateGas(metadataCID);

        const tx = await contract.createNews(metadataCID, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });
        const reciept = await tx.wait();
        console.log(reciept)
        if (reciept.status === 1) {
          toast.success("News Created successful");
          return;
        }
      } catch (error) {
        console.log("Error publishing news to the blochain. ", error);
        toast.error("Error uploading file or sending to blockchain");
      }
    },
    [address, chainId, contract]
  );
};

export default useCreateNews;
