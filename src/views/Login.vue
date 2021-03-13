<!--Vanessa Gutierrez 03/12/2021-->
<template>
  <section class="max-w-2xl mx-auto rounded bg-neutral text-coolGray-100 mt-16">
    <div class="container flex items-center justify-center text-center">
      <form
        @submit.prevent
        class="flex flex-col w-full max-w-lg p-12 rounded shadow-lg text-coolGray-100"
      >
        <label
          for="username"
          class="self-start text-xs font-semibold text-content-200"
          >Email</label
        >
        <input
          id="username"
          type="text"
          class="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-coolGray-900"
          v-model="email"
        />
        <label
          for="password"
          class="self-start mt-3 text-xs font-semibold text-content-200"
          >Password</label
        >
        <input
          id="password"
          type="password"
          class="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-coolGray-900"
          v-model="password"
        />
        <button @click="login" class="btn btn-primary mt-4">Login</button>
        <button @click="register" class="btn btn-accent mt-4">Register</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signIn, signUp } from '../helpers/useAuth'
const router = useRouter()
const login = async () => {
  try {
    await signIn(email.value, password.value)
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
const register = async () => {
  try {
    await signUp(email.value, password.value)
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
const email = ref('')
const password = ref('')
</script>
