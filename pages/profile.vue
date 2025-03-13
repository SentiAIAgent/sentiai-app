<script lang="ts" setup>
import BotButton from "~/components/conversation/BotButton.vue";
import ItemInterTelegram from "~/components/ItemInterTelegram.vue";
import ItemInterTwitter from "~/components/ItemInterTwitter.vue";
import BalanceButton from "~/components/partials/BalanceButton.vue";
import TelegramConnectPopup from "~/components/partials/TelegramConnectPopup.vue";
import Collapsible from "~/components/ui/collapsible/Collapsible.vue";
import CollapsibleContent from "~/components/ui/collapsible/CollapsibleContent.vue";
import CollapsibleTrigger from "~/components/ui/collapsible/CollapsibleTrigger.vue";
import { toast } from "~/components/ui/toast";
import { fetchAllIntergrations, fetchOAuthTwitterLink } from "~/services/api/auth/api";
import { deleteIntergrations } from "~/services/api/chat/api";
import { IIntegration } from "~/services/api/chat/type";

definePageMeta({
  layout: "conversation",
});

const { getUser } = useAuthStore();
const portfolio = usePortfolio();
const loading = ref(true);
const openTwitter = ref(true);
const openTeleCollap = ref(false);
const openTeleConnect = ref(false);

const dataToType = ref({
  telegram: [] as IIntegration[],
  twitter: [] as IIntegration[],
});
onMounted(async () => {
  getData();
});

async function getData() {
  const data = await fetchAllIntergrations();
  dataToType.value = {
    telegram: [],
    twitter: [],
  };
  data.forEach((item) => {
    dataToType.value[item.provider].push(item);
  });
  loading.value = false;
}

function viewScanner() {
  window.open("https://bscscan.com/address/" + portfolio.currentAddress, "_blank");
}

async function getOAuthTwitterLink() {
  const res = await fetchOAuthTwitterLink();
  if (res?.url) {
    window.open(res.url, "_blank");
  } else {
    toast({
      description: "Something went wrong",
      duration: 3000,
    });
  }
}

async function deleteInte(item: IIntegration) {
  const res = await deleteIntergrations({ inter_id: item.id });
  res && getData();
}
</script>

