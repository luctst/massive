<script setup lang="ts"></script>

<template>
  <div class="bckg-img" />
  <main class="container">
    <div class="propal-icon-transparent is__container__img">
      <img
        src="@/assets/logo-massive.svg"
        alt="icon app"
      >
    </div>
    <div class="content">
      <h1>Bienvenue sur la plateforme 100% engagée !</h1>
      <p>Suivez l'actualité de notre société avec des créateurs engagés</p>
      <div class="btn-box">
        <router-link
          id="inscription"
          to="/auth/signin"
          type="button"
        >
          {{ $t('auth.btnSignin') }}
        </router-link>
        <router-link
          id="connexion"
          to="/auth/login"
          type="button"
        >
          {{ $t('auth.btnLogin') }}
        </router-link>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.bckg-img {
  position: absolute;
  z-index: -10;
  width: 100%;
  height: inherit;
  background: url('@/assets/Rectangle23.svg');
  background-size: cover;
}

.propal-icon-transparent {
  width: 2rem;
  margin: 0 auto;
  padding-top: 2rem;
}

.container {
  height: inherit;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content  {

    h1 {
      font-size: 24px;
      margin: 0 auto 16px;
    }
  
    p {
      font-size: 16px;
      margin: 0 35px 36px;
      opacity: 0.7;
    }
  
    .btn-box {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 25px;
      margin-bottom: 70px;
  
      
      a {
        padding: 12px 32px;
        border-radius: 30px;
        border: none;
        text-decoration: none;

        &:first-child {
          background: linear-gradient(87.79deg, #000A6B 0%, #790D0D 100%);
          color: #fff;
          font-size: 16px;
          font-weight: 700;
        }

        &:last-child {
          background: rgba(255, 255, 255, 0.2);
          color: #FFF;
          font-weight: 700;
          font-size: 16px;
        }
      }
  
      @media (max-width: 361px) {
        margin: 0 20px;
      }
    }
  }
}
</style>
