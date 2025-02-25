import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { createConfig, http, injected } from "@wagmi/core";
import { bsc, mainnet } from "@wagmi/core/chains";
import { type CreateConnectorFn, WagmiPlugin } from "@wagmi/vue";
import { walletConnect } from "@wagmi/connectors";

const WC_DAPP_PROJECT_ID = "dac9011ae771773549656d975a9c6ebe";

export default defineNuxtPlugin((app) => {
  const {
    public: { ENV },
  } = useRuntimeConfig();
  const config = createConfig({
    chains: [mainnet, bsc],

    connectors: [
      walletConnect({
        projectId: WC_DAPP_PROJECT_ID,
        showQrModal: true,
        qrModalOptions: {
          themeMode: "light",
          enableExplorer: true,
          explorerRecommendedWalletIds: [
            "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
            "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
            "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
            "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
            "c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a",
            "0b415a746fb9ee99cce155c2ceca0c6f6061b1dbca2d722b3ba16381d0562150",
          ],
          explorerExcludedWalletIds: ENV === "production" ? "ALL" : [],
        },

        metadata: {
          name: "Senti AI",
          description: "Senti AI",
          url: `https://account.stavax.io`,
          icons: ["https://stavax.io/favicon.ico"],
        },
      }),
    ],

    transports: {
      [mainnet.id]: http(),
      [bsc.id]: http(),
    },
  });

  app.vueApp.use(WagmiPlugin, { config }).use(VueQueryPlugin, { queryClient: new QueryClient() });
});
