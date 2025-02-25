import { defineStore } from "pinia";
import { fetchTokenAssets, getWalletAssets } from "~/services/bsc/api";
import { Token, WalletPortfolio } from "~/services/bsc/portfolio";
import { getClient, createConfig, http, getBalance } from "@wagmi/core";
import { bsc } from "@wagmi/core/chains";
import { formatUnits } from "viem";
import { IFullToken } from "~/services/bsc/type";
import { NATIVE_TOKEN } from "~/services/bsc/utils";

export const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
});
const DURATION_CACHE = 1000 * 60 * 5;

const DURATION_STORE_KEY = "portfolio-data-to-cache";

export const usePortfolio = defineStore("portfolio-store", {
  state: () => ({
    balance: 0,
    assets: {
      address: "",
      tokens: [] as IFullToken[],
      totalBalance: 0,
    } as WalletPortfolio,
    totalBalance: 0,
    init_done: false,
    currentAddress: "",
  }),
  actions: {
    async init(force?: boolean) {
      const dataCache = JSON.parse(localStorage.getItem(DURATION_STORE_KEY) || "{}");
      const now = Date.now();
      if (dataCache.timestamp && Number(dataCache.timestamp || 0) + DURATION_CACHE > now && !force) {
        this.balance = Number(dataCache.balance || 0);
        this.totalBalance = Number(dataCache.totalBalance || 0);
        return;
      }
      const { getUser } = useAuthStore();
      const address = getUser().privy_wallet?.is_active ? getUser().privy_wallet.address : getUser().wallet?.address || "";
      if (!address) return;
      localStorage.setItem("privy_address", address || "");

      this.init_done = false;

      this.currentAddress = address;
      const [tks, balance] = await Promise.all([
        getWalletAssets(),
        getBalance(config, {
          address: address as `0x${string}`,
        }),
      ]);
      const bValue = Number(formatUnits(balance.value, balance.decimals));
      this.assets.tokens = tks.map((token) => {
        if (token.address === NATIVE_TOKEN.address) token.logo = NATIVE_TOKEN.imageUrl;
        return token;
      });
      this.balance = bValue;
      this.currentAddress = address;

      this.assets.address = address;
      this.totalBalance = this.assets.tokens.reduce((total, token) => {
        total += Number(token.amount_float) * (token.usd_price || 0);
        return total;
      }, 0);
      this.assets.totalBalance = this.totalBalance;
      localStorage.setItem(
        DURATION_STORE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          balance: this.balance,
          totalBalance: this.assets.totalBalance,
        })
      );
      fetchTokenAssets(["0x0ce73cb72f77daee4630921bfbb13b0f4e2e0fe1", "0x0ec12db33551afba853b691b4edf49196ea0e99a"]);
      // this.assets = await getWalletPortfolio(address);

      this.init_done = true;
    },
    async refresh() {
      this.init(true);
    },
  },
});
