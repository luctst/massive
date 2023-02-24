<script setup lang="ts">
import { computed } from 'vue';
import { Media } from '@/types/index';
import utils from '@/utils/index';

const props = withDefaults(defineProps<{
  card: Media;
  showHead?: boolean;
  showActions?: boolean;
}>(), {
  showHead: true,
  showActions: true,
});

const userFullName = computed(() => `${props.card.author.firstname} ${props.card.author.lastname}`);
</script>

<template>
  <div class="card--container--item">
    <div
      v-if="props.showHead"
      class="card--container--item--top"
    >
      <div class="card--container--item--top--user--data">
        <div class="is__container__img">
          <img
            :src="props.card.author.avatar || 'https://via.placeholder.com/150'"
            alt="profil icon"
          >
        </div>
        <div class="card--container--item--top--user--name">
          <p>{{ utils.formatUserName(props.card.author.firstname, props.card.author.lastname) }}</p>
          <p>Il y a {{ utils.formatDate(props.card.createdAt) }}</p>
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
        <img :src="props.card.preview">
        <span>{{ utils.formatTime(props.card.length) }}</span>
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
        <div
          v-if="props.showActions"
          class="card--container--item--caption--metadata--action"
        >
          <div class="likes-comments">
            <span class="likes">
              <img
                src="@/assets/like.svg"
                alt="like icon"
              >
              {{ props.card.likes?.length }}
            </span>
            <span class="comments">
              <img
                src="@/assets/comments.svg"
                alt="like icon"
              >
              {{ props.card.comments?.length }}
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
