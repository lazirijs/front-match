<template>
  <div class="w-10/12 grid gap-8 m-auto">
    <h1>Login</h1>
    <form @submit.prevent="submitForm" class="py-4">
      <!-- <input-app :value="user" @update="user = $event" icon="fluent:person-24-filled" placeholder="User" type="text" :readonly="loading"/>
      <br> -->
      <input-app :value="password" @update="password = $event" icon="ph:password-bold" type="password" placeholder="password" :readonly="loading"/>
      <h6 class="text-gray-400 text-start mt-2">enter your password here</h6>
      <btn-app @click="login" class="hidden" />
    </form>
    <btn-app text="enter" @click="login" icon="basil:login-solid" :loading="loading" dark class="min-w-fit mt-4 mx-auto" />
    <h6 class="w-8/12 m-auto text-gray-400">you have to login again each time you reload the page</h6>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from '@/plugins/axios.js';
import store from '@/store';
import router from '@/router';

// const user = ref('');
const password = ref('');
const loading = ref(false);

// const login = () => alert(user.value && password.value ? `${user.value} is try to login to his account using his password : ${password.value}` : "Login");

const login = async () => {
  try {
    if (
      //user.value && 
      password.value) {
      loading.value = true;
      await api.post("/user/enter", password.vue
      // { user: user.value, password: password.value }
      );
      store.commit("logged", true);
      router.push('/channels');
    }
  } catch (error) {
    loading.value = false;
    console.log(error);
    alert(error.message);
  }
}
</script>