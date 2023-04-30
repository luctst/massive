<script setup lang="ts">
import { toRefs, computed, ComputedRef } from 'vue';
import http from '@/utils/http';
import { useUserStore } from '@/stores/user';
import { Article, Media } from '@/types/index';
import { toast } from 'vue3-toastify';

const userStore = useUserStore();
const props = defineProps<{ media: Article | Media; isUserAuthFollowing: boolean }>();
const { media, isUserAuthFollowing } = toRefs(props);

const userHasCreatedData: ComputedRef<boolean> = computed(() => media.value.user.id === userStore.user?.id);
const userHasLikedMedia: ComputedRef<boolean> = computed(() => media.value.likes.some((lk) => Number.parseInt(lk.user_id as string) === userStore.user?.id));
const mediaType = computed(() => {
  return media.value.card_type === 'media' ? 'isMedia' : 'isArticle';
});
const userHasBookmarked: ComputedRef<boolean | undefined> = computed(() => {
  if (mediaType.value === 'isArticle') return userStore.user?.bookmarks_article?.some((bk) => bk.id === media.value.id);
  return userStore.user?.bookmarks_media?.some((bk) => bk.id === media.value.id)
});

const handleLike = async (): Promise<void> => {
  try {
    if (!isUserAuthFollowing.value) {
      if (!userHasCreatedData.value) return;
    }

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
  } catch (error) {
    toast.error('Une erreur est survenue');
  }
};

const handleBookmark = async (): Promise<void> => {
  try {
    if (!isUserAuthFollowing.value) {
      if (!userHasCreatedData.value) return;
    }

    const utils = {
      fieldsInStore: mediaType.value === 'isArticle' ? 'bookmarks_article' : 'bookmarks_media',
    };
    const arrayToUpdate = userStore.user?.[mediaType.value === 'isArticle' ? 'bookmarks_article' : 'bookmarks_media'] as Array<Article | Media>;

    if (userHasBookmarked.value) {
      arrayToUpdate?.splice(
        arrayToUpdate?.findIndex((bk: Article | Media) => bk.id === media.value.id),
        1
      );

      await http.put(`users/${userStore.user?.id}`, {
        [utils.fieldsInStore]: arrayToUpdate?.map((bookmark: Article | Media) => bookmark.id),
      }, {
        headers: {
          Authorization: `Bearer ${userStore.user?.jwt}`,
        },
      })
      return;
    }

    await http.put(`users/${userStore.user?.id}`, {
      [utils.fieldsInStore]: arrayToUpdate?.map((bookmark: Article | Media) => bookmark.id).concat(media.value.id),
    }, {
      headers: {
        Authorization: `Bearer ${userStore.user?.jwt}`,
      },
    });

    arrayToUpdate?.push(media.value); 
  } catch (error) {
    toast.error('Une erreur est survenue');
  }
};
</script>

<template>
  <div class="media--actions">
    <div class="media--actions--likes--comments">
      <div class="is__container__img">
        <img
          v-if="!isUserAuthFollowing && !userHasCreatedData"
          src="@/assets/heart-disabled.svg"
          alt="icon like"
        >
        <img
          v-else-if="userHasLikedMedia"
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
          v-if="!isUserAuthFollowing && !userHasCreatedData"
          src="@/assets/comment-disabled.svg"
          alt="icon comment"
        >
        <img
          v-else
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
