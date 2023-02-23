<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { UserStore } from '@/types/index';
import iconInstagram from '@/assets/icon_instagram.svg';
import iconInternet from '@/assets/icon_internet.svg';
import iconYoutube from '@/assets/icon_youtube.svg';

interface Props {
  userData: UserStore;
}

const props = defineProps<Props>();

const userSocialKeys: ComputedRef<Array<string>> = computed(() => {
  return Object.keys(props.userData.social || {});
});

const returnImgSocial = (socialId: string): string => {
  switch (socialId) {
    case 'facebook':
      return '';
    case 'twitter':
      return '';
    case 'web':
      return iconInternet;
    case 'instagram':
      return iconInstagram;
    case 'youtube':
      return iconYoutube;
    default:
      return '';
  }
};

const userCreatedAt = computed(() => {
  const date = props.userData.createdAt;
  return `${date.getDate()} ${date.toLocaleDateString('fr-FR', { month: 'long' })} ${date.getFullYear()}`;
});
</script>

<template>
  <header class="about container">
    <div class="about--publications">
      {{ props.userData.media?.length }}
      <span>{{ $t('userAbout.publications') }}</span>
    </div>
    <div class="about--followers">
      {{ props.userData.followers?.length }}
      <span>{{ $t('userAbout.contributors') }}</span>
    </div>
  </header>
  <section class="infos container">
    <div>{{ $t('userAbout.tabTitle') }}</div>
    <p
      class="is__article__content"
      v-html="userData.description || ''"
    />
  </section>
  <section class="social container">
    <div>{{ $t('userAbout.socialTitle') }}</div>
    <ul v-if="userSocialKeys.length">
      <li
        v-for="(link, index) in userSocialKeys"
        :key="index"
      >
        <a
          :href="userData.social[link]"
          target="_blank"
        >
          <img :src="returnImgSocial(link)">
        </a>
      </li>
    </ul>
  </section>
  <div class="createdat container">
    {{ $t('userAbout.activeSince', { date: userCreatedAt }) }}
  </div>
</template>

<style scoped lang="scss">
.about {
  display: flex;

  &--publications,
  &--followers {
    display: flex;
    flex-direction: column;
    color: #14172D;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;

    span {
      color: #14172D;
      font-weight: 700;
      letter-spacing: -0.02em;
      font-size: 1rem;
    }
  }

  &--followers {
    margin-left: 3rem;
  }
}

.infos {
  margin-top: 2rem;

  div {
    color: #14172D;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
  }
}

.social {
  margin-top: 1.5rem;

  div {
    color: #14172D;
    font-weight: 700;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  ul {
    align-items: center;
    display: flex;
    margin: 0;
    padding: 0;

    li {
      margin-right: 1rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.createdat {
  margin-top: 2rem;
  color: #9CA3AF;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
</style>
