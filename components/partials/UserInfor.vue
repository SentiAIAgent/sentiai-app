<script setup lang="ts">
import { getNativeTokenBalance } from "~/services/bsc/utils";

import PrivyLogout from "~/react_app/LogoutButton";

import { applyPureReactInVue } from "veaury";
import AccountModal from "./AccountModal.vue";

const LogoutButton = applyPureReactInVue(PrivyLogout);
const { getUser, logOut } = useAuthStore();

const openPopup = ref(false);
const openAccount = ref(false);
const portfolio = usePortfolio();
const addressView = computed(() => portfolio.currentAddress || getUser().privy_wallet.address || getUser().wallet?.address);

const balance = ref(0);

onMounted(async () => {
  const _balance = portfolio.balance ? portfolio.balance : await getNativeTokenBalance(addressView.value);
  balance.value = _balance;
});

function viewScanner() {
  openPopup.value = false;
  window.open("https://bscscan.com/address/" + addressView.value, "_blank");
}

function onOpenAccount() {
  openPopup.value = false;
  openAccount.value = true;
}
</script>

<template>
  <div>
    <Popover v-model:open="openPopup">
      <PopoverTrigger>
        <div>
          <img src="/images/icon-avatar.svg" class="w-[28px] h-[28px] md:w-[40px] md:h-[40px]" />
        </div>
      </PopoverTrigger>
      <PopoverContent class="p-4 w-[75vw] max-w-[384px] lg:w-64 bg-app-bg0 border-[1px] border-app-line2 rounded-[8px]">
        <section class="text-app-text1">
          <div class="pb-2">
            <div class="row-center w-full">
              <div class="flex-1">
                <div class="row-center justify-between">
                  <div class="row-center cursor-pointer" @click="copyToClipboard(portfolio.currentAddress)">
                    <p class="text-[16px] font-[600]">Address: {{ shortAddress(portfolio.currentAddress) }}</p>
                    <NuxtIcon name="icon-copy" class="ml-1" />
                  </div>
                </div>
                <p class="flex-1 text-[#B0B0B0]">Balance: {{ formatNumber(portfolio.balance || balance, 3) }} BNB</p>
              </div>
              <div class="px-1 cursor-pointer" @click="viewScanner">
                <NuxtIcon name="icon-scanner" class="text-[14px]" />
              </div>
            </div>
          </div>

          <div class="line" />

          <div>
            <div @click="() => navigateTo('/task/list')" class="row-center cursor-pointer py-2">
              <p class="flex-1">Your Task</p>
            </div>
            <div class="line"></div>
          </div>
          <div>
            <LogoutButton />
          </div>
        </section>
      </PopoverContent>
    </Popover>
    <AccountModal :address="getUser()?.wallet?.address" :open="openAccount" @close="() => (openAccount = false)" />
  </div>
</template>
