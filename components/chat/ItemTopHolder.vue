<script setup lang="ts">
const props = defineProps<{ output: string }>();
const data = convertToolOutput(props.output);
const totalPercent = (data.items as { amount_percentage: number }[]).reduce((total, item) => item.amount_percentage + total, 0);
</script>

<template>
  <div class="p-3 bg-app-bg0 rounded-b-[6px]">
    <ul class="list-disc pl-6 space-y-3 text-app-text1 font-[600]">
      <li>In Profit: {{ data.profit_count }}/{{ data.items.length }}</li>
      <li>In Loss: {{ data.loss_count }}/{{ data.items.length }}</li>
      <li>Holders: {{ formatNotationNumber(data.holder_count || 0) }}</li>
      <li>Top {{ data.items.length }} holding: {{ formatNumber(totalPercent * 100, 2) }}%</li>
    </ul>
    <div class="line mt-3" />
    <div class="py-3">
      <p class="text-app-text1 font-[600]">Top {{ data.items.length }} Holders Entry Points</p>
      <div class="mt-3 max-h-[350px] overflow-scroll relative">
        <table class="w-full min-w-[400px] bg-app-card12 border-separate py-3 px-2 text-center rounded-[6px]">
          <thead class="sticky top-0 bg-app-card12">
            <tr class="text-app-text2">
              <td class="w-[30px]"></td>
              <td class="text-start">Address</td>
              <td>% Hold</td>
              <td>Entry</td>
              <td>PNL</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in data.items" :key="idx">
              <td class="text-start">{{ idx + 1 }}</td>

              <td class="text-start">{{ shortAddress(item.address) }}</td>
              <td>
                <div>
                  <p>{{ formatNotationNumber(item.amount_percentage * 100, 2) }}%</p>
                  <p class="text-app-text2 text-[12px]">${{ formatNotationNumber(item.usd_value, 2) }}</p>
                </div>
              </td>
              <td>{{ item.accu_cost ? `$${formatNotationNumber(item.entry)}` : "--" }}</td>
              <td>
                <div v-if="item.profit !== 0">
                  <div class="row-center justify-center">
                    <img :src="item.profit > 0 ? '/images/icon-up.svg' : '/images/icon-down.svg'" />
                    <p :class="item.profit > 0 ? 'text-[#73D13D]' : 'text-[#FF4D4F]'">{{ formatNotationNumber(item.profit_change * 100, 1) }}%</p>
                  </div>
                </div>
                <div v-else>--</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="data.items.length" class="pt-3 italic text-app-text2">* The above list excludes CEX (centralized exchange) wallets</p>
    </div>
  </div>
</template>
