<template>
  <aside class="pc px-5 py-8 bg-sidebar h-full relative w-full">
    <NuxtLink to="/" class="mb-10 block">
      <NuxtImg src="/logo.svg" alt="icon" width="140px" class="mx-auto" style="z-index: 999999999"/>
    </NuxtLink>
    <Button class="absolute top-2 right-3 transition-colors hover:text-primary" @click='logout'>
      <Icon name="line-md:logout" size="20px"/>
    </Button>
    <LayoutMenu />
  </aside>

  <header class="z-10 mobile fixed top-0 left-0 flex flex-col bg-blue-950 h-full w-64 space-y-5 py-7 px-6 transform -translate-x-full overflow-y-auto transition-transform duration-200 ease-in-out"
          :class="{ 'translate-x-0': isOpen }">
    <button @click="isOpen = false" class="fixed top-2 left-3">
      <Icon name="line-md:close" size="28px"/>
    </button>
    <LayoutMenu />
  </header>
  <div class="test mobile fixed top-0">
    <button class="fixed top-2 left-3 z-0" @click="isOpen = true">
      <Icon name="line-md:menu" size="28px"/>
    </button>
    <NuxtLink class="mr-4 mt-4" to="/">
      <NuxtImg src="/logo.svg" alt="icon" width="80px" class="mx-auto"/>
    </NuxtLink>
  </div>

</template>

<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";

const store = useAuthStore();
const isLoadingStore = useIsLoadingStore();
const router = useRouter()
const logout = async() => {
  isLoadingStore.set(true)
  await account.deleteSession('current')
  store.clear
  await router.push('/login')
  isLoadingStore.set(false)
}

let isOpen = ref(false);
</script>

<style lang="scss" scoped>
  .pc{
    display: block;
  }
  .mobile{
    display: none !important;
  }
  @media (max-width: 980px) {
    .pc{
      display: none;
    }
    .mobile{
      display: flex !important;
    }
  }
  .test{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100%;
  }
</style>
