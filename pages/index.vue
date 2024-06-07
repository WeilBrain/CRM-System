<template>
  <section class="p-10 crm">
    <h1 class="font-bold text-2x1 mb-10 crm__title">CRM system</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16 crm__wrapper">
        <div v-for="(column, index) in data" :key="column.id" @dragover="handleDragOver" @drop="() => handleDrop(column)">
          <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center" :style="generateColumnStyle(<number>index, data?.length)">
            {{ column.name }}
          </div>
          <KanbanCreateDeal :refetch="refetch" :status="column.id"/>
          <UiCard @contextmenu.prevent="onContextMenu" v-for="card in column.items" :key="card.$id" class="mb-3 UiCard" draggable="true" @dragstart="() => handleDragStart(card, column)">
            <div class="card__move" @click="OpenMoveWidnow" :class="{ 'active': MoveWindow === true }">
              <div class="card__move-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="16px">
                  <path fill-rule="evenodd"  fill="rgb(255, 255, 255)" d="M-0.000,-0.000 L17.000,-0.000 L17.000,2.000 L-0.000,2.000 L-0.000,-0.000 Z"/>
                  <path fill-rule="evenodd"  fill="rgb(255, 255, 255)" d="M-0.000,7.000 L17.000,7.000 L17.000,9.000 L-0.000,9.000 L-0.000,7.000 Z"/>
                  <path fill-rule="evenodd"  fill="rgb(255, 255, 255)" d="M-0.000,14.000 L17.000,14.000 L17.000,16.000 L-0.000,16.000 L-0.000,14.000 Z"/>
                </svg>
              </div>
              <div v-if="MoveWindow === true" class="card__move-dropdown">
                <nav class="card__move-dropdown--wrapper">
                  <button v-if="MoveWindow" v-for="(col, index) in data.filter(c => c.id !== column.id)" :key="col.id" class="card__move-btn" @click="moveCardToColumn(col, card)">
                    {{ col.name }}
                  </button>
                </nav>
              </div>
            </div>
            <UiCardHeader role="button" @click="store.set(card)">
              <UiCardTitle class="card__title">{{ card.name }}</UiCardTitle>
              <UiCardDescription class="card__description mt-2 block">{{convertCurrency(card.price)}}</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="text-xs">
              <div class="card__company">Company:</div>
              <span class="card__company">{{card.companyName}}</span>
            </UiCardContent>
            <UiCardFooter>{{ dayjs(card.$createdAt).format('DD MMM YYYY') }}</UiCardFooter>
            <UContextMenu class="pc" v-model="isOpen" :virtual-element="virtualElement">
                <div class="p-4">
                  <button class="btn-complete" @click="completeDeal(card.id)">Завершить сделку</button>
                </div>
            </UContextMenu>
            <div class="mobile">
              <div class="p-4 mobile__complete">
                <button class="btn-complete btn-complete-mobile" @click="completeDeal(card.id)">Завершить сделку</button>
              </div>
            </div>
          </UiCard>
        </div>
      </div>
      <KanbanSlideover/>
    </div>
  </section>

</template>

<script setup lang="ts">
import type {ICard, IColumn} from "~/components/kanban/kanban.types";
import {useKanbanQuery} from "~/components/kanban/useKanbanQuery";
import dayjs from "dayjs";
import {useMutation} from "@tanstack/vue-query";
import {EnumStatus} from "~/types/deals.types";
import {COLLECTION_DEALS, DB_ID} from "~/app.constants";
import {generateColumnStyle} from "~/components/kanban/generate.gradients";
import {useDealSlideStore} from "~/store/deal-slide.store";
import {useMouse, useWindowScroll} from "@vueuse/core";
import {Button} from "~/components/ui/button";

useSeoMeta({
  title: 'Home | CRM system'
})

const dragCard = ref<ICard | null>()
const sourceColumn = ref<IColumn | null>()
const {data, isLoading, refetch} = useKanbanQuery()
const store = useDealSlideStore()

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
const completeDeal = async (docId: string) => {
  await mutate({ docId, status: EnumStatus.complete })
  await refetch()
}

function handleDragStart(card: ICard, column: IColumn) {
  dragCard.value = card
  sourceColumn.value = column
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDrop(targetColumn: IColumn) {
  if (dragCard.value && sourceColumn.value) {
    mutate({ docId: dragCard.value.id, status: targetColumn.id })
  }
}

const { x, y } = useMouse()
const { y: windowY } = useWindowScroll()

const isOpen = ref(false)
const virtualElement = ref({ getBoundingClientRect: () => ({}) })

function onContextMenu () {
  const top = unref(y) - unref(windowY)
  const left = unref(x)

  virtualElement.value.getBoundingClientRect = () => ({
    width: 0,
    height: 0,
    top,
    left
  })

  isOpen.value = true
}

let MoveWindow = ref(false);

function OpenMoveWidnow() {
  MoveWindow.value = !MoveWindow.value;
}

function moveCardToColumn(col: IColumn, card: ICard) {
  mutate({ docId: card.id, status: col.id })
  refetch();
}

</script>

<style lang="scss" scoped>
.btn-complete{
  font-size: max(22px, 14px);
}
.for-mobile, .mobile__complete{
  display: none;
}
.pc{
  display: block;
}
.card__move{
  display: none;
}
@media (max-width: 980px) {
  .card__move{
    display: block;
  }
  .crm{
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
  }
  .crm__wrapper{
    grid-template-columns: 1fr;
  }
  .crm__title{
    text-align: center;
  }
  .pc{
    display: none;
  }
  .mobile__complete{
    display: block;
  }
  .card__title{
    font-size: min(24px, 18px);
  }
  .card__description{
    font-size: min(20px, 16px);
  }
  .card__company{
    font-size: min(22px, 14px);
  }
  .btn-complete-mobile {
    font-size: max(15px, 12px);
    padding: 8px 12px;
    background-color: #ffffff; /* Белый фон */
    color: #000000; /* Черный текст */
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s; /* Плавный переход */

    &:hover {
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* Улучшенный box-shadow при наведении */
      background-color: #2b3856; /* Темно-синий цвет фона при наведении */
      color: #ffffff; /* Белый текст при наведении */
    }
  }
  .UiCard{
    z-index: 0;
    position: relative;
    cursor: default;
  }



  .card__move {
    position: relative;
    cursor: pointer;

    .card__move-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      position: absolute;
      padding: 15px;
      top: 0;
      right: 0;
    }

    .card__move-dote {
      width: 8px;
      height: 8px;
      background-color: #fff;
      border-radius: 50%;
      margin-bottom: 4px;
    }

    .card__move-dropdown {
      display: none;

      .card__move-dropdown--wrapper {
        background-color: #1a1a1a;
        border-radius: 8px;
        padding: 10px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

        .card__move-btn {
          display: block;
          width: 100%;
          padding: 8px;
          border: none;
          background-color: transparent;
          color: #fff;
          text-align: left;
          transition: background-color 0.3s, color 0.3s;

          &:hover {
            background-color: #2b3856;
            color: #fff;
          }
        }
      }
    }

    &:hover .card__move-dropdown {
      display: block;
    }
  }

  .card__move.active .card__move-dropdown {
    display: block;
  }
  path{
    transition: transform 0.25s;
  }
  .active path:nth-of-type(1){
    transform: rotate(45deg);
    transform-origin: -1px 3px;
  }
  .active path:nth-of-type(2){
    display: none;
  }
  .active path:nth-of-type(3){
    transform: rotate(-45deg);
    transform-origin: 0px 13px;
  }

}
</style>