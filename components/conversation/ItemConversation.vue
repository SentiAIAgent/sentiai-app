<script setup lang="ts">
import { putUpdateConversationConfig } from "~/services/api/chat/api";
import { IConversation } from "~/services/api/chat/type";

const props = defineProps<{ item: IConversation; onClick: () => void; onDelete: (item: IConversation) => void }>();

const conversationStore = useConversationStore();

async function onConversationClick(conv: IConversation) {
  await conversationStore.init(conv);
  props.onClick?.();
}

function onFavoriteClick(item: IConversation) {
  item.config.is_favorite = !item.config.is_favorite;
  putUpdateConversationConfig(item.id, { is_favorite: item.config.is_favorite });
}
</script>

<template>
  <div class="relative cursor-pointer group hover:bg-app-card2 rounded-[4px]" :class="{ 'bg-app-card2  ': item.id === conversationStore.conv?.id }">
    <div @click="onConversationClick(item)" class="row-center justify-between text-[14px] py-2 pl-3">
      <p class="overflow-hidden whitespace-nowrap text-ellipsis flex-1 pr-6">{{ item.name }}</p>
      <div v-if="(item.task_count || 0) > 0" class="relative ml-2 mr-2 group-hover:invisible">
        <img src="/images/icon-task-alert.svg" />
        <div v-if="item.last_message_id !== item.last_read_id" class="bg-app-red w-[8px] h-[8px] rounded-full absolute top-[-3px] right-[-3px]" />
      </div>
    </div>
    <div class="px-2 absolute top-2 right-0 invisible group-hover:visible z-[1]">
      <Popover>
        <PopoverTrigger>
          <div>
            <img src="/images/icon-option.svg" class="w-[24px]" />
          </div>
        </PopoverTrigger>
        <PopoverContent class="p-2 bg-app-bg0 rounded-[4px] border-[1px] space-y-2">
          <PopoverClose class="row-center">
            <div class="row-center cursor-pointer" @click="onFavoriteClick(item)">
              <div class="w-[24px] h-[24px]">
                <img :src="item.config.is_favorite ? '/images/icon-favorite.svg' : '/images/icon-unfavorite.svg'" class="w-[24px] h-[24px]" />
              </div>
              <p class="ml-2">{{ item.config.is_favorite ? "Remove from favorite" : "Add to favorite" }}</p>
            </div>
          </PopoverClose>
          <div class="line" />
          <PopoverClose class="row-center">
            <div class="row-center text-app-red cursor-pointer" @click="onDelete(item)">
              <div class="w-[24px] h-[24px]">
                <img src="/images/icon-delete.svg" class="w-[24px] h-[24px]" />
              </div>
              <p class="ml-2">Delete</p>
            </div>
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
