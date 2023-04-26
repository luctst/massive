<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import utils from '@/utils/index';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { user, removeUser } = useUserStore();
const inputFile = ref<HTMLInputElement | null>(null);
const viewToLoad = ref<'root' | 'subscribes' | 'personalData'>('root');
const links = ref<Array<{ value: string; onClick: () => void; }>>([
  {
    value: t('userUpdate.links.subscribes'),
    onClick: () => {
      viewToLoad.value = 'subscribes';
    },
  },
  {
    value: t('userUpdate.links.personalData'),
    onClick: () => {
      viewToLoad.value = 'personalData';
    },
  },
  {
    value: t('userUpdate.links.support'),
    onClick: () => router.push({ name: 'Support' }),
  },
  {
    value: t('userUpdate.links.logout'),
    onClick: () => {
      removeUser();
      router.push({ name: 'Auth' });
    },
  },
]);

const goBack = (): void => {
  if (viewToLoad.value !== 'root') {
    viewToLoad.value = 'root';
    return;
  }

  router.go(-1);
};

const changeProfilePicture = (): void => {
  if (!inputFile.value) return;
  console.log(inputFile.value.files);
};

const appVersion = computed(() => {
  return window.__VERSION__;
});
const titleContent = computed(() => {
  if (viewToLoad.value === 'root') return t('userUpdate.title');
  if (viewToLoad.value === 'subscribes') return t('userUpdate.links.subscribes');
  if (viewToLoad.value === 'personalData') return t('userUpdate.links.personalData');
  return '';
});
const getUserEmail = computed(() => {
  if (!user) return '';
  return user.email;
});
const userName = computed(() => {
  if (!user) return '';
  return `${user.firstname} ${user.lastname}`;
});
const getNameInitial = computed(() => {
  if (!user) return '';
  return `${user.firstname[0].toUpperCase()}${user.lastname[0].toUpperCase()}`;
});

onMounted(() => {
  if (user?.id !== Number.parseInt(route.params.id as string)) {
    return router.push({ name: 'Home' });
  }
});
</script>

<template>
  <header class="header container">
    <div
      class="is__container__img"
      @click.stop="goBack"
    >
      <img src="@/assets/go-back-profil.svg">
    </div>
    <div class="header--title">
      <h1 :class="viewToLoad === 'root' ? 'is__h1' : 'is__h2'">
        {{ titleContent }}
      </h1>
    </div>
  </header>
  <template v-if="viewToLoad === 'root'">
    <section class="sub--header container">
      <div class="sub--header--avatar">
        <div class="is__container__img">
          <img
            v-if="user?.avatar"
            :src="user.avatar"
          >
          <div v-else>
            {{ getNameInitial }}
          </div>
        </div>
      </div>
      <div class="sub--header--name">
        <h2>{{ userName }}</h2>
      </div>
      <div class="sub--header--mail">
        <p>{{ getUserEmail }}</p>
      </div>
    </section>
    <main class="container">
      <ul>
        <li
          v-for="link in links"
          :key="link.value"
          @click.stop="link.onClick"
        >
          {{ link.value }}
        </li>
      </ul>
    </main>
    <footer class="container footer">
      <div class="is__container__img">
        <img src="@/assets/logo-massive.svg">
      </div>
      <div class="footer--content">
        <div>MASSIVE APPLICATION</div>
        <div>Version {{ appVersion }}</div>
      </div>
    </footer>
  </template>
  <template v-else-if="viewToLoad === 'subscribes'">
    <section class="subscribes--list container">
      <div
        v-for="(creator, index) in user?.followings"
        :key="index"
        class="subscribes--list--item"
      >
        <div class="subscribes--list--item--avatar is__container__img">
          <img
            v-if="creator.avatar"
            :src="creator.avatar"
          >
          <div v-else>
            {{ `${creator.firstname[0].toUpperCase()}${creator.lastname[0].toUpperCase()}` }}
          </div>
        </div>
        <div class="subscribes--list--item--name">
          <h3>{{ `${creator.firstname} ${creator.lastname}` }}</h3>
          <span>Abonné depuis {{ utils.formatDate(new Date()) }}</span>
        </div>
        <div class="subscribes--list--item--actions">
          <button>Se désabonner</button>
        </div>
      </div>
    </section>
  </template>
  <template v-else>
    <section class="sub--header--personal--data container">
      <div class="sub--header--personal--data--title">
        Photo de profil
      </div>
      <div class="sub--header--personal--data--picture">
        <div class="is__container__img">
          <img
            v-if="user?.avatar"
            :src="user.avatar"
          >
          <div v-else>
            {{ getNameInitial }}
          </div>
        </div>
        <div class="sub--header--personal--data--picture--action">
          <input
            ref="inputFile"
            type="file"
            accept="image/*"
            placeholder="Modifier la photo"
            @change="changeProfilePicture"
          >
          <div>
            <img src="@/assets/update-profil.svg">
            <div>Modifier la photo</div>
          </div>
        </div>
      </div>
    </section>
  </template>
