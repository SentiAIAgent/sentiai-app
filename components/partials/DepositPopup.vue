<script setup lang="ts">
import { getNativeTokenBalance, NATIVE_TOKEN } from "~/services/bsc/utils";
import { toast } from "../ui/toast";
import WcConnect from "../wc/Connect.vue";
import { useAccount, useDisconnect } from "@wagmi/vue";

const { getUser } = useAuthStore();
const openQRCode = ref(false);
const amount = ref(0);
const props = defineProps<{
  open: boolean;
  onClose: () => void;
}>();
const depositBalance = ref(0);
const loading = ref(false);
const { address } = useAccount();
const { disconnect } = useDisconnect();

const addressView = computed(() => getUser().privy_wallet.address || getUser().wallet?.address);

async function onWalletDepositChange(address?: string) {
  depositBalance.value = address ? await getNativeTokenBalance(address || "") : 0;
}

watch(address, () => {
  onWalletDepositChange(address.value);
});

async function onDeposit() {
  try {
    loading.value = true;
    // if (address) {
    // if (!publicKey.value) return;

    // const transaction = new Transaction().add(
    //   SystemProgram.transfer({
    //     fromPubkey: publicKey.value,
    //     toPubkey: new PublicKey(addressView),
    //     lamports: amount.value * 1e9,
    //   })
    // );

    // const signature = await sendTransaction(transaction, connection);

    // await connection.confirmTransaction(signature, "processed");

    toast({
      description: "Deposit transaction is success, please wait for processing...",
      duration: 4000,
    });
    // }
  } catch (error) {
    console.log("deposit error", error);
  }
  loading.value = false;
}

watch(
  () => props.open,
  () => {
    openQRCode.value = props.open;
  },
  {
    immediate: true,
  }
);

watch(
  () => openQRCode.value,
  () => {
    if (!openQRCode.value) props.onClose();
  }
);

function onCopy() {
  copyToClipboard(addressView.value);
}
</script>

<template>
  <Dialog v-model:open="openQRCode">
    <DialogContent class="bg-app-card1 p-0 pb-4 border-none flex flex-col items-center" hide-close>
      <div class="text-center text-app-ye2 text-[28px] font-[600] bg-app-background w-full py-4 mt-[-2px]">Receive</div>

      <div class="px-4 w-full flex flex-col items-center">
        <p class="text-app-text0">Receive BNB directly from your connected wallet</p>
        <div class="border-[1px] border-[rgba(0, 0, 0, 0.90)] w-full rounded-[12px] p-4 mt-4 shadow">
          <div class="row-center justify-between">
            <div class="row-center">
              <img src="/images/icon-wallet-connect.svg" class="w-[24px] h-[24px]" />
              <p class="ml-2">{{ address ? shortAddress(address) : "Connect with your external wallet" }}</p>
            </div>
            <WcConnect v-if="!address">
              <div>Connect</div>
            </WcConnect>
            <div v-else @click="disconnect()">Disconnect</div>
          </div>
          <div class="line mt-3" />
          <div class="mt-3">
            <p>Amount</p>
            <div class="row-center mt-2">
              <div class="row-center py-[6px] px-2 bg-[#e3e3e3] rounded-[6px] flex-1">
                <img :src="NATIVE_TOKEN.imageUrl" class="w-[28px] rounded-full" />
                <input type="number" v-model="amount" placeholder="Input amount" class="ml-2 flex-1 bg-transparent outline-none" />
              </div>
              <PartialsButton
                :loading="loading"
                @click="onDeposit"
                :text="address ? 'Receive' : 'Deposit'"
                class="px-4 py-2 rounded-[8px] ml-2"
                :disabled="!address"
              />
            </div>
            <p class="mt-1 text-app-text3">Available: {{ formatNotationNumber(depositBalance) }} BNB</p>
          </div>
        </div>
        <p class="text-app-text0 mt-4">Or Scan QR code</p>

        <div class="rounded-[12px] border-[1px] bg-app-dark1 border-[#ffffff33] mt-4">
          <div class="p-4 rounded-[12px]">
            <div class="rounded-[8px] overflow-hidden">
              <Qrcode :value="addressView" variant="pixelated" class="w-[150px]" />
            </div>
          </div>
        </div>
        <div class="row-center cursor-pointer px-4 py-2 bg-[#ffffff11] rounded-[6px] mt-2" @click="onCopy">
          <p class="text-[16px]">{{ shortAddress(addressView) }}</p>
          <NuxtIcon name="icon-copy" class="text-[16px] ml-2 bg-app-dark1 p-1 rounded-[2px] text-app-ye2" />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
