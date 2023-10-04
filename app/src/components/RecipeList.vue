<script setup>
  import { ref } from 'vue'
  import router from '../router'
  import { RouterLink } from 'vue-router'
  import DOMPurify from 'dompurify'
  const recipes = ref([])

fetch(`/api/recipes`, { credentials: 'include' })
    .then(async (res) => {
      if (res.url.split('/').pop() === 'signin') {
        router.push('/signin')
      }
      recipes.value = await (res.json())
    })

async function signOut() {
  // TODO: error-handling
  fetch(`/api/signout`, {
      method: 'POST',
      body: "",
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
  <button @click="signOut()">Sign out</button>
  <li v-for="recipe in recipes">
    <RouterLink :to="`/recipes/${recipe}`"> {{ DOMPurify.sanitize(recipe) }} </RouterLink>
  </li>
</template>

<style scoped>
</style>
