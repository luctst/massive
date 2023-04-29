<script setup lang="ts">
import { ref, computed } from 'vue';
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
          <div
            v-if="userStore.user?.avatar_url"
            class="is__container__img"
          >
            <router-link :to="{ name: 'User', params: { id: userStore.user.id } }">
              <img :src="userStore.user.avatar_url || ''">
            </router-link>
          </div>
          <div
            v-else
            class="fake--avatar"
          >
            <router-link :to="{ name: 'User', params: { id: userStore.user?.id } }">
              <span>{{ userStore.getUserInitialsLetters }}</span>
            </router-link>
          </div>
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

      &:hover {
        cursor: pointer;
      }
    }

    .fake--avatar {
      align-items: center;
      display: flex;
      justify-content: center;
      background: rgb(123, 121, 255);
      border-radius: 50%;
      width: 26px;
      height: 26px;

      a {
        display: flex;
        text-decoration: none;

        span {
          font-weight: 600;
          font-size: 0.6875rem;
          color: rgb(255, 255, 255);
          text-transform: uppercase;
        }
      }
    }
  }
}
</style>
