<script setup lang="ts">
import moment from "moment";
import { useMarkdownIt } from "~/composables/useMarkdownIt";
import { IChatMessage } from "~/services/api/chat/type";
const md = useMarkdownIt();

const openPreview = ref(false);

const props = defineProps<{
  item: IChatMessage;
  thinking?: boolean;
  showPreDate?: boolean;
}>();
const conversationStore = useConversationStore();
const app = useAppSetting();

const currentAgent = computed(() => {
  return conversationStore.conv?.agent || app.agents[0];
});
const showItem = computed(() => {
  if ((conversationStore.conv?.task_count || 0) === 0) return true;
  return conversationStore.showUserContent ? true : props.item.type === "execute_task";
});
</script>

<template>
  <div v-if="showItem" class="w-full row-center px-3" :class="{ 'justify-end ': item.role === 'user', 'mt-6': !showPreDate, 'mt-3': showPreDate }">
    <div class="w-[94%] row-center overflow-hidden" :class="{ 'justify-end': item.role === 'user' }">
      <div
        class="flex flex-row max-w-full items-start"
        :class="{ 'py-2 px-4 rounded-[20px]  bg-app-card2': item.role === 'user', 'w-full': item.role === 'assistant' }"
      >
        <div v-if="item.role === 'assistant'" class="w-[30px] h-[30px] md:w-[40px] md:h-[40px] mr-2 rounded-full overflow-hidden flex-shrink-0">
          <img v-if="currentAgent?.avatar_url" :src="currentAgent?.avatar_url" class="w-full" />
          <NuxtIcon v-else name="icon-logo" class="text-[34px]" />
        </div>
        <div class="flex-1 overflow-hidden">
          <div v-if="item.type === 'execute_task' && item.content && item.data?.executed_task" class="row-center italic pb-3 pt-1">
            <img src="/images/icon-reply.svg" />
            <p class="ml-1 text-app-text4">
              {{ item.data.executed_task.name }} - Updated at {{ moment(item.created_at).format("hh:mm A [on] MMM DD, YYYY") }}
            </p>
          </div>
          <div
            v-if="item.data.reply_message"
            class="flex-1 flex bg-[#404040] px-3 pr-1 py-1 rounded-[6px] mb-2 border-l-[3px] border-l-[#fff] max-h-[60px] overflow-hidden"
            @click="openPreview = true"
          >
            <ChatItemContent :item="item.data.reply_message" :thinking="thinking" is-preview class="overflow-hidden" />

            <button class="row-center ml-1 md:ml-3 flex-shrink-0">
              SEE MORE
              <img src="/images/icon-chevron-right-light.svg" class="ml-1" />
            </button>
          </div>
          <ChatItemContent :item="item" :thinking="thinking" />
        </div>
      </div>
    </div>
    <Dialog v-if="item.data.reply_message" v-model:open="openPreview">
      <DialogContent class="bg-[#141414] py-3 px-3 border-none max-h-[calc(100vh-100px)] md:max-w-[720px] overflow-scroll">
        <div class="row-center">
          <img :src="currentAgent.avatar_url" class="w-[36px]" />
          <span class="ml-2 font-bold text-[16px]">{{ currentAgent.name }}</span>
        </div>
        <ChatItemContent :item="item.data.reply_message" />
      </DialogContent>
    </Dialog>
  </div>
</template>
