<script setup lang="ts">
import { computed, ComputedRef, onMounted, Ref, ref } from 'vue';
import { Media, UserStore } from '@/types/index';
import { useUserStore } from '@/stores/user';
import http from '@/utils/http';

const userStore = useUserStore();
const dataLoaded: Ref<boolean> = ref<boolean>(false);
const filters: ComputedRef<Array<string>> = computed(() => [
  'Géopolitique',
  'Reportage',
  'Actualité',
  'France',
  'Histoire',
  'Société',
]);

onMounted(async () => {
  try {
    await http.get('/users', {
      headers: {
        Authorization: `Bearer ${userStore.user?.jwt}`,
      },
    });

    dataLoaded.value = true;
  } catch (error) {
    throw error;
  }
});
</script>

<template>
  <loader-vue v-if="!dataLoaded" />
  <template v-else>
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
    <!-- <section class="trends--videos container">
      <header class="trends--videos--header">
        <h2>{{ $t('discover.trendsVideosTitle') }}</h2>
        <a href="#">{{ $t('discover.cta') }}</a>
      </header>
      <div class="trends--videos--slider">
        <card-media
          v-for="(video, index) in videosTrends"
          :key="index"
          :card="video"
          :show-head="false"
          :show-actions="false"
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
    </section> -->
    <navigation />
  </template>
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
