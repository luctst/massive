<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { marked } from 'marked';
import { useRoute } from 'vue-router';
import qs from 'qs';
import { Article } from '@/types/index';
import { useUserStore } from '@/stores/user';
import formatDate from '@/utils/formatDate';
import http from '@/utils/http';
import { toast } from 'vue3-toastify';

const route = useRoute();
const article = ref<Article | null>(null);
const articleLoaded = ref<boolean>(false);
const userStore = useUserStore();

const isUserAuthFollowing = computed(() => userStore.user?.followings?.some((ff) => ff.id === article.value?.user.id));
const articleContent = computed(() => {
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  return marked(article.value?.content || '')
});

onMounted(async () => {
  try {
    const queryParams = qs.stringify({
      populate: ['user', 'likes', 'comments']
    });
    const { data } = await http.get(`/articles/${route.params.id}?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${userStore.user?.jwt}`,
      },
    });

    const newObj = {
      ...data.data.attributes,
      id: data.data.id,
      comments: data.data.attributes.comments.data.map((el) => ({ id: el.id, ...el.attributes })),
      user: {
        ...data.data.attributes.user.data.attributes,
        id: data.data.attributes.user.data.id,
      },
    };

    article.value = { ...newObj };
    articleLoaded.value = true;
  } catch (error) {
    toast.error('Une erreur est survenue')
  }
});
</script>

<template>
  <template v-if="articleLoaded">
    <navigation-header />
    <section class="title container">
      <h1>{{ article?.title }}</h1>
      <media-actions
        :media="article"
        :is-user-auth-following="isUserAuthFollowing"
      />
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
          <p>{{ article?.user.firstname }} {{ article?.user.lastname }}</p>
          <p>Publié il y a <span>{{ formatDate(new Date(article?.createdAt) || new Date()) }}</span></p>
        </div>
      </div>
      <div class="author--subscribe is__container__img">
        Abonné
        <img src="@/assets/Tick-blue.svg">
      </div>
    </section>
    <comments-media-article
      :comments="article?.comments"
      :author--name="article?.user.firstname"
      :author-lastname="article?.user.lastname"
      :author-id="article?.user.id"
      :show-write-message-box="false"
    />
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
  margin-bottom: 2rem;

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
