<script setup lang="ts">
import { ref, watch } from 'vue';
import { Article, Media } from '@/types/index';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const bookmarks = ref<Array<Media | Article>>(([] as Array<any>).concat(userStore.user?.bookmarks_article, userStore.user?.bookmarks_media));

watch(
  () => [userStore.user?.bookmarks_article, userStore.user?.bookmarks_media],
  () => {
    bookmarks.value = ([] as Array<any>).concat(userStore.user?.bookmarks_article, userStore.user?.bookmarks_media).map((item) => ({ ...item, card_type: item.views ? 'media' : 'article' }));
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <navigation-header />
  <main class="container">
    <template v-if="!bookmarks.length">
      <p class="no-bookmarks">
        {{ $t('bookmarks.noData') }}
      </p>
    </template>
    <template v-else>
      <header>
        <p>{{ $t('bookmarks.noBookmarks') }}</p>
      </header>
      <section class="card--container">
        <template
          v-for="(bookmark, index) in bookmarks"
          :key="index"
        >
          <card-media
            v-if="bookmark.card_type === 'media'"
            :card="bookmark"
          />
          <card-article
            v-else
            :card="bookmark"
          />
        </template>
      </section>
    </template>
  </main>
  <navigation-footer />
</template>

<style scoped lang="scss">
.no-bookmarks {
  font-weight: 700;
  font-size: 17px;
  text-align: center;
  color: #9CA3AF;
  margin: 300px 0 330px;
}

header {
  p {
    color: #1F2E45;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
  }
}

.card--container {
  margin-top: 2.5rem;
  margin-bottom: 6rem;
}
</style>
