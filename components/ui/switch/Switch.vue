<script setup lang="ts">
import { cn } from "@/lib/utils";
import { SwitchRoot, type SwitchRootEmits, type SwitchRootProps, SwitchThumb, useForwardPropsEmits } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes["class"] }>();

const emits = defineEmits<SwitchRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    :class="
      cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-900 data-[state=unchecked]:bg-gray-200 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950 dark:data-[state=checked]:bg-gray-50 dark:data-[state=unchecked]:bg-gray-500',
        props.class
      )
    "
  >
    <SwitchThumb
      :class="
        cn(
          'pointer-events-none block h-5 w-5 rounded-full  shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:bg-app-card4 data-[state=checked]:bg-app-card1'
        )
      "
    >
      <slot name="thumb" />
    </SwitchThumb>
  </SwitchRoot>
</template>
