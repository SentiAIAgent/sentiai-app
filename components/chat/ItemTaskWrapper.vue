<script setup lang="ts">
import { deleteTask, getTaskById, postUpdateTaskStatus } from "~/services/api/chat/api";
import { ITaskBody } from "~/services/api/chat/type";

const props = defineProps<{
  output: string;
}>();

const data = convertToolOutput(props.output);
const conversationStore = useConversationStore();

const itemData = ref<ITaskBody | null>(null);
const loading = ref(true);

onMounted(async () => {
  if (data?.id) {
    const task = await getTaskById(conversationStore.conv?.id || "", data.id);
    itemData.value = task;
    loading.value = false;
  }
});
</script>

<template>
  <ChatItemTask v-if="!!itemData" :task="itemData" />
  <div v-else-if="!loading" class="bg-app-card0 p-3">
    <p class="text-app-text2 opacity-70 italic">Task Deleted</p>
  </div>
</template>
