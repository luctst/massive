<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user';
import { Media } from '@/types/index';
import formatDate from '@/utils/formatDate';
import mocks from '@/mocks/index';

const { t } = useI18n();
const userStore = useUserStore();
const media = ref<Media | null>();
const tabs = ref<Array<{ active: boolean; tabName: string;}>>([]);

const userFullName = computed(() => {
  return `${media.value?.author.firstname} ${media.value?.author.lastname}`;
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
const isUserAuthFollowing = computed(() => media.value?.author.followers?.some((ff) => ff.id === userStore.id));
const mediaPublishedDate = computed(() => formatDate(media.value?.createdAt || new Date()));

onMounted(() => {
  media.value = mocks.media2;
  tabs.value = [
    {
      active: true,
      tabName: 'Description',
    },
    {
      active: false,
      tabName: `${media.value?.comments.length || 0} ${t('comments.head')}`,
    },
  ];
});
</script>

<template>
  <template v-if="media">
    <header class="video--box">
      <div class="video--box--media">
        <video
          src="@/assets/Studio_Project.mp4"
          autoplay
          muted
          controls
        />
      </div>
      <div class="video--box--infos container">
        <h1>{{ media.title }}</h1>
        <div><span>{{ media.view }}</span> vues</div>
      </div>
      <div class="video--box--author container">
        <div class="video--box--author--left">
          <div class="is__container__img video--box--author--left--avatar">
            <img
              v-if="media.author.avatar"
              :src="media.author.avatar"
            >
          </div>
          <div class="video--box--author--left--metadata">
            <p>{{ userFullName }}</p>
            <div>{{ $t('comments.createdAt', { creationTime: mediaPublishedDate }) }}</div>
          </div>
        </div>
        <div class="video--box--author--right">
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
        </div>
      </div>
      <div class="video--box--actions container">
        <media-actions :media="media" />
      </div>
      <section class="tab container">
        <div class="tab--selector">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{active: tab.active}"
            @click.stop="switchTabActive(index)"
          >
            {{ tab.tabName }}
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
      <comments
        v-else
        :comments="media.comments"
        :show-comments-head="false"
        :author-name="media.author.firstname"
        :author-lastname="media.author.lastname"
        :author-id="media.id"
      />
    </main>
  </template>
  <loader v-else />
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

      span {
      }
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
