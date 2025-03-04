<script setup lang="ts">
import { postUpdateTask } from "~/services/api/chat/api";
import DialogClose from "../ui/dialog/DialogClose.vue";
import { toast } from "../ui/toast";
import { ITaskBody } from "~/services/api/chat/type";

const props = defineProps<{
  open: boolean;
  onClose: () => void;
  data: ITaskBody;
  onUpdate: (body: ITaskBody) => void;
}>();

const triggerRef = ref<any>(null);
const wSize = ref(0);
const openSelectSchedule = ref(false);
const openSelectTime = ref(false);
const openSelectDate = ref(false);
const name = ref(props.data.name);
const instruction = ref(props.data.instruction);
const conversationStore = useConversationStore();

const schedules = [
  {
    label: "Every hour",
    type: 1,
    value: "hour",
  },
  {
    label: "Every day",
    type: 2,
    value: "day",
  },
  {
    label: "Every week",
    type: 3,
    value: "week",
  },
];
const scheIndex = ref(schedules.findIndex((sc) => sc.value === props.data.schedule.every));

const weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const times = computed(() => {
  const list = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 2; j++) {
      const minute = j === 0 ? "00" : "30";
      list.push(`${i < 10 ? "0" + i : i}:${minute}`);
    }
  }
  return list;
});

const type = computed(() => schedules[scheIndex.value].type);
const selectTime = ref(
  props.data.schedule.at[1] ? times.value.indexOf(props.data.schedule.at[1]) : times.value.indexOf(props.data.schedule.at[0]) || 18
);
const selectDate = ref(props.data.schedule.at[1] ? weeks.indexOf(props.data.schedule.at[0]) : 0);
const loading = ref(false);

watch(
  () => triggerRef.value,
  () => {
    if (triggerRef.value) {
      wSize.value = triggerRef.value.clientWidth;
    }
  }
);

async function onSave() {
  const at: string[] = [];
  if (type.value === 3) {
    at.push(((selectDate.value + 1) % 7).toString());
    at.push(times.value[selectTime.value]);
  }
  if (type.value === 2) {
    at.push(times.value[selectTime.value]);
  }
  if (type.value === 1) {
    at.push("0");
  }
  loading.value = false;
  const res = await postUpdateTask({
    conv_id: conversationStore.conv?.id || "",
    id: props.data?.id || "",
    body: {
      name: name.value,
      instruction: instruction.value,
      schedule: {
        every: schedules[scheIndex.value].value,
        at: at,
      },
    },
  });
  if (!res) {
    return toast({
      description: "Update task failed",
      duration: 3000,
    });
  }
  toast({
    description: "Update task successfully",
    duration: 3000,
  });
  props.onUpdate(res);
  props.onClose();
}
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
          <input
            v-model="name"
            placeholder="Enter task name"
            type="text"
            class="mt-1 w-full p-2 rounded-[6px] bg-app-bg2 text-app-text1 border-[1px]"
          />
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

          <textarea
            v-model="instruction"
            rows="4"
            class="mt-1 w-full p-2 rounded-[6px] bg-app-bg2 text-app-text1 border-[1px]"
            placeholder="Enter instructions"
          ></textarea>
        </div>
        <div>
          <p>Schedule (Local time)</p>
          <Popover v-model:open="openSelectSchedule">
            <PopoverTrigger class="w-[100%]">
              <div ref="triggerRef" class="row-center border-[1px] py-[6px] px-2 mt-1 rounded-[4px]">
                <p class="flex-1 text-start">{{ schedules[scheIndex].label }}</p>
                <NuxtIcon name="icon-arrow-down" class="" />
              </div>
            </PopoverTrigger>
            <PopoverContent class="bg-app-bg0 rounded-[4px] border-[1px] shadow space-y-2 py-2" :style="{ width: (wSize || 200) + 'px' }">
              <div
                v-for="(schedule, idx) in schedules"
                @click="
                  () => {
                    scheIndex = idx;
                    openSelectSchedule = false;
                  }
                "
                :key="idx"
                class="px-2 py-[6px] text-app-text2 hover:bg-app-bg2 cursor-pointer"
              >
                {{ schedule.label }}
              </div>
            </PopoverContent>
          </Popover>
          <div class="row-center mt-2 justify-between space-x-3">
            <Popover v-if="type === 3" v-model:open="openSelectDate">
              <PopoverTrigger class="flex-1">
                <div class="row-center border-[1px] py-[6px] px-2 mt-1 rounded-[4px]">
                  <p class="flex-1 text-start">{{ weeks[selectDate] }}</p>
                  <NuxtIcon name="icon-arrow-down" class="" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                class="bg-app-bg0 rounded-[4px] border-[1px] shadow space-y-2 py-2"
                :style="{ width: (wSize ? wSize / 2 : 200) + 'px' }"
              >
                <div
                  v-for="(w, idx) in weeks"
                  :key="idx"
                  @click="() => ((selectDate = idx), (openSelectDate = false))"
                  class="px-2 py-[6px] text-app-text2 hover:bg-app-bg2 cursor-pointer"
                >
                  {{ w }}
                </div>
              </PopoverContent>
            </Popover>
            <Popover v-if="type > 1" v-model:open="openSelectTime">
              <PopoverTrigger class="flex-1">
                <div class="row-center border-[1px] py-[6px] px-2 mt-1 rounded-[4px]">
                  <p class="flex-1 text-start">{{ times[selectTime] }}</p>
                  <NuxtIcon name="icon-arrow-down" class="" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                class="bg-app-bg0 rounded-[4px] border-[1px] shadow space-y-2 py-2"
                :style="{ width: (wSize ? (type === 2 ? wSize : wSize / 2) : 200) + 'px' }"
              >
                <div class="w-full h-[250px] overflow-scroll">
                  <div
                    v-for="(ti, idx) in times"
                    :key="idx"
                    @click="() => ((selectTime = idx), (openSelectTime = false))"
                    class="px-2 py-[6px] text-app-text2 hover:bg-app-bg2 cursor-pointer"
                  >
                    {{ ti }}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div class="flex justify-end pt-4">
          <button class="w-20 py-[6px] border-[1px] rounded-full" @click="onClose">Cancel</button>
          <button
            class="text-[#fff] w-20 py-[6px] border-[1px] rounded-full bg-app-background ml-3"
            :class="{ 'opacity-50 pointer-events-none': !name || !instruction }"
            :disabled="!name || !instruction"
            @click="onSave"
          >
            <p v-if="!loading">Save</p>
            <img v-else src="/images/icon-loading.gif" class="w-[16px]" />
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
