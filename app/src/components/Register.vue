<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const routeParams = router.currentRoute.value.params
  const username = ref(undefined)
  const password = ref(undefined)
  const api = `${window.location.protocol}//${window.location.hostname}:3000`

  fetch(`${api}/recipes/${routeParams.id}`)
    .then(async (res) => {
      recipe.value = (await (res.json())).markdown
    })

async function register() {
  fetch(`${api}/users/${}`,
    {
      method: 'POST',
      body: JSON.stringify({ markdown: recipe.value }),
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(async (res) => {
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
