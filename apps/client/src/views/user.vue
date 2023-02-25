<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { marked } from 'marked';
import { useI18n } from 'vue-i18n';
import { UserStore } from '@/types/index';
import { useUserStore } from '@/stores/user';
import UserAbout from '@/components/user-about.vue';
import UserCommunity from '@/components/user-community.vue';
import UserPublication from '@/components/user-publications.vue';
import mocks from '@/mocks/index';

interface Category {
  active: boolean;
  tabContent: string;
  componentRelated: unknown;
}

const { t } = useI18n();
const userStore = useUserStore();
const userData = ref<UserStore>({} as UserStore);
const dataFetched = ref<boolean>(false);
const category = ref<Array<Category>>([
  {
    active: true,
    tabContent: 'Publications',
    componentRelated: UserPublication,
  },
  {
    active: false,
    tabContent: 'Communauté',
    componentRelated: UserCommunity,
  },
  {
    active: false,
    tabContent: t('userAbout.tabTitle'),
    componentRelated: UserAbout,
  },
]);

const userFullName = computed(() => {
  return `${userData.value.firstname} ${userData.value.lastname}`;
});

const isUserAuthFollowing = computed(() => userData.value.followers?.some((ff) => ff.id === userStore.id));

const descriptionMarkdown = computed(() => {
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  return marked(userData.value.description || '');
});

const switchCategory = (index: number) => {
  category.value.forEach((cat, i) => {
    if (i === index) {
      cat.active = true;
    } else {
      cat.active = false;
    }
  });
};

onMounted(async () => {
  userData.value = mocks.user2;
  dataFetched.value = true;
});
</script>

<template>
  <loader v-if="!dataFetched" />
  <template v-else>
    <header class="head">
      <div class="is__container__img head--bg--image">
        <img :src="userData.profilBackground">
      </div>
      <div class="head--nav container">
        <div class="is__container__img">
          <img src="@/assets/Union.svg">
        </div>
        <div class="is__container__img">
          <img src="@/assets/Setting.svg">
        </div>
      </div>
    </header>
    <section class="creator container">
      <div class="is__container__img creator--avatar">
        <img
          v-if="userData.avatar"
          :src="userData.avatar"
        >
      </div>
      <div class="creator--infos">
        <div class="creator--infos--left">
          <h1>{{ userFullName }}</h1>
          <div>{{ userData.followers?.length }} Contributeurs</div>
        </div>
        <div class="creator--infos--right">
          <div
            v-if="isUserAuthFollowing"
            class="is__container__img"
          >
            Abonné
            <img src="@/assets/Tick-blue.svg">
          </div>
          <div
            v-else
            class="is__container__img"
          >
            S'abonner
            <img
              src="@/assets/Lock.svg"
              alt="s'abonner"
            >
          </div>
        </div>
      </div>
      <div
        class="creator--description"
        v-html="descriptionMarkdown"
      />
    </section>
    <section class="category">
      <div class="category--wrapper container">
        <div
          v-for="(cat, index) in category"
          :key="index"
          :class="{ 'category--wrapper--active': cat.active, 'category--wrapper--inactive': !cat.active}"
          @click="switchCategory(index)"
        >
          {{ cat.tabContent }}
        </div>
      </div>
    </section>
    <main>
      <keep-alive>
        <component
          :is="category.find((c) => c.active)?.componentRelated"
          :user-data="userData"
          :show-comments-head="false"
        />
      </keep-alive>
    </main>
  </template>
</template>

<style scoped lang="scss">
.head {
  position: relative;
  max-height: 173px;

  &--nav {
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    margin-top: 2rem;
    position: absolute;
    top: 0;
    width: 100%;
  }
}

.creator {
  &--avatar {
    position: absolute;
    top: 14%;
    border-radius: 50%;
    width: 80px;
  }

  &--infos {
    margin-top: 2rem;
    align-items: flex-start;
    display: flex;
    justify-content: space-between;

    &--left {
      h1 {
        margin: 0;
        letter-spacing: -0.02em;
        color: #14172D;
      }

      div {
        color: #cacdd2;
        font-size: .7rem;
      }
    }

    &--right {
      div {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #9CA3AF;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: -0.02em;
      }
    }
  }

  &--description {
    font-size: 14px;
    color: #9CA3AF;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: -0.02em;

    p {
      margin: 0;
    }
  }
}

.category {
  border-bottom: 1px solid #eee;
  padding-bottom: .35rem;

  &--wrapper {
    display: flex;
    margin-top: 1.5rem;
    gap: 30px;

    &--inactive {
      color: #9CA3AF;
      font-weight: 500;
      letter-spacing: -0.02em;
    }

    &--active {
      color: #070B30;
      text-decoration: underline;
      text-underline-offset: 10px;
      text-decoration-thickness: 2px;
    }

    div {
      font-weight: 500;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

main {
  margin-top: 2rem;
}
</style>
