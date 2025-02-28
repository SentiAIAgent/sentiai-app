<script setup lang="ts">
definePageMeta({
  layout: "home",
});

useSeoMeta({
  title: "Senti AI",
});
</script>

<template>
  <div>
    <HomeHeader />
    <HomeIntro />
    <div class="flex flex-col items-center mt-[60px] sm:mt-0">
      <img src="/images/item-chat-ui.png" class="w-[94%] md:w-[80%] max-w-[1000px]" />
    </div>
    <img src="/images/icon-eclip.png" class="w-full mt-[100px] md:mt-[160px]" />

    <div class="w-full flex flex-col items-center bg-app-bg0">
      <HomeAds />
      <HomeFeatures />
      <HomeFaqs />
      <HomeFooter />
    </div>
  </div>
</template>
