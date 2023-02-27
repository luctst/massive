<script setup lang="ts">
import { toRefs, computed, ComputedRef } from 'vue';
import { useUserStore } from '@/stores/user';
import { Article, Media } from '@/types/index';

const userStore = useUserStore();
const props = defineProps<{ media: Article | Media }>();
const { media } = toRefs(props);

const userHasLikedMedia: ComputedRef<boolean> = computed(() => media.value.likes.some((lk) => lk.author.id === userStore.id));
const userHasBookmarked: ComputedRef<boolean | undefined> = computed(() => userStore.bookmarks?.some((bk) => bk.id === media.value.id));

const handleLike = (): void => {
  if (userHasLikedMedia.value) {
    media.value.likes.splice(
      media.value.likes.findIndex((lk) => lk.author.id === userStore.id),
      1
    );
    return;
  }

  media.value.likes.push({
    id: Math.floor(Math.random() * 1000),
    author: userStore,
  });
};

const handleBookmark = (): void => {
  if (userHasBookmarked.value) {
    userStore.bookmarks?.splice(
      userStore.bookmarks?.findIndex((bk) => bk.id === media.value.id),
      1
    );
    return;
  }

  userStore.bookmarks?.push(media.value);
};
</script>

<template>
  <div class="media--actions">
    <div class="media--actions--likes--comments">
      <div class="is__container__img">
        <img
          v-if="userHasLikedMedia"
          src="@/assets/like.svg"
          alt="icon like"
          @click.stop="handleLike"
        >
        <img
          v-else
          src="@/assets/like-transp.svg"
          alt="icon like"
          @click.stop="handleLike"
        >
        {{ media.likes.length }}
      </div>
      <div class="is__container__img">
        <img
          src="@/assets/comments.svg"
          alt="icon comment"
        >
        {{ media.comments.length }}
      </div>
    </div>
    <div class="media--actions--subscription is__container__img">
      <img
        v-if="userHasBookmarked"
        src="@/assets/bookmark-blue.svg"
        alt="icon share"
        @click.stop="handleBookmark"
      >
      <img
        v-else
        src="@/assets/bookmark-transp.svg"
        alt="icon share"
        @click.stop="handleBookmark"
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.media--actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: .3rem;

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
}
</style>
