<script setup lang="ts">
import { ref } from 'vue';
import { Media, PropsAvatarWithName } from '@/types/index';
import YTpreview from '@/assets/youtube-screen.svg';
import PP from '@/assets/profil-pic1.svg';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const filters = ref<Array<string>>(i18n.getLocaleMessage(i18n.locale.value).discover.filters);
const videosTrends = ref<Array<Media>>([
  {
    author: 'Jean Masset',
    length: 50000,
    title: 'La France, une histoire de guerre',
    preview: YTpreview,
    created_at: new Date(),
  },
  {
    author: 'Jean Masset',
    length: 50000,
    title: 'La France, une histoire de guerre',
    preview: YTpreview,
    created_at: new Date(),
  },
])
const creatorsTrends = ref<Array<PropsAvatarWithName>>([
  {
    firstname: 'Gaspard',
    lastname: 'Proust',
    picture: PP,
  },
  {
    firstname: 'Gaspard',
    lastname: 'Proust',
    picture: PP,
  },
  {
    firstname: 'Gaspard',
    lastname: 'Proust',
    picture: PP,
  },
  {
    firstname: 'Gaspard',
    lastname: 'Proust',
    picture: PP,
  },
]);
</script>

<template>
  <navigation-header />
  <section class="search container">
    <div class="search--wrapper">
      <img
        src="@/assets/Search.svg"
        alt="search icon"
      >
      <input
        id="research"
        type="text"
        name="research"
        :placeholder="$t('discover.inputPlaceholder')"
      >
    </div>
  </section>
  <section class="filters container">
    <div class="filters--wrapper">
      <span
        v-for="(ff, index) in filters"
        :key="index"
      >
        {{ ff }}
      </span>
    </div>
  </section>
  <section class="trends--videos container">
    <header class="trends--videos--header">
      <h2>{{ $t('discover.trendsVideosTitle') }}</h2>
      <a href="#">{{ $t('discover.cta') }}</a>
    </header>
    <div class="trends--videos--slider">
      <card
        v-for="(video, index) in videosTrends"
        :key="index"
        :media="video"
      />
    </div>
  </section>
  <section class="trends--creators container">
    <header class="trends--creators--header">
      <h2>{{ $t('discover.trendsCreatorsTitle') }}</h2>
      <a href="#">{{ $t('discover.cta') }}</a>
    </header>
    <div class="trends--creators--slider">
      <avatar-with-name
        v-for="(creator, index) in creatorsTrends"
        :key="index"
        :user-data="creator"
      />
    </div>
  </section>
  <navigation />
</template>

<style scoped lang="scss">
.search {
  &--wrapper {
    background-color: #EEF2F5;
    display: flex;
    padding-left: 15px;
    border-radius: 8px;

    input {
      width: 100%;
      padding: 15px 20px;
      border: none;
      background-color: transparent;

      &::placeholder {
        font-family: 'Satoshi', sans-serif;
        font-size: 14px;
        color: #9CA3AF;
      }
    }
  }
}

.filters {
  &--wrapper {
    display: flex;
    gap: 8px;
    margin: 20px 0 0 0px;
    overflow-x: auto;

    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }

    span {
      font-size: 14px;
      color: #9CA3AF;
      background-color: transparent;
      padding: 7px 10px;
      border: 1px solid #9CA3AF;
      border-radius: 30px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.trends--videos {
  margin-top: 2rem;

  &--header {
    align-items: center;
    display: flex;
    justify-content: space-between;

    h2 {
      font-size: 17px;
      color: #1F2E45;
      letter-spacing: -0.02em;
      margin: 0;
    }

    a {
      color: #790D0D;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: -0.02em;
      text-decoration: none;
    }
  }

  &--slider {
    display: -webkit-box;
    margin-top: 1rem;
    overflow-x: auto;

    div {
      margin-right: .8rem;
    }
  }
}

.trends--creators {
  margin-top: 30px;

  &--header {
    align-items: center;
    display: flex;
    justify-content: space-between;

    h2 {
      font-size: 17px;
      color: #1F2E45;
      letter-spacing: -0.02em;
      margin: 0;
    }

    a {
      color: #790D0D;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: -0.02em;
      text-decoration: none;
    }
  }

  &--slider {
    margin-top: 1.5rem;
    display: flex;
    gap: 5px;
    overflow-x: auto;
  }
}
</style>
