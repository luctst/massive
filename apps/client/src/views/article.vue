<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { Article } from '@/types/index';
import { useUserStore } from '@/stores/user';

const article = ref<Article | null>(null);
const articleLoaded = ref<boolean>(false);
const userStore = useUserStore();

const userHasLikeArticles = computed(() => {
  if (article.value?.likes.find((like) => like.user.id === userStore.id)) return true;
  return false;
});

const handleLikes = () => {
  if (userHasLikeArticles.value) {
    article.value?.likes.splice(
      article.value?.likes.findIndex((like) => like.user.id === userStore.id),
      1,
    );
    return;
  }


  article.value?.likes.push({
    id: Math.floor(Math.random() * 100),
    user: {
      id: userStore.id,
      likedAt: new Date(),
    },
  });
};

onMounted(async () => {
  article.value = {
    id: 1,
    title: 'Le passage à l\'informatique chez les députés européens',
    content: 'Article content',
    likes: [],
    comments: [],
  };
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
          <span>{{ article?.likes.length }}</span>
        </div>
        <div class="is__container__img title--actions--comments">
          <img
            src="@/assets/comments.svg"
            alt="comments"
          >
          <span>{{ article?.comments.length }}</span>
        </div>
        <div class="is__container__img title--actions--bookmark">
          <img
            src="@/assets/bookmark-transp.svg"
            alt="bookmark"
          >
        </div>
      </div>
    </section>
  </template>
  <div
    v-else
    class="loader"
  />
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
</style>
