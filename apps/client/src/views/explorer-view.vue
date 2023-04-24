<script setup lang="ts">
import { onMounted, Ref, ref, reactive } from 'vue';
import qs from 'qs';
import { Media, UserStore } from '@/types/index';
import { useUserStore } from '@/stores/user';
import http from '@/utils/http';

const userStore = useUserStore();
const dataLoaded: Ref<boolean> = ref<boolean>(false);
const mediasTrends: Ref<Array<Media>> = ref<Array<Media>>([]);
const usersTrends: Ref<Array<UserStore>> = ref<Array<UserStore>>([]);
const filters: Ref<{ search: string; category: Array<string> }> = ref({ search: '', category: []});
const categories: Array<{ value: string; active: boolean }> = reactive([
  {
    value: 'Géopolitique',
    active: false,
  },
  {
    value: 'Reportage',
    active: false,
  },
  {
    value: 'Actualité',
    active: false,
  },
  {
    value: 'France',
    active: false,
  },
  {
    value: 'Histoire',
    active: false,
  },
  {
    value: 'Société',
    active: false,
  },
]);

function handleCategoryFilter(index: number) {
  categories[index].active = !categories[index].active;
  filters.value.category = categories.filter((c) => c.active).map((c) => c.value.toLowerCase());
}

onMounted(async () => {
  try {
    function getVideosTrendings() {
      const queryParams = qs.stringify({
        populate: ['categories', 'user'],
      });

      return http.get(`/medias?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${userStore.user?.jwt}`,
        },
      });
    }

    function getUsersTrendings() {
      return http.get('/users', {
        headers: {
          Authorization: `Bearer ${userStore.user?.jwt}`,
        },
      });
    }

    const res = await Promise.all([getVideosTrendings(), getUsersTrendings()]);
    
    mediasTrends.value = res[0].data.data.map((media) => {
      const newObj = {
        id: media.id,
        ...media.attributes,
        categories: media.attributes.categories?.subjects || [],
        user: {
          id: media.attributes.user.data.id,
          ...media.attributes.user.data.attributes,
        },
      };

      return newObj;
    });
    usersTrends.value = [ ...res[1].data];
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
          v-model="filters.search"
          type="text"
          name="research"
          :placeholder="$t('discover.inputPlaceholder')"
        >
      </div>
    </section>
    <section class="filters container">
      <div class="filters--wrapper">
        <span
          v-for="(ff, index) in categories"
          :key="index"
          :class="ff.active ? 'active' : ''"
          @click="handleCategoryFilter(index)"
        >
          {{ ff.value }}
        </span>
      </div>
    </section>
    <section class="trends--videos container">
      <header class="trends--videos--header">
        <h2>{{ $t('discover.trendsVideosTitle') }}</h2>
        <a href="#">{{ $t('discover.cta') }}</a>
      </header>
      <div class="trends--videos--slider">
        <template v-if="filters.category.length">
          <template v-for="(video, index) in mediasTrends">
            <card-media
              v-if="video.categories?.some((c) => filters.category.includes(c.toLowerCase()))"
              :key="index"
              :card="video"
              :show-head="false"
              :show-actions="false"
            />
          </template>
        </template>
        <card-media
          v-for="(video, index) in mediasTrends"
          v-else
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
          v-for="(creator, index) in usersTrends"
          :key="index"
          :user-data="creator"
        />
      </div>
    </section>
    <navigation-footer />
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
    .active {
      color: aliceblue;
      background-color: #070B30;
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
