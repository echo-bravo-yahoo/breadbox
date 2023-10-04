<script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import DOMPurify from 'dompurify'
  const recipes = ref([])
  const api = `${window.location.protocol}//${window.location.hostname}:3000`

  fetch(`${api}/recipes`)
    .then(async (res) => {
      recipes.value = await (res.json())
    })
</script>

<template>
  <li v-for="recipe in recipes">
    <RouterLink :to="`/recipes/${recipe}`"> {{ DOMPurify.sanitize(recipe) }} </RouterLink>
  </li>
</template>

<style scoped>
</style>
