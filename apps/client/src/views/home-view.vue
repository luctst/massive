<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import { Article, Media } from '@/types';

const router = useRouter();
const userStore = useUserStore();
const dataLoaded = ref<boolean>(false);
const publications = ref<Array<Article | Media>>([]);

onMounted(async () => {
  try {
    await userStore.setUser();

    if (userStore.user?.followings.length) {
      publications.value = userStore.user?.followings?.map((follower) => {
        return ([] as Array<any>).concat(follower.media, follower.articles);
      })
      .flat()
      .map((item) => ({ ...item, card_type: item.preview ? 'media' : 'article'}));
    }

    dataLoaded.value = true;
  } catch (error) {
    router.push({ name: 'Signup' });
  }
})
</script>

<template>
  <loader-vue v-if="!dataLoaded" />
  <template v-else-if="$route.name === 'Home'">
    <navigation-header />
    <main class="container home">
      <template v-if="!userStore.user?.followings?.length">
        <div class="no--follow">
          <p>Vous ne suivez personne pour le moment</p>
          <button @click="$router.push({ name: 'Explorer'})">
            Découvrir les créateurs
          </button>
        </div>
      </template>
      <template v-else>
        <template
          v-for="(ff, index) in publications"
          :key="index"
        >
          <section
            :data-id="ff.id"
            class="medias--container"
          >
            <div>
              <card-media
                v-if="ff.card_type === 'media'"
                :card="ff"
              />
              <card-article
                v-else
                :card="ff"
              />
            </div>
          </section>  
        </template>
      </template>
    </main>
    <navigation-footer />
  </template>
  <template v-else>
    <router-view />
  </template>
</template>

<style scoped lang="scss">
.home {
  height: calc(100% - 81px - 10vh);
}
.no--follow {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  p {
    font-size: 17px;
    font-weight: 700;
    color: #14172D;
    text-align: center;
    margin: 0;
  }

  button {
    max-width: 265px;
    height: 50px;
    font-size: 13px;
    font-weight: 700;
    color: #FFFFFF;
    background: linear-gradient(87.79deg, #000A6B 0%, #790D0D 100%);
    margin-top: 32px;
    padding: 14px 49px;
    border-radius: 30px;
    border: none;
    outline: none;
  }
}

.medias--container {
  div {
    margin-bottom: 2rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
