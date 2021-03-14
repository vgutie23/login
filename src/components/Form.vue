<!--Vanessa Gutierrez 03/13/2021-->
<template>
  <section class="max-w-2xl mx-auto rounded bg-neutral text-coolGray-100 mt-16">
    <div class="container flex items-center justify-center text-center">
      <form
        @submit.prevent
        class="flex flex-col w-full max-w-lg p-12 rounded shadow-lg text-coolGray-100"
      >
        <label
          v-if="form == 'signup'"
          for="name"
          class="self-start text-xs font-semibold text-content-200"
          >Name</label
        >
        <input
          v-if="form == 'signup'"
          id="name"
          type="text"
          class="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-coolGray-900"
          v-model="name"
        />
        <label
          for="username"
          class="self-start mt-3 text-xs font-semibold text-content-200"
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
        <button
          v-if="form == 'login'"
          @click="login"
          class="btn btn-primary mt-8"
        >
          Login
        </button>
        <button v-else @click="register" class="btn btn-primary mt-8">
          Sign Up
        </button>
        <button @click="google" class="btn btn-warning mt-6">
          <img
            class="w-6"
            src="../assets/googleicon.svg"
            alt="Google Logo
          Image"
          />
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { signIn, signUp, googlePopUp, auth } from '../helpers/useAuth'
import { isError, msg } from '../helpers/useError'

const router = useRouter()
const login = async () => {
  try {
    await signIn(email.value, password.value)
    isError.value = false
    router.push('/')
  } catch (error) {
    isError.value = true
    msg.value = 'There was an Authentication Error'
    console.log(error)
  }
}
const register = async () => {
  try {
    await signUp(email.value, password.value)
    const user = auth().currentUser
    await user.updateProfile({ displayName: name.value })
    isError.value = false
    router.push('/')
  } catch (error) {
    isError.value = true
    msg.value = 'There was an Authentication Error'
    console.log(error)
  }
}
const google = async () => {
  try {
    await googlePopUp()
    isError.value = false
    router.push('/')
  } catch (error) {
    isError.value = true
    msg.value = 'There was an Authentication Error'
    console.log(error)
  }
}
const email = ref('')
const password = ref('')
const name = ref('')

defineProps({
  form: {
    type: String,
    default: 'login',
  },
})
</script>
