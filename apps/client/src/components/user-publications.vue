<script setup lang="ts">
import { UserStore } from '@/types/index';

interface Props {
  userData: UserStore;
  userAuth: UserStore;
};

const props = defineProps<Props>();
</script>

<template>
  <section class="container publications">
    <template v-for="(card, index) in props.userData.media">
      <card-media
        v-if="card.type.isMedia"
        :key="index"
        :card="card"
        :user-auth-id="props.userAuth.id"
        v-bind="$attrs"
      />
      <card-article
        v-else
        :key="index + 1"
        :card="card"
        :user-auth-id="props.userAuth.id"
        :user-auth-bookmarks="props.userAuth.bookmarks"
        v-bind="$attrs"
      />
    </template>
  </section>
</template>
