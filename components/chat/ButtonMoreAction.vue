<script setup lang="ts">
const props = defineProps<{ token_address: string }>();

function openTokenLink(type: "dex" | "search") {
  let url = "";
  if (type === "dex") url = `https://dexscreener.com/bsc/${props.token_address}`;
  if (type === "search") url = `https://x.com/search?q=${props.token_address}`;
  window.open(url, "_blank");
}
</script>

<template>
  <TooltipProvider :delayDuration="0">
    <Tooltip>
      <TooltipTrigger>
        <div class="p-2">
          <img src="/images/icon-more-info.svg" />
        </div>
      </TooltipTrigger>
      <TooltipContent class="z-[1000]" side="bottom">
        <div class="row-center">
          <button class="p-1" @click="openTokenLink('dex')">
            <img src="/images/icon-dexscreen.svg" class="w-[24px]" />
          </button>
          <button class="p-1" @click="openTokenLink('search')">
            <img src="/images/icon-search-ca.svg" />
          </button>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
