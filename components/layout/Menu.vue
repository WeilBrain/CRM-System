<template>
  <div>
    <NuxtLink class="flex items-center py-1 px-3 rounded-lg w-full hover:bg-gray-700 hover:shadow transition-all mb-2.5"
      v-for="item in MENU_DATA" :to=item.url :key="item.url">
      <Icon :name=item.icon class="mr-3" />
      <span> {{ item.name }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import {MENU_DATA} from "./menu.data";
</script>

<style lang="scss" scoped>

</style>
