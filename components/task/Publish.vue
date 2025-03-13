<script setup lang="ts">
import { fetchAllIntergrations, fetchOAuthTwitterLink } from "~/services/api/auth/api";
import { IIntegration } from "~/services/api/chat/type";
import ItemInterTwitter from "../ItemInterTwitter.vue";
import ItemInterTelegram from "../ItemInterTelegram.vue";
import { fetchTaskIntergrations, updateTaskInterStatus } from "~/services/api/chat/api";
import Checkbox from "../ui/checkbox/Checkbox.vue";
import { toast } from "../ui/toast";
import TelegramConnectPopup from "../partials/TelegramConnectPopup.vue";

const props = defineProps<{
  conv_id: string;
  task_id: string;
}>();

const dataToType = ref({
  telegram: [] as IIntegration[],
  twitter: [] as IIntegration[],
});
const inteOfTask = ref([]);
const openTwitter = ref(false);
const openTelegram = ref(false);
const openTeleConnect = ref(false);

const loading = ref(true);
onMounted(async () => {
  getData();
});

async function getData() {
  const [data, dataTask] = await Promise.all([fetchAllIntergrations(), fetchTaskIntergrations({ conv_id: props.conv_id, task_id: props.task_id })]);
  dataToType.value = {
    telegram: [],
    twitter: [],
  };
  data.forEach((item) => {
    const active = dataTask.findIndex((i) => i.integration.id === item.id && i.status === "active") >= 0;
    item.status = active ? "active" : "inactive";
    if (active) {
      if (item.provider === "telegram") openTelegram.value = true;
      else openTwitter.value = true;
    }
    dataToType.value[item.provider].push(item);
  });
  loading.value = false;
}
function onChangePublishStatus(active: boolean, item: IIntegration) {
  updateTaskInterStatus({
    conv_id: props.conv_id,
    task_id: props.task_id,
    inter_id: item.id,
    status: active ? "active" : "inactive",
  });
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
</script>

<template>
  <div v-if="!loading">
    <p>Publish</p>
    <div>
      <div class="flex items-center space-x-2 mt-2">
        <Checkbox id="toX" v-model:checked="openTwitter" />
        <label for="toX" class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> Publish to X </label>
      </div>
      <div v-if="openTwitter" class="px-3 pb-3">
        <div v-if="dataToType.twitter.length > 0">
          <ItemInterTwitter v-for="item in dataToType.twitter" :key="item.id" :item="item" @change-status="(v) => onChangePublishStatus(v, item)" />
        </div>
        <div v-else class="row-center justify-between pl-3 pt-3">
          <p class="text-app-red italic">No account linked</p>
          <button class="text-blue-500 font-[600]" @click="getOAuthTwitterLink">Connect</button>
        </div>
      </div>
    </div>

    <div class="mt-3">
      <div class="flex items-center space-x-2">
        <Checkbox id="totele" v-model:checked="openTelegram" />
        <label for="totele" class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> Publish to Telegram </label>
      </div>
      <div v-if="openTelegram" class="px-3 pb-3">
        <div v-if="dataToType.telegram.length > 0">
          <ItemInterTelegram v-for="item in dataToType.telegram" :key="item.id" :item="item" @change-status="(v) => onChangePublishStatus(v, item)" />
        </div>
        <div v-else class="row-center justify-between pl-3 pt-3">
          <p class="text-app-red italic">No account linked</p>
          <button class="text-blue-500 font-[600]" @click="openTeleConnect = true">Connect</button>
        </div>
      </div>
    </div>
    <TelegramConnectPopup v-if="openTeleConnect" @close="openTeleConnect = false" @success="getData" />
  </div>
</template>