<template>
  <section class="flex flex-row w-full h-full">
    <PartialsChatLeftSection />
    <div class="flex-1 h-full flex flex-col bg-app-bg0 overflow-hidden">
      <div class="row-center justify-between w-full border-b-[1px] border-b-app-line1">
        <BotButton hide-bot />
        <div v-if="getUser().id" class="row-center">
          <BalanceButton class="mr-4" />
          <PartialsUserInfor class="mr-4" />
        </div>
      </div>
      <div class="flex-1 overflow-hidden flex flex-col items-center">
        <div class="flex-1 flex flex-col items-center w-full md:w-[90%] overflow-hidden md:max-w-[940px] 2xl:max-w-[1100px]">
          <div class="flex-1 flex flex-col justify-center w-full overflow-hidden">
            <div ref="scrollArea" class="h-full w-full pt-4 pb-[100px] overflow-y-auto relative px-4 md:px-[70px] 2xl:px-[100px]">
              <div class="mt-10 md:mt-20 flex flex-col items-center w-full md:max-w-[600px] xl:max-w-[800px]">
                <h1 class="text-[#323232] text-[24px] md:text-[36px] xl:text-[40px] font-[500]">Profile</h1>
                <img src="/images/icon-avatar.svg" class="w-[70px] h-[70px] md:w-[100px] md:h-[100px] mt-4" />
                <div class="mt-4 cursor-pointer row-center md:text-[16px] font-[600]">
                  <p class="font-[600]" @click="copyToClipboard(portfolio.currentAddress)">{{ shortAddress(portfolio.currentAddress) }}</p>
                  <NuxtIcon name="icon-scanner" class="ml-3" @click="viewScanner()" />
                </div>
                <p class="mt-1 text-app-text2 text-[12px] md:text-[14px] italic">{{ getUser().email }}</p>
                <div class="mt-6 md:mt-10 text-center">
                  <p class="md:text-[16px] font-[600]">Social Connections</p>
                  <p class="text-app-text2">Help others verify your account by connecting social media accounts</p>
                </div>
                <div v-if="!loading" class="mt-4 w-full">
                  <Collapsible
                    v-model:open="openTwitter"
                    :disabled="dataToType.twitter.length === 0"
                    class="border-[1px] border-b-app-line1 rounded-[8px]"
                  >
                    <CollapsibleTrigger class="w-full row-center justify-between p-3" :class="{ 'bg-app-card1': openTwitter }">
                      <div class="row-center">
                        <img src="/images/icon-twitter.png" class="w-[24px] h-[24px]" />
                        <p class="ml-2 font-[500]">Your X Accounts</p>
                        <div class="ml-2 text-app-tLight rounded-full text-[12px] overflow-hidden">
                          <div v-if="dataToType.twitter.length === 0" class="p-1 bg-[#b1b1b1]">Not Linked</div>
                          <div v-else class="p-1 text-[#389E0D] bg-[#D9F7BE]">
                            {{ dataToType.twitter.length }} account{{ dataToType.twitter.length > 1 ? "s" : "" }}
                          </div>
                        </div>
                      </div>
                      <button v-if="dataToType.twitter.length === 0" class="text-blue-500 font-[600]" @click="getOAuthTwitterLink">Connect</button>
                      <NuxtIcon v-else name="icon-arrow-down" class="text-[20px] duration-200" :class="{ 'rotate-180': openTwitter }" />
                    </CollapsibleTrigger>
                    <CollapsibleContent class="px-4">
                      <ItemInterTwitter v-for="item in dataToType.twitter" :key="item.id" :item="item" @delete="deleteInte(item)" />

                      <div class="text-blue-500 row-center py-3 cursor-pointer" @click="getOAuthTwitterLink">
                        <img src="/images/icon-add-connect.svg" class="" />
                        <p class="ml-1 font-[500]">Connect another account</p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  <Collapsible
                    v-model:open="openTeleCollap"
                    :disabled="dataToType.telegram.length === 0"
                    class="border-[1px] border-b-app-line1 rounded-[8px] mt-4"
                  >
                    <CollapsibleTrigger class="w-full row-center justify-between p-3" :class="{ 'bg-app-card1': openTeleCollap }">
                      <div class="row-center">
                        <img src="/images/icon-telegram.png" class="w-[24px] h-[24px]" />
                        <p class="ml-2 font-[500]">Your Telegram Credentials</p>
                        <div class="ml-2 text-app-tLight rounded-full text-[12px] overflow-hidden">
                          <div v-if="dataToType.telegram.length === 0" class="p-1 bg-[#b1b1b1]">Not Linked</div>
                          <div v-else class="p-1 text-[#389E0D] bg-[#D9F7BE]">
                            {{ dataToType.telegram.length }} credential{{ dataToType.telegram.length > 1 ? "s" : "" }}
                          </div>
                        </div>
                      </div>
                      <button v-if="dataToType.telegram.length === 0" class="text-blue-500 font-[600]" @click="openTeleConnect = true">
                        Connect
                      </button>
                      <NuxtIcon v-else name="icon-arrow-down" class="text-[20px] duration-200" :class="{ 'rotate-180': openTeleCollap }" />
                    </CollapsibleTrigger>
                    <CollapsibleContent class="px-4">
                      <ItemInterTelegram v-for="item in dataToType.telegram" :key="item.id" :item="item" @delete="deleteInte(item)" />

                      <div class="text-blue-500 row-center py-3 cursor-pointer" @click="openTeleConnect = true">
                        <img src="/images/icon-add-connect.svg" class="" />
                        <p class="ml-1 font-[500]">Connect another credentials</p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TelegramConnectPopup v-if="openTeleConnect" @close="openTeleConnect = false" @success="getData" />
  </section>
</template>
