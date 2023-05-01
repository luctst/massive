<script lang="ts" setup>
interface Props {
  btnContent: string;
};

const props = defineProps<Props>();

const logWithGoogle = async () => {
  try {
    window.location.href = `http://localhost:1337/api/connect/google`;
  } catch (error) {
    throw error; 
  }
};
</script>

<template>
  <div class="login--with--google">
    <button
      id="sign-in-google"
      @click="logWithGoogle"
    >
      {{ props.btnContent }}
      <img
        src="@/assets/icons8-google.svg"
        alt="Google icon"
      >
    </button>
  </div>
</template>

<style lang="scss" scoped>
.login--with--google {
  display: flex;
  align-items: center;
  position: relative;
  
  button {
    border-radius: 30px;
    font-family: 'Satoshi', sans-serif;
    color: #000;
    font-weight: 500;
    background-color: transparent;
    border: 1px solid #D1CFCF;
    padding: 15px;
    width: 100%;
    
    img {
      width: 16px;
      position: absolute;
      left: 17%
    }

    &:hover {
      cursor: pointer;
    }
  }
  
}
</style>
