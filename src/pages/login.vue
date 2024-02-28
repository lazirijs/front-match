<template>
  <div class="h-full flex flex-col justify-between items-center">
    <div class="w-10/12 grid gap-8 m-auto">
      <h1>الدخول</h1>
      <form @submit.prevent="submitForm" class="py-4">
        <!-- <input-app :value="user" @update="user = $event" icon="fluent:person-24-filled" placeholder="User" type="text" :readonly="loading"/>
        <br> -->
        <input-app :value="password" @update="password = $event" icon="ph:password-bold" type="password" placeholder="password" :readonly="loading"/>
        <h6 class="text-gray-400 text-start mt-2">أدخل كلمة المرور</h6>
        <button @click="login()" class="hidden"/>
      </form>
      <btn-app text="enter" @click="login" icon="basil:login-solid" :loading="loading" dark class="min-w-fit mt-4 mx-auto" />
      <h6 class="w-8/12 m-auto text-gray-400">يجب عليك تسجيل الدخول مرة أخرى في كل مرة تقوم فيها بإعادة تحميل الصفحة</h6>
    </div>
    <h6 class="w-8/12 text-center text-gray-400">webapp created by <a href="https://facebook.com/lazirijs" target="_blank" class="font-bold">Laziri</a></h6>
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
    if (password.value) {
      
      loading.value = true;
      const result = await api.post("/login", { password: password.value });

      if (result.data) {
        store.commit("logged", true);
        router.push('/');
      } else {
        alert("كلمة مرورك غير صحيحة");
      }

      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
    console.error(error);
    alert("حدث خطأ أثناء تسجيل الدخول");
  }
}

</script>
