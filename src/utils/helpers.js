export function formatWalletAddress(walletAddress) {
  const firstPart = walletAddress.slice(0, 4);
  const lastPart = walletAddress.slice(-6);
  return `${firstPart}...${lastPart}`;
}

export function replaceSpecialCharacters(str) {
  return str.replace(/[^a-zA-Z0-9_]/g, "_");
}
