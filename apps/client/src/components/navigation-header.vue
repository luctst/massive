<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const title = ref<string>(useRoute().meta.headerTitle as string || '');
</script>

<template>
  <header class="container">
    <template v-if="$route.name === 'Article'">
      <div class="is__container__img">
        <img
          src="@/assets/Union-black.svg"
          @click="$router.back()"
        >
      </div>
      <div class="is__container__img">
        <img src="@/assets/Setting-black.svg">
      </div>
    </template>
    <template v-else>
      <h1>{{ $t(title) }}</h1>
      <div class="is__container__img">
        <img src="@/assets/icon_filter.svg">
      </div>
    </template>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;

  h1 {
    font-size: 30px;
    font-weight: 900;
    color: #000000;
    margin: 0;
  }

  .is__container__img {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
