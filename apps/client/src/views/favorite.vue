<script setup lang="ts">
import { ref } from 'vue';
import { CardWidthData } from '@/types/index';
import YTpreview from '@/assets/youtube-screen.svg';
import PP from '@/assets/profil-pic1.svg';

const bookmarks = ref<Array<CardWidthData>>([
  {
    media: {
      length: 5000,
      title: 'Bruno le maire face aux jeunes',
      likes: [],
      comments: [],
      preview: YTpreview,
    },
    user: {
      name: 'Gaspard',
      family_name: 'Guerlain',
      avatar: PP,
    },
    created_at: new Date(),
  },
  {
    media: {
      length: 500000,
      title: 'Bruno le maire face aux jeunes',
      likes: [{}, {}],
      comments: [],
      preview: YTpreview,
    },
    user: {
      name: 'Gaspard',
      family_name: 'Guerlain',
      avatar: PP,
    },
    created_at: new Date(),
  }
]);
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
        <card-with-user-data
          v-for="(bookmark, index) in bookmarks"
          :key="index"
          :card="bookmark"
        />
      </section>
    </template>
  </main>
  <navigation />
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
