<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { marked } from 'marked'
  import { call } from '../util/api.js'
  const router = useRouter()
  const routeParams = router.currentRoute.value.params
  const recipe = ref("...")
  const editing = ref(false)

  call({ url: `/recipes/${routeParams.id}` })
  .then((res) => recipe.value = res.markdown)

  async function saveRecipe() {
    call({
      url: `/recipes/${routeParams.id}`,
      method: 'POST',
      body: { markdown: recipe.value }
    })
    .then(() => editing.value = false)
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
