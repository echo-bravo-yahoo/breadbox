<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { marked } from 'marked'
  import { makeEndpoint } from '../util/api.js'
  const router = useRouter()
  const routeParams = router.currentRoute.value.params
  const recipe = ref("...")
  const editing = ref(false)

  fetch(makeEndpoint(`/recipes/${routeParams.id}`))
    .then(async (res) => {
      recipe.value = (await (res.json())).markdown
    })

async function saveRecipe() {
  // TODO: error-handling
  fetch(makeEndpoint(`/recipes/${routeParams.id}`),
    {
      method: 'POST',
      body: JSON.stringify({ markdown: recipe.value }),
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
    .then(async () => {
      editing.value = false
    })
}
</script>

<template>
  <button @click="editing = true" v-if="!editing">Edit</button>
  <div v-html="marked.parse(recipe)" />
  <textarea v-if="editing" v-model="recipe"/>
  <button @click="saveRecipe()" v-if="editing">Save</button>
</template>

<style scoped>
</style>
