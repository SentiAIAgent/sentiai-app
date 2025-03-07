<script setup lang="ts">
import { IConversation, ITaskBody } from "~/services/api/chat/type";
import Dialog from "../ui/dialog/Dialog.vue";
import DialogClose from "../ui/dialog/DialogClose.vue";
import DialogContent from "../ui/dialog/DialogContent.vue";

const props = defineProps<{
  conv?: IConversation;
  onDelete: (item: any) => void;
  onClose: () => void;
  task?: ITaskBody;
}>();

const open = ref(false);
onMounted(() => {
  open.value = true;
});

watch(open, () => {
  if (!open) props.onClose();
});
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="bg-app-card1 p-0 pb-4 border-none flex flex-col items-center" hide-close>
      <DialogClose class="absolute top-[-8px] right-[-8px] p-1 bg-app-background rounded-full">
        <NuxtIcon name="icon-close" class="text-app-tLight" />
      </DialogClose>
      <div class="text-center text-app-ye2 text-[28px] font-[500] bg-app-background w-full py-4 mt-[-2px]">
        Delete {{ conv ? "Conversation" : "Task" }}
      </div>
      <div class="px-6">
        <div v-if="(conv?.task_count || 0) > 0" class="text-app-text2 text-[12px] md:text-[14px] text-center">
          <p>This conversation includes {{ conv?.task_count }} active tasks.</p>
          <p>Deleting will permanently remove these tasks and cannot be undone.</p>
        </div>
        <div v-else-if="!!conv" class="text-app-text2 text-[12px] md:text-[14px] text-center">
          <p>Are you sure you want to delete this conversation?</p>
          <p>This cannot be undone.</p>
        </div>
        <div v-else class="text-app-text2 text-[12px] md:text-[14px] text-center">
          <p>Are you sure you want to delete this task?</p>
          <p>This cannot be undone.</p>
        </div>
        <div class="row-center mt-4 justify-center">
          <button class="w-[80px] py-1 border-[1px] border-app-line2 rounded-full" @click="onClose">Cancel</button>
          <button class="w-[80px] py-1 border-[1px] border-app-line2 rounded-full ml-3 bg-app-red text-app-tLight" @click="onDelete(conv)">
            Delete
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
