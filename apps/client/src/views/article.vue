<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { marked } from 'marked';
import { Article } from '@/types/index';
import { useUserStore } from '@/stores/user';
import formatDate from '@/utils/formatDate';
import mocks from '@/mocks/index';

const article = ref<Article | null>(null);
const articleLoaded = ref<boolean>(false);
const userStore = useUserStore();

const userHasLikeArticles = computed(() => article.value?.likes!.some((like) => like.author.id === userStore.id));
const userHasBookmark = computed(() => userStore.bookmarks?.some((bookmark) => bookmark.id === article.value?.id));
const articleContent = computed(() => {
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  return marked(article.value?.content || '')
});

const handleBookmark = () => {
  if (userHasBookmark.value) {
    userStore.bookmarks?.splice(
      userStore.bookmarks.findIndex((bookmark) => bookmark.id === article.value?.id),
      1,
    );
    return;
  }

  userStore.bookmarks?.push(mocks.article1);
};

const handleLikes = () => {
  if (userHasLikeArticles.value) {
    article.value?.likes!.splice(
      article.value?.likes!.findIndex((like) => like.id === userStore.id),
      1,
    );
    return;
  }


  article.value?.likes!.push({
    id: Math.floor(Math.random() * 100),
    author: userStore,
  });
};

onMounted(async () => {
  article.value = mocks.article1;
  articleLoaded.value = true;
});
</script>

<template>
  <template v-if="articleLoaded">
    <navigation-header />
    <section class="title container">
      <h1>{{ article?.title }}</h1>
      <div class="title--actions">
        <div class="is__container__img title--actions--likes">
          <img
            v-if="userHasLikeArticles"
            src="@/assets/like.svg"
            alt="likes"
            @click="handleLikes"
          >
          <img
            v-else
            src="@/assets/like-transp.svg"
            alt="likes"
            @click="handleLikes"
          >
          <span>{{ article?.likes!.length }}</span>
        </div>
        <div class="is__container__img title--actions--comments">
          <img
            src="@/assets/comments.svg"
            alt="comments"
          >
          <span>{{ article?.comments!.length }}</span>
        </div>
        <div class="is__container__img title--actions--bookmark">
          <img
            v-if="userHasBookmark"
            src="@/assets/bookmark-blue.svg"
            alt="bookmark"
            @click="handleBookmark"
          >
          <img
            v-else
            src="@/assets/bookmark-transp.svg"
            alt="bookmark"
            @click="handleBookmark"
          >
        </div>
      </div>
    </section>
    <section
      class="content container"
      v-html="articleContent"
    />
    <section class="container author">
      <div class="author--infos">
        <div class="is__container__img">
          <img src="@/assets/profil-pic1.svg">
        </div>
        <div class="author--infos--metadata">
          <p>{{ article?.author.firstname }} {{ article?.author.lastname }}</p>
          <p>Publié il y a <span>{{ formatDate(article?.createdAt || new Date()) }}</span></p>
        </div>
      </div>
      <div class="author--subscribe is__container__img">
        Abonné
        <img src="@/assets/Tick-blue.svg">
      </div>
    </section>
    <comments :comments="article?.comments" />
  </template>
  <loader v-else />
</template>

<style scoped lang="scss">
.title {
  h1 {
    font-size: 20px;
    color: #1F2E45;
    margin: 0;
  }

  &--actions {
    display: flex;
    margin-top: 1rem;

    &--likes,
    &--comments,
    &--bookmark {
      display: flex;

      span {
        color: #e2e4e5;
        margin-left: .5rem;
      }
    }

    &--likes {
      margin-right: 1rem;
    }

    &--bookmark {
      margin-left: auto;
    }
  }
}

.content {
  margin-top: 1rem;
}

.author {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  &--infos {
    align-items: center;
    display: flex;

    div:first-child {
      height: 42px;
      width: 42px;
    }

    &--metadata {
      margin-left: .7rem;

      p {
        margin: 0;
      }

      p:first-child {
        color: #0F1419;
        font-size: 16px;
        font-weight: 700;
      }

      p:last-child {
        color: #536471;
        font-size: 12px;
      }
    }
  }

  &--subscribe {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #9CA3AF;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
}
</style>
