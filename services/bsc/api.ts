import { FungibleToken, IFullToken } from "./type";
import Fetch from "../api";

const objToken: any = {};

export async function fetchTokenAssets(addresses: string[]): Promise<IFullToken[]> {
  try {
    const storeTokens: any[] = [];
    addresses.forEach((address) => {
      if (objToken[address]) {
        storeTokens.push(objToken[address]);
      }
    });
    if (storeTokens.length === addresses.length) {
      return storeTokens;
    }
    const { data } = await Fetch.post<{ tokens: IFullToken[] }>(`@api/tokens/get-infos`, {
      addresses,
    });

    const tokens: any[] = [];
    return tokens;
  } catch (error) {
    console.log("fetchTokenAssets error", error);
    return [];
  }
}

export const getWalletAssets = async () => {
  try {
    const { data } = await Fetch.get<{ data: { tokens: IFullToken[] } }>(`@api/wallets/portfolio`);
    return data.data.tokens;
  } catch (error) {
    console.log("getWalletAssets er", error);
    return [];
  }
};
