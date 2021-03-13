<!--Vanessa Gutierrez 03/12/2021-->
<template>
  <div class="mt-8">
    <p class="text-3xl mx-auto text-center m-16 tracking-wider font-thin">
      Welcome {{ user?.email || 'New User' }}
    </p>
    <h1 class="text-2xl font-bold pt-5 text-center text-cyan-800">Home Page</h1>
  </div>
</template>

<script setup>
import { user } from '../helpers/useAuth'
</script>
