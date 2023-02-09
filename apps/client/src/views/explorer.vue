<script setup lang="ts">
import { ref } from 'vue';

const filters = ref<Array<string>>([
  'Géopolitique',
  'Reportage',
  'Actualité',
  'France',
  'Histoire',
  'Société',
]);
</script>

<template>
  <navigation-header />
  <section class="search container">
    <div class="search--wrapper">
      <img
        src="@/assets/Search.svg"
        alt="search icon"
      >
      <input
        id="research"
        type="text"
        name="research"
        placeholder="Rechercher un créateur"
      >
    </div>
  </section>
  <section class="filters container">
    <div class="filters--wrapper">
      <span
        v-for="(ff, index) in filters"
        :key="index"
      >
        {{ ff }}
      </span>
    </div>
  </section>
  <section class="trends--videos container">
    <header class="trends--videos--header">
      <h2>Vidéos tendances</h2>
      <a href="#">Voir plus</a>
    </header>
    <main class="trends--videos--slider" />
  </section>
  <navigation />
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
}
</style>
