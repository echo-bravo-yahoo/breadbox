<script setup>
  import { ref } from 'vue'
  import router from '../router'
  const username = ref(undefined)
  const password = ref(undefined)

async function signIn() {
  // TODO: handle errors, this is identical to the function in Register.vue
  fetch(`/api/signin`,
    {
      method: 'POST',
      body: JSON.stringify({ username: username.value, password: password.value }),
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      router.push('/')
    })
}
</script>

<template>
  <input v-model="username" placeholder="Username" />
  <input v-model="password" placeholder="Password" />
  <button @click="signIn()">Sign in</button>
</template>

<style scoped>
</style>
