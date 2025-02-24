import { IFullToken } from "./type";

export interface Token {
  mint: string;
  name: string;
  symbol: string;
  imageUrl: string;
  balance: number;
  pricePerToken: number;
  decimals: number;
  usdPrice: number;
}

export interface WalletPortfolio {
  address: string;
  totalBalance: number;
  tokens: IFullToken[];
}
