<script setup lang="ts">
import { toRefs, computed, ComputedRef } from 'vue';
import http from '@/utils/http';
import { useUserStore } from '@/stores/user';
import { Article, Media } from '@/types/index';

const userStore = useUserStore();
const props = defineProps<{ media: Article | Media }>();
const { media } = toRefs(props);

const userHasLikedMedia: ComputedRef<boolean> = computed(() => media.value.likes.some((lk) => Number.parseInt(lk.user_id as string) === userStore.user?.id));
const mediaType = computed(() => {
  if (media.value.views) return 'isMedia';
  return 'isArticle';
});
const userHasBookmarked: ComputedRef<boolean | undefined> = computed(() => {
  if (mediaType.value === 'isArticle') return userStore.user?.bookmarks_article?.some((bk) => bk.id === media.value.id);
  return userStore.user?.bookmarks_media?.some((bk) => bk.id === media.value.id)
});

const handleLike = async (): Promise<void> => {
  if (userHasLikedMedia.value) {
    media.value.likes.splice(
      media.value.likes.findIndex((lk) => lk.user_id === userStore.user?.id),
      1
    );

    await http.put(`${mediaType.value === 'isArticle' ? 'articles' : 'medias'}/${media.value.id}`, {
      data: {
        likes: media.value.likes,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${userStore.user?.jwt}`,
      },
    })
    return;
  }

  const { data } = await http.put(`${mediaType.value === 'isArticle' ? 'articles' : 'medias'}/${media.value.id}`, {
    data: {
      likes: [
        ...media.value.likes,
        {
          user_id: userStore.user?.id,
        },
      ],
    },
  },
  {
    params: {
      populate: 'likes',
    },
    headers: {
      Authorization: `Bearer ${userStore.user?.jwt}`,
    },
  });
  media.value.likes.push(data.data.attributes.likes[data.data.attributes.likes.length - 1]);
};

const handleBookmark = async (): Promise<void> => {
  const utils = {
    fieldsInStore: mediaType.value === 'isArticle' ? 'bookmarks_article' : 'bookmarks_media',
  };

  if (userHasBookmarked.value) {
    userStore.user?.[utils.fieldsInStore].splice(
      userStore.user?.[utils.fieldsInStore]?.findIndex((bk) => bk.id === media.value.id),
      1
    );

    await http.put(`users/${userStore.user?.id}`, {
      [utils.fieldsInStore]: userStore.user?.[utils.fieldsInStore].map((bookmark) => bookmark.id),
    }, {
      headers: {
        Authorization: `Bearer ${userStore.user?.jwt}`,
      },
    })
    return;
  }

  await http.put(`users/${userStore.user?.id}`, {
    [utils.fieldsInStore]: userStore.user?.[utils.fieldsInStore]?.map((bookmark) => bookmark.id).concat(media.value.id),
  }, {
    headers: {
      Authorization: `Bearer ${userStore.user?.jwt}`,
    },
  });

  userStore.user?.[utils.fieldsInStore].push(media.value);
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
