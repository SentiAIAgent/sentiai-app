<script setup lang="ts">
import type { RadioGroupItemProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Circle } from 'lucide-vue-next'
import {
  RadioGroupIndicator,
  RadioGroupItem,

  useForwardProps,
} from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem
    v-bind="forwardedProps"
    :class="
      cn(
        'peer aspect-square h-4 w-4 rounded-full border border-gray-200 border-gray-900 text-gray-900 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:border-gray-50 dark:text-gray-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300',
        props.class,
      )
    "
  >
    <RadioGroupIndicator
      class="flex items-center justify-center"
    >
      <Circle class="h-2.5 w-2.5 fill-current text-current" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
