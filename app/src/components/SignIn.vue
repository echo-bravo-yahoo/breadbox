<script setup>
  import { ref } from 'vue'
  import router from '../router'
  import { call } from '../util/api.js'
  const username = ref(undefined)
  const password = ref(undefined)

  async function signIn() {
    call({ url: `/signin`, method: 'POST', body: { username: username.value, password: password.value } })
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
