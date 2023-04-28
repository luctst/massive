<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Article} from '@/types/index';
import { useUserStore } from '@/stores/user';
import utils from '@/utils/index';

interface Props {
  card: Article;
  showHead?: boolean;
  showActions?: boolean;
}

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const props = withDefaults(defineProps<Props>(), {
  showHead: true,
  showActions: true,
});
const isUserAuthFollowing = computed(() => {
  if (userStore.user?.id === Number.parseInt(route.params.id as string)) return true;
  return userStore.user?.followings?.some((ff) => ff.id === props.card.user.id);
});

const goToArticle = (): void => {
  if (!isUserAuthFollowing.value) return;
  router.push({ name: 'Article', params: { id: props.card.id } });
};

const goToUserProfil = (): void => {
  router.push({ name: 'User', params: { id: props.card.user.id } });
};

const cacheUserName = computed(() => utils.formatUserName(props.card.user.firstname, props.card.user.lastname));
const cacheCreatedAt = computed(() => utils.formatDate(new Date(props.card.createdAt)));
const getNameInitial = computed(() => `${props.card.user.firstname[0].toUpperCase()}${props.card.user.lastname[0].toUpperCase()}`);
</script>

<template>
  <div
    :class="['card--article', isUserAuthFollowing ? 'show--cursor--click': '']"
    @click.stop="goToArticle"
  >
    <div
      v-if="props.showActions"
      class="card--article--top"
    >
      <div
        class="card--article--top--user"
        @click.stop="goToUserProfil"
      >
        <div class="is__container__img">
          <img
            v-if="props.card.user.avatar_url"
            :src="props.card.user.avatar_url"
          >
          <div
            v-else
            class="author--infos--fake--avatar"
          >
            {{ getNameInitial }}
          </div>
        </div>
        <div class="card--article--top--user--name">
          <p>{{ cacheUserName }}</p>
          <p>{{ cacheCreatedAt }}</p>
        </div>
      </div>
      <div class="card--aricle--top--dots">
        <img
          src="@/assets/dot-more.svg"
          alt="icon more"
        >
      </div>
    </div>
    <div class="card--article--caption">
      <div class="card--article--caption--content container">
        <div class="card--article--caption--content--header">
          Article
        </div>
        <div class="card--article--caption--content--title">
          {{ props.card.title }}
        </div>
        <div
          v-if="isUserAuthFollowing"
          class="card--article--caption--content--body"
          v-html="props.card.content"
        />
        <div
          v-else
          class="card--article--caption--content--no--follow"
        >
          <div class="is__container__img">
            <img src="@/assets/Lock-dark.svg">
          </div>
          <div class="loading-div" />
          <div class="loading-div" />
          <div class="loading-div" />
        </div>
      </div>
      <div class="container">
        <media-actions
          v-if="props.showActions"
          :media="props.card"
          :is-user-auth-following="isUserAuthFollowing"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card--article {
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  &--top {
    display: flex;
    justify-content: space-between;

    &--user {
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

      &--name {
        margin-left: 1.5rem;
  
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
    }

    &--dots {
      align-self: flex-end;
    }
  }

  &--caption {
    background: #FFFFFF;
    margin-top: 16px;
    border-radius: 10px;
    box-shadow: 0px 8px 24px rgb(156 163 175 / 20%);
    padding: 1rem 0;

    &--content {
      margin-bottom: 1rem;

      &--header {
        color: #790D0D;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: -0.02em;
      }

      &--title {
        color: rgba(31, 46, 69, 1);
        font-size: 15px;
        font-weight: 700;
        letter-spacing: -0.02em;
        margin: 5px 0;
      }

      &--body {
        color: #9CA3AF;
        font-size: 15px;
        letter-spacing: -0.02em;
      }

      &--no--follow {
        display: flex;
        flex-direction: column;
        gap: 4px;
        position: relative;

        .is__container__img {
          width: 18px;
          position: absolute;
          top: 40%;
          left: 50%;
        }

        .loading-div {
          width: 100%;
          height: 13px;
          background-color: rgba(217, 217, 217, 0.2);
        }

        .loading-div:last-child {
          width: 55%;
        }
      }
    }
  }
}
</style>
