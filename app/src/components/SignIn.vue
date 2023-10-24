<script setup>
  import { ref } from 'vue'
  import router from '../router'
  import { makeEndpoint } from '../util/api.js'
  const username = ref(undefined)
  const password = ref(undefined)

async function signIn() {
  // TODO: handle errors, this is identical to the function in Register.vue
  fetch(makeEndpoint(`/signin`),
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

function register() {
  router.push('/register')
}
</script>

<template>
  <input v-model="username" placeholder="Username" />
  <input v-model="password" placeholder="Password" />
  <button @click="signIn()">Sign in</button>
  <button @click="register()">Register</button>
</template>

<style scoped>
</style>
