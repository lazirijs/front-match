<template>
  <div class="grid gap-8 py-6">
    <div class="flex-between font-bold">
      <div class="space-y-2">
        <h1>{{ channel.name }}</h1>
        <h6 class="text-gray-400 text-start">{{ channel.category }}</h6>
      </div>
      <icon-app @click="$router.push('/channel/info/:id')" icon="entypo:info" class="w-9 cursor-pointer" />
    </div>
    
    <div class="flex gap-4">
      <div v-if="$store.state.logged" class="min-h-12 min-w-12 rounded-v bg-v flex-center">
        <icon-app @click="add" icon="fa6-solid:plus" class="w-9 cursor-pointer" />
      </div>
    <input-app :value="search" @update="search = $event" icon="iconamoon:search-fill" type="search"
      placeholder="Team players" />
    </div>
    <div v-if="playersFilter.length">
      <h6 class="text-gray-400 text-start mb-4">{{ playersFilter.length }} count</h6>
      <div class="grid gap-4 overflow-y-auto">
        <div v-for="player in playersFilter" :key="player" class="w-full h-12 flex-between bg-v rounded-v gap-[0.375rem] sm:gap-2 md:gap-3 px-4 py-2 smooth">
          <div>{{ player.name }}</div>
          <icon-app v-if="$store.state.logged" @click="remove" icon="mdi:remove-bold" class="text-gray-400 cursor-pointer" />
        </div>
      </div>
    </div>
    <h6 v-else>
      {{ players.length ? `no channel by the name of "${search}"` : 'no channels to display' }}
    </h6>
    <h6 class="text-gray-400"> last change at <br> 15:20 21/02/2024 </h6>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { ref, computed } from 'vue'

const channel = {
  name: 'AL 24 News',
  category: 'News',
};
const players = [
  { name: "Raïs M'Bolhi - 37 ans" },
  { name: "Aïssa Mandi - 32 ans" },
  { name: "Ramy Bensebaini - 28 ans" },
  { name: "Youcef Atal - 27 ans" },
  { name: "Ismaël Bennacer - 26 ans" },
  { name: "Hicham Boudaoui - 24 ans" }
];

const search = ref('');
const playersFilter = computed(() => players.filter(({ name }) => name.toLowerCase().includes(search.value)));
</script>