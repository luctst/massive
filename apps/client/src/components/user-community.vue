<script setup lang="ts">
import { UserStore } from '@/types/index';
import { toRefs, onBeforeMount } from 'vue';

interface Props {
  userData: UserStore;
}

const props = defineProps<Props>();
const { userData } = toRefs(props);

onBeforeMount(() => {
  userData.value.comments = userData.value.comments?.map((comment) => {
    const commentFormated = { ...comment };
    commentFormated.user = commentFormated.author;

    delete commentFormated.author;
    return commentFormated;
  });
});
</script>

<template>
  <comments-media-article
    :comments="userData.comments"
    :author-name="userData.firstname"
    :author-lastname="userData.lastname"
    :author-username="userData.username"
    :author-id="userData.id"
  />
</template>
