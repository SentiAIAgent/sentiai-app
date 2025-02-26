<script setup lang="ts">
import { useConnect, useChainId, useAccount } from "@wagmi/vue";
import { CoreUtil, EventsCtrl, ExplorerCtrl } from "@walletconnect/modal-core";
import Dialog from "../ui/dialog/Dialog.vue";
import DialogContent from "../ui/dialog/DialogContent.vue";

const chainId = useChainId();
const { connect, connectors } = useConnect();
const { address } = useAccount();

const app = useAppSetting();
const display_uri = ref("");
const open = ref(false);

onMounted(() => {
  EventsCtrl.subscribe((event: any) => {
    const wallet = ExplorerCtrl.state?.recomendedWallets?.find((wallet: any) => wallet.id === (event.data as any)?.walletId);
    const walletUrl = wallet?.mobile?.universal;
    const name = wallet?.name;
    if (walletUrl) {
      app.saveCurrentWcWallet(walletUrl);
      const href = CoreUtil.formatUniversalUrl(walletUrl, display_uri.value, name!);
      CoreUtil.openHref(href, "_self");
    }
  });
});

async function openWalletConnect() {
  app.changeLoading(true);
  const wc = connectors.find((c) => c.id === "walletConnect");
  function listenUri(data: any) {
    if (data.type === "display_uri") {
      app.changeLoading(false);
      display_uri.value = data.data;
      wc?.emitter.off("message", listenUri);
    }
  }

  wc?.emitter.on("message", listenUri);
  connect({ connector: wc!, chainId: chainId.value });
  setTimeout(() => {
    app.changeLoading(false);
  }, 1100);
}

function onItemClick(con: any) {
  open.value = false;

  if (con.id === "walletConnect") return openWalletConnect();
  connect({ connector: con, chainId: chainId.value });
}

async function onClickConnect() {
  if (address.value) return;
  open.value = true;
}
</script>

<template>
  <div @click="onClickConnect" class="cursor-pointer">
    <slot />
    <Dialog v-model:open="open">
      <DialogContent class="pb-[40px] border-t-[0] rounded-t-[16px] border-[1px] border-[rgb(44,44,44)] bg-app-card1 overflow-hidden">
        <button v-for="con in connectors" :key="con.id" class="row-center text-[20px]" @click="onItemClick(con)">
          <img :src="con.icon || '/images/icon-wallet-connect.svg'" class="w-[40px] h-[40px] mr-4" />
          {{ con.name }}
        </button>
      </DialogContent>
    </Dialog>
  </div>
</template>
