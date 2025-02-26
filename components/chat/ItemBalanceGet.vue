<script setup lang="ts">
import { ITool } from "~/services/api/chat/type";
import { fetchTokenAssets } from "~/services/bsc/api";
import { IFullToken } from "~/services/bsc/type";

const props = defineProps<{ inputs: any; output: any }>();

const token = ref<IFullToken | null>(null);
const amount = ref(0);
const portfolio = usePortfolio();

onMounted(async () => {
  if (props.inputs?.address) {
    const [_token] = await fetchTokenAssets([props.inputs.address]);
    token.value = _token;
  }
  const output = convertToolOutput(props.output);
  amount.value = output.amount || 0;
});
</script>

<template>
  <div>
    <div class="bg-[#141414] p-3">
      <div class="row-center justify-between cursor-pointer" @click="copyToClipboard(portfolio.currentAddress)">
        <div class="row-center">
          <img src="/images/icon-wallet.svg" />
          <p class="ml-1 text-[#979797]">
            <span class="font-[600] text-[#cacaca]">Wallet Address:</span> {{ shortAddress(portfolio.currentAddress) }}
          </p>
        </div>
        <NuxtIcon name="icon-copy" class="text-[20px] text-[#979797]" />
      </div>
      <div class="line mt-3 bg-[#2c2c2c]"></div>
      <div v-if="!!token" class="mt-3 space-y-3">
        <div class="row-center">
          <div class="w-[48px] h-[48px] rounded-full overflow-hidden">
            <img :src="token?.logo" class="w-full h-full" />
          </div>
          <div class="flex-1 ml-2">
            <p class="text-[#cacaca] font-[600]">
              {{ token?.name }} <span class="text-[12px] text-[#656565] font-[400]">{{ token?.symbol }}</span>
            </p>
            <p class="text-[#979797]">{{ shortAddress(token?.address) }}</p>
          </div>
          <div class="text-end">
            <p class="text-[#cacaca] font-[600]">{{ formatNumber(amount) }} BNB</p>
            <p class="text-[12px] text-[#656565] font-[400]">${{ formatNumber(amount * (token?.price_per_token || 0), 2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
