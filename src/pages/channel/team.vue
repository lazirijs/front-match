<template>
  <div class="grid gap-8 py-6">
    <div class="flex-between font-bold">
      <div class="space-y-2">
        <h1>{{ channel.name || "Channel" }}</h1>
        <h6 class="text-gray-400 text-start">{{ channel.category || "category" }}</h6>
      </div>
      <icon-app @click="$router.push('/channel/info/' + $route.params.uid)" icon="entypo:info" class="w-9 cursor-pointer" />
    </div>
    
    <div class="flex gap-4">
      <router-link v-if="$store.state.team == route.params.uid" to="/channel/new/player" class="min-h-12 min-w-12 rounded-v bg-v flex-center">
        <icon-app @click="add" icon="fa6-solid:plus" class="w-9 cursor-pointer" />
      </router-link>
    <input-app :value="search" @update="search = $event" icon="iconamoon:search-fill" type="search"
      placeholder="Team players" />
    </div>
    <div v-if="playersFilter.length && !loading">
      <h6 class="text-gray-400 text-start mb-4">{{ playersFilter.length }} count</h6>
      <div class="grid gap-4 overflow-y-auto">
        <div v-for="player in playersFilter" :key="player" class="w-full h-16 flex-between bg-v rounded-v gap-[0.375rem] sm:gap-2 md:gap-3 px-4 py-2 smooth">
          <router-link :to="`/channel/player/${player.uid}`" class="flex-center gap-4">
            <div class="w-12 h-12 rounded-full bg-gray-500 bg-cover bg-center" :style="`background-image: url(${player.solarimagelink});`"></div>
            <div class="text-start">{{ player.fullname }} <br> <h6 class="text-start">{{ $toDate(player.birthday) }}</h6></div>
          </router-link>
          <icon-app v-if="$store.state.team == route.params.uid" @click="login(player.uid)" :icon="removing == player.uid ? 'svg-spinners:ring-resize' : 'mdi:remove-bold'" class="text-gray-400 cursor-pointer" />
        </div>
      </div>
    </div>
    <h6 v-else>
      {{ loading ? 'loading...' : (players.length ? `no players by the name of "${search}"` : 'no players to display') }}
    </h6>
    <h6 v-if="!loading && players.length" class="text-gray-400 text-center"> 
      last added player at <br> 
      {{ $toDate(players[0].created_at, 'timestamp') }}
    </h6>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { ref, computed, onMounted } from 'vue'
import { api } from '@/plugins/axios.js';
import { useRoute } from 'vue-router'

const route = useRoute();

const channel = ref({});

const players = ref([]);

const removing = ref(false);

let loading = ref(true);

onMounted(async (uid = route.params.uid) => {
  try {
    const result = await api.get('/channel/team/' + uid);
    if (result.data.channelInfo.exists) {
      channel.value = result.data.channelInfo.data;
      players.value = result.data.players;
    } else {
      alert("this channel does'nt exists");
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const search = ref('');
const playersFilter = computed(() => players.value.filter(({ fullname }) => fullname.toLowerCase().includes(search.value)));

const remove = async (player) => {
  try {
    removing.value = player;
    const result = await api.delete('/channel/remove/player/' + player);
    if (result.data) {
      players.value = players.value.filter(({ uid }) => uid != player );
    }
  } catch (error) {
    console.log(error);
  }
  removing.value = false;
};

const login = (player) => {
  const code = prompt('Enter the password : ');
  if (code) {
    const responsible = channel.value.responsible.map(i => i.code == code.toUpperCase()).includes(true);
    if (!responsible) {
      alert('your password is incorrect');
    } else {
      remove(player);
    }
  }
};
</script>