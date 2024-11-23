<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
    <button :onclick="fetchUser">Fetch User</button>
    <button :onclick="updateUserName"> Update User Name </button>

    <p v-text="user"></p>
    <p v-text="name"></p>
  </div>
</template>

<script setup lang="ts">


import { ref } from 'vue';
import trpc from '../trpcClient';
import { userNameType } from '../../../proj.server/src/Models/zodTypes';

// Types are inferred from Zod; Hover constant name to view.
let user = ref();
let name = ref();

async function fetchUser(id: string) {
  try {
    // more typing from zod
    const result: userNameType = await trpc.userById.query(id);
    name.value = result?.name;
  } catch (e) {
    console.log(e);
  }
}

async function updateUserName() {
  await trpc.userCreate.mutate({
    name: name.value,
    id: '1'
  })
  fetchUser('1');
}

defineProps<{
  msg: string
}>()
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
