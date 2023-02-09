<script setup lang="ts">
import { Media } from '@/types/index';
import utils from '@/utils/index';

const props = defineProps<{
  media: Media;
}>();
</script>

<template>
  <div class="card">
    <div class="card--preview is__container__img">
      <img :src="props.media.preview">
      <span>{{ utils.formatTime(props.media.length) }}</span>
    </div>
    <div class="card--infos">
      <p>{{ props.media?.author }}</p>
      <p>{{ props.media?.title }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: #FFF;
  box-shadow: 0px 8px 24px rgb(156 163 175 / 20%);
  border-radius: 10px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  
  &--preview {
    position: relative;

    span {
      position: absolute;
      right: 7px;
      bottom: 11px;
      color: #FFF;
      background: rgba(0, 0, 0, 0.4);
      font-size: 10px;
      font-weight: 500;
      padding: 1px 3px;
      letter-spacing: -0.02em;
    }
  }

  &--infos {
    padding: 10px;
  
    p {
      margin: 0;
    }

    p:first-child {
      color: #9CA3AF;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: -0.02em;
      opacity: 0.88;
    }

    p:last-child {
      font-weight: 700;
      font-size: 15px;
      letter-spacing: -0.02em;
      color: #1F2E45;
      margin-top: 2px;
    }
  }
}
</style>
