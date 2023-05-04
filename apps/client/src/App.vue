<script lang="ts" setup>
import { useHead } from '@vueuse/head';
import { onMounted, ref } from 'vue';

useHead({
  link: [
    {
      href: 'https://fonts.cdnfonts.com/css/satoshi',
      rel: 'stylesheet',
    },
  ],
  title: 'Massive app',
});

const showApp = ref(false);

function isAppAvailable() {
  if (window.innerWidth > 500) {
    showApp.value = false;
    return;
  }

  showApp.value = true;
}

// async function persisUserOnRefresh(event: BeforeUnloadEvent) {
//   try {
//     event.preventDefault();
//     event.stopPropagation();
//     const { user } = useUserStore();

//     if (user?.provider === 'google') return;
//     if (!user?.jwt) return;

//     const { data } = await http.post('/token/refresh', {
//       refreshToken: user?.jwt,
//     });
//     await setUser(data.jwt);
//   } catch (error) {
//     toast.error('Error on refresh');
//   }
// };


onMounted(() => {
  isAppAvailable();
  window.addEventListener('resize', isAppAvailable);
  // window.addEventListener('beforeunload', persisUserOnRefresh);
});
</script>

<template>
  <div class="massive">
    <div v-if="showApp">
      <RouterView />
    </div>
    <div
      v-else
      class="massive-hidden"
    >
      <h1>{{ $t('appNotAvailable') }}</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.massive {
  height: 100vh;
  
  div:first-child {
    height: 100%;
  }
}

.massive-hidden {
  align-items: center;
  display: flex;
  justify-content: center;

  h1 {
    font-size: 3rem;
    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
