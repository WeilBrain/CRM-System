<template>
      <UiInput
        placeholder="Write to comment"
        v-model="comment"
        @keyup.enter="writeComment"
      />
    <UiSkeleton v-if="isLoading" class='w-full h-[76px] rounded mt-5'/>
    <div v-else-if="card">
      <div v-for="comment in card?.comments" :key="comment.$id" class="flex items-start mt-5">
        <icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="25px" />
        <div class="border-border bg-black/20 rounded p-3 w-full">
          Comment - {{ dayjs(comment.$createdAt).format('HH:mm') }}
        <p>{{comment.text}}</p>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">

import {useDealSlideStore} from "~/store/deal-slide.store";
import {useComments} from "~/components/kanban/slideover/useComments";
import {useCreateComment} from "~/components/kanban/slideover/useCreateComment";
import type {IDeal} from "~/types/deals.types";
import dayjs from "dayjs";

const store = useDealSlideStore()

const { data, refetch, isLoading } = useComments()
const { comment, writeComment } = useCreateComment({refetch})

const card = data as unknown as IDeal


</script>

<style lang="scss" scoped>

</style>
