<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, defineEmits } from 'vue';
import { Article, Media} from '@/types/index';
import utils from '@/utils/index';

interface Props {
  card: Article;
  userAuthId: number;
  userAuthBookmarks: Array<Media | Article>;
  showHead?: boolean;
  showActions?: boolean;
}

const emits = defineEmits<{
  (e: 'removeLike', mediaId: number, likeIndex: number): void;
  (e: 'addLike', mediaId: number): void;
  (e: 'removeBookmark', bookmarkIndex: number): void;
  (e: 'addBookmark', mediaId: number): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  showHead: true,
  showActions: true,
});

const handleLike = () => {
  if (userHasLiked.value) {
    const likeIndex = props.card.likes.findIndex((lk) => lk.author.id === props.userAuthId);
    return emits('removeLike', props.card.id, likeIndex);
  }

  return emits('addLike', props.card.id);
};

const handleBookmark = () => {
  if (userHasBookmarked.value) {
    const bookmarkIndex = props.userAuthBookmarks.findIndex((bk) => bk.id === props.card.id);
    return emits('removeBookmark', bookmarkIndex);
  }

  return emits('addBookmark', props.card.id);
};

const cacheUserName = computed(() => utils.formatUserName(props.card.author.firstname, props.card.author.lastname));
const cacheCreatedAt = computed(() => utils.formatDate(props.card.createdAt));
const userHasLiked = computed(() => props.card.likes.some((lk) => lk.author.id === props.userAuthId));
const userHasBookmarked = computed(() => props.userAuthBookmarks.some((bk) => bk.id === props.card.id));
</script>

<template>
  <div class="card--article">
    <div class="card--article--top">
      <div class="card--article--top--user">
        <div class="is__container__img">
          <img :src="props.card.author.avatar || ''">
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
          class="card--article--caption--content--body"
          v-html="props.card.content"
        />
      </div>
      <div class="card--article--caption--actions container">
        <div class="card--article--caption--actions--likes--comments">
          <div class="is__container__img">
            <img
              v-if="userHasLiked"
              src="@/assets/like.svg"
              alt="icon like"
              @click="handleLike"
            >
            <img
              v-else
              src="@/assets/like-transp.svg"
              alt="icon like"
              @click="handleLike"
            >
            {{ props.card.likes.length }}
          </div>
          <div class="is__container__img">
            <img
              src="@/assets/comments.svg"
              alt="icon comment"
            >
            {{ props.card.comments.length }}
          </div>
        </div>
        <div class="card--article--caption--actions--subscription">
          <img
            v-if="userHasBookmarked"
            src="@/assets/bookmark-blue.svg"
            alt="icon share"
            @click="handleBookmark"
          >
          <img
            v-else
            src="@/assets/bookmark-transp.svg"
            alt="icon share"
            @click="handleBookmark"
          >
        </div>
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
      }

      &--name {
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
    }

    &--actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 13px;

      &--likes--comments {
        display: flex;
        font-size: 12px;
        gap: 10px;

        div {
          display: flex;
          font-size: 12px;
          gap: 10px;
          color: #333;
        }
      }

      &--subcriptions {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
