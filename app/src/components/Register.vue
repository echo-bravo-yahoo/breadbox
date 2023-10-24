<script setup>
  import { ref } from 'vue'
  import router from '../router'
  import { makeEndpoint } from '../util/api.js'
  const username = ref(undefined)
  const password = ref(undefined)

async function register() {
  // TODO: handle errors, this is identical to the function in SignIn.vue
  fetch(makeEndpoint(`/users`),
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
  <button @click="register()">Register</button>
</template>

<style scoped>
</style>
