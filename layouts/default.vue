<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <section v-else :class="{grid: store.isAuth}" style="min-height: 100vh">
    <LayoutSidebar v-if="store.isAuth" />
    <div>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import {account} from '@/utils/appwrite'
import {useAuthStore, useIsLoadingStore} from "~/store/auth.store";

const isLoadingStore = useIsLoadingStore()
const store = useAuthStore()
const router = useRouter()

onMounted(async () => {
  try {
    const user = await account.get()
    if(user) {
      store.set(user)
    }
  }
  catch (error){
    await router.push('/login')
  }
  finally {
    isLoadingStore.set(false)
  }
})
</script>

<style lang="scss" scoped>
  .grid{
    display: grid;
    grid-template-columns: 1fr 6fr;
  }
  @media (max-width: 980px){
    .grid{
      grid-template-columns: 1fr;
    }
  }
</style>