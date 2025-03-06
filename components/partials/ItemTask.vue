<script setup lang="ts">
import { postUpdateTaskStatus } from "~/services/api/chat/api";
import { ITaskBody } from "~/services/api/chat/type";
import { toast } from "../ui/toast";

const props = defineProps<{
  item: ITaskBody;
}>();

const openTask = ref(false);
const itemData = ref<ITaskBody | null>(props.item);

const conversationStore = useConversationStore();
const active = computed(() => itemData.value?.status === "active");

async function onChangeStatus() {
  postUpdateTaskStatus({
    conv_id: itemData.value?.conversation_id || "",
    id: itemData.value?.id || "",
    status: active.value ? "paused" : "active",
  });

  itemData.value!.status = active.value ? "paused" : "active";
  toast({
    description: "Task status change",
    duration: 3000,
  });
}
</script>

<template>
  <div v-if="!!itemData" class="bg-app-card1 p-3 rounded-[4px]">
    <div class="row-center">
      <img src="/images/icon-alert.svg" />
      <div class="ml-2 flex-1">
        <p class="font-[500]">{{ itemData.name }}</p>
        <div class="md:row-center">
          <div class="row-center flex-1">
            <p class="text-app-text2 text-[12px]">{{ itemData.schedule?.readable_text }} -</p>
            <p
              class="ml-1 px-1 rounded-[4px] text-[12px]"
              :class="itemData.status === 'active' ? 'text-app-green bg-green-100' : 'text-app-red bg-red-100'"
            >
              {{ itemData.status === "active" ? " Active" : "Paused" }}
            </p>
          </div>
          <div class="text-[20px] row-center space-x-3 mt-2 md:mt-0">
            <button class="p-1" @click="() => conversationStore.changeWithId(itemData?.conversation_id || '')">
              <NuxtIcon name="icon-scanner" />
            </button>
            <button class="p-1" @click="openTask = true">
              <NuxtIcon name="icon-edit" />
            </button>
            <button class="p-1" @click="onChangeStatus">
              <img src="/images/icon-pause.svg" class="w-[20px]" />
            </button>
            <button class="p-1">
              <NuxtIcon name="icon-delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <ChatEditTaskPopup
      v-if="openTask"
      :open="openTask"
      @close="() => (openTask = false)"
      :data="itemData"
      @update="(item: any) => (itemData = item)"
      @delete="() => (itemData = null)"
    />
  </div>
</template>
