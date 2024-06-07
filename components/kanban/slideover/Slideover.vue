<template>
  <div>
    <USlideover v-model="isLocalOpen">
      <div class="slideover-close" @click="closeSlideover">
        <svg width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z" fill="#fff"></path>
        </svg>
      </div>
      <UCard
          class="flex flex-col flex-1 overflow-y-auto"
          :ui="{
					body: { base: 'flex-1' },
					ring: '',
					divide: 'divide-y divide-border',
				}"
      >
        <template #header>
          <KanbanSlideoverHeader/>
        </template>

        <KanbanSlideoverComments/>
      </UCard>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { useDealSlideStore } from '~/store/deal-slide.store'

const store = useDealSlideStore()

const isLocalOpen = computed({
  get: () => store.isOpen,
  set: value => {
    store.isOpen = value
  },
})

const closeSlideover = () => {
  store.isOpen = false
}

</script>

<style lang="scss" scoped>
.slideover-close {
  display: flex;
  justify-content: flex-end;
  padding: 5px;
  cursor: pointer;
  fill: #fff; // Задайте цвет крестика в зависимости от вашего дизайна
}

.svg {
  fill: #fff; // Задайте цвет крестика в зависимости от вашего дизайна
}
</style>
