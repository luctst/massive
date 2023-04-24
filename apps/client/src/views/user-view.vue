<script setup lang="ts">
import { onMounted, ref, computed, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import { useI18n } from 'vue-i18n';
import qs from 'qs';
import { UserStore } from '@/types/index';
import { useUserStore } from '@/stores/user';
import UserAbout from '@/components/user-about.vue';
import UserCommunity from '@/components/user-community.vue';
import UserPublication from '@/components/user-publications.vue';
import http from '@/utils/http';
import utils from '@/utils';

interface Category {
  active: boolean;
  tabContent: string;
  componentRelated: unknown;
}

const { t } = useI18n();
const route = useRoute();
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
    tabContent: t('userCommunity.tabTitle'),
    componentRelated: UserCommunity,
  },
  {
    active: false,
    tabContent: t('userAbout.tabTitle'),
    componentRelated: UserAbout,
  },
]);

const userFullName: ComputedRef<string> = computed(() => {
  return `${userData.value.firstname} ${userData.value.lastname}`;
});

const isUserAuthFollowing: ComputedRef<boolean | undefined> = computed(() => userData.value.followers?.some((ff) => ff.id === userStore.user?.id));
const isUserAuthOnHisProfil: ComputedRef<boolean> = computed(() => userStore.user?.id === Number.parseInt(route.params.id as string));
const getNameInitial: ComputedRef<string> = computed(() => `${userStore.user?.firstname[0].toUpperCase()}${userStore.user?.lastname[0].toUpperCase()}`);


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
  if (isUserAuthOnHisProfil.value) {
    userData.value = userStore.user;
    dataFetched.value = true;
    return;
  }

  const { data } = await http.get(`/users/${route.params.id}?${qs.stringify({ populate: utils.populateUsersData })}`, {
    headers: {
      Authorization: `Bearer ${userStore.user?.jwt}`,
    },
  });

  userData.value = data;
  dataFetched.value = true;
});
</script>

<template>
  <loader-vue v-if="!dataFetched" />
  <template v-else>
    <header class="head">
      <div class="is__container__img head--bg--image">
        <img :src="userData.profil_background">
      </div>
      <div class="head--nav container">
        <div
          class="is__container__img"
          @click.stop="$router.go(-1)"
        >
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
        <span v-else>{{ getNameInitial }}</span>
      </div>
      <div class="creator--infos">
        <div class="creator--infos--left">
          <h1>{{ userFullName }}</h1>
          <div>{{ userData.followers?.length }} Contributeurs</div>
        </div>
        <div class="creator--infos--right">
          <div 
            v-if="isUserAuthOnHisProfil"
            class="update"
          >
            <router-link
              :to="{ name: 'UserUpdate', params: { id: userStore.user?.id}}"
              class="is__container__img"
            >
              {{ $t('user.update') }}
              <img src="@/assets/update-profil.svg">
            </router-link>
          </div>
          <div
            v-else-if="isUserAuthFollowing"
            class="is__container__img"
          >
            {{ $t('user.follow') }}
            <img src="@/assets/Tick-blue.svg">
          </div>
          <div
            v-else
            class="is__container__img no--follow"
          >
            {{ $t('user.noFollow') }}
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
          :is-user-auth-on-his-profile="isUserAuthOnHisProfil"
          :is-user-auth-following="isUserAuthFollowing"
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

    span {
      align-items: center;
      display: flex;
      justify-content: center;
      background: rgb(123, 121, 255);
      border-radius: 50%;
      width: 80px;
      height: 80px;
    }
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
      a {
        display: flex;
        text-decoration: none;
        gap: 12px;
        color: #9CA3AF;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: -0.02em;
      }

      div {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #9CA3AF;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: -0.02em;
      }

      .no--follow {
        color: #000A6B;
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
