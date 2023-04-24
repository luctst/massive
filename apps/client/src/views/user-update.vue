<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';


const route = useRoute();
const router = useRouter();
const { user } = useUserStore()
;
onMounted(() => {
  if (user?.id !== Number.parseInt(route.params.id as string)) {
    return router.push({ name: 'Home' });
  }
});
</script>

<template>
  <div></div>
</template>
