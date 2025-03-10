<script setup lang="ts">
import { PopoverClose } from "radix-vue";
import { APP_DATA_LINK } from "~/constants";

import { IAgent, IConversation } from "~/services/api/chat/type";
import PopupDelete from "../conversation/PopupDelete.vue";
import { putUpdateConversationConfig } from "~/services/api/chat/api";
import ItemConversation from "../conversation/ItemConversation.vue";

const props = defineProps<{
  onClick?: () => void;
}>();

const conversationStore = useConversationStore();
const existFavorite = computed(() => conversationStore.histories.filter((item) => item.config.is_favorite)).value.length > 0;

const app = useAppSetting();
const { getUser } = useAuthStore();
const selectConv = ref<any>(null);

async function onConversationClick(conv: IConversation) {
  await conversationStore.init(conv);
  props.onClick?.();
}

function onSelectAgent(agent: IAgent) {
  conversationStore.setCurrentAgent(agent);
  conversationStore.change(undefined);
  props.onClick?.();
}

function onFavoriteClick(item: IConversation) {
  item.config.is_favorite = !item.config.is_favorite;
  putUpdateConversationConfig(item.id, { is_favorite: item.config.is_favorite });
}
</script>

<template>
  <section class="bg-app-bg2 h-full w-full flex-col flex overflow-hidden">
    <div class="flex flex-col flex-1 overflow-hidden">
      <NuxtLink :to="'/'">
        <div class="px-4 py-5 mt-1">
          <div class="row-center justify-center">
            <img src="/images/icon-logo-row.svg" class="h-[24px]" />
          </div>
        </div>
      </NuxtLink>
      <div class="flex-1 flex flex-col overflow-hidden p-4 border-t-[1px] border-app-line1">
        <div class="h-full overflow-y-scroll pb-[60px] space-y-[2px]">
          <div v-if="app.agents.length > 0">
            <p class="text-[#4c4c4c] px-3 mb-2 font-[600]">Explore</p>
            <div
              v-for="(item, idx) in app.agents"
              :key="item.id"
              @click="onSelectAgent(item)"
              class="row-center hover:bg-app-card2 cursor-pointer rounded-[12px] py-2 pl-3"
            >
              <div v-if="!!item.avatar_url" class="w-[24px] h-[24px] rounded-full mr-3 flex-shrink-0">
                <img v-if="!!item.avatar_url" :src="item.avatar_url" class="w-[24px] h-[24px] rounded-full" />
              </div>
              <p class="flex-1">{{ item.name }}</p>
            </div>
            <div class="line mb-4"></div>
          </div>

          <div>
            <p class="text-[#4c4c4c] px-3 mb-2 font-[600]">Favorite</p>
            <template v-for="(item, idx) in conversationStore.histories" :key="item.id">
              <ItemConversation v-if="item.config.is_favorite" :item="item" @click="onConversationClick(item)" @delete="selectConv = item" />
            </template>
            <div class="line mb-4"></div>
          </div>

          <p v-if="conversationStore.histories.length > 0" class="text-[#4c4c4c] px-3 mb-2 font-[600]">Recents</p>
          <ItemConversation
            v-for="(item, idx) in conversationStore.histories"
            :key="item.id"
            :item="item"
            @click="onConversationClick(item)"
            @delete="selectConv = item"
          />
        </div>
      </div>
    </div>
    <div class="row-center justify-center">
      <a :href="APP_DATA_LINK.x" target="_blank" class="p-2">
        <img src="/images/icon-twitter.png" class="w-[18px] h-[18px]" />
      </a>
      <a :href="APP_DATA_LINK.telegram" target="_blank" class="p-2">
        <img src="/images/icon-telegram.png" class="w-[18px] h-[18px]" />
      </a>
    </div>
    <PopupDelete
      v-if="!!selectConv"
      :conv="selectConv"
      @close="selectConv = null"
      @delete="
        (item) => {
          conversationStore.delete(item);
          selectConv = null;
        }
      "
    />
  </section>
</template>
