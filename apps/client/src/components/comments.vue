<script setup lang="ts">
import { computed, onBeforeMount, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router'; 
import { Comments, Likes } from '@/types/index';
import { useUserStore } from '@/stores/user';
import formatDate from '@/utils/formatDate';

interface CommentsLikedByUserAuth {
  commentId: number;
  hasBeenLiked: boolean;
}

const route = useRoute();
const userStore = useUserStore();
const commentsLikedByUserAuth = ref<Array<CommentsLikedByUserAuth>>([]);
const newComment = ref<string>('');
const props = withDefaults(defineProps<{
  comments: Comments[];
  showCommentsHead: boolean;
  showWriteMessageBox: boolean;
}>(), {
  showCommentsHead: true,
  showWriteMessageBox: true,
});
const { comments } = toRefs(props);

const userAuthIsFollowing = computed(() => userStore.following?.some((follow) => follow.id === parseInt(route.params.id as string)));
const userAuthHasLiked = (likes: Array<Likes>): boolean => likes.some((like) => like.author.id === userStore.id);
const handleLike = (commentIndex: number): void => {
  if (commentsLikedByUserAuth.value[commentIndex].hasBeenLiked) {
    comments.value[commentIndex].likes.splice(
      comments.value[commentIndex].likes.findIndex((lk: Likes) => lk.author.id === userStore.id),
      1,
    );
    commentsLikedByUserAuth.value[commentIndex].hasBeenLiked = false;
  } else {
    comments.value[commentIndex].likes.push({ id: Math.floor(Math.random() * 10000), author: userStore });
    commentsLikedByUserAuth.value[commentIndex].hasBeenLiked = true;
  }
};
const createNewComment = () => {
  if (!newComment.value.length) return false;
  comments.value.push({
    id: Math.floor(Math.random() * 10000),
    content: newComment.value,
    createdAt: new Date(),
    author: userStore,
    likes: [],
  });
  commentsLikedByUserAuth.value.push({
    commentId: comments.value[comments.value.length - 1].id,
    hasBeenLiked: false,
  });
  newComment.value = '';
};

onBeforeMount(() => {
  commentsLikedByUserAuth.value = props.comments.map((comment) => ({
    commentId: comment.id,
    hasBeenLiked: userAuthHasLiked(comment.likes),
  }));
});
</script>

<template>
  <section class="container comments">
    <template v-if="userAuthIsFollowing">
      <div
        v-if="props.showCommentsHead"
        class="comments--head"
      >
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
            <p class="is__article__content">
              {{ comment.content }}
            </p>
          </div>
          <div class="comments--wrapper--metadata">
            <p>{{ $t('comments.createdAt', { creationTime: formatDate(comment.createdAt)}) }}</p>
            <p>
              {{ comment.likes.length }}
              <img
                v-if="commentsLikedByUserAuth[index].hasBeenLiked"
                src="@/assets/like.svg"
                alt="like"
                @click.stop="handleLike(index)"
              >
              <img
                v-else
                src="@/assets/like-transp.svg"
                alt="like"
                @click.stop="handleLike(index)"
              >
            </p>
          </div>
        </div>
        <div
          v-if="props.showWriteMessageBox"
          class="comments--write"
        >
          <form @submit.prevent="createNewComment">
            <input
              v-model="newComment"
              type="text"
              placeholder="Écrire un commentaire"
            >
            <button
              class="is__container__img"
              type="submit"
            >
              <img
                src="@/assets/icon_Send.svg"
                alt="send message icon"
              >
            </button>
          </form>
        </div>
      </template>
    </template>
    <template v-else>
      <section class="no--following">
        <div class="no--following--content">
          <div class="is__container__img">
            <img
              src="@/assets/Lock-dark.svg"
              alt="lock follow"
            >
          </div>
          <p>S'abonner pour accéder <br> à la communauté de <span>Gaspard G.</span></p>
        </div>
        <div class="loading-div" />
        <div class="loading-div" />
        <div class="loading-div" />
        <div class="loading-div" />
        <div class="loading-div" />
        <div class="loading-div" />
        <div class="loading-div" />
      </section>
    </template>
  </section>
</template>

<style scoped lang="scss">
.comments {
  overflow: scroll;

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

  &--write {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 6rem;
    background: #FFFFFF;
    box-shadow: 0px -8px 24px rgb(156 163 175 / 20%);
    left: 0;
    box-sizing: border-box;

    form {
      height: inherit;
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        max-width: 268px;
        background: #FFFFFF;
        padding: 8px 14px 26px;
        border: 1px solid #E9EBF0;
        border-radius: 8px;
        outline: none;
        width: 100%;
      }
  
      input::placeholder {
        font-family: 'Satoshi', sans-serif;
        font-size: 12px;
        color: #9CA3AF;
      }
  
      button {
        display: flex;
        border: none;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 40px;
        background: #000A6B;
        border-radius: 50%;
        margin-left: 1rem;
  
        img {
          height: 18px;
        }
      }
    }
  }
}

.no--following {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &--content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    p {
      width: 215px;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: -0.02em;
      color: #14172D;
      text-align: center;

      span {
        font-weight: 700;
      }
    }
  }

  .loading-div {
    width: 100%;
    background-color: rgba(217, 217, 217, 0.2);
    height: 47px;
  }
}
</style>
