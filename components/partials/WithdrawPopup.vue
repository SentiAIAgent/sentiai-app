<script setup lang="ts">
import { isAddress } from "viem";
import { toast } from "../ui/toast";
import { postExecuteTransfer, postInitNewTransfer } from "~/services/api/wallet/api";
import { getWalletPortfolio, NATIVE_TOKEN } from "~/services/bsc/utils";

const openPopup = ref(false);
const amount = ref("");
const props = defineProps<{
  open: boolean;
  onClose: () => void;
  address?: string;
}>();
const loading = ref(false);
const portfolio = usePortfolio();
const withdrawAddress = ref("");
const container = ref<HTMLElement | null>(null);
const MINT_USD_TO_WITHDRAW = 1;
const { getUser } = useAuthStore();

const selectedAddress = ref(portfolio.assets.tokens[0]?.address || "");

const selectedToken = computed(() => {
  return portfolio.assets.tokens.find((t) => t.address === selectedAddress.value);
});
const init = ref<any>(null);
const usdAmount = computed(() => {
  if (selectedToken.value) {
    return Number(amount.value || 0) * (selectedToken.value.price_per_token || 0);
  }
  return 0;
});
const txhash = ref("");
const statusChecking = ref(true);
const interval = ref<any>(0);
const showDelegate = ref(false);

watch(
  () => props.open,
  () => {
    openPopup.value = props.open;
    if (openPopup.value) {
      selectedAddress.value = portfolio.assets.tokens[0]?.address || "";
    }
  },
  {
    immediate: true,
  }
);

onUnmounted(() => {
  clearInterval(interval.value);
});

async function checkTransactionStatus(tx: string) {
  return new Promise(async (res) => {
    interval.value = setInterval(async () => {
      // const result = await connection.getSignatureStatus(tx, {
      //   searchTransactionHistory: true,
      // });
      // if (result.value?.confirmationStatus === "finalized") {
      //   clearInterval(interval.value);
      //   return res(true);
      // }
    }, 1500);
  });
}

function scrollPage(side: "left" | "right" = "left") {
  if (container.value) {
    container.value.scrollTo({
      left: side === "left" ? 0 : container.value.scrollWidth * 0.5,
      behavior: "smooth",
    });
  }
}

async function onExcuteWithdraw() {
  if (!init.value) return;
  loading.value = true;
  const rs = await postExecuteTransfer(init.value);
  if (rs) {
    setTimeout(async () => {
      loading.value = false;
      toast({
        description: "Withdraw transaction is success",
        duration: 4000,
      });
      txhash.value = rs.tx_signature;
      const status = await checkTransactionStatus(rs.tx_signature);
      console.log("status", status);
      statusChecking.value = false;
    }, 300);
  } else {
    toast({
      description: "Excute Withdraw is failed, please try again.",
      duration: 4000,
    });
  }
}

async function startInit() {
  loading.value = true;

  const rs = await postInitNewTransfer({
    from_address: props.address || portfolio.currentAddress,
    amount: Number(amount.value),
    mint: selectedAddress.value,
    to_address: withdrawAddress.value,
  });
  if (rs) {
    init.value = rs;
    loading.value = false;

    setTimeout(() => {
      if (container.value) {
        scrollPage("right");
        return;
      }
    }, 200);
  } else {
    toast({
      description: "Create withdrawal is failed, please try again.",
      duration: 4000,
    });
  }
}

async function onContinueClick() {
  if (usdAmount.value < MINT_USD_TO_WITHDRAW) {
    toast({
      description: "Amount must be greater than $1",
      duration: 4000,
    });
    return;
  }
  const feeAmount = selectedToken.value?.address === NATIVE_TOKEN.address ? 0.0005 : 0;
  if (Number(amount.value) + feeAmount > Number(selectedToken.value?.amount_float || 0)) {
    toast({
      description: "Amount must be less than balance",
      duration: 4000,
    });
    return;
  }
  if (!isAddress(withdrawAddress.value))
    return toast({
      description: "Invalid receive address",
      duration: 4000,
    });

  const fromAddress = props.address || portfolio.currentAddress;
  if (fromAddress === getUser().privy_wallet?.address) {
    showDelegate.value = true;
    return;
  }
  startInit();
}

watch(
  () => openPopup.value,
  () => {
    if (!openPopup.value) props.onClose();
  }
);
</script>

