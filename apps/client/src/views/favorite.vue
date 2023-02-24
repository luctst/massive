<script setup lang="ts">
import { ref } from 'vue';
import { Article, Media } from '@/types/index';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const bookmarks = ref<Array<Media | Article>>(userStore.bookmarks || []);

const removeBookmark = (bookmarkIndex: number) => {
  userStore.bookmarks?.splice(bookmarkIndex, 1);
}
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
        :key="index">
          <card-media
            v-if="bookmark.type.isMedia"
            :card="bookmark"
            :user-auth-id="userStore.id"
          />
          <card-article
            v-else
            :card="bookmark"
            :user-auth-id="userStore.id"
            :user-auth-bookmarks="userStore.bookmarks"
            @remove-bookmark="removeBookmark"
            @remove-like="removeLike"
          />
        </template>
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
