<script setup lang="ts">
import { IIntegration } from "~/services/api/chat/type";
import { Switch } from "./ui/switch";
import { updateIntergrationsStatus } from "~/services/api/chat/api";
import PopupDelete from "./conversation/PopupDelete.vue";

const props = defineProps<{ item: IIntegration; onDelete?: () => void; onChangeStatus?: (v: boolean) => void }>();
const openDelete = ref(false);
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
    <div class="row-center">
      <img :src="item.data.avatar_url" class="w-[24px] h-[24px] rounded-full" />
      <p class="ml-2 font-[500]">@{{ item.data.username }}</p>
    </div>
    <div v-if="!!onDelete" class="row-center gap-x-4">
      <Switch v-model:checked="selected" />
      <a :href="`https://x.com/${item.data.username}`" target="_blank" class="mt-[2px]">
        <NuxtIcon name="icon-scanner" class="text-[21px]" />
      </a>

      <button class="text-red-400" @click="openDelete = true">
        <img src="/images/icon-delete.svg" />
      </button>
    </div>
    <Switch v-if="!!onChangeStatus" v-model:checked="selected" />
    <PopupDelete
      v-if="openDelete"
      @close="openDelete = false"
      @delete="() => onDelete?.()"
      title="Delete"
      description="Are you sure you want to delete this account? All automated tasks integrated with this account will be terminated immediately."
    />
  </div>
</template>
