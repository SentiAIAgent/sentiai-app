<script setup lang="ts">
import { Label } from "radix-vue";
import Dialog from "../ui/dialog/Dialog.vue";
import DialogClose from "../ui/dialog/DialogClose.vue";
import DialogContent from "../ui/dialog/DialogContent.vue";
import DialogTrigger from "../ui/dialog/DialogTrigger.vue";
import RadioGroup from "../ui/radio-group/RadioGroup.vue";
import RadioGroupItem from "../ui/radio-group/RadioGroupItem.vue";
import { putUpdateConversationConfig } from "~/services/api/chat/api";

const location = window.location;
const conversationStore = useConversationStore();
const link = computed(() => `${location.origin}/share/c/${conversationStore.convID}`);
const shareType = ref<any>(conversationStore.conv?.config.is_published ? conversationStore.conv?.config?.publish_mode || "full" : "private");

watch(shareType, () => {
  putUpdateConversationConfig(conversationStore.convID || "", {
    is_published: shareType.value !== "private",
    publish_mode: shareType.value as any,
  });
  if (conversationStore.conv) {
    conversationStore.conv = {
      ...conversationStore.conv,
      config: { ...conversationStore.conv?.config, is_published: shareType.value === "full", publish_mode: shareType.value },
    };
  }
});

function onCopy() {
  copyToClipboard(link.value);
}
</script>

<template>
  <Dialog>
    <DialogTrigger class="border-[1px] rounded-full ml-2 px-2 py-1">
      <div class="row-center">
        <img src="/images/icon-share.svg" />
        <p class="ml-1">Share</p>
      </div>
    </DialogTrigger>
    <DialogContent class="bg-app-card1 p-0 pb-4 border-none flex flex-col items-center" hide-close>
      <DialogClose class="absolute top-[-8px] right-[-8px] p-1 bg-app-background rounded-full">
        <NuxtIcon name="icon-close" class="text-app-tLight" />
      </DialogClose>
      <div class="text-center text-app-ye2 text-[28px] font-[500] bg-app-background w-full py-4 mt-[-2px]">Share Conversation</div>
      <div class="px-6">
        <div class="text-app-text2 text-[12px] md:text-[14px] text-center">
          Your name, and custom task information always remain private.
          <a href="https://docs.sentiai.io/autonomous-tasks" class="ml-1 inline-flex items-center text-blue-500">
            <p>Learn more</p>
            <NuxtIcon name="icon-scanner" class="ml-1" />
          </a>
        </div>
        <div class="mt-4">
          <RadioGroup v-model:model-value="shareType">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="private" value="private" />
              <Label for="private">Keep private</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="full" value="full" />
              <Label for="full">Share full conversation</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="execute_task_only" value="execute_task_only" />
              <Label for="execute_task_only">Share task results only</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div class="row-center justify-between border-[1px] border-app-line1 rounded-full pl-3 p-[2px] w-[94%]">
        <p class="overflow-hidden whitespace-nowrap text-ellipsis flex-1 max-w-[60%] text-app-text2">
          {{ link }}
        </p>
        <button class="flex-shrink-0 row-center bg-app-btnBg text-app-bg0 py-3 px-6 rounded-full" :disabled="shareType === 'private'" @click="onCopy">
          <NuxtIcon name="icon-link" class="mr-2" />
          Copy Link
        </button>
      </div>
    </DialogContent>
  </Dialog>
</template>
