<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { ToastViewport, type ToastViewportProps } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps<ToastViewportProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ToastViewport
    v-bind="delegatedProps"
    :class="
      cn('fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse px-4 py-2 sm:top-0 lg:right-0  sm:flex-col md:max-w-[420px]', props.class)
    "
  />
</template>
