<script setup lang="ts"></script>

<template>
  <main class="container loader">
    <div class="propal-group">
      <img
        src="@/assets/massive.svg"
        alt="Logo App"
      >
    </div>
    <p class="loading-txt">
      Chargement en cours...
    </p>
    <div class="loading-circle-box">
      <img
        src="@/assets/loader.gif"
        alt="icon spinner loader"
      >
    </div>
  </main>
</template>

<style scoped lang="scss">
.loader {
    background-color: #060b30;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loading-txt {
    font-size: 15px;
}

.loading-circle-box {
    margin-top: 81px;
    padding: 10px;
}

.loading-circle-box img {
    height: 90px;
    width: 90px;
}
</style>
