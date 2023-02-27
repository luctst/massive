<script setup lang="ts">
import { UserStore } from '@/types/index';

interface Props {
  userData: UserStore;
}

const props = defineProps<Props>();
</script>

<template>
  <section class="container publications">
    <template v-for="(card, index) in props.userData.media">
      <card-media
        v-if="card.type.isMedia"
        :key="index"
        :card="card"
      />
      <card-article
        v-else
        :key="index + 1"
        :card="card"
      />
    </template>
  </section>
  <footer>
    <div class="abo container">
      <div class="abo--price">
        <div>{{ props.userData.pricing }} €<span>/ mois</span></div>
        <a href="#">{{ $t('userPublications.seeDetails') }}</a>
      </div>
      <button>{{ $t('user.noFollow') }}</button>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  color: #FFF;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 105px;
  background: #070B30;
  box-shadow: 0px 8px 24px rgb(17 17 26 / 10%), 0px 16px 56px rgb(17 17 26 / 10%), 0px 24px 80px rgb(17 17 26 / 10%);

  .abo {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: space-between;

    &--price {
      div {
        font-weight: 700;
        font-size: 18px;
      }

      a {
        font-weight: 500;
        font-size: 14px;
        color: #9CA3AF;
      }
    }

    button {
      width: 138px;
      height: 48px;
      font-size: 16px;
      font-weight: 600;
      color: #070B30;
      background: #FFFFFF;
      border: none;
      border-radius: 80px;
    }
  }
}
</style>
