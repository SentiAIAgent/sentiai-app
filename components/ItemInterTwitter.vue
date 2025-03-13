<script setup lang="ts">
import { IIntegration } from "~/services/api/chat/type";
import { Switch } from "./ui/switch";

const props = defineProps<{ item: IIntegration; onDelete?: () => void; onChangeStatus?: (v: boolean) => void }>();
const selected = ref(props.item.status === "active");
watch(selected, (v) => {
  props.onChangeStatus?.(v);
});
</script>

<template>
  <div class="row-center justify-between py-3 border-b-[1px] border-b-app-line1">
    <div class="row-center">
      <img :src="item.data.avatar_url" class="w-[24px] h-[24px] rounded-full" />
      <p class="ml-2 font-[500]">@{{ item.data.username }}</p>
    </div>
    <button v-if="!!onDelete" class="text-red-400" @click="onDelete">Disconnect</button>
    <Switch v-if="!!onChangeStatus" v-model:checked="selected" />
  </div>
</template>
