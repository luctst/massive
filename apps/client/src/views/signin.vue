<script setup lang="ts"></script>

<template>
  <main class="signin">
    <header>
      <div class="header--content container">
        <h1>Inscription</h1>
        <p>Merci de remplir les champs ci-dessous</p>
      </div>
    </header>
    <form>
      <div class="input-group">
        <label for="user-name">Nom d'utilisateur</label>
        <input type="text" id="user-name" placeholder="Emmanuel Macron">
      </div>
      <div class="input-group">
        <label for="user-mail">Adresse mail</label>
        <input type="email" id="user-mail" placeholder="manu.macron@gmail.com">
      </div>
      <div class="input-group">
        <label for="user-name">Mot de passe</label>
        <input type="password" id="user-password"><span id="icon-pass"><img src="@/assets/viewpassword.svg"
            alt="icon password"></span>
      </div>
      <div class="checkbox-validation">
        <input type="checkbox" name="validation" id="validation">
        <label for="validation">En cochant cette case, j'accepte les <span id="termes">termes et confidentialité</span> de
          l'application.</label>
      </div>
      <div class="btn-box">
        <input type="button" id="create-count-btn" value="Créer mon compte">
        <div class="sign-google-box">
          <input type="button" id="sign-in-google" value="S'inscrire avec Google"><img src="&/assets/icons8-google.svg"
            alt="Google icon">
        </div>
      </div>
    </form>
    <p id="already-user">Vous avez déjà un compte? <span>Se connecter</span></p>
  </main>
</template>

<style scoped lang="scss">
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
    padding: 0 30px;
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
    }

    .checkbox-validation {
      display: flex;
      align-items: baseline;
      gap: 11px;

      input {
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

      input {
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

      div {
        display: flex;
        align-items: center;
        position: relative;

        input {
          font-family: 'Satoshi', sans-serif;
          color: #000;
          font-weight: 500;
          background-color: transparent;
          border: 1px solid #D1CFCF;

          img {
            width: 16px;
            position: absolute;
            left: 17%
          }
        }
      }
    }

    @media (max-width: 361px) {
      padding: 0 20px;
    }
  }

  // p {
  //   color: #424244;
  //   font-size: 14px;
  //   font-weight: 500;
  //   margin: 33px 0 80px;

  //   span {
  //     color: #020a69;
  //   }
  // }
}
</style>
