import { CONNECTION_CONFIG } from "~/constants/solana-connection";
import { FungibleToken, IFullToken } from "./type";
import Fetch from "../api";

type HeliusMethod = "searchAssets" | "getBalance";

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
    const tokens: any[] = [];
    return tokens;
  } catch (error) {
    console.log("fetchTokenAssets error", error);
    return [];
  }
}

export const fetchHelius = async (method: HeliusMethod, params: any) => {
  try {
    const response = await fetch(CONNECTION_CONFIG.mainnet, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "request-id",
        method: method,
        params: { ...params },
      }),
    });

    if (!response.ok) {
      throw new Error(`Helius API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(`Helius API error: ${data.error.message || JSON.stringify(data.error)}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Helius API request failed: ${error.message}`);
    }
    throw new Error("Helius API request failed with unknown error");
  }
};

export const getWalletAssets = async () => {
  try {
    const { data } = await Fetch.get<{ tokens: IFullToken[] }>(`@api/wallets/portfolio`);
    console.log("data", data);
    return data.tokens;
  } catch (error) {
    console.log("getUserInfo er", error);
    return [];
  }
};
