<script setup lang="ts">
import { cn } from "~/lib/utils";

const props = defineProps<{
  text: string;
  icon?: string;
  leftIconClass?: string;
  disabled?: boolean;
  rightIcon?: string;
  loading?: boolean;
  cancel?: boolean;
  outline?: boolean;
  class?: string;
}>();
</script>
<template>
  <button
    :disabled="disabled || loading"
    :class="
      cn(
        'relative flex items-center justify-center bg-[#f0b90b] py-[12px] text-[16px] text-[#131313] font-[600] rounded-[16px] border-[1px] border-[#ffffff1a]',
        props.class,
        disabled ? 'bg-app-btnDisableBg pointer-events-none ' : ''
      )
    "
  >
    <img v-if="loading" src="/images/icon-loading.gif" class="w-[18px] mr-2" />

    <img v-else-if="!!icon" :src="icon" class="mr-2" :class="leftIconClass" />

    <span :class="disabled ? 'text-[#CACACA] font-[500]' : 'text-app-text1'">{{ text }}</span>
    <img v-if="!!rightIcon" :src="rightIcon" class="ml-2 w-[22px]" />
  </button>
</template>
