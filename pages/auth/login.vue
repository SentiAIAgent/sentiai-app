<script setup lang="ts">
definePageMeta({
  guest: true,
  name: "Authorization",
  layout: "onboard",
});
useHead({
  title: "Authorization",
});

function onLoginSuccess() {
  navigateTo("/c");
}
</script>

<template>
  <section class="flex flex-col w-full h-full items-center justify-center">
    <div class="bg-app-bg0 flex flex-col items-center justify-center rounded-[16px] w-full h-full lg:h-[400px] lg:w-[800px]">
      <div class="flex flex-col items-center">
        <img src="/images/icon-logo-row.svg " class="h-[60px]" />
        <span class="text-[20px] mt-4">DeFAI Agents on <strong>BNB Chain</strong></span>
      </div>
      <div class="w-[200px] mt-10">
        <PartialsButtonGoogle @success="onLoginSuccess" />
      </div>
    </div>
  </section>
</template>
