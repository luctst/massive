<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
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
      <template v-if="$route.name === 'Home'">
        <div class="nav--metadata">
          <div class="is__container__img">
            <img
              src="@/assets/notification.svg"
              alt="notification"
            >
          </div>
          <div class="is__container__img">
            <img :src="userStore.avatar || ''">
          </div>
        </div>
      </template>
      <template v-else>
        <div class="is__container__img">
          <img src="@/assets/icon_filter.svg">
        </div>
      </template>
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

  .nav--metadata {
    display: flex;
    align-items: center;

    div:last-child {
      margin-left: 1rem;
      width: 27px;
    }
  }
}
</style>
