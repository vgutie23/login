<!--Vanessa Gutierrez 03/13/2021-->
<template>
  <div class="mt-8">
    <p class="text-3xl mx-auto text-center m-16 tracking-wider font-thin">
      Hello {{ user?.displayName || 'New User' }}!
    </p>
    <img
      class="h-40 mx-auto mt-12"
      src="../assets/welcomesign.svg"
      alt="Welcome Sign Image"
    />
  </div>
</template>

<script setup>
import { user } from '../helpers/useAuth'
</script>
