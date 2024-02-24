<template>
  <div v-if="loading" class="h-full flex-center">Loading...</div>
  <div v-else class="grid gap-8 py-6">
    <div class="flex-between font-bold">
      <h1>Channels</h1>
      <icon-app @click="$router.push('/channel/new')"  icon="mingcute:plus-fill" class="w-9 cursor-pointer" />
    </div>
    <input-app :value="search" @update="search = $event" icon="iconamoon:search-fill" type="search" placeholder="search" />
    <div v-if="channelsFilter.length">
      <h6 class="text-gray-400 text-start mb-4">{{channelsFilter.length}} count</h6>
      <div class="grid gap-4 overflow-y-auto">
        <router-link v-for="(channel, index) in channelsFilter" :key="channel" :to="`/channel/info/${channel.uid}`"
          class="w-full h-12 flex items-center bg-v rounded-v gap-[0.375rem] sm:gap-2 md:gap-3 px-4 py-2 smooth cursor-pointer hover:bg-gray-300">
          {{ channel.name }}
        </router-link>
      </div>
    </div>
    <h6 v-else>
      {{ channels.length ? `no channel by the name of "${search}"` : 'no channels to display'}}
    </h6>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { onMounted, ref, computed } from 'vue'
import { api } from '@/plugins/axios.js';

const loading = ref(true);
const channels = ref([]);

onMounted(async () => {
  try {
    const result = await api.get('/channel/getAll');
    channels.value = result.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const search = ref('');
const channelsFilter = computed(() => channels.value.filter(({ name }) => name.toLowerCase().includes(search.value) ));
</script>