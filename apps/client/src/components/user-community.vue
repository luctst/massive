<script setup lang="ts">
import { UserStore } from '@/types/index';

interface Props {
  userData: UserStore;
}

const props = defineProps<Props>();
</script>

<template>
  <comments :comments="props.userData.comments" />
</template>
