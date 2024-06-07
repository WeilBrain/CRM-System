<template>
  <div class="order__wrapper">
    <Icon :name="iconName" :color="iconColor" :size="iconSize" />
    <div class="order__content">
      <span class="order__description">{{ description }}</span>
      <span class="order__count">{{ count }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  iconName: String,
  iconColor: String,
  iconSize: String,
  description: String,
  count: Number,
});
</script>

<style scoped lang="scss">
.order__wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 105px;
  border-radius: 8px;
  background: var(--Secondary-Primary-White, #FFF);
  box-shadow: 0 18px 32px 0 rgba(208, 210, 218, 0.15);
  justify-content: center;
}

.order__content {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}

.order__description {
  color: #656565;
  font-size: min(16px, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.order__count {
  color: #5d5d5d;
  font-size: min(36px, 24px);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.72px;
}

@media (max-width: 480px) {
  .order__wrapper {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }

  .order__content {
    padding-left: 0;
    align-items: center;
  }

  .order__description {
    font-size: 14px;
  }

  .order__count {
    font-size: 24px;
  }
}
</style>
