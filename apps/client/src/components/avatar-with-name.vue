<script setup lang="ts">
import { computed } from 'vue';
import { UserStore } from '@/types/index';
import { useUserStore } from '@/stores/user';

const props = defineProps<{
  userData: UserStore;
}>();

const { getUserInitialsLetters } = useUserStore();
const fullname = computed(() => {
  if (props.userData.provider === 'google') return props.userData.username;
  return `${props.userData.firstname} ${props.userData.lastname}`;
});
</script>

<template>
  <router-link :to="{ name: 'User', params: { id: props.userData.id}}">
    <div class="avatar">
      <div class="avatar--picture is__container__img">
        <img
          v-if="props.userData.avatar_url"
          :src="props.userData.avatar_url"
        >
        <span v-else>{{ getUserInitialsLetters(props.userData) }}</span>
      </div>
      <p class="avatar--username">
        {{ fullname }}
      </p>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.avatar {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  width: 90px;

  &--picture {
    height: 80px;
    width: 80px;

    span {
      align-items: center;
      display: flex;
      justify-content: center;
      color: aliceblue;
      background: linear-gradient(87.79deg, #000A6B 0%, #790D0D 100%);
      border-radius: 50%;
      width: 80px;
      height: 80px;
    }
  }

  &--username {
    color: #14172D;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    line-height: 14px;
    letter-spacing: -0.02em;
  }
}
</style>
