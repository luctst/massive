<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { AxiosError } from 'axios';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

type DataForApi = 'email' | 'password';

interface Rules {
  key: string;
  type: 'text' | 'password';
  error: string | null;
  label: string;
  hasBeenBlured: boolean;
  validate: (value: string) => null | string;
  placeholder?: string;
}

const { push } = useRouter();
const userStore = useUserStore();
const { t } = useI18n();
const callApiDone = ref<boolean>(true);
const dataForApi = ref<{ [key in DataForApi]: string}>({
  email: '',
  password: '',
});

function wrapperValidate(self: Rules, evtName: string, cb: Rules['validate']) {
  if (evtName === 'input' && self.hasBeenBlured === false) return;
  if (evtName === 'blur' && self.hasBeenBlured === false) self.hasBeenBlured = true;
  self.error = cb(dataForApi.value[self.key as keyof { email: ''; password: ''}]);
}

const rules = ref<Array<Rules>>([
  {
    key: 'email',
    type: 'text',
    error: null,
    label: t('signup.inputs[0].label'),
    hasBeenBlured: false,
    validate: (value: string) => {
      if (value.length === 0) return t('signup.inputs[0].error.default');
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) === false) return t('signup.inputs[0].error.pattern');
      return null;
    },
    placeholder: t('signup.inputs[0].placeholder'),
  },
  { 
    key: 'password',
    type: 'password',
    error: null,
    label: t('signup.inputs[1].label'),
    hasBeenBlured: false,
    validate: (value: string) => {
      if (value.length === 0) return t('signup.inputs[1].error.default');
      return null;
    },
  },
]);

const authUser = async () => {
  if (!rules.value.every((rule) => rule.error === null ? true : false)) return;
  callApiDone.value = false;

  const result = await userStore.authUser(dataForApi.value);

  if (result instanceof AxiosError) {
    if (result.response) {
      if (result.response?.status >= 400 && result.response?.status <= 499) {
        callApiDone.value = true;
        return toast.error(t(`signup.errorApi.${result.response?.status}`));
      }
    }

    callApiDone.value = true;
    return toast.error(t('signup.errorApi.default'));
  }

  push({ name: 'Home' });
};

const logWithGoogle = () => {
  window.open(`http://localhost:1337/api/connect/google`);
}
</script>

<template>
  <header class="login--header">
    <div class="login--header--wrapper container">
      <h1>{{ $t('signup.title') }}</h1>
      <p>{{ $t('signup.subTitle') }}</p>
    </div>
  </header>
  <main class="container">
    <form @submit.prevent="authUser">
      <div
        v-for="(input, index) in rules"
        :key="index"
        class="input-group"
      >
        <label :for="input.key">{{ input.label }}</label>
        <input
          :id="input.key"
          v-model="dataForApi[input.key as keyof {}]"
          :type="input.type"
          :placeholder="input.placeholder"
          @input="wrapperValidate(input, $event.type, input.validate)"
          @blur="wrapperValidate(input, $event.type, input.validate)"
        >
        <small
          v-if="input.hasBeenBlured && input.error"
          class="error"
        >{{ input.error }}</small>
      </div>
      <div class="btn-box">
        <button
          id="create-count-btn"
          type="submit"
        >
          <template v-if="callApiDone">
            {{ $t('signup.cta') }}
          </template>
          <img
            v-else
            src="@/assets/loader-svg.svg"
          >
        </button>
        <login-with-google />
      </div>
    </form>
    <p id="already-user">
      {{ $t('signup.noAccount') }}
      <router-link to="/auth/signin">
        {{ $t('signup.noAccountLink') }}
      </router-link>
    </p>
  </main>
</template>

<style scoped lang="scss">
small {
  color: #f78989;
}
.login--header {
  align-items: flex-end;
  display: flex;
  height: 10rem;
  background: #070B30;

  &--wrapper {
    margin-bottom: 2rem;
    width: 100%;

    h1 {
      font-size: 30px;
      font-weight: 900;
      color: #FFF;
      margin: 0;
      margin-bottom: .2rem;
    }

    p {
      font-size: 15px;
      color: #9CA3AF;
      margin: 0;
    }
  }
}

main {
  height: calc(100vh - 10rem);

  form {
    display: flex;
    flex-direction: column;
    gap: 31px;
    margin-top: 3rem;

    .input-group {
      position: relative;
      display: flex;
      flex-direction: column;

      label {
        color: #14172D;
        font-size: 17px;
        font-weight: 700;
        margin-bottom: 16px;
      }

      input {
        position: relative;
        padding: 0 10px 7px;
        border-width: 1px;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        outline: none;

        &:placeholder {
          font-family: 'Satoshi', sans-serif;
          font-style: 15px;
          color: #9ca3af;
        }
      }

      input[type="password"] {
        font-size: 22px;
        color: #9CA3AF;
      }

      #icon-pass {
        position: absolute;
        right: 10px;
        bottom: 11px;
      }
    }

    .btn-box {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 25px;

      button {
        width: 100%;
        font-size: 16px;
        padding: 15px;
        border-radius: 30px;
        border: none;
        outline: none;

        &:hover {
          cursor: pointer;
        }

        img {
          width: 1.5rem;
        }
      }

      #create-count-btn {
        width: 100%;
        font-size: 16px;
        padding: 15px;
        border-radius: 30px;
        border: none;
        outline: none;
        font-family: 'Satoshi', sans-serif;
        color: #FFF;
        font-weight: 500;
        background: linear-gradient(87.79deg, #000A6B 0%, #790D0D 100%);
      }
    }

    @media (max-width: 361px) {
      padding: 0 20px;
    }
  }
}

#already-user {
    color: #424244;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    margin: 33px 0 80px;
  }

#already-user a {
  text-decoration: none;
  color: #020a69;
}
</style>
