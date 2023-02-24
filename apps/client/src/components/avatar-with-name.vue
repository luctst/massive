<script setup lang="ts">
import { computed } from 'vue';
import { UserStore } from '@/types/index';

const props = defineProps<{
  userData: UserStore;
}>();

const fullname = computed(() => `${props.userData.firstname} ${props.userData.lastname}`);
</script>

<template>
  <div class="avatar">
    <div class="avatar--picture is__container__img">
      <img :src="props.userData.avatar || ''">
    </div>
    <p class="avatar--username">
      {{ fullname }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  width: 90px;

  &--picture {
    height: 80px;
    width: 80px;
  }

  &--username {
    color: #14172D;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    line-height: 14px;
    letter-spacing: -0.02em;
  }
}
</style>
