<script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import DOMPurify from 'dompurify'
  const recipes = ref([])

fetch(`/api/recipes`, { credentials: 'include' })
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
