import { useMemo } from "react";
import useWalletConnection from "./useWalletConnection";
import { Contract } from "ethers";
import ABI from "../ABI/DexBlog.json";

const useContract = (withSigner = false) => {
  const { readOnlyProvider, signer } = useWalletConnection();

  return useMemo(() => {
    if (withSigner) {
      if (!signer) return null;
      return new Contract(import.meta.env.VITE_CONTRACT_ADDRESS, ABI, signer);
    }

    return new Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      ABI,
      readOnlyProvider
    );
  }, [readOnlyProvider, signer, withSigner]);
};

export default useContract;
