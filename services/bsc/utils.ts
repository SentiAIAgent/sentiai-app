import { WalletPortfolio } from "./portfolio";

export const NATIVE_TOKEN = {
  symbol: "BNB",
  decimals: 9,
  address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  name: "BNB",
  imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
};

export async function getNativeTokenBalance(walletAddress: string) {
  try {
    return 0;
  } catch {
    return 0;
  }
}

export async function getWalletPortfolio(walletAddress: string): Promise<WalletPortfolio> {
  try {
    return {
      tokens: [],
      totalBalance: 0,
      address: walletAddress,
    };
  } catch (error) {
    console.log("getWalletPortfolio error", error);
    return {
      tokens: [],
      totalBalance: 0,
      address: walletAddress,
    };
  }
}

export async function getTokenInfor(tokenAddress: string) {
  if (!tokenAddress) {
    return null;
  }
  if (tokenAddress === NATIVE_TOKEN.address) {
    return NATIVE_TOKEN;
  }
  try {
    return null;
  } catch (error) {
    console.log("getTokenInfor error", error);
    return null;
  }
}

export async function getTokenBalance(walletAddress: string, tokenMintAddress: string) {
  if (!tokenMintAddress || !walletAddress) {
    return 0;
  }
  try {
    return 0;
  } catch {
    return 0;
  }
}
