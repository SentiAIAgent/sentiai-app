<script setup lang="ts">
import { fetchTokenAssets } from "~/services/bsc/api";
import { IFullToken } from "~/services/bsc/type";

const props = defineProps<{ output: string; error?: boolean }>();
const inputToken = ref<IFullToken | null>(null);
const outputToken = ref<IFullToken | null>(null);

const route = ref<any>({});
const listOutToken = ref<IFullToken[]>([]);

onMounted(async () => {
  if (props.output) {
    const outputs = convertToolOutput(props.output);
    console.log("outputs", outputs);
    const _route = outputs.route_summary;
    const tokens = await fetchTokenAssets([_route.tokenIn, _route.tokenOut]);
    inputToken.value = tokens[0];
    outputToken.value = tokens[1];
    listOutToken.value = tokens;
    route.value = _route;
  }
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div v-if="!inputToken || !outputToken" class="p-3">
      <img src="/images/icon-loading.gif" class="w-[24px] h-[24px]" />
    </div>
    <div v-else class="bg-app-bg0 p-3 rounded-[6px] w-full">
      <div class="flex flex-col items-center justify-center">
        <div class="row-center bg-app-bg2 p-2 md:p-4 rounded-[12px] w-full justify-between">
          <p class="text-[18px] md:text-[24px] font-[600]">{{ route.amountInFloat }} {{ inputToken?.symbol }}</p>
          <div class="w-[30px] md:w-[40px] rounded-full overflow-hidden">
            <img :src="getImageUrl(inputToken.logo, inputToken.address)" class="h-full w-full" />
          </div>
        </div>
        <div class="row-center bg-app-bg2 p-2 md:p-4 mt-3 rounded-[12px] w-full justify-between">
          <p class="text-[18px] md:text-[24px] font-[600]">{{ formatNumber(route.amountOutFloat) }} {{ outputToken?.symbol }}</p>
          <div class="w-[30px] md:w-[40px] rounded-full overflow-hidden">
            <img :src="getImageUrl(outputToken.logo, outputToken.address)" class="h-full w-full" />
          </div>
        </div>
        <div class="absolute z-[1]">
          <img src="/images/icon-swap.svg" />
        </div>
      </div>
      <div class="mt-4 space-y-3 text-app-text2">
        <div class="row-center justify-between">
          <p>Gas Fee</p>
          <p class="">{{ formatNumber(route.gasFeeFloat, 5) }} BNB</p>
        </div>

        <div class="row-center justify-between">
          <p>Router</p>
          <p class="">{{ listOutToken.map((t) => t.symbol).join(" > ") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
