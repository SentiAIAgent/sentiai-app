<script setup lang="ts">
import Dialog from "../ui/dialog/Dialog.vue";
import DialogContent from "../ui/dialog/DialogContent.vue";
import DepositPopup from "./DepositPopup.vue";
import WithdrawPopup from "./WithdrawPopup.vue";
import AccountModal from "./AccountModal.vue";

const props = defineProps<{
  address?: string;
}>();

const portfolio = usePortfolio();
const openPortfolio = ref(false);
const openPortfolioMobile = ref(false);
const openDeposit = ref(false);
const { getUser } = useAuthStore();
const portfolio_view = ref<HTMLElement | null>(null);
const portfolio_content = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const openWithdraw = ref(false);
const openAccount = ref(false);
const vuePrivy = useVuePrivy();
const mobileView = window.innerWidth < 600;

onClickOutside(container, () => (openPortfolio.value = false));

const addressView = computed(() => portfolio.currentAddress);

function viewScanner() {
  window.open("https://bscscan.com/address/" + addressView.value, "_blank");
}
function onOpenDeposit() {
  openPortfolio.value = false;
  openDeposit.value = true;
}

function onOpenWithdraw() {
  openPortfolio.value = false;
  console.log("open withdraw");
  openWithdraw.value = true;
}

watch(
  () => openPortfolio.value,
  () => {
    if (!portfolio_view.value || !portfolio_content.value) return;

    portfolio_view.value.style.top = "60px";
    portfolio_view.value.style.maxHeight = openPortfolio.value ? "600px" : "0px";
  }
);

