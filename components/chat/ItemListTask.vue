<script setup lang="ts">
const props = defineProps<{
  output: string;
}>();
const data = convertToolOutput(props.output);
</script>

<template>
  <div v-if="data.length > 0">
    <ChatItemTask v-for="(item, idx) in data" :key="item.id" :task="item" />
  </div>
</template>
