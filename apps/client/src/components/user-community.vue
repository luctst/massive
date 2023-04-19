<script setup lang="ts">
import { UserStore } from '@/types/index';

interface Props {
  userData: UserStore;
}

const props = defineProps<Props>();
</script>

<template>
  <comments-media-article
    :comments="props.userData.comments"
    :author-name="props.userData.firstname"
    :author-lastname="props.userData.lastname"
    :author-id="props.userData.id"
  />
</template>
