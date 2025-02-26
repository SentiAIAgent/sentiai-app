<script setup lang="ts">
const props = defineProps<{ output: any; inputs: any }>();
const data = convertToolOutput(props.output);

function openTokenLink(address: string, type: "dex" | "search") {
  let url = "";
  if (type === "dex") url = `https://dexscreener.com/bsc/${address}`;
  if (type === "search") url = `https://x.com/search?q=${address}`;
  window.open(url, "_blank");
}
</script>

<template>
  <div class="bg-app-bg0">
    <div class="row-center p-3">
      <img :src="data.logo" class="w-[48px] h-[48px] rounded-full" />
      <div class="ml-2 flex-1">
        <p class="font-[500]">{{ data.name }}</p>
        <p class="text-app-text2">{{ shortAddress(data.address) }}</p>
      </div>
      <div class="row-center">
        <button class="p-1" @click="openTokenLink(data.address, 'dex')">
          <img src="/images/icon-dexscreen.svg" class="w-[24px]" />
        </button>
        <button class="p-1" @click="openTokenLink(data.address, 'search')">
          <img src="/images/icon-search-ca.svg" />
        </button>
        <button class="p-1">
          <img src="/images/icon-more-info.svg" class="w-[24px]" />
        </button>
      </div>
    </div>
    <div class="row-center px-3">
      <p class="text-app-text3 text-[24px] font-[500]">${{ formatNumber(data.price?.usd, data.price?.usd > 1 ? 2 : 5) }}</p>
      <span class="ml-2" :class="{ 'text-app-green': data.price?.usd_24h_change > 0, 'text-app-red': data.price?.usd_24h_change < 0 }"
        >{{ data.price?.usd_24h_change > 0 ? "+" : "-" }}{{ formatNumber(data.price?.usd_24h_change, 2) }}%</span
      >
    </div>
    <div class="mt-3 p-3 grid grid-cols-3 text-center bg-app-card12">
      <div class="border-r-[1px] border-r-app-line1">
        <p class="text-app-text2 text-[12px]">Marketcap</p>
        <p class="font-[500]">${{ formatNotationNumber(data.price?.usd_market_cap) }}</p>
      </div>
      <div class="border-r-[1px] border-r-app-line1">
        <p class="text-app-text2 text-[12px]">Volume 24h</p>
        <p class="font-[500]">${{ formatNotationNumber(data.price?.usd_24h_vol) }}</p>
      </div>
      <div>
        <p class="text-app-text2 text-[12px]">Liquidity</p>
        <p class="font-[500]">${{ formatNotationNumber(data.price?.usd_liquidity) }}</p>
      </div>
    </div>
  </div>
</template>
