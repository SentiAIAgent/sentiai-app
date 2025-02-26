import { FungibleToken, IFullToken } from "./type";
import Fetch from "../api";
import { NATIVE_TOKEN } from "./utils";

const objToken: any = {};

export async function fetchTokenAssets(addresses: string[]): Promise<IFullToken[]> {
  try {
    const storeTokens: any[] = [];
    addresses.forEach((address) => {
      const _add = address.toLocaleUpperCase();
      if (objToken[_add]) {
        storeTokens.push(objToken[_add]);
      }
    });
    if (storeTokens.length === addresses.length) {
      return storeTokens;
    }

    const { data } = await Fetch.post<{ data: any }>(`@api/tokens/get-infos`, {
      addresses: addresses,
    });
    const tokens: any[] = addresses.map((address) => {
      if (address.toLocaleLowerCase() === NATIVE_TOKEN.address.toLocaleLowerCase()) {
        return NATIVE_TOKEN;
      }
      return data.data[address.toLocaleLowerCase()] || {};
    });

    tokens.forEach((token) => {
      if (!token.address) return;
      objToken[token.address.toLocaleUpperCase()] = token;
    });

    return tokens;
  } catch (error) {
    console.log("fetchTokenAssets error", error);
    return [];
  }
}

export const getWalletAssets = async () => {
  try {
    const { data } = await Fetch.get<{ data: { tokens: IFullToken[] } }>(`@api/wallets/portfolio`);

    return data.data.tokens.map((token) => ({ ...token, balance: Number(token.amount_float) }));
  } catch (error) {
    console.log("getWalletAssets er", error);
    return [];
  }
};
