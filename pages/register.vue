<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar p-5">
      <h1 class="text-2x1 font=bold text-center mb-5">Register</h1>
      <form>
        <UiInput v-model="email" placeholder="Email" type="email" class="mb-3"/>
        <UiInput v-model="password" placeholder="Password" type="password" class="mb-3"/>
        <UiInput v-model="name" placeholder="Name" type="text" class="mb-3"/>
        <div class="flex flex-col items-center justify-center gap-5">
          <UiButton @click="register()" type="button">Регистрация</UiButton>
          <UiButton @click="goTologin()" type="button">Уже есть аккаунт</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuid } from 'uuid'

useSeoMeta({
  title: "Register | CRM system"
})

const email = ref();
const password = ref();
const name = ref();

const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

const register = async () => {
  isLoadingStore.set(true)
  await account.create(uuid(), email.value, password.value)
  await login()
  isLoadingStore.set(false)
}

const login = async () => {
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
  name.value = '';

  await router.push('/')
}

const goTologin = () => {
  router.push('/login')
}
</script>

<style lang="scss" scoped>
</style>
