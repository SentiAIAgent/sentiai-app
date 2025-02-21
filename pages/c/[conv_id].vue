<script setup lang="ts">
import ChatScreen from "~/screens/ChatScreen.vue";

definePageMeta({
  layout: "conversation",
});

useSeoMeta({
  title: "Senti AI",
});
</script>

<template>
  <ChatScreen />
</template>
