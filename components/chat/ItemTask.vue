<script setup lang="ts">
import { deleteTask, getTaskById, postUpdateTaskStatus } from "~/services/api/chat/api";
import { toast } from "../ui/toast";
import { ITaskBody } from "~/services/api/chat/type";
import { PopoverClose } from "radix-vue";

const openMenu = ref(false);
const openTask = ref(false);

const props = defineProps<{
  task: ITaskBody;
}>();

const conversationStore = useConversationStore();
const active = computed(() => itemData.value?.status === "active");

const itemData = ref<ITaskBody | null>(props.task);

const items = computed(() => [
  {
    icon: "/images/icon-edit.svg",
    title: "Edit",
    onClick: () => {
      openTask.value = true;
    },
  },
  {
    icon: "/images/icon-pause.svg",
    title: !active.value ? "Resume" : "Pause",
    onClick: () => {
      postUpdateTaskStatus({
        conv_id: conversationStore.conv?.id || "",
        id: itemData.value?.id || "",
        status: active.value ? "paused" : "active",
      });

      itemData.value!.status = active.value ? "paused" : "active";
      toast({
        description: "Task paused",
        duration: 3000,
      });
    },
  },
  {
    icon: "/images/icon-test.svg",
    title: "Test",
    onClick: () => {
      conversationStore.dataToChat = {
        content: `Test for executing a task: ${itemData.value!.instruction}` || "",
        data: {
          action: "execute_task",
          params: {
            id: itemData.value?.id || "",
            name: itemData.value?.name,
            instruction: itemData.value?.instruction,
          },
        },
      };
    },
  },
]);

async function onDeleteItem() {
  openMenu.value = false;
  deleteTask({
    conv_id: conversationStore.conv?.id || "",
    task_id: itemData.value?.id || "",
  });
  toast({
    description: "Task deleted",
    duration: 3000,
  });
  itemData.value = null;
}
</script>

<template>
  <div v-if="itemData?.id" class="bg-app-card0 p-3">
    <div class="row-center">
      <img src="/images/icon-alert.svg" />
      <div class="ml-2 flex-1">
        <p class="font-[500]">{{ itemData.name }}</p>
        <div class="row-center">
          <p class="text-app-text2 text-[12px]">{{ itemData.schedule?.readable_text }} -</p>
          <p class="ml-1 px-1 rounded-[4px] text-[12px]" :class="active ? 'text-app-green bg-green-100' : 'text-app-red bg-red-100'">
            {{ active ? " Active" : "Paused" }}
          </p>
        </div>
      </div>

      <Popover v-model:open="openMenu">
        <PopoverTrigger>
          <div class="p-1">
            <img src="/images/icon-open-menu.svg" />
          </div>
        </PopoverTrigger>
        <PopoverContent class="bg-app-bg0 rounded-[4px] py-2 px-0 shadow border-[1px]">
          <PopoverClose
            v-for="(item, idx) in items"
            :key="idx"
            @click="item.onClick"
            class="w-full row-center cursor-pointer px-2 py-[6px] hover:bg-app-bg2"
          >
            <img :src="item.icon" />
            <p class="ml-2 text-[16px]">{{ item.title }}</p>
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
    <ChatEditTaskPopup
      v-if="!!task?.id && openTask"
      :open="openTask"
      @close="() => (openTask = false)"
      :data="itemData"
      @update="(item: any) => (itemData = item)"
      @delete="onDeleteItem"
    />
  </div>
</template>
