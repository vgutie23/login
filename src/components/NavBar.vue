<!--Vanessa Gutierrez 03/14/2021-->
<template>
  <Alert v-if="isError" />
  <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
    <div class="flex-1 px-2 mx-2">
      <span class="text-lg font-bold"> Login Example </span>
    </div>
    <div class="flex-none flex px-2 mx-2">
      <div class="flex">
        <router-link to="/" class="btn btn-ghost btn-sm rounded-btn">
          Home
        </router-link>
        <div v-if="!isAuthenticated">
          <router-link to="/login" class="btn btn-ghost btn-sm rounded-btn">
            Login
          </router-link>
          <router-link to="/signup" class="btn btn-ghost btn-sm rounded-btn">
            Sign Up
          </router-link>
        </div>
        <div v-else>
          <router-link to="/secret" class="btn btn-ghost btn-sm rounded-btn">
            Secret Page
          </router-link>
          <button class="btn btn-error btn-sm rounded-btn" @click="logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { isAuthenticated, signOut } from '../helpers/useAuth.js'
import { isError } from '../helpers/useError'

const router = useRouter()
const logout = async () => {
  await signOut()
  router.push('/')
}
</script>