</template>

<style lang="scss" scoped>
.header {
  align-items: center;
  display: flex;
  margin-top: 2rem;
  .is__container__img {
    align-items: center;
    display: flex;
    width: 12px;

    &:hover {
      cursor: pointer;
    }
  }

  &--title {
    margin-left: 1rem;

    h1 {
      font-family: 'Satoshi', sans-serif;
      color: #000;
      margin: 0;
    }

    .is__h1 {
      font-size: 2rem;
    }

    .is__h2 {
      font-size: 1.25rem;
    }
  }
}

.sub--header {
  margin-top: 2rem;

  &--avatar {
    .is__container__img {
      width: 22%;
  
      div {
        align-items: center;
        display: flex;
        justify-content: center;
        background: rgb(123, 121, 255);
        border-radius: 50%;
        width: 80px;
        height: 80px;
      }
    }
  }

  &--name {
    margin-top: 1rem;

    h2 {
      font-family: 'Satoshi', sans-serif;
      margin: 0;
      color: #000;
      font-size: 1.5rem;
    }
  }

  &--mail {
    margin-top: .3rem;

    p {
      font-family: 'Satoshi', sans-serif;
      font-weight: bold;
      color: #9CA3AF;
      font-size: .8rem;
      margin: 0;
    }
  }
}

main {
  margin-top: 2.5rem;

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
      font-family: 'Satoshi', sans-serif;
      border-bottom: .5px solid #D9D9D9;
      font-size: 1rem;
      color: #14172D;
      padding-bottom: 1rem;
      padding-top: 1rem;

      &:hover {
        cursor: pointer;
      }
    }

    li:first-child {
      padding-top: 0;
    }

    li:last-child {
      color: #790D0D;
      border-bottom: none;
    }
  }
}

.footer {
  align-items: center;
  flex-direction: column;
  display: flex;
  .is__container__img {
    width: 22%;
  }
  
  &--content {
    margin-top: 1rem;
    font-family: 'satoshi', sans-serif;
    color: #8C8C8C;
    font-size: .7rem;
    text-align: center;
  }
}

.subscribes--list {
  margin-top: 2rem;

  &--item {
    align-items: center;
    display: flex;
    margin-bottom: 1rem;
    border-bottom: 1px solid #D9D9D9;
    padding-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    &--avatar {
      div {
        background: rgb(123, 121, 255);
        border-radius: 50%;
        width: 42px;
        height: 42px;
        align-items: center;
        display: flex;
        justify-content: center;
      }
    }

    &--name {
      margin-left: 1rem;

      h3 {
        font-family: 'Satoshi', sans-serif;
        font-size: 1rem;
        color: #14172D;
        margin: 0;
      }

      span {
        font-family: 'Satoshi', sans-serif;
        font-size: .7rem;
        color: #9CA3AF;
      }
    }

    &--actions {
      margin-left: auto;

      button {
        background: transparent;
        border: none;
        color: #790D0D;
        font-family: 'Satoshi', sans-serif;
        font-size: .8rem;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}

.sub--header--personal--data {
  margin-top: 3rem;

  &--title {
    font-family: 'Satoshi', sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
    color: #14172D;
    margin: 0;
  }

  &--picture {
    align-items: center;
    display: flex;
    margin-top: 1rem;
    
    .is__container__img {
      width: 22%;

      div {
        background: rgb(123, 121, 255);
        border-radius: 50%;
        width: 80px;
        height: 80px;
        align-items: center;
        display: flex;
        justify-content: center;
      }
    }

    &--action {
      align-items: center;
      display: flex;
      margin-left: 2rem;

      input[type="file"] {
        position: relative;
        z-index: 2;
        opacity: 0;
      }

      div {
        align-items: center;
        display: flex;
        position: absolute;
        width: 51%;

        div {
          font-family: 'Satoshi', sans-serif;
          font-size: .8rem;
          color: #000;
          margin-left: 1.5rem;
        }
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
