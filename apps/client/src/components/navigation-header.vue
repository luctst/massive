<script setup lang="ts"></script>

<template>
  <header class="container">
    <h1>{{ $t($route.meta.headerTitle as string) }}</h1>
    <div class="is__container__img">
      <img src="@/assets/icon_filter.svg">
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;

  h1 {
    font-size: 30px;
    font-weight: 900;
    color: #000000;
    margin: 0;
  }

  .is__container__img {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
