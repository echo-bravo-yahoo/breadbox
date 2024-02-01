<script setup>
  import { ref } from 'vue'
  import router from '../router'
  import { RouterLink } from 'vue-router'
  import DOMPurify from 'dompurify'
  import { call } from '../util/api.js'
  const recipes = ref([])

  call({ url: `/recipes` })
  .then((res) => recipes.value = res )

  async function signOut() {
    return call({ url: `/signout`, method: 'POST' })
  }
</script>

<template>
  <button @click="signOut()">Sign out</button>
  <li v-for="recipe in recipes">
    <RouterLink :to="`/recipes/${recipe}`"> {{ DOMPurify.sanitize(recipe) }} </RouterLink>
  </li>
</template>

<style scoped>
</style>
