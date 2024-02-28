<template>
  <div class="grid gap-20 py-6">
    <div class="flex-between font-bold">
      <div class="space-y-2">
        <h1>معلومات القناة</h1>
        <h6 class="text-gray-400 text-start">{{ loading ? "التحميل..." : "ID : " + channel.id }}</h6>
      </div>
      <icon-app @click="copy()" icon="fa-solid:link" class="w-9 cursor-pointer" />
    </div>
    
    <div class="grid gap-8">
      <input-app :value="channel.name" icon="ic:round-tv" readonly />
      <input-app :value="channel.category" icon="tabler:category-2" readonly />
      <div v-if="$store.state.logged || $store.state.team == route.params.uid" v-for="(responsible, index) in channel.responsible" :key="index" class="space-y-2">
        <input-app :value="responsible.name" icon="fluent:person-24-filled" readonly />
        <h6 @click="copy(responsible.code)" title="انقر لنسخ الرمز" class="text-gray-400 text-start px-2 uppercase font-medium cursor-pointer">الرمز : <a dir="ltr">{{ responsible.code }}</a></h6>
      </div>
        <div class="grid grid-cols-4 gap-4">
          <div class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.ar }">Ar</div>
          <div class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.amz }">Amz</div>
          <div class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.en }">En</div>
          <div class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.fr }">Fr</div>
        </div>
    </div>

    <div class="space-y-4">
      <btn-app text="الفريق" @click="$router.push(`/channel/team/${channel.uid}`)" icon="fluent:people-team-16-filled" class="min-w-fit mt-4 mx-auto" />
      <h6 class="text-gray-400 first-letter:lowercase">
        تم إنشاء القناة في : {{ $toDate(channel.created_at, "timestamp") }} <br>
        <br>
        <a v-if="!$store.state.team && !$store.state.logged"><a @click="login()" class="link">انقر هنا </a>للتعديل على الفريق</a>
      </h6>
    </div>

    <h6 v-if="$store.state.logged" @click="!removing ? remove(channel.uid) : ''" class="text-red-300 cursor-pointer">
      {{ 
        removing ? 
          'حذف القناة...': 
          'حذف القناة' 
      }}
    </h6>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/plugins/axios.js';
import { useRoute } from 'vue-router'
import store from '@/store';
import router from '@/router';

const route = useRoute();

let channel = ref({
  name: 'name',
  category: 'category',
  responsible: [],
  languages: {
    ar: false,
    amz: false,
    en: false,
    fr: false,
  }
});

let loading = ref(true);
let removing = ref(false);

onMounted(async (uid = route.params.uid) => {
  try {
    const result = await api.get('/channel/get/' + uid);
    result.data.exists ? channel.value = result.data.data : alert("هذه القناة غير موجودة");
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const login = () => {
  const code = prompt('أدخل كلمة مرور الفريق :');
  if (code) {
    const responsible = channel.value.responsible.map(i => i.code == code.toUpperCase()).includes(true);
    if (responsible) {
      store.commit('team', channel.value.uid);
    } else {
      alert('كلمة مرورك غير صحيحة');
    }
  }
};

const copy = (url = window.location.href) => navigator.clipboard.writeText(url);

const remove = async (uid) => {
  const code = prompt('أدخل كلمة المرور :');
  if (code) {
    try {
      removing.value = true;
      const result = await api.delete('/channel/remove/' + uid);
      if (result.data) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
    removing.value = false;
  }
};
</script>
