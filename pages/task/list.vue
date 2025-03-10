<script lang="ts" setup>
import BotButton from "~/components/conversation/BotButton.vue";
import ItemTask from "~/components/partials/ItemTask.vue";
import { fetchAllTask } from "~/services/api/chat/api";
import { ITaskBody } from "~/services/api/chat/type";

definePageMeta({
  layout: "conversation",
});

const dataToType = ref({
  active: [] as ITaskBody[],
  paused: [] as ITaskBody[],
});

onMounted(async () => {
  const data = await fetchAllTask();
  data.forEach((item) => {
    if (item.status) {
      dataToType.value[item.status].push(item);
    }
  });
});
</script>

<template>
  <section class="flex flex-row w-full h-full">
    <PartialsChatLeftSection />
    <div class="flex-1 h-full flex flex-col bg-app-bg0 overflow-hidden">
      <div class="row-center justify-between w-full border-b-[1px] border-b-app-line1">
        <BotButton hide-bot />
      </div>
      <div class="flex-1 overflow-hidden flex flex-col items-center">
        <div class="flex-1 flex flex-col items-center w-full md:w-[90%] overflow-hidden md:max-w-[940px] 2xl:max-w-[1100px]">
          <div class="flex-1 flex flex-col justify-center w-full overflow-hidden">
            <div ref="scrollArea" class="h-full w-full pt-4 pb-[100px] overflow-y-auto relative px-4 md:px-[70px] 2xl:px-[100px]">
              <div class="mt-10 md:mt-20 flex flex-col items-center">
                <h1 class="text-[#323232] text-[24px] md:text-[36px] xl:text-[40px] font-[500]">Autonomous Tasks</h1>
                <div class="text-app-text2 text-[12px] md:text-[14px]">
                  Automate repetitive tasks for Senti agents.
                  <a href="https://docs.sentiai.io/autonomous-tasks" class="ml-1 inline-flex items-center text-blue-500">
                    <p>Learn more</p>
                    <NuxtIcon name="icon-scanner" class="ml-1" />
                  </a>
                </div>
              </div>
              <div v-if="dataToType.active.length" class="mt-8 md:mt-12">
                <p class="font-[500]">Scheduled</p>
                <div class="mt-1 space-y-4">
                  <ItemTask v-for="itemData in dataToType.active" :item="itemData" :key="itemData.id" class="bg-app-card1 p-3 rounded-[4px]" />
                </div>
              </div>
              <div v-if="dataToType.paused.length" class="mt-8 md:mt-12">
                <p class="font-[500]">Paused</p>
                <div class="mt-1 space-y-4">
                  <ItemTask v-for="itemData in dataToType.paused" :item="itemData" :key="itemData.id" class="bg-app-card1 p-3 rounded-[4px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
