<setup setup lang="ts"></setup>

<template>
  <footer>
    <nav class="container">
      <ul>
        <li>
          <router-link to="/">
            <img
              src="@/assets/home.svg"
              alt="home icon"
            >
            <span class="line-nav" />
          </router-link>
        </li>
        <li>
          <router-link to="/explorer">
            <img
              src="@/assets/explorer.svg"
              alt="explorer icon"
            >
            <span class="line-nav" />
          </router-link>
        </li>
        <li>
          <router-link to="/bookmarks">
            <img
              v-if="$route.name === 'Bookmarks'"
              src="@/assets/Bookmark-white.svg"
              alt="bookmark icon"
            >
            <img
              v-else
              src="@/assets/Bookmark.svg"
              alt="bookmark icon"
            >
            <span class="line-nav" />
          </router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped lang="scss">
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 81px;
  background: #070B30;
  box-shadow: 0px 8px 24px rgb(17 17 26 / 10%), 0px 16px 56px rgb(17 17 26 / 10%), 0px 24px 80px rgb(17 17 26 / 10%);

  nav {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: inherit;
    
    ul {
      height: inherit;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        a {
          text-decoration: none;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
      }
    }
  }
}

.line-nav {
  display: none;
  position: absolute;
  bottom: 2px;
  background: #790D0D;
  height: 3px;
  width: 16px;
}

.router-link-active .line-nav {
  display: block;
}
</style>
