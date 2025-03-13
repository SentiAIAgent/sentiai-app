<script setup lang="ts">
import { updateIntergrationsStatus } from "~/services/api/chat/api";
import { IIntegration } from "~/services/api/chat/type";

const props = defineProps<{ item: IIntegration; onDelete?: () => void; onChangeStatus?: (v: boolean) => void }>();
const selected = ref(props.item.status === "active");
watch(selected, (v) => {
  if (props.onChangeStatus) props.onChangeStatus?.(v);
  else onUpdateItemStatus(v);
});

function onUpdateItemStatus(v: boolean) {
  updateIntergrationsStatus({ inter_id: props.item.id, status: v ? "active" : "inactive" });
}
</script>

<template>
  <div class="row-center justify-between py-3 border-b-[1px] border-b-app-line1">
    <div>
      <div class="row-center">
        <p class="font-[500]">{{ item.data.chat_title }}</p>
        <p
          class="ml-1 text-[12px] px-[6px] py-[2px] rounded-[12px] capitalize"
          :class="{
            'text-[#EB2F96] bg-[#FFF0F6]': item.data.chat_type === 'private',
            'text-[#FA8C16] bg-[#FFF7E6]': item.data.chat_type === 'group',
            'text-[#13C2C2] bg-[#E6FFFB]': item.data.chat_type === 'channel',
          }"
        >
          {{ item.data.chat_type }}
        </p>
      </div>
      <p>@{{ item.data.bot_username }}</p>
    </div>
    <div v-if="!!onDelete" class="row-center gap-x-4">
      <Switch v-model:checked="selected" />
      <a :href="`https://t.me/${item.data.chat_username}`" target="_blank" class="mt-[2px]">
        <NuxtIcon name="icon-scanner" class="text-[21px]" />
      </a>

      <button class="text-red-400" @click="onDelete">
        <img src="/images/icon-delete.svg" />
      </button>
    </div>
    <Switch v-if="!!onChangeStatus" v-model:checked="selected" />
  </div>
</template>
