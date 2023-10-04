import { createRouter, createWebHistory } from 'vue-router'
import RecipeList from '../components/RecipeList.vue'
import Recipe from '../components/Recipe.vue'
import Register from '../components/Register.vue'
import SignIn from '../components/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RecipeList
    },
    {
      path: '/recipes/:id',
      name: 'recipe',
      component: Recipe
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    }
  ]
})

export default router
