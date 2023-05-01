<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { AxiosError } from 'axios';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ReqAxiosNewUser } from '@/types';
import { useUserStore } from '@/stores/user';
import http from '@/utils/http';

interface Rules {
  key: keyof ReqAxiosNewUser;
  error: string | null;
  label: string;
  placeholder: string;
  hasBeenBlured: boolean;
  validate: (value: string) => null | string;
}

const { t } = useI18n();
const { push } = useRouter();
const callApiDone = ref<boolean>(true);
const conditionLegals = ref<{ isChecked: boolean; error: string | null }>({
  isChecked: false,
  error: null,
});
const dataForApi = ref<ReqAxiosNewUser>({
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  email: '',
});

function isInputEmpty(value: string) {
  if (value.length === 0) return 'Ce champ est obligatoire';
  return null;
}
const isUsernameValid = (value: string) => {
  if (value.length < 3 || value.length > 20) return 'Le nom d\'utilisateur doit contenir entre 3 et 20 caractères';
  return null;
};
const isPasswordValid = (value: string) => {
  if (value.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
  return null;
};
const isEmailValidWithRegex = (value: string) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) === false) return 'L\'adresse email n\'est pas valide';
  return null;
};

function wrapperValidate(self: Rules, evtName: string, cb: Rules['validate']) {
  if (evtName === 'input' && self.hasBeenBlured === false) return;
  if (evtName === 'blur' && self.hasBeenBlured === false) self.hasBeenBlured = true;
  self.error = cb(dataForApi.value[self.key]);
}

const rules = ref<Array<Rules>>(
  [
    {
      key: 'firstname',
      validate: isInputEmpty,
      error: null,
      hasBeenBlured: false,
      label: t('signin.firstName.label'),
      placeholder: t('signin.firstName.placeholder'),
    },
    {
      key: 'lastname',
      validate: isInputEmpty,
      error: null,
      hasBeenBlured: false,
      label: t('signin.lastName.label'),
      placeholder: t('signin.lastName.placeholder'),
    },
    {
      key: 'username',
      validate: isUsernameValid,
      error: null,
      hasBeenBlured: false,
      label: t('signin.userName.label'),
      placeholder: t('signin.userName.placeholder'),
    },
    {
      key: 'password',
      validate: isPasswordValid,
      error: null,
      hasBeenBlured: false,
      label: t('signin.password.label'),
      placeholder: '',
    },
    {
      key: 'email',
      validate: isEmailValidWithRegex,
      error: null,
      hasBeenBlured: false,
      label: t('signin.mail.label'),
      placeholder: t('signin.mail.placeholder'),
    },
  ]
);

const createUser = async () => {
  if (conditionLegals.value.isChecked === false) {
    conditionLegals.value.error = 'Vous devez accepter les conditions légales';
    return;
  }
  
  if (!rules.value.every((rule) => rule.error === null ? true : false)) return;

  callApiDone.value = false;
  const result = await useUserStore().registerUser(dataForApi.value);

  if (result instanceof AxiosError) {
    if (result.response) {
      if (result.response?.status >= 400 && result.response?.status <= 499) {
        callApiDone.value = true;
        return toast.error(t(`signin.errorApi.${result.response?.status}`));
      }
    }

    callApiDone.value = true;
    return toast.error(t('signin.errorApi.default'));
  }

  push({ name: 'Home' });
};
</script>

<template>
  <main class="signin">
    <header>
      <div class="header--content container">
        <h1>{{ $t('signin.title') }}</h1>
        <p>{{ $t('signin.subTitle') }}</p>
      </div>
    </header>
    <form
      class="container"
      @submit.prevent="createUser"
    >
      <div
        v-for="(input, index) in rules"
        :key="index"
        class="input-group"
      >
        <label :for="input.key">{{ input.label }}</label>
        <input
          :id="input.key"
          v-model="dataForApi[input.key]"
          :type="input.key === 'password' ? 'password' : 'text'"
          :placeholder="input.placeholder"
          @input="wrapperValidate(input, $event.type, input.validate)"
          @blur="wrapperValidate(input, $event.type, input.validate)"
        >
        <small v-if="input.error">{{ input.error }}</small>
        <span
          v-if="input.key === 'password'"
          id="icon-pass"
        >
          <img
            src="@/assets/viewpassword.svg"
            alt="icon password"
          >
        </span>
      </div>
      <div class="checkbox-validation">
        <div>
          <input
            id="validation"
            v-model="conditionLegals.isChecked"
            type="checkbox"
            name="validation"
          >
          <label
            for="validation"
            v-html="$t('signin.legal')"
          />
        </div>
        <small v-if="!conditionLegals.isChecked">{{ conditionLegals.error }}</small>
      </div>
      <div class="btn-box">
        <button
          id="create-count-btn"
          type="submit"
        >
          <template v-if="callApiDone">
            {{ $t('signin.createAccount') }}
          </template>
          <img
            v-else
            src="@/assets/loader-svg.svg"
          >
        </button>
        <login-with-google :btn-content="$t('signin.signinWithGoogle')"/>
      </div>
    </form>
    <p
      id="already-user"
      v-html="$t('signin.alreadyAccount')"
    />
  </main>
</template>

<style scoped lang="scss">
small {
  color: #f78989;
}
.signin {
  display: flex;
  flex-direction: column;

  header {
    align-items: flex-end;
    display: flex;
    height: 10rem;
    background: #070B30;

    .header--content {
      margin-bottom: 2rem;
      width: 100%;

      h1 {
        font-size: 30px;
        font-weight: 900;
        color: #FFF;
        margin: 0;
        margin-bottom: .5rem;
      }
  
      p {
        font-size: 15px;
        color: #9CA3AF;
        margin: 0;
      }
    }

    @media (max-width: 361px) {
      padding: 0 20px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 31px;
    margin-top: 49px;

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

    .checkbox-validation {
      div {
        display: flex;
        gap: 11px;
      }

      a {
        text-decoration: none;
        accent-color: #020A69;
        -ms-transform: scale(1.25);
        /* IE */
        -moz-transform: scale(1.25);
        /* FF */
        -webkit-transform: scale(1.25);
        /* Safari and Chrome */
        -o-transform: scale(1.25);
        /* Opera */
        transform: scale(1.25);
      }

      label {
        font-size: 14px;
        color: #9CA3AF;

        span {
          color: #020A69;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      }
    }

    .btn-box {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 25px;
      margin-top: 16px;

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
}
</style>
