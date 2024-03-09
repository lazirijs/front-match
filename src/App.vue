<template>
  <div v-if="!payed" class="flex-center h-full text-center">
    SERVER OFF <br> SERVICE NOT PAYED
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
})()

// Send a request to the server to set a cookie
const setCookie = async () => {
  const response = await api.get('/set-cookie');
  console.log(response);
}

// Get the cookie value
const getCookie = async () => {
  const response = await api.get('/read-cookie');
  console.log(response);
}

const code = null//prompt();
if ( code == 'set' ) {
  // Example usage
  setCookie();
} else if  ( code == 'get' ) {
  getCookie();
}
</script>
