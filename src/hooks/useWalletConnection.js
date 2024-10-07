import { useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { jsonRpcProvider } from "../constants/provider";

const useWalletConnection = () => {
  const [signer, setSigner] = useState();
  const { walletProvider } = useAppKitProvider("eip155");

  const provider = useMemo(
    () => (walletProvider ? new BrowserProvider(walletProvider) : null),

    [walletProvider]
  );

  useEffect(() => {
    if (!provider) {
      setSigner(null);
      return;
    }

    const getSigner = async () => {
      const newSigner = await provider.getSigner();
      if (!signer || newSigner.address !== signer.address) {
        setSigner(newSigner);
      }
    };

    getSigner(); // async function to avoid directly calling async in useEffect
  }, [provider, signer]);

  return { provider, signer, readOnlyProvider: jsonRpcProvider };
};

export default useWalletConnection;
