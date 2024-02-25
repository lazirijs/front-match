<template>
  <div class="grid gap-20 py-6">
    <h1 class="font-bold text-start">New Channel</h1>
    
    <form @submit.prevent="submitForm" class="grid gap-8">
      <input-app :value="channel.name" @update="channel.name = $event" icon="ic:round-tv" placeholder="channel name" :readonly="loading" />
      <input-app :value="channel.category" @update="channel.category = $event" icon="tabler:category-2" placeholder="channel category" :readonly="loading" />
      <div class="space-y-2 overflow-y-auto">
        <input-app v-for="(item, index) in channel.responsible" :key="index" :value="channel.responsible[index]" @update="channel.responsible[index] = $event" icon="fluent:person-24-filled" placeholder="channel responsible" :readonly="loading" />
        <h6 class="text-gray-400 text-start first-letter:lowercase px-2"><a @click="channel.responsible.push('')" class="underline cursor-pointer">click here</a> to add another responsible</h6>
      </div>
      <div class="space-y-2">
        <div class="grid grid-cols-4 gap-4">
          <div @click="loading ? '' : channel.languages.ar = !channel.languages.ar" class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth cursor-pointer" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.ar }">Ar</div>
          <div @click="loading ? '' : channel.languages.amz = !channel.languages.amz" class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth cursor-pointer" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.amz }">Amz</div>
          <div @click="loading ? '' : channel.languages.en = !channel.languages.en" class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth cursor-pointer" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.en }">En</div>
          <div @click="loading ? '' : channel.languages.fr = !channel.languages.fr" class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth cursor-pointer" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.fr }">Fr</div>
        </div>
        <h6 class="text-gray-400 text-start first-letter:lowercase px-2">click to select channel languages</h6>
        <button @click="create()" class="hidden"/>
      </div>
    </form>

    <div class="space-y-4">
      <btn-app text="create" @click="create()" icon="entypo:plus" :loading="loading" dark class="min-w-fit mt-4 mx-auto" />
      <h6 class="w-5/12 m-auto text-gray-400 first-letter:lowercase">
        you can't edit channel info after creating it
      </h6>
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { ref } from 'vue'
import { api } from '@/plugins/axios.js';
import { useRouter } from 'vue-router'

const router = useRouter();

const loading = ref(false);

const channel = ref({
  name: '',
  category: '',
  responsible: [''],
  languages: {
    ar: false,
    amz: false,
    en: false,
    fr: false
  }
});

const create = async () => {
  try {
    if (channel.value.name && channel.value.category && channel.value.responsible[0] != '') {
      loading.value = true;
      const result = await api.post("/channel/create", channel.value);

      if (result.data.uid) {
        console.log(result.data);
        router.push(`/channel/info/${result.data.uid}`);
      }

      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
    console.error(error);
    alert("An error occurred during creation channel");
  }
}
</script>
