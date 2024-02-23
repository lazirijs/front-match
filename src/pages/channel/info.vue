<template>
  <div class="grid gap-20 py-6">
    <div class="flex-between font-bold">
      <div class="space-y-2">
        <h1>Channel info</h1>
        <h6 class="text-gray-400 text-start">ID : 1628</h6>
      </div>
      <icon-app @click="" icon="fa-solid:link" class="w-9 cursor-pointer" />
    </div>
    
    <div class="grid gap-8">
      <input-app :value="channel.name" icon="ic:round-tv" :readonly="true" />
      <input-app :value="channel.category" icon="tabler:category-2" :readonly="true" />
      <div v-for="(resposible, index) in channel.resposible" :key="index" class="space-y-2">
        <input-app :value="resposible.name" icon="fluent:person-24-filled" :readonly="true" />
        <h6 class="text-gray-400 text-start px-2 uppercase font-medium">CODE : {{ resposible.code }}</h6>
      </div>
        <div class="grid grid-cols-4 gap-4">
          <div class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.ar }">Ar</div>
          <div class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.amz }">Amz</div>
          <div class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.en }">En</div>
          <div class="w-full h-12 border-2 border-solid border-gray-300 text-gray-500 rounded-v flex-center smooth" :class="{ 'bg-gray-200 text-gray-700' : channel.languages.fr }">Fr</div>
        </div>
    </div>

    <div class="space-y-4">
      <btn-app text="team" @click="$router.push('/channel/team/:id')" icon="fluent:people-team-16-filled" class="min-w-fit mt-4 mx-auto" />
      <h6 class="text-gray-400 first-letter:lowercase">
        Channel created At : 2024-02-21 <br>
        Last Team Update At : 2024-02-21 08:19 PM <br>
        <br>
        <a @click="login()" class="link">click here</a> to edite team
      </h6>
    </div>
  </div>
</template>

<script setup>
const channel = {
  name: 'AL 24 News',
  category: 'News',
  resposible: [
    {
      name: 'Laziri amar',
      code: 'asl-129'
    }
  ],
  languages: {
    ar: true,
    amz: false,
    en: false,
    fr: false
  }
};

const login = () => {
  const code = prompt('Enter the password : ');
  console.log(code);
};
</script>