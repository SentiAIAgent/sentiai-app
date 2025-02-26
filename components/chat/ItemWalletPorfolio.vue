<script setup lang="ts">
const props = defineProps<{ output: string }>();

const portfolio = usePortfolio();
</script>

<template>
  <div>
    <div class="bg-app-bg0 p-3">
      <div class="row-center justify-between cursor-pointer" @click="copyToClipboard(portfolio.currentAddress)">
        <div class="row-center">
          <p class="ml-1 text-app-text2">
            <span class="font-[600] text-app-text1">Wallet Address:</span> {{ shortAddress(portfolio.currentAddress) }}
          </p>
          <NuxtIcon name="icon-copy" class="text-[20px] text-app-text2 ml-2" />
        </div>
      </div>
      <div v-for="token in portfolio.assets.tokens" :key="token.address" class="mt-3 space-y-3">
        <div class="row-center">
          <div class="w-[28px] h-[28px] md:w-[40px] md:h-[40px] rounded-full overflow-hidden">
            <img :src="token?.logo" class="w-full h-full rounded-full" />
          </div>
          <div class="flex-1 ml-2">
            <p class="text-app-text1 font-[600]">
              {{ token?.name }} <span class="text-[12px] text-app-text2 font-[400]">{{ token?.symbol }}</span>
            </p>
            <p class="text-app-text2">{{ shortAddress(token?.address) }}</p>
          </div>
          <div class="text-end">
            <p class="text-app-text2 font-[600]">{{ formatNumber(Number(token.amount_float), 3) }} {{ token.symbol }}</p>
            <p class="text-[12px] text-app-text2 font-[400]">${{ formatNumber(token.usd_price, 2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
