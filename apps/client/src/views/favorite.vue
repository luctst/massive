<script setup lang="ts">
import { ref } from 'vue';
import YTpreview from '@/assets/youtube-screen.svg';
import PP from '@/assets/profil-pic1.svg';

interface Card {
  media: {
    length: number;
    title: string;
    preview: string;
    likes?: Array<object>;
    comments?: Array<object>;
  };
  user: {
    name: string;
    family_name: string;
    avatar: string;
  };
  created_at: Date;
}

const bookmarks = ref<Array<Card>>([
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

function formatName(name: string, family_name: string) {
  return `${name} ${family_name[0].toUpperCase()}`;
}

function formatDate(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInMinutes = diff / 1000 / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  if (diffInMinutes < 60) {
    return `${Math.round(diffInMinutes)} minutes`;
  } else if (diffInHours < 24) {
    return `${Math.round(diffInHours)} heures`;
  } else {
    return `${Math.round(diffInDays)} jours`;
  }
}

function formatMilliseoncdsToTime(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${hours}:${minutes}:${seconds}`;
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
        <p>Ajoutés récemment</p>
      </header>
      <section class="card--container">
        <div
          v-for="(card, index) in bookmarks"
          :key="index"
          class="card--container--item"
        >
          <div class="card--container--item--top">
            <div class="card--container--item--top--user--data">
              <div class="is__container__img">
                <img
                  :src="card.user.avatar"
                  alt="profil icon"
                >
              </div>
              <div class="card--container--item--top--user--name">
                <p>{{ formatName(card.user.name, card.user.family_name) }}</p>
                <p>Il y a {{ formatDate(card.created_at) }}</p>
              </div>
            </div>
            <span class="card--container--item--top--svg">
              <img
                src="@/assets/dot-more.svg"
                alt="icon more"
              >
            </span>
          </div>
          <div class="card--container--item--caption">
            <div class="card--container--item--caption--video is__container__img">
              <img :src="card.media.preview">
              <span>{{ formatMilliseoncdsToTime(card.media.length) }}</span>
            </div>
            <div class="card--container--item--caption--metadata container">
              <p>{{ card.media.title }}</p>
              <div class="card--container--item--caption--metadata--action">
                <div class="likes-comments">
                  <span class="likes">
                    <img
                      src="@/assets/like.svg"
                      alt="like icon"
                    >
                    {{ card.media.likes?.length }}
                  </span>
                  <span class="comments">
                    <img
                      src="@/assets/comments.svg"
                      alt="like icon"
                    >
                    {{ card.media.comments?.length }}
                  </span>
                </div>
                <span class="subscription"><img
                  src="@/assets/bookmark-blue.svg"
                  alt="icon bookmark blue"
                ></span>
              </div>
            </div>
          </div>
        </div>
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

  &--item {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }

    &--top {
      display: flex;
      justify-content: space-between;
      
      &--user--data {
        display: flex;

        .is__container__img {
          width: 22%;
        }
      }

      &--user--name {
        margin-left: .5rem;

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
          font-size: 14px;
        }
      }

      &--svg {
        align-self: flex-end;
      }
    }

    &--caption {
      background: #FFFFFF;
      margin-top: 16px;
      border-radius: 10px;
      box-shadow: 0px 8px 24px rgb(156 163 175 / 20%);

      &--video {
        position: relative;

        span {
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: #FFF;
          background: rgba(0, 0, 0, 0.4);
          font-size: 10px;
          font-weight: 500;
          padding: 1px 3px;
          letter-spacing: -0.02em;
        }
      }

      &--metadata {
        padding-bottom: 1rem;

        p {
          color: #1F2E45;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0;
        }

        &--action {
          margin-top: 13px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .likes-comments {
            display: flex;
            gap: 10px;
            font-size: 12px;
            color: #000;
          }
        
          .likes {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #000;
          }
        
          .comments {
            display: flex;
            align-items: center;
            gap: 10px;
          }
        }
      }
    }
  }
}
</style>
