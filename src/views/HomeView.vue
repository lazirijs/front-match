<template>
  <div class="grid gap-4 ">
    <img alt="Vue logo" class="mx-auto" src="../assets/logo.png">
    <hello-world msg="Welcome to Your Vue.js App"/>
    click here to <router-link to="/about" class="font-bold">Login</router-link>
  </div>
</template>

<script setup>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
</script>
