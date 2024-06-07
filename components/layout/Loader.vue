<template>
  <div class="wrapper">
    <NuxtImg src="/loader.svg" alt="loader" />
  </div>
</template>

<script setup>
console.log(process.env.NUXT_PROD_ID)
</script>

<style lang="scss" scoped>
.wrapper {
  @apply bg-sidebar flex items-center justify-center w-screen h-screen;
}
</style>
