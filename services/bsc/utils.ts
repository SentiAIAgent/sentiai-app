import { getBalance } from "@wagmi/core";
import { WalletPortfolio } from "./portfolio";
import { createPublicClient, erc20Abi, formatEther, getContract, formatUnits, http, type Chain, isAddress } from "viem";
import * as wChains from "viem/chains";

export const NATIVE_TOKEN = {
  symbol: "BNB",
  decimals: 9,
  address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  name: "BNB",
  imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
};

const chainByID: Record<number, Chain> = Object.values(wChains).reduce((res, c) => {
  res[c.id] = c;
  return res;
}, {} as Record<number, Chain>);

export function getClient(chainId: number) {
  const chain = chainByID[chainId];
  if (!chain) {
    return undefined;
  }
  return createPublicClient({
    chain: chain,
    transport: http(undefined, {
      batch: true,
    }),
  });
}

export async function getTokenInfo({ chainId, contractAddress }: { chainId: number; contractAddress: string }) {
  try {
    const publicClient = getClient(chainId);
    if (!publicClient) {
      console.log("chain not found", chainId);
      return null;
    }
    const contract = getContract({
      address: contractAddress as any,
      abi: erc20Abi,
      client: {
        public: publicClient,
      },
    });
    return {
      name: await contract.read.name(),
      symbol: await contract.read.symbol(),
      decimals: await contract.read.decimals(),
    };
  } catch (error) {
    return null;
  }
}

export async function getBalanceOfToken(params: {
  contractAddress: string;
  userAddress: string;
  chainID: number;
  decimal: number;
  standard?: string;
}) {
  try {
    const isEVMToken = params.contractAddress.startsWith("0x") && params.chainID > 0;
    const isEVMWallet = params.userAddress.startsWith("0x");
    if (isEVMToken !== isEVMWallet) return 0;

    const publicClient = getClient(params.chainID);
    if (!publicClient) {
      console.log("chain not found", params.chainID);
      return 0;
    }

    if (params.contractAddress.startsWith("0xEeee") || params.standard === "native") {
      const balanceUnit = await publicClient.getBalance({
        address: params.userAddress as any,
      });
      const balanceEther = formatEther(balanceUnit);
      return Number(balanceEther);
    }
    const contract = getContract({
      address: params.contractAddress as any,
      abi: erc20Abi,
      client: {
        public: publicClient,
      },
    });

    const balance = await contract.read.balanceOf([params.userAddress as any]);
    return Number(formatUnits(balance, params.decimal));
  } catch (error) {
    return 0;
  }
}

export async function getNativeTokenBalance(walletAddress: string) {
  try {
    const balance = await getBalance(config, {
      address: walletAddress as `0x${string}`,
    });

    const bValue = Number(formatUnits(balance.value, balance.decimals));

    return bValue;
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
