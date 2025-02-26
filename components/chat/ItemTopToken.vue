<script setup lang="ts">
const props = defineProps<{ output: string }>();

const data = convertToolOutput(props.output);
</script>

<template>
  <div class="p-3 bg-app-bg0 rounded-b-[6px]">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div v-for="(token, index) in data.items" :key="index" class="rounded-[6px] border-[1px] border-app-line2">
        <div class="row-center">
          <div class="row-center mt-3 px-4 flex-1">
            <img :src="token.image_url" class="w-[32px] rounded-full" />
            <div class="flex-1 ml-2">
              <div>
                <span class="text-app-text1 font-[600]">{{ token.name }}</span>
                <span class="ml-1 text-app-text3 text-[12px]">{{ token.symbol }}</span>
              </div>
              <a :href="getTokenExplorerLink(token.address)" target="_blank" class="row-center text-app-text2">
                <p>{{ token.price ? `$${formatNotationNumber(token.price.usd)}` : shortAddress(token.address) }}</p>
                <div v-if="!!token.price" class="row-center ml-1">
                  <img :src="token.price.usd_24h_change > 0 ? '/images/icon-up.svg' : '/images/icon-down.svg'" class="w-[16px]" />
                  <span class="text-[12px]" :class="token.price.usd_24h_change > 0 ? 'text-app-green' : 'text-app-red'"
                    >{{ formatNotationNumber(token.price.usd_24h_change, 2) }}%</span
                  >
                </div>
                <NuxtIcon name="icon-scanner" class="text-[14px] ml-1" />
              </a>
            </div>
          </div>
          <ChatButtonMoreAction :token_address="token.address" />
        </div>

        <div v-if="!!token.price" class="row-center grid grid-cols-2 mt-3 px-4 py-3 bg-app-bg2">
          <div class="text-center">
            <p class="text-app-text3 text-[12px]">Market Cap</p>
            <p class="mt-1 text-app-text1 font-[600]">${{ formatNotationNumber(token.price.usd_market_cap) }}</p>
          </div>
          <div class="text-center border-l-[1px] border-l-app-line1">
            <p class="text-app-text3 text-[12px]">24h Volume</p>
            <p class="mt-1 text-app-text1 font-[600]">${{ formatNotationNumber(token.price.usd_24h_vol) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
