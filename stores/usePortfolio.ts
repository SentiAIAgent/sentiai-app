import { defineStore } from "pinia";
import { Token, WalletPortfolio } from "~/services/bsc/portfolio";

const DURATION_CACHE = 1000 * 60 * 5;

const DURATION_STORE_KEY = "portfolio-data-to-cache";

export const usePortfolio = defineStore("portfolio-store", {
  state: () => ({
    balance: 0,
    assets: {
      address: "",
      tokens: [] as Token[],
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
      this.currentAddress = address;
      // this.init_done = false;

      // this.assets = await getWalletPortfolio(address);

      this.init_done = true;
    },
    async refresh() {
      this.init(true);
    },
  },
});
