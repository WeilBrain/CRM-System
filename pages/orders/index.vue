<template>
  <main class="p-10 mt-5">
    <h1 class="font-bold text-2xl mb-10 order__title">Завершенные сделки</h1>
    <div v-if="isLoading">Loading...</div>
    <UiTable v-else>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="max-w-[300px]">Название</UiTableHead>
          <UiTableHead class="max-w-[200px]">Цена</UiTableHead>
          <UiTableHead>Status</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow v-for="order in (orders?.documents)" :key="order.$id">
          <UiTableCell class="font-medium order__name">{{ order.name }}</UiTableCell>
          <UiTableCell class="order__price">{{ order.price }}</UiTableCell>
          <UiTableCell class="order__status">{{ order.status }}</UiTableCell>
          <UiTableCell>
            <UiButton class="button" @click="handleReturnDeal(order.$id)">Возобновить</UiButton>
          </UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </main>
</template>

<script setup lang="ts">
import {useMutation, useQuery} from '@tanstack/vue-query'
import {COLLECTION_CUSTOMERS, COLLECTION_DEALS, DB_ID} from '~/app.constants'
import {EnumStatus} from '~/types/deals.types'
import {useKanbanQuery} from "~/components/kanban/useKanbanQuery";

const {data, refetch} = useKanbanQuery()

useSeoMeta({
  title: 'Orders | CRM System',
})

const { data: orders, isLoading } = useQuery({
  queryKey: ['orders'],
  queryFn: async () => {
    const allOrders = await DB.listDocuments(DB_ID, COLLECTION_DEALS)
    const completeOrders = allOrders.documents.filter((order: any) => {
      return order.status === 'complete';
    });
    return { documents: completeOrders }
  },
})


type TypeMutationVariables = {
  docId: string
  status?: EnumStatus
}
const { mutate } = useMutation({
  mutationKey: ['move card'],
  mutationFn: ({ docId, status }: TypeMutationVariables) =>
      DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
        status,
      }),
  onSuccess: () => {
    refetch()
  },
})
const handleReturnDeal = async (id: string) => {
  await mutate({docId: id, status: EnumStatus.todo})
  refetch()
}

</script>

<style lang="scss" scoped>
.order {
  &__name, &__price, &__status {
    font-size: min(18px, 14px);
  }
  &__title{
    font-size: min(32px, 50%);
  }
}
.button{
  font-size: min(22px, 16px);
}
</style>
