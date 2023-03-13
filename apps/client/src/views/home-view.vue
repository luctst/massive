<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import http from '@/utils/http';
import { onMounted } from 'vue';

const router = useRouter();
const userStore = useUserStore();
const dataLoaded = ref<boolean>(false);

onMounted(async () => {
  try {
    const { data } = await http.get('/users/me', {
      headers: {
        Authorization: `Bearer ${userStore.user?.jwt}`,
      },
    });

    userStore.setUser({ ...data, jwt: userStore.user?.jwt });
    dataLoaded.value = true;
  } catch (error) {
    router.push({ name: 'Signup' });
  }
})
</script>

<template>
  <loader-vue v-if="!dataLoaded" />
  <template v-else>
    <navigation-header />
    <main class="container home">
      <template v-if="!userStore.user?.following?.length">
        <div class="no--follow">
          <p>Vous ne suivez personne pour le moment</p>
          <button @click="$router.push({ name: 'Explorer'})">
            Découvrir les créateurs
          </button>
        </div>
      </template>
      <template v-else>
        <template
          v-for="(ff, index) in userStore.user?.following"
          :key="index"
        >
          <section
            :data-id="ff.id"
            class="medias--container"
          >
            <div
              v-for="(media, iterator) in ff.media"
              :key="iterator"
            >
              <card-media
                v-if="media.type.isMedia"
                :card="media"
              />
              <card-article
                v-else
                :card="media"
              />
            </div>
          </section>  
        </template>
      </template>
    </main>
    <navigation />
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
