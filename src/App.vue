<template>
  <div v-if="!payed" class="flex-center h-full">
    نهار تخلصنا فعرقنا نرجعولك السيت
  </div>
  <router-view v-else dir="rtl" class="md:w-6/12 mx-auto" />
</template>

<script setup>
import { ref } from 'vue'
import { api } from "@/plugins/axios";

const payed = ref(true);

(async () => {
  const result = await api.get('/payed');
  payed.value = result.data;
  const loginJWT = await api.get('/loginJWT');
  console.log(loginJWT);
  const protectedT = await api.get('/protected');
  console.log(protectedT);
})()
</script>
