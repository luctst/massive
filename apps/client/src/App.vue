<script lang="ts" setup>
import { useHead } from '@vueuse/head';
import { onMounted, onUnmounted, ref } from 'vue';

useHead({
  link: [
    {
      href: 'https://fonts.cdnfonts.com/css/satoshi',
      rel: 'stylesheet',
    },
  ],
});

const showApp = ref(false);
function isAppAvailable() {
  if (window.innerWidth > 500) {
    showApp.value = false;
    return;
  }

  showApp.value = true;
}

onMounted(() => {
  isAppAvailable();
  window.addEventListener('resize', isAppAvailable);
});

onUnmounted(() => {
  window.removeEventListener('resize', isAppAvailable);
});
</script>

<template>
  <div class="massive">
    <div v-if="showApp">
      <RouterView />
    </div>
    <div v-else class="massive-hidden">
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
