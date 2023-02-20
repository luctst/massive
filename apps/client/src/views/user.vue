<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { UserStore } from '@/types/index';
import PP from '@/assets/profil-pic1.svg';
import BG from '@/assets/Rectangle24.svg';

const userData = ref<UserStore>({} as UserStore);
const dataFetched = ref<boolean>(false);

const userFullName = computed(() => {
  return `${userData.value.firstname} ${userData.value.lastname}`;
});

onMounted(async () => {
  userData.value = {
    id: 0,
    isConnected: true,
    firstname: 'John',
    lastname: 'Doe',
    avatar: PP,
    followers: [],
    profilBackground: BG,
    bookmarks: [],
  };
  dataFetched.value = true;
});
</script>

<template>
  <loader v-if="!dataFetched" />
  <template v-else>
    <header class="head">
      <div class="is__container__img head--bg--image">
        <img :src="userData.profilBackground">
      </div>
      <div class="head--nav container">
        <div class="is__container__img">
          <img src="@/assets/Union.svg">
        </div>
        <div class="is__container__img">
          <img src="@/assets/Setting.svg">
        </div>
      </div>
    </header>
    <section class="creator container">
      <div class="is__container__img creator--avatar">
        <img
          v-if="userData.avatar"
          :src="userData.avatar"
        >
      </div>
      <div class="creator--infos">
        <h1>{{ userFullName }}</h1>
        <div class="is__container__img">
          Abonné
          <img src="@/assets/Tick.svg">
        </div>
      </div>
      <div class="creator--description" />
    </section>
  </template>
</template>

<style scoped lang="scss">
.head {
  position: relative;
  max-height: 173px;

  &--nav {
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    margin-top: 2rem;
    position: absolute;
    top: 0;
    width: 100%;
  }
}
</style>