<template>
  <div>
    <Dialog v-model:open="openPopup">
      <DialogContent class="p-0 flex flex-col items-center border-none" hide-close>
        <div class="text-center text-app-ye2 text-[28px] font-[600] bg-app-background w-full py-4 mt-[-2px]">Send</div>
        <div ref="container" class="flex w-[100%] overflow-hidden">
          <div class="flex flex-col w-[100%] items-center pb-8 px-4 space-y-4">
            <div class="w-full border-[1px] border-app-line1 rounded-[8px] overflow-hidden p-4">
              <div class="">
                <p>To:</p>
                <input
                  placeholder="Enter received address"
                  v-model="withdrawAddress"
                  class="mt-2 outline-none w-full rounded-[4px] pl-3 h-[40px] bg-app-card2"
                />
              </div>

              <div class="line mt-4" />
              <div class="mt-4">
                <p>Amount</p>
                <div class="row-center mt-2 outline-nonew-full rounded-[4px] pl-3 bg-app-card2">
                  <Select v-model="selectedAddress">
                    <SelectTrigger class="row-center w-auto outline-none">
                      <div v-if="selectedToken" class="row-center">
                        <img :src="selectedToken?.logo" class="w-[28px] h-[28px] rounded-full" />
                        <p class="text-app-text3 ml-2">{{ selectedToken?.symbol }}</p>
                      </div>
                    </SelectTrigger>
                    <SelectContent class="p-0 w-[200px]">
                      <SelectGroup class="space-y-2 p-0">
                        <SelectItem v-for="token in portfolio.assets.tokens" :key="token.address" :value="token.address" class="w-full h-[56px]">
                          <div class="w-full row-center rounded-[0] border-[0] h-[56px]">
                            <img :src="token?.logo" class="w-[28px] h-[28px] rounded-full" />
                            <div class="flex-1 ml-2">
                              <p class="text-[16px]">{{ token?.symbol }}</p>
                            </div>
                            <p class="mr-2">{{ formatNumber(token?.amount_float, 3) }}</p>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <input
                    placeholder="Enter Amount"
                    v-model="amount"
                    type="number"
                    class="outline-none text-end flex-1 h-full bg-transparent mr-1 ml-3"
                  />
                </div>
                <p v-if="!!selectedToken" class="mt-1">Balance: {{ formatNumber(selectedToken.amount_float, 3) }} {{ selectedToken?.symbol }}</p>
              </div>
            </div>
            <PartialsButton
              :loading="loading"
              text="Continue"
              class="w-[50%] py-3"
              :disabled="!amount || !withdrawAddress"
              @click="onContinueClick"
            />
          </div>
          <div class="flex-shrink-0 px-4 flex flex-col w-[100%] items-center pb-8 space-y-4 relative" :class="{ hidden: !init }">
            <DialogTitle class="text-center text-[28px] font-[600] mt-2">Confirm Withdraw</DialogTitle>
            <button v-if="!txhash" class="absolute top-[0px] left-0 cursor-pointer p-1" @click="scrollPage('left')">
              <img src="/images/icon-arrow-back.svg" class="w-[20px]" />
            </button>
            <div class="line" />
            <div class="text-[16px] w-full border-[1px] border-app-line1 rounded-[8px] overflow-hidden">
              <div class="font-[600] w-full row-center justify-between bg-app-card1 h-[56px] outline-none px-3 py-2">
                <p>To:</p>
                <p>{{ shortAddress(withdrawAddress) }}</p>
              </div>

              <div class="row-center justify-between p-4">
                <p>Amount</p>
                <p>{{ formatNumber(amount, 3) }} {{ selectedToken?.symbol }}</p>
              </div>
              <div class="line" />
              <div class="row-center justify-between p-4">
                <p>Fee</p>
                <p>{{ formatNumber(init?.priority_fee, 3) }}</p>
              </div>
              <div class="line" />

              <div v-if="txhash" class="row-center justify-between p-4">
                <p>Txhash</p>
                <a :href="`https://bscscan.com/tx/${txhash}`" class="text-blue-500" target="_blank">
                  <div class="row-center">
                    <p>{{ shortAddress(txhash) }}</p>
                    <img v-if="statusChecking" src="/images/icon-loading.gif" class="w-[18px] ml-2" />
                    <img v-else src="/images/icon-checked.svg" class="w-[18px] ml-2" />
                  </div>
                </a>
              </div>
            </div>
            <PartialsButton v-if="!txhash" :loading="loading" text="Withdraw" class="w-[50%] py-3" :disabled="!init" @click="onExcuteWithdraw" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <PrivyDelegateWallet v-if="showDelegate" @success="startInit()" @error="toast({ description: 'Something went wrong', duration: 3000 })" />
  </div>
</template>
