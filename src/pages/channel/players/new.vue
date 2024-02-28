<template>
  <div class="grid gap-16 py-6">
    <h1 class="font-bold text-start">لاعب جديد</h1>

    <div class="grid gap-4">
      <div class="w-full h-24 flex-between gap-4">
        <a :href="player.solarImageLink" target="_blank" :style="`background-image: url('${player.solarImageLink}');`" class="h-full w-full rounded-v bg-v bg-cover bg-center mx-auto"></a>
        <a :href="player.birthCertificateLink" target="_blank" :style="`background-image: url('${player.birthCertificateLink}');`" class="h-full w-full rounded-v bg-v bg-cover bg-center mx-auto"></a>
      </div>

      <h6 class="text-gray-400 first-letter:lowercase">
        انقر على الصورة لفتحها
      </h6>
    </div>

    <form @submit.prevent="submitForm" class="grid gap-8">
      <input-app :value="player.fullname" @update="player.fullname = $event" icon="fluent:person-24-filled" placeholder="اسم اللاعب الكامل" :readonly="loading" />
      <input-app :value="player.birthday" @update="player.birthday = $event" icon="mdi:date-range" type="date" :readonly="loading" />
      <input-app :value="player.solarImageLink" @update="player.solarImageLink = link($event)" icon="mdi:person-box" type="url" placeholder="رابط الصورة الشمسية" :readonly="loading" />
      <input-app :value="player.birthCertificateLink" @update="player.birthCertificateLink = link($event)" icon="fluent:certificate-24-filled" placeholder="رابط شهادة الميلاد" :readonly="loading" />
      <h6 class="text-gray-400 first-letter:lowercase">تأكد من أن إعدادات الخصوصية لهذه الصورة "عامة"</h6>
      <button @click="create()" class="hidden"/>
    </form>

    <div class="space-y-4">
      <btn-app text="create" @click="create()" icon="entypo:plus" :loading="loading" dark class="min-w-fit mt-4 mx-auto" />
      <h6 class="w-5/12 m-auto text-gray-400 first-letter:lowercase">
        لا يمكنك تعديل معلومات اللاعب بعد إضافته
      </h6>
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { ref } from 'vue'
import { api } from '@/plugins/axios'
import { useRouter } from 'vue-router'
import store from '@/store';

const router = useRouter();
const loading = ref(false);

const player = ref({
  channel: store.state.team,
  fullname: '',
  birthday: '',
  solarImageLink: '',
  birthCertificateLink: '',
});

const create = async () => {
  try {
    if (player.value.fullname && player.value.birthday && player.value.solarImageLink && player.value.birthCertificateLink && window.confirm()) {
      loading.value = true;
      const result = await api.post("/channel/add/player", player.value);
      router.push('/channel/player/' + result.data.uid);

      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
    console.error(error);
    alert("حدث خطأ أثناء إنشاء القناة");
  }
}

const link = (url) => { 
  if (url.startsWith('https://drive.google.com/')) {
    return 'https://lh3.google.com/u/0/d/' + url.split('/')[5];
  } else {
    return url
  }
};
</script>
