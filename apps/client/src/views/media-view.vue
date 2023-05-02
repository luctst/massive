<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user';
import { Media } from '@/types/index';
import formatDate from '@/utils/formatDate';
import http from '@/utils/http';
import { toast } from 'vue3-toastify';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const media = ref<Media | null>();
const tabs = ref<Array<{ active: boolean; tabName?: string; useComputed?: boolean}>>([]);

const userFullName = computed(() => {
  if (media.value?.user.provider === 'google') return media.value?.user.username;
  return `${media.value?.user.firstname} ${media.value?.user.lastname}`;
});

const switchTabActive = (index: number) => {
  tabs.value = tabs.value.map((tab, i) => {
    if (i === index) {
      return {
        ...tab,
        active: true,
      };
    }
    return {
      ...tab,
      active: false,
    };
  });
};

const tabActive = computed(() => tabs.value.find((tab) => tab.active)?.tabName);
const isUserAuthFollowing = computed(() => media.value?.user.followers?.some((ff) => ff.id === userStore.user?.id));
const isUserAuthOnHisMedia = computed(() => media.value?.user.id === userStore.user?.id);
const mediaPublishedDate = computed(() => formatDate(new Date(media.value?.createdAt || new Date())));
const mediaTabTitle = computed(() => {
  return `${media.value?.comments.length || 0} ${t('comments.head')}`;
});

onMounted(async () => {
  try {
    const { data } = await http.get(`/medias/${route.params.id}?populate=deep`, {
      headers: {
        Authorization: `Bearer ${userStore.user?.jwt}`,
      },
    });
    
    const newObj = {
      ...data.data.attributes,
      id: data.data.id,
      comments: data.data.attributes.comments.data.map((el: any) => {
        const objToReturn = { id: el.id, ...el.attributes };
        objToReturn.user = {
          ...el.attributes.author.data.attributes,
          id: el.attributes.author.data.id,
        };

        delete objToReturn.author;
        return objToReturn;
      }),
      user: {
        ...data.data.attributes.user.data.attributes,
        id: data.data.attributes.user.data.id,
        followers: data.data.attributes.user.data.attributes.followers.data.map((el: any) => ({id: el.id, ...el.attributes})),
        followings: data.data.attributes.user.data.attributes.followings.data.map((el: any) => ({id: el.id, ...el.attributes})),
      },
    };
    
    media.value = { ...newObj };
    tabs.value = [
      {
        active: true,
        tabName: 'Description',
      },
      {
        active: false,
        useComputed: true,
      },
    ];

    if (!isUserAuthFollowing.value) {
      if (!isUserAuthOnHisMedia.value) return router.go(-1);
    }
  } catch (error) {
    toast.error('Une erreur est survenue, veuillez réessayer');
  }
});
</script>

<template>
  <template v-if="media">
    <header class="video--box">
      <div class="video--box--media">
        <video
          src="@/assets/Studio_Project.mp4"
          muted
          controls
        />
      </div>
      <div class="video--box--infos container">
        <h1>{{ media.title }}</h1>
        <div><span>{{ new Intl.NumberFormat('fr-FR').format(Number.parseInt(media.views)) }}</span> vues</div>
      </div>
      <div class="video--box--author container">
        <div class="video--box--author--left">
          <div class="is__container__img video--box--author--left--avatar">
            <img
              v-if="media.user.avatar_url"
              :src="media.user.avatar_url"
            >
            <div
              v-else
              class="author--infos--fake--avatar"
            >
              {{ userStore.getUserInitialsLetters(media.user) }}
            </div>
          </div>
          <div class="video--box--author--left--metadata">
            <p>{{ userFullName }}</p>
            <div>{{ $t('comments.createdAt', { creationTime: mediaPublishedDate }) }}</div>
          </div>
        </div>
        <div class="video--box--author--right">
          <template v-if="!isUserAuthOnHisMedia">
            <div
              v-if="isUserAuthFollowing"
              class="is__container__img"
            >
              {{ $t('user.follow') }}
              <img src="@/assets/Tick-blue.svg">
            </div>
            <div
              v-else
              class="is__container__img no--follow"
            >
              {{ $t('user.noFollow') }}
              <img
                src="@/assets/Lock.svg"
                alt="s'abonner"
              >
            </div>
          </template>
        </div>
      </div>
      <div class="video--box--actions container">
        <media-actions
          :media="media"
          :is-user-auth-following="isUserAuthFollowing"
        />
      </div>
      <section class="tab container">
        <div class="tab--selector">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{active: tab.active}"
            @click.stop="switchTabActive(index)"
          >
            {{ tab.useComputed ? mediaTabTitle : tab.tabName }}
          </div>
        </div>
      </section>
    </header>
    <main>
      <article
        v-if="tabActive === 'Description'"
        class="article container"
      >
        <h2>{{ media.title }}</h2>
        <div>{{ $t('comments.createdAt', { creationTime: mediaPublishedDate }) }}</div>
        <div
          v-if="media.description"
          class="article--content"
          v-html="media.description"
        />
        <div
          v-else
          class="article--content"
        >
          {{ $t('userAbout.noDescription') }}
        </div>
      </article>
      <comments-media-article
        v-else
        :comments="media.comments"
        :show-comments-head="false"
        :author-name="media.user.firstname"
        :author-lastname="media.user.lastname"
        :author-id="media.user.id"
      />
    </main>
  </template>
  <loader-vue v-else />
</template>

<style scoped lang="scss">
.video--box {
  box-shadow: 0px 8px 24px rgba(156, 163, 175, 0.2);
  padding-bottom: 5px;

  &--media {
    width: 100%;

    video {
      height: inherit;
      max-height: 400px;
      width: 100%;
    }
  }

  &--infos {
    margin-top: 1rem;

    h1 {
      font-size: 20px;
      color: #1F2E45;
      margin-bottom: 2px;
      letter-spacing: -0.02em;
    }

    div {
      color: #9CA3AF;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
  }

  &--author {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;

    &--left {
      display: flex;
      align-items: center;
      gap: 8px;

      &--avatar {
        width: 35px;
        border-radius: 50%;
        margin-right: .7rem;

        div {
          align-items: center;
          display: flex;
          justify-content: center;
          background: rgb(123, 121, 255);
          border-radius: 50%;
          height: 42px;
          width: 42px;
        }
      }

      &--metadata {
        p {
          color: #0F1419;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 1px;
          margin: 0;
        }
  
        div {
          color: #536471;
          font-size: 12px;
        }
      }
    }

    &--right {
      div {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #9CA3AF;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: -0.02em;
      }

      .no--follow {
        color: #000A6B;
      }
    }
  }

  &--actions {
    margin-top: 1rem;
  }
}

.tab {
  margin-top: 2rem;

  &--selector {
    display: flex;
    gap: 1.5rem;

    div {
      font-weight: 500;
      letter-spacing: -0.02em;
      color: #9CA3AF;
    }

    .active {
      color: #070B30;
      text-decoration: underline;
      text-underline-offset: 10px;
      text-decoration-thickness: 2px;
    }
  }
}

.article {
  margin-top: 1.5rem;

  h2 {
    font-size: 17px;
    letter-spacing: -0.02em;
    color: #14172D;
    margin-bottom: 10px;
    margin: 0;
  }

  div:first-of-type {
    font-weight: 500;
    font-size: 12px;
    color: #536471;
    margin-top: .3rem;
  }

  &--content {
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: -0.02em;
    color: #9CA3AF;
    margin: 25px 0;
  }
}
</style>
