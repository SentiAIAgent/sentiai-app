<script setup lang="ts">
import { IIntegration } from "~/services/api/chat/type";

const props = defineProps<{ item: IIntegration; onDelete?: () => void; onChangeStatus?: (v: boolean) => void }>();
const selected = ref(props.item.status === "active");
watch(selected, (v) => {
  props.onChangeStatus?.(v);
});
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
    <button v-if="!!onDelete" class="text-red-400" @click="onDelete">Disconnect</button>
    <Switch v-if="!!onChangeStatus" v-model:checked="selected" />
  </div>
</template>
