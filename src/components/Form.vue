<!--Vanessa Gutierrez 03/14/2021-->
<template>
  <section
    class="container flex items-center justify-center text-center max-w-2xl mx-auto rounded bg-neutral text-coolGray-100 mt-16"
  >
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
      <p class="capitalize text-sm text-red-600 text-left">
        {{ nameError }}
      </p>
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
      <p class="capitalize text-sm text-red-600 text-left">
        {{ errorEmail }}
      </p>
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
      <p class="capitalize text-sm text-red-600 text-left">
        {{ passwordError }}
      </p>
      <label
        v-if="form == 'signup'"
        for="passwordConfirmation"
        class="self-start mt-3 text-xs font-semibold text-content-200"
        >Confirm Password</label
      >
      <input
        v-if="form == 'signup'"
        id="passwordConfirmation"
        type="password"
        class="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-coolGray-900"
        v-model="passwordConfirmation"
      />
      <p class="capitalize text-sm text-red-600 text-left">
        {{ passwordConfirmationError }}
      </p>
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
  </section>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import * as yup from 'yup'

import { signIn, signUp, googlePopUp, auth } from '../helpers/useAuth'
import { isError, msg } from '../helpers/useError'

const router = useRouter()
const login = async () => {
  try {
    if (emailMeta.valid && passwordMeta.valid) {
      await signIn(email.value, password.value)
      isError.value = false
      router.push('/')
    } else {
      isError.value = true
      msg.value = 'Invalid Input Values'
    }
  } catch (error) {
    isError.value = true
    msg.value = 'Authentication Error'
    console.log(error)
  }
}
const register = async () => {
  try {
    if (
      nameMeta.valid &&
      emailMeta.valid &&
      passwordMeta.valid &&
      passwordConfirmationMeta.valid
    ) {
      await signUp(email.value, password.value)
      const user = auth().currentUser
      await user.updateProfile({ displayName: name.value })
      isError.value = false
      router.push('/')
    } else {
      isError.value = true
      msg.value = 'Invalid Input Values'
    }
  } catch (error) {
    isError.value = true
    msg.value = 'Authentication Error'
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
    msg.value = 'Authentication Error'
    console.log(error)
  }
}

const { value: email, errorMessage: errorEmail, meta: emailMeta } = useField(
  'email',
  yup.string().required().email(),
)

const {
  value: password,
  errorMessage: passwordError,
  meta: passwordMeta,
} = useField('password', yup.string().required().min(8))

const passwordConfirmationFn = () => {
  if (password.value === passwordConfirmation.value) {
    return true
  }
  return 'Passwords Do Not Match'
}

const {
  value: passwordConfirmation,
  errorMessage: passwordConfirmationError,
  meta: passwordConfirmationMeta,
} = useField('passwordConfirmation', passwordConfirmationFn)

const { value: name, errorMessage: nameError, meta: nameMeta } = useField(
  'name',
  yup.string().required(),
)

defineProps({
  form: {
    type: String,
    default: 'login',
  },
})
</script>
