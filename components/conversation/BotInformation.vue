<script setup lang="ts">
const open = defineModel<boolean>("open");

const conversationStore = useConversationStore();
const app = useAppSetting();

const agent = computed(() => conversationStore.conv?.agent || app.agents[0]);
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="bg-app-bg0 py-8 px-4 border-none w-[94vw] md:w-full">
      <div v-if="!!agent" class="flex flex-col items-center">
        <div class="row-center">
          <img :src="agent.avatar_url || '/images/icon-logo.svg'" class="w-[40px] h-[40px] rounded-full" />
          <p class="text-[32px] font-[600] ml-2">{{ agent.name }}</p>
        </div>
        <p class="mt-4 text-center text-[16px] text-app-text2">
          {{ agent.description }}
        </p>
        <div v-if="agent.metadata?.capabilities" class="w-full">
          <div class="line mt-4" />
          <div class="mt-4 w-full">
            <h2 class="text-[16px] font-[600]">Capabilities:</h2>
            <div class="grid grid-cols-2 gap-3 mt-4">
              <div v-for="(capability, idx) in agent.metadata.capabilities" :key="idx" class="row-center">
                <img src="/images/icon-checked.svg" />
                <p class="text-[16px] text-app-text2 ml-2">
                  {{ capability.title }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="agent.metadata?.socials" class="w-full">
          <div class="line mt-4" />
          <div class="mt-4 w-full">
            <h2 class="text-[16px] font-[600]">Social Account:</h2>
            <div class="grid grid-cols-2 gap-3 mt-4">
              <a v-for="(social, idx) in agent.metadata.socials" :key="idx" class="row-center" :href="social.url" target="_blank">
                <img :src="social.icon_url" class="w-[24px] h-[24px]" />
                <p class="text-[16px] text-[#CACACA] ml-2">
                  {{ social.title }}
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
