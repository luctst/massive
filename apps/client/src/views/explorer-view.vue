<script setup lang="ts">
import { onMounted, Ref, ref, reactive } from 'vue';
import { Article, Media, UserStore } from '@/types/index';
import { useUserStore } from '@/stores/user';
import http from '@/utils/http';
import { toast } from 'vue3-toastify';

const userStore = useUserStore();
const dataLoaded: Ref<boolean> = ref<boolean>(false);
const mediasTrends: Ref<Array<Media>> = ref<Array<Media>>([]);
const usersTrends: Ref<Array<UserStore>> = ref<Array<UserStore>>([]);
const filters: Ref<{ search: string; category: Array<string>; searchResult: Array<Media | Article> }> = ref({ search: '', category: [], searchResult: [] });
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

async function handleSearch() {
  try {
    if (!filters.value.search.length) {
      filters.value.searchResult = [];
      return false;
    }

    const { data } = await http.get(`/users?filters[$or][0][firstname][$contains]=${filters.value.search}&filters[$or][1][lastname][$contains]=${filters.value.search}&filters[$or][2][username][$contains]=${filters.value.search}&populate=deep`, {
      headers: {
        Authorization: `Bearer ${userStore.user?.jwt}`,
      },
    });

    filters.value.searchResult = data.map((user: UserStore) => {
      return ([] as Array<any>).concat(user.media, user.articles);
    })
    .flat()
    .map((item: Media | Article) => {
      const newItem = { ...item };

      if ('preview' in newItem) {
        newItem.card_type = 'media';
      } else {
        newItem.card_type = 'article';
      }

      return newItem;
    });
    console.log(data);
  } catch (error) {
    toast.error('Une erreur est survenue');
  }
}

onMounted(async () => {
  try {
    function getVideosTrendings() {
      return http.get(`/medias?populate=deep`, {
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
    
    mediasTrends.value = res[0].data.data.map((media: any) => {
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
    usersTrends.value = res[1].data.filter((user: UserStore) => user.id !== userStore.user?.id);
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
          @input="handleSearch"
        >
      </div>
    </section>
    <template v-if="filters.search.length">
      <main class="filters--search container">
        <header class="filters--search--header">
          <div v-if="!filters.searchResult.length">
            Les plus recherchés
          </div>
          <div v-else>
            Résultat pour {{ filters.search }}
          </div>
        </header>
        <section
          v-if="!filters.searchResult.length"
          class="filters--search--list"
        >
          <ul>
            <li
              v-for="(creator, index) in usersTrends"
              :key="index"
            >
              <img
                src="@/assets/Search.svg"
                alt="search icon"
              >
              {{ creator.provider === 'google' ? creator.username : `${creator.firstname} ${creator.lastname}` }}
            </li>
          </ul>
        </section>
        <section class="filters--search--publications">
          <template
            v-for="(ff, index) in filters.searchResult"
            :key="index"
          >
            <section
              :data-id="ff.id"
              class="medias--container"
            >
              <div>
                <card-media
                  v-if="ff.card_type === 'media'"
                  :card="ff"
                />
                <card-article
                  v-else
                  :card="ff"
                />
              </div>
            </section>  
          </template>
        </section>
      </main>
    </template>
    <template v-else>
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

.filters--search {
  margin-top: 2rem;

  &--header {
    div {
      color: #1F2E45;
      font-family: 'Satoshi', sans-serif;
      font-size: 1rem;
      font-weight: 700;
    }
  }

  &--list {
    margin-top: 1rem;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      padding-left: 1rem;

      li {
        color: #9CA3AF;
        display: flex;
        font-family: 'Satoshi', sans-serif;
        font-size: 1.1rem;

        img {
          margin-right: 1rem;
        }
      }
    }
  }

  &--publications {
    margin-top: 2rem;
    .medias--container {
      div {
        margin-bottom: 2rem;
      }

      &:last-child {
        margin-bottom: 0;
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
