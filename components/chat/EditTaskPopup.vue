<script setup lang="ts">
import DialogClose from "../ui/dialog/DialogClose.vue";

defineProps<{
  open: boolean;
  onClose: () => void;
}>();

const triggerRef = ref<any>(null);
const wSize = ref(0);
watch(
  () => triggerRef.value,
  () => {
    if (triggerRef.value) {
      wSize.value = triggerRef.value.clientWidth;
    }
  }
);

const schedules = [
  {
    label: "Doesn't repeat",
    value: 0,
  },
  {
    label: "Daily",
    value: 0,
  },
  {
    label: "Weekly",
    value: 0,
  },
  {
    label: "Monthly",
    value: 0,
  },
];
</script>

<template>
  <Dialog :open="open" v-on:update:open="(v) => (v ? null : onClose())">
    <DialogContent class="bg-app-bg0 p-0 pb-4 border-none flex flex-col items-center" hide-close>
      <DialogClose class="absolute top-[-8px] right-[-8px] p-1 bg-app-background rounded-full">
        <NuxtIcon name="icon-close" class="text-app-tLight" />
      </DialogClose>

      <div class="text-center text-app-ye2 text-[28px] font-[600] bg-app-background w-full py-4 mt-[-2px]">Edit Task</div>
      <div class="space-y-4 w-full px-4">
        <div>
          <p>Name</p>
          <input type="text" class="mt-1 w-full p-2 rounded-[6px] bg-app-bg2 text-app-text1 border-[1px]" />
        </div>
        <div>
          <div class="row-center">
            <p>Instructions</p>
            <a href="" class="ml-2 text-blue-500" target="_blank">
              <div class="row-center">
                <p>Learn more</p>
                <NuxtIcon name="icon-scanner" class="ml-1 mt-[2px]" />
              </div>
            </a>
          </div>
          <input type="text" class="mt-1 w-full p-2 rounded-[6px] bg-app-bg2 text-app-text1 border-[1px]" />
        </div>
        <div>
          <p>Schedule</p>
          <Popover>
            <PopoverTrigger class="w-[49%]">
              <div ref="triggerRef" class="row-center border-[1px] py-[6px] px-2 mt-1 rounded-[4px]">
                <p class="flex-1 text-start">Daily</p>
                <NuxtIcon name="icon-arrow-down" class="" />
              </div>
            </PopoverTrigger>
            <PopoverContent class="bg-app-bg0 rounded-[4px] border-[1px] shadow space-y-2 py-2" :style="{ width: (wSize || 200) + 'px' }">
              <div v-for="(schedule, idx) in schedules" :key="idx" class="px-2 py-[6px] text-app-text2 hover:bg-app-bg2 cursor-pointer">
                {{ schedule.label }}
              </div>
            </PopoverContent>
          </Popover>
          <div class="row-center mt-2 justify-between">
            <Popover>
              <PopoverTrigger class="w-[49%]">
                <div ref="triggerRef" class="row-center border-[1px] py-[6px] px-2 mt-1 rounded-[4px]">
                  <p class="flex-1 text-start">Daily</p>
                  <NuxtIcon name="icon-arrow-down" class="" />
                </div>
              </PopoverTrigger>
              <PopoverContent class="bg-app-bg0 rounded-[4px] border-[1px] shadow space-y-2 py-2" :style="{ width: (wSize || 200) + 'px' }">
                <div v-for="(schedule, idx) in schedules" :key="idx" class="px-2 py-[6px] text-app-text2 hover:bg-app-bg2 cursor-pointer">
                  {{ schedule.label }}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger class="w-[49%]">
                <div ref="triggerRef" class="row-center border-[1px] py-[6px] px-2 mt-1 rounded-[4px]">
                  <p class="flex-1 text-start">Daily</p>
                  <NuxtIcon name="icon-arrow-down" class="" />
                </div>
              </PopoverTrigger>
              <PopoverContent class="bg-app-bg0 rounded-[4px] border-[1px] shadow space-y-2 py-2" :style="{ width: (wSize || 200) + 'px' }">
                <div v-for="(schedule, idx) in schedules" :key="idx" class="px-2 py-[6px] text-app-text2 hover:bg-app-bg2 cursor-pointer">
                  {{ schedule.label }}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div class="flex justify-end pt-4">
          <button class="w-20 py-[6px] border-[1px] rounded-full">Cancel</button>
          <button class="text-[#fff] w-20 py-[6px] border-[1px] rounded-full bg-app-background ml-3">Save</button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
