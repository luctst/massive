<script setup lang="ts">
import { marked } from 'marked';
import { Comments } from '@/types/index';
import formatDate from '@/utils/formatDate';

const props = defineProps<{
  comments: Comments[];
}>();

const articleContent = (content: string): string => {
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  return marked(content);
};
</script>

<template>
  <section class="container comments">
    <div class="comments--head">
      <span>{{ props.comments.length }} {{ $t('comments.head') }}</span>
    </div>
    <template v-if="!props.comments.length">
      <div class="comments--nocomments">
        {{ $t('comments.noComments') }}
      </div>
    </template>
    <template v-else>
      <div
        v-for="(comment, index) in props.comments"
        :key="index"
        class="comments--wrapper"
      >
        <p class="comments--wrapper--avatar">
          {{ comment.author.firstname[0].toLowerCase() }}
        </p>
        <div class="comments--wrapper--msg">
          <p>{{ comment.author.firstname }} {{ comment.author.lastname[0].toLowerCase() }}.</p>
          <p v-html="articleContent(comment.content)" />
        </div>
        <div class="comments--wrapper--metadata">
          <p>{{ $t('comments.createdAt', { creationTime: formatDate(comment.createdAt)}) }}</p>
          <p>
            {{ comment.likes.length }}
            <img
              src="@/assets/like-transp.svg"
              alt="like"
            >
          </p>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped lang="scss">
.comments {
  margin-top: 2rem;

  &--head {
    color: #070B30;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 10px;
    letter-spacing: -0.02em;
  }

  &--nocomments {
    font-size: .7rem;
    color: #070B30;
    text-align: center;
    margin-top: 2rem;
  }

  &--wrapper {
    display: flex;
    margin: 25px 0 0;
    border-bottom: 1px solid #eee;
    padding-bottom: .7rem;

    &--avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 14px;
      height: 14px;
      background: linear-gradient(87.79deg, #000A6B 0%, #790D0D 100%);
      color: #fff;
      font-size: 14px;
      padding: 10px;
      border-radius: 50%;
      margin: 0;
    } 

    &--msg {
      position: relative;
      gap: 10px;
      margin-left: 1rem;

      p {
        margin: 0;
      }

      p:first-child {
        color: #14172D;
        font-size: 12px;
        font-weight: 700;
        margin-bottom: .3rem;
      }

      p:last-child {
        color: #9CA3AF;
        font-size: 12px;
      }
    }

    &--metadata {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: auto;

      p {
        margin: 0;
      }

      p:first-child {
        color: rgba(0, 0, 0, 0.7);
        font-size: 8px;
      }

      p:last-child {
        align-items: center;
        display: flex;
        color: #536471;
        font-size: 10px;
        font-weight: 500;

        img {
          margin-left: .4rem;
        }
      }
    }
  }
}
</style>
