<script setup lang="ts">
import PopoverContent from "../ui/popover/PopoverContent.vue";
import PopoverTrigger from "../ui/popover/PopoverTrigger.vue";
import Popover from "../ui/popover/Popover.vue";
import MenuConversation from "../partials/MenuConversation.vue";
import BotInformation from "./BotInformation.vue";
import Switch from "../ui/switch/Switch.vue";
import Tooltip from "../ui/tooltip/Tooltip.vue";
import TooltipTrigger from "../ui/tooltip/TooltipTrigger.vue";
import TooltipContent from "../ui/tooltip/TooltipContent.vue";
import TooltipProvider from "../ui/tooltip/TooltipProvider.vue";
import ButtonShare from "./ButtonShare.vue";

defineProps<{
  hideBot?: boolean;
}>();

const openSheet = ref(false);

const openBotMenu = ref(false);
const openBotInformation = ref(false);
const app = useAppSetting();

const conversationStore = useConversationStore();

const currentAgent = computed(() => {
  return conversationStore.conv?.agent || app.agents[0];
});

function onItemMenuClick() {
  openSheet.value = false;
}
</script>

<template>
  <div class="h-[68px] row-center">
    <Sheet v-model:open="openSheet">
      <SheetTrigger>
        <div class="pl-4 py-2 cursor-pointer lg:hidden">
          <img src="/images/icon-menu.svg" /></div
      ></SheetTrigger>
      <SheetContent side="left" class="p-0">
        <MenuConversation @click="onItemMenuClick" />
      </SheetContent>
    </Sheet>

    <Popover v-model:open="openBotMenu">
      <PopoverTrigger v-if="!hideBot">
        <div v-if="currentAgent" class="row-center p-3 bg-app-bg0 rounded-[12px] ml-4">
          <div class="w-[24px] h-[24px] mr-2 rounded-full overflow-hidden">
            <img :src="currentAgent?.avatar_url || '/images/icon-logo.svg'" class="w-[24px] h-[24px]" />
          </div>
          <p class="text-[16px] font-[600]">{{ currentAgent?.name || "Senti AI" }}</p>
          <NuxtIcon name="icon-arrow-down" class="ml-1 mt-[2px] text-[20px]" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div class="bg-app-bg0 rounded-[12px] p-4 borer-[1px] shadow">
          <div
            class="row-center cursor-pointer"
            @click="
              () => {
                openBotMenu = false;
                openBotInformation = true;
              }
            "
          >
            <NuxtIcon name="icon-about" class="ml-1 mt-[2px] text-[20px]" />

            <p class="ml-2 text-[16px]">About</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
    <TooltipProvider v-if="(conversationStore.conv?.task_count || 0) === 0 ? false : !hideBot" :delayDuration="0">
      <Tooltip>
        <TooltipTrigger>
          <Switch v-model:checked="conversationStore.showUserContent" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ conversationStore.showUserContent ? "Task execution results only" : "Full conversation" }}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <ButtonShare v-if="(conversationStore.conv?.task_count || 0) === 0 ? false : !hideBot" />
    <BotInformation v-model:open="openBotInformation" />
  </div>
</template>
