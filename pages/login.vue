<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar p-5">
      <h1 class="text-2x1 font=bold text-center mb-5">Login</h1>

      <form>
        <UiInput v-model="email" placeholder="Email" type="email" class="mb-3"/>
        <UiInput v-model="password" placeholder="Password" type="password" class="mb-3"/>
        <div class="flex flex-col items-center justify-center gap-5">
          <UiButton @click="login()" type="button">Войти</UiButton>
          <UiButton @click="goToRegister()" type="button">Нету аккаунта</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Login | CRM system"
})

const email = ref();
const password = ref();

const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
  isLoadingStore.set(true)
  await account.createEmailSession(email.value, password.value)
  const response = await account.get()

  if (response) {
    authStore.set({
      email: response.email,
      name: response.name,
      status: response.status,
    })
  }

  email.value = '';
  password.value = '';

  await router.push('/')
  isLoadingStore.set(false)
}

const goToRegister = () => {
  router.push('/register')
}
</script>

