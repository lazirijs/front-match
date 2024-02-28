<template>
  <div v-if="loading || !player.uid" class="h-full flex-center">{{ loading ? 'التحميل...' : "هذا اللاعب غير موجود" }}</div>
  <div v-else class="grid gap-16 py-6">
    <h1 class="font-bold text-start">معلومات اللاعب</h1>

    <div class="grid gap-4">
      <div class="w-full h-24 flex-between gap-4">
        <a :href="player.solarimagelink" target="_blank" :style="`background-image: url('${player.solarimagelink}');`" class="h-full w-full rounded-v bg-v bg-cover bg-center mx-auto"></a>
        <a :href="player.birthcertificatelink" target="_blank" :style="`background-image: url('${player.birthcertificatelink}');`" class="h-full w-full rounded-v bg-v bg-cover bg-center mx-auto"></a>
      </div>

      <h6 class="text-gray-400 first-letter:lowercase">
        انقر على الصورة لفتحها
      </h6>
    </div>

    <form @submit.prevent="submitForm" class="grid gap-8">
      <input-app :value="player.fullname" icon="fluent:person-24-filled" readonly />
      <input-app :value="$toDate(player.birthday)" icon="mdi:date-range" readonly />
      <input-app :value="player.solarimagelink" icon="mdi:person-box" type="url" readonly />
      <input-app :value="player.birthcertificatelink" icon="fluent:certificate-24-filled" readonly />
      <button @click="create()" class="hidden"/>
    </form>

    <h6 class="w-8/12 m-auto text-gray-400 first-letter:lowercase">
        تمت إضافة اللاعب في : {{ $toDate(player.created_at, 'timestamp') }}
        <br>
        لا يمكنك تعديل معلومات اللاعب بعد إضافته
      </h6>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { ref, onMounted } from 'vue'
import { api } from '@/plugins/axios.js';
import { useRoute } from 'vue-router'

const route = useRoute();

const loading = ref(true);

const player = ref({
  uid: '',
  fullname: '',
  birthday: '',
  solarimagelink: '',
  birthcertificatelink: '',
});

onMounted(async (uid = route.params.uid) => {
  try {
    const result = await api.get('/channel/player/' + uid);
    if (result.data.exists) {
      player.value = result.data.data
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
</script>
