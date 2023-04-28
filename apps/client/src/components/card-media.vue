<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Media } from '@/types/index';
import { useUserStore } from '@/stores/user';
import utils from '@/utils/index';

const router = useRouter();
const userStore = useUserStore();
const props = withDefaults(defineProps<{
  card: Media;
  showHead?: boolean;
  showActions?: boolean;
}>(), {
  showHead: true,
  showActions: true,
});
const isUserAuthFollowing = computed(() => {
  if (userStore.user?.id === props.card.user.id) return true;
  return userStore.user?.followings?.some((ff) => ff.id === props.card.user.id);
});

const goToArticle = (): void => {
  if (!isUserAuthFollowing.value) return;
  router.push({ name: 'Media', params: { id: props.card.id } });
};

const goToUserProfil = (): void => {
  router.push({ name: 'User', params: { id: props.card.user.id } });
};

const userFullName = computed(() => `${props.card.user.firstname} ${props.card.user.lastname}`);
const getNameInitial = computed(() => `${props.card.user.firstname[0].toUpperCase()}${props.card.user.lastname[0].toUpperCase()}`);
</script>

<template>
  <div
    :class="['card--container--item', isUserAuthFollowing ? 'show--cursor--click': '']"
    @click.stop="goToArticle"
  >
    <div
      v-if="props.showHead"
      class="card--container--item--top"
    >
      <div
        class="card--container--item--top--user--data"
        @click.stop="goToUserProfil"
      >
        <div class="is__container__img">
          <img
            v-if="props.card.user.avatar_url"
            :src="props.card.user.avatar_url || 'https://via.placeholder.com/150'"
            alt="profil icon"
          >
          <div
            v-else
            class="author--infos--fake--avatar"
          >
            {{ getNameInitial }}
          </div>
        </div>
        <div class="card--container--item--top--user--name">
          <p>{{ utils.formatUserName(props.card.user.firstname, props.card.user.lastname) }}</p>
          <p>Il y a {{ utils.formatDate(new Date(props.card.createdAt)) }}</p>
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
        <template v-if="isUserAuthFollowing">
          <img :src="props.card.preview">
          <span>{{ utils.formatTime(props.card.length) }}</span>
        </template>
        <template v-else>
          <div class="card--container--item--caption--video--no--follow">
            <div class="is__container__img">
              <img src="@/assets/Lock.svg">
            </div>
            <div>{{ $t('cardMedia.needFollow', { name: userFullName }) }}</div>
          </div>
        </template>
      </div>
      <div class="card--container--item--caption--metadata container">
        <p
          v-if="!props.showActions"
          class="card--container--item--caption--metadata--author"
        >
          {{ userFullName }}
        </p>
        <p class="card--container--item--caption--metadata--title">
          {{ props.card.title }}
        </p>
        <media-actions
          v-if="props.showActions"
          :media="props.card"
          :is-user-auth-following="isUserAuthFollowing"
        />
      </div>
    </div>
  </div>
</template>

<style scoepd lang="scss">
.card--container--item {
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

        div {
          align-items: center;
          display: flex;
          justify-content: center;
          background: rgb(123, 121, 255);
          border-radius: 50%;
          width: 42px;
          height: 42px;
        }
      }
    }

    &--user--name {
      margin-left: 1.2rem;

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

      &--no--follow {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: linear-gradient(265.45deg, #676769 0.04%, #8A7261 47.79%, #79797A 107.89%), linear-gradient(180deg, rgba(0, 0, 0, 0) 60.94%, rgba(0, 0, 0, 0.5) 100%);
        max-height: 168px;
        height: 168px;
        border-radius: 10px 10px 0px 0px;

        div:last-child {
          font-weight: 500;
          font-size: 14px;
          text-align: center;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin-top: 1rem;
          width: 199px;
        }
      }
    }

    &--metadata {
      margin-top: .5rem;
      padding-bottom: 1rem;

      &--author {
        color: #9CA3AF;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: -0.02em;
        opacity: 0.88;
        margin-top: .5rem;
        margin-bottom: 0;
      }

      &--title {
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
</style>
