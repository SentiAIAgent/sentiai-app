<script setup lang="ts">
const openMenu = ref(false);
const openTask = ref(false);

const props = defineProps<{
  output: string;
}>();

const data = convertToolOutput(props.output);
console.log("data", data);

const items = [
  {
    icon: "/images/icon-edit.svg",
    title: "Edit",
    onClick: () => {
      openMenu.value = false;
      openTask.value = true;
    },
  },
  {
    icon: "/images/icon-pause.svg",
    title: "Pause",
    onClick: () => {
      openMenu.value = false;
    },
  },
  {
    icon: "/images/icon-test.svg",
    title: "Test",
    onClick: () => {
      openMenu.value = false;
    },
  },
];
</script>

<template>
  <div v-if="data?.id" class="bg-app-card0 p-3">
    <div class="row-center">
      <img src="/images/icon-alert.svg" />
      <div class="ml-2 flex-1">
        <p class="font-[500]">{{ data.name }}</p>
        <p class="text-app-text2 text-[12px]">{{ data.schedule?.readable_text }}</p>
      </div>

      <Popover v-model:open="openMenu">
        <PopoverTrigger>
          <div class="p-1">
            <img src="/images/icon-open-menu.svg" />
          </div>
        </PopoverTrigger>
        <PopoverContent class="bg-app-bg0 rounded-[4px] py-2 px-0 shadow border-[1px]">
          <div v-for="(item, idx) in items" :key="idx" @click="item.onClick" class="row-center cursor-pointer px-2 py-[6px] hover:bg-app-bg2">
            <img :src="item.icon" />
            <p class="ml-2 text-[16px]">{{ item.title }}</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
    <ChatEditTaskPopup v-if="!!data?.id" :open="openTask" @close="() => (openTask = false)" :data="data" />
  </div>
</template>
