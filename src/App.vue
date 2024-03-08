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
})()

// Send a request to the server to set a cookie
function setCookie() {
  fetch('https://back-match.onrender.com/set-cookie', {
    method: 'GET',
    credentials: 'include' // Include cookies in the request
  })
  .then(response => {
    console.log(response);
    if (response.ok) {
      console.log('Cookie set successfully');
    } else {
      console.error('Failed to set cookie');
    }
  })
  .catch(error => {
    console.error('Error setting cookie:', error);
  });
}

// Get the cookie value
function getCookie(name) {
  const cookieArr = document.cookie.split(';');

  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].trim().split('=');
    if (cookiePair[0] === name) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  return null;
}

const code = prompt();
if ( code == 'set' ) {
  // Example usage
  setCookie();
} else if  ( code == 'get' ) {
  const jwtCookie = getCookie('jwt');
  console.log('JWT Cookie:', jwtCookie);
}
</script>
