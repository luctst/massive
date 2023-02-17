<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { marked } from 'marked';
import { Article } from '@/types/index';
import { useUserStore } from '@/stores/user';
import PP from '@/assets/profil-pic1.svg';
import formatDate from '@/utils/formatDate';

const article = ref<Article | null>(null);
const articleLoaded = ref<boolean>(false);
const userStore = useUserStore();
const cc = [
  {
    author: {
      id: 2,
      firstname: 'Foo',
      lastname: 'Bar',
    },
    content: 'Lorem ipsum dolor sit amet',
    createdAt: new Date(),
    likes: [
      1,
      2,
      3,
      4
    ],
  }
];

const userHasLikeArticles = computed(() => article.value?.likes!.find((like) => like.user.id === userStore.id));
const userHasBookmark = computed(() => userStore.bookmarks?.find((bookmark) => bookmark.id === article.value?.id));
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

  userStore.bookmarks?.push({
    id: 1,
    title: article.value?.title || '',
    createdAt: new Date(),
    content: 'elit eiusmod laboris laboris',
    author: {
      id: 66,
      firstname: 'Foo',
      lastname: 'Bar',
      avatar: PP,
      bookmarks: null,
    },
  });
};

const handleLikes = () => {
  if (userHasLikeArticles.value) {
    article.value?.likes!.splice(
      article.value?.likes!.findIndex((like) => like.user.id === userStore.id),
      1,
    );
    return;
  }


  article.value?.likes!.push({
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
    content: '<p class="is__article__content">Article content</p><p class="is__article__content">Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.Sunt velit ea deserunt ullamco excepteur do anim ex sint anim.</p><p class="is__article__content">Esse sit labore est et. Magna aute aliqua fugiat ullamco ipsum. Enim consectetur fugiat adipisicing ipsum nisi quis occaecat est ullamco. Amet adipisicing minim ullamco reprehenderit qui aliquip enim aliquip labore magna exercitation voluptate exercitation sunt Lorem.</p>',
    likes: [],
    comments: [],
    author: {
      isConnected: false,
      id: 12,
      firstname: 'Foo',
      lastname: 'Bar',
      bookmarks: [],
      avatar: PP,
    },
    createdAt: new Date(),
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
    <comments :comments="cc" />
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
