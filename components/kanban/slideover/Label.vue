<template>
  <div class="mb-3">
    <label v-if="labelText" class="opacity-75 mb-0 block text-xs">{{ labelText }}</label>
  </div>
  <div class="text-base">
    <slot/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  labelText: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>

</style>
