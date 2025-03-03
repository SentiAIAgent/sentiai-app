<script setup lang="ts">
useSeoMeta({
  title: "Senti AI",
});

const router = useRouter();

const items = [

];

function onBack() {
  router.back();
}
</script>

<template>
  <section class="flex flex-col w-full h-full pt-8">
    <div class="row-center mt-4 px-10">
      <div class="cursor-pointer row-center" @click="onBack">
        <img src="/images/icon-arrow-back.svg" />
        <p class="ml-1">Back to Home</p>
      </div>
    </div>
    <div class="flex-1 flex flex-col w-full h-full items-center mt-[150px]">
      <p class="text-[72px] font-[600]">FAQs</p>
      <div v-for="(item, idx) in items" :key="idx" class="px-4 py-6 border-b-[1px] w-full border-app-line1 md:w-[560px] lg:w-[800px]">
        <PartialsFAQItem :item="item" />
      </div>
    </div>
  </section>
</template>
