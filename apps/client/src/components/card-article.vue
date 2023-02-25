<script setup lang="ts">
import { computed } from 'vue';
import { Article} from '@/types/index';
import utils from '@/utils/index';

interface Props {
  card: Article;
  showHead?: boolean;
  showActions?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showHead: true,
  showActions: true,
});

const cacheUserName = computed(() => utils.formatUserName(props.card.author.firstname, props.card.author.lastname));
const cacheCreatedAt = computed(() => utils.formatDate(props.card.createdAt));
</script>

<template>
  <div class="card--article">
    <div
      v-if="props.showActions"
      class="card--article--top"
    >
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
      <div class="container">
        <media-actions
          v-if="props.showActions"
          :media="props.card"
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
    }
  }
}
</style>