async function onOpenPortfolio(e: any) {
  await portfolio.refresh();
  if (mobileView) {
    openPortfolioMobile.value = true;
    return;
  }
  openPortfolio.value = true;
}
</script>
<template>
  <div ref="container">
    <button v-if="!$slots.default" class="row-center py-[6px] px-3 rounded-full bg-app-bg2" @click="onOpenPortfolio">
      <img v-if="!mobileView" src="/images/icon-wallet.svg" class="mr-2" />
      <p class="text-[16px]">{{ formatNumber(portfolio.balance, 3) }} BNB</p>
      <NuxtIcon name="icon-arrow-down" class="ml-2" />
    </button>
    <button v-else @click="onOpenPortfolio">
      <slot />
    </button>
    <div
      ref="portfolio_view"
      class="absolute right-4 z-[999] w-[320px] max-w-screen max-h-0 overflow-hidden rounded-[12px] shadow"
      :class="{
        'border-[1px] border-[rgba(0, 0, 0, 0.10)]': openPortfolio,
      }"
    >
      <div ref="portfolio_content" class="bg-app-card0 border-none max-h-screen" hideClose>
        <div class="relative flex flex-col max-h-[600px] overflow-y-auto pb-10">
          <div class="row-center justify-between sticky top-0 left-0 w-full p-4">
            <div class="row-center cursor-pointer text-app-text2" @click="viewScanner">
              <img v-if="getUser()?.avatar_url" :src="getUser().avatar_url" class="w-[24px] h-[24px] mr-2 rounded-full" />
              <p class="text-[16px]">{{ shortAddress(addressView) }}</p>
              <div class="ml-2" @click="openPortfolio = false">
                <NuxtIcon name="icon-scanner" class="text-[16px]" />
              </div>
            </div>
            <div class="cursor-pointer p-1 border-[1px] border-[#979797] rounded-[8px]" @click="openPortfolio = false">
              <NuxtIcon name="icon-close" class="" />
            </div>
          </div>
          <div class="px-4">
            <p class="text-[28px] font-[600]">${{ formatNumber(portfolio.totalBalance, 2) }}</p>

            <div class="row-center justify-between mt-4">
              <div class="flex flex-col items-center">
                <div class="bg-app-btnBg rounded-full p-3 cursor-pointer" @click="onOpenDeposit">
                  <img src="/images/icon-receive.svg" />
                </div>
                <p>Receive</p>
              </div>
              <div class="flex flex-col items-center">
                <div class="bg-app-btnBg rounded-full p-3 cursor-pointer" @click="onOpenWithdraw">
                  <img src="/images/icon-wallet-send.svg" />
                </div>
                <p>Send</p>
              </div>
              <div class="flex flex-col items-center">
                <div
                  v-if="getUser()?.privy_wallet?.provider !== 'privy_server_wallet'"
                  class="rounded-full p-3 cursor-pointer"
                  :class="vuePrivy.user?.wallet?.delegated ? 'bg-app-red' : 'bg-app-btnBg'"
                  @click="vuePrivy.request(vuePrivy.user?.wallet?.delegated ? 'revoke_delegate' : 'delegate')"
                >
                  <img :src="vuePrivy.user?.wallet?.delegated ? '/images/icon-delegated-white.svg' : '/images/icon-delegate.svg'" />
                </div>
                <p :class="vuePrivy.user?.wallet?.delegated ? 'text-app-red' : ''">{{ vuePrivy.user?.wallet?.delegated ? "Revoke" : "Delegate" }}</p>
              </div>
            </div>
            <div class="mt-4">
              <p class="text-app-text2">Token ({{ portfolio.assets.tokens.length }})</p>

              <div class="min-h-[150px]">
                <div v-for="(token, idx) in portfolio.assets.tokens" :key="token.address" class="mt-2">
                  <div class="row-center justify-between">
                    <div class="row-center">
                      <a class="w-[28px] h-[28px] mr-2 rounded-full" :href="`https://bscscan.com/token/${token.address}`" target="_blank">
                        <img :src="token.logo" class="w-full rounded-full" />
                      </a>
                      <div>
                        <p class="text-[16px] text-app-text1">
                          {{ token.name }}
                          <span class="text-[12px] text-app-text2">({{ token.symbol }})</span>
                        </p>
                        <div class="row-center cursor-pointer" @click="copyToClipboard(token.address)">
                          <p class="text-app-text2">{{ shortAddress(token.address) }}</p>
                          <NuxtIcon name="icon-copy" class="ml-2 text-app-text2" />
                        </div>
                      </div>
                    </div>
                    <TooltipProvider :delayDuration="0">
                      <Tooltip>
                        <TooltipTrigger>
                          <div class="text-end">
                            <p class="font-[600] text-app-text1">{{ formatNumber(token.amount_float, 3) }}</p>
                            <p class="text-app-text2">${{ formatNumber(token.usd_price, 2) }}</p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent class="z-[1000]" side="left">
                          <p>Price: ${{ formatNumber(token.price_per_token, 2) }}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog v-model:open="openPortfolioMobile">
      <DialogContent class="bg-app-bg0 py-0 px-0 border-none max-h-screen" hideClose>
        <div class="relative flex flex-col max-h-[600px] overflow-y-auto">
          <div class="row-center justify-between sticky top-0 left-0 w-full p-4">
            <div class="row-center cursor-pointer text-app-text2" @click="viewScanner">
              <img v-if="getUser()?.avatar_url" :src="getUser().avatar_url" class="w-[24px] h-[24px] mr-2 rounded-full" />
              <p class="text-[16px]">{{ shortAddress(addressView) }}</p>
              <div class="ml-2">
                <NuxtIcon name="icon-scanner" class="text-[16px]" />
              </div>
            </div>
            <div class="cursor-pointer p-1 border-[1px] border-[#979797] rounded-[8px]" @click="openPortfolioMobile = false">
              <NuxtIcon name="icon-close" class="" />
            </div>
          </div>
          <div class="px-4">
            <p class="text-[28px] font-[600]">${{ formatNumber(portfolio.totalBalance, 2) }}</p>

            <div class="row-center justify-between mt-4">
              <div class="flex flex-col items-center">
                <div class="bg-app-btnBg rounded-full p-3 cursor-pointer" @click="onOpenDeposit">
                  <img src="/images/icon-receive.svg" />
                </div>
                <p>Receive</p>
              </div>
              <div class="flex flex-col items-center">
                <div class="bg-app-btnBg rounded-full p-3 cursor-pointer" @click="onOpenWithdraw">
                  <img src="/images/icon-wallet-send.svg" />
                </div>
                <p>Send</p>
              </div>

              <div class="flex flex-col items-center">
                <div
                  v-if="getUser()?.privy_wallet?.provider !== 'privy_server_wallet'"
                  class="rounded-full p-3 cursor-pointer"
                  :class="vuePrivy.user?.wallet?.delegated ? 'bg-app-red' : 'bg-app-btnBg'"
                  @click="vuePrivy.request(vuePrivy.user?.wallet?.delegated ? 'revoke_delegate' : 'delegate')"
                >
                  <img :src="vuePrivy.user?.wallet?.delegated ? '/images/icon-delegated-white.svg' : '/images/icon-delegate.svg'" />
                </div>
                <p :class="vuePrivy.user?.wallet?.delegated ? 'text-app-red' : ''">{{ vuePrivy.user?.wallet?.delegated ? "Revoke" : "Delegate" }}</p>
              </div>
            </div>
            <div class="mt-4">
              <p class="text-app-text2">Token ({{ portfolio.assets.tokens.length }})</p>

              <div class="min-h-[150px]">
                <div v-for="(token, idx) in portfolio.assets.tokens" :key="token.address" class="mt-2">
                  <div class="row-center justify-between">
                    <div class="row-center">
                      <a class="w-[28px] h-[28px] mr-2 rounded-full" :href="`https://bscscan.com/token/${token.address}`" target="_blank">
                        <img :src="token.logo" class="w-full rounded-full" />
                      </a>
                      <div>
                        <p class="text-[16px] text-app-text1">
                          {{ token.name }}
                          <span class="text-[12px] text-app-text2">({{ token.symbol }})</span>
                        </p>
                        <div class="row-center cursor-pointer" @click="copyToClipboard(token.address)">
                          <p class="text-app-text2">{{ shortAddress(token.address) }}</p>
                          <NuxtIcon name="icon-copy" class="ml-2 text-app-text2" />
                        </div>
                      </div>
                    </div>
                    <TooltipProvider :delayDuration="0">
                      <Tooltip>
                        <TooltipTrigger>
                          <div class="text-end">
                            <p class="font-[600] text-app-text1">{{ formatNumber(token.amount_float, 3) }}</p>
                            <p class="text-app-text2">${{ formatNumber(token.usd_price, 2) }}</p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent class="z-[1000]" side="left">
                          <p>Price: ${{ formatNumber(token.price_per_token, 2) }}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <DepositPopup :open="openDeposit" :address="addressView" :onClose="() => (openDeposit = false)" />
    <WithdrawPopup v-if="openWithdraw" :open="openWithdraw" :address="addressView" :onClose="() => (openWithdraw = false)" />
    <AccountModal :open="openAccount" :address="getUser().wallet?.address" @close="() => (openAccount = false)" />
  </div>
</template>
