<script setup>
  import { ref } from 'vue'
  import { call } from '../util/api.js'
  const username = ref(undefined)
  const password = ref(undefined)

async function register() {
  // TODO: handle errors, this is identical to the function in SignIn.vue
  call({
    url: `/users`,
    method: 'POST',
    body: { username: username.value, password: password.value },
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
