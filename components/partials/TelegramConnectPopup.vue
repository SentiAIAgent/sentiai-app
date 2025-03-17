<script setup lang="ts">
import Dialog from "../ui/dialog/Dialog.vue";
import DialogClose from "../ui/dialog/DialogClose.vue";
import DialogContent from "../ui/dialog/DialogContent.vue";
import { fetchAllIntergrations, postIntergrationTelegram } from "~/services/api/auth/api";

const props = defineProps<{
  onClose: () => void;
  onSuccess: () => void;
}>();
const botToken = ref("");
const chatID = ref("");

const open = ref(false);
onMounted(() => {
  open.value = true;
});

watch(open, () => {
  if (!open.value) props.onClose();
});

async function onConnect() {
  const res = await postIntergrationTelegram({
    bot_token: botToken.value,
    chat_id: Number(chatID.value),
  });

  if (res) {
    props.onSuccess();
    props.onClose();
  }
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="bg-app-card1 p-0 pb-4 border-none flex flex-col items-center" hide-close>
      <DialogClose class="absolute top-[-8px] right-[-8px] p-1 bg-app-background rounded-full">
        <NuxtIcon name="icon-close" class="text-app-tLight" />
      </DialogClose>
      <div class="text-center text-app-ye2 text-[28px] font-[500] bg-app-background w-full py-4 mt-[-2px]">Telegram Connection</div>
      <div class="px-6 w-full">
        <div class="row-center justify-between gap-4">
          <div class="flex flex-col flex-1">
            <span>Bot Access Token</span>
            <input v-model="botToken" placeholder="Enter your Bot Token" />
          </div>
          <div class="flex flex-col flex-1">
            <span>Chat ID</span>
            <input v-model="chatID" placeholder="Enter your Chat ID" />
          </div>
        </div>
        <a
          href="https://docs.sentiai.io/autonomous-tasks/publish#get-a-bot-access-token-and-chat-id"
          target="_blank"
          class="row-center mt-4 text-blue-500 justify-center cursor-pointer"
        >
          <p>Learn more about getting a Bot Access Token and Chat ID</p>
          <NuxtIcon name="icon-scanner" class="ml-1" />
        </a>
        <div class="row-center mt-4 justify-center border-t-[1px] border-t-app-line2 pt-4">
          <button class="w-[80px] py-1 border-[1px] border-app-line2 rounded-full" @click="onClose">Cancel</button>
          <button
            class="w-[80px] py-1 border-[1px] border-app-line2 rounded-full ml-3 bg-app-background text-app-tLight disabled:bg-app-card3"
            :disabled="!chatID || !botToken"
            @click="onConnect"
          >
            Connect
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style lang="css" scoped>
input {
  @apply bg-transparent border-[1px] p-2 mt-1 rounded-[4px];
}
</style>
