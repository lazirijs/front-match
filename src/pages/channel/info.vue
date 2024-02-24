<template>
  <div v-if="loading" class="h-full flex-center">Loading...</div>
  <div v-else class="grid gap-20 py-6">
    <div class="flex-between font-bold">
      <div class="space-y-2">
        <h1>Channel info</h1>
        <h6 class="text-gray-400 text-start">ID : {{ channel.id }}</h6>
      </div>
      <icon-app @click="copyUrl()" icon="fa-solid:link" class="w-9 cursor-pointer" />
    </div>
    
    <div class="grid gap-8">
      <input-app :value="channel.name" icon="ic:round-tv" readonly />
      <input-app :value="channel.category" icon="tabler:category-2" readonly />
      <div v-if="$store.state.team == route.params.uid" v-for="(responsible, index) in channel.responsible" :key="index" class="space-y-2">
        <input-app :value="responsible.name" icon="fluent:person-24-filled" readonly />
        <h6 class="text-gray-400 text-start px-2 uppercase font-medium">CODE : {{ responsible.code }}</h6>
      </div>
        <div class="grid grid-cols-4 gap-4">
          <div class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.ar }">Ar</div>
          <div class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.amz }">Amz</div>
          <div class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.en }">En</div>
          <div class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.fr }">Fr</div>
        </div>
    </div>

    <div class="space-y-4">
      <btn-app text="team" @click="$router.push(`/channel/team/${channel.uid}`)" icon="fluent:people-team-16-filled" class="min-w-fit mt-4 mx-auto" />
      <h6 class="text-gray-400 first-letter:lowercase">
        channel created at : {{ $toDate(channel.created_at, "timestamp") }} <br>
        <br>
        <a @click="login()" class="link">click here</a> to edite team
      </h6>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/plugins/axios.js';
import { useRoute } from 'vue-router'
import store from '@/store';

const route = useRoute();

let channel = ref({});

let loading = ref(true);

onMounted(async (uid = route.params.uid) => {
  try {
    const result = await api.get('/channel/get/' + uid);
    result.data.exists ? channel.value = result.data.data : alert("this channel does'nt exists");
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const login = () => {
  const code = prompt('Enter the password : ');
  if (code) {
    const responsible = channel.value.responsible.map(i => i.code == code.toUpperCase()).includes(true);
    if (responsible) {
      store.commit('team', channel.value.uid);
    } else {
      alert('your password is incorrect');
    }
  }
};

const copyUrl = () => navigator.clipboard.writeText(window.location.href);
</script>