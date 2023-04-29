import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import http from '@/utils/http';

function userIsAuthenticated() {
  const userStore = useUserStore();

  if (window.location.search.includes('id_token')) {
    if (userStore.user) return true;

    return http.get(`auth/google/callback${window.location.search}`)
    .then(res => {
      const user = {
        jwt: res.data.jwt,
        ...res.data.user,
      };
      userStore.setUserManually(user);
      console.log(userStore.user);
      return true;
    })
    .catch(() => false);
  }

  return userStore.user !== null;
}

function wrapperAuth(): boolean {
  if (userIsAuthenticated() instanceof Promise) {
    return userIsAuthenticated()
    .then(() => true)
    .catch(() => false);
  }

  return userIsAuthenticated();
}

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/auth-parent.vue'),
      children: [
        {
          path: 'signin',
          name: 'Signin',
          component: () => import('@/views/signin-view.vue'),
        },
        {
          path: 'signup',
          name: 'Signup',
          component: () => import('@/views/login-view.vue'),
        },
      ],
    },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      component: () => import('@/views/favorite-view.vue'),
      meta: {
        headerTitle: 'header.routes.bookmarks',
      },
      beforeEnter: () => {
        if (!userIsAuthenticated()) {
          return { name: 'Auth' };
        }
      },
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home-view.vue'),
      meta: {
        headerTitle: 'header.routes.home',
      },
      beforeEnter: () => wrapperAuth(),
    },
    {
      path: '/explorer',
      name: 'Explorer',
      component: () => import('@/views/explorer-view.vue'),
      meta: {
        headerTitle: 'header.routes.explorer',
      },
      beforeEnter: () => {
        if (!userIsAuthenticated()) {
          return { name: 'Auth' };
        }
      },
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: () => import('@/views/article-view.vue'),
      beforeEnter: () => {
        if (!userIsAuthenticated()) {
          return { name: 'Auth' };
        }
      },
    },
    {
      path: '/media/:id',
      name: 'Media',
      component: () => import('@/views/media-view.vue'),
      beforeEnter: () => {
        if (!userIsAuthenticated()) {
          return { name: 'Auth' };
        }
      },
    },
    {
      path: '/user/:id',
      name: 'User',
      component: () => import('@/views/user-view.vue'),
      beforeEnter: () => {
        if (!userIsAuthenticated()) {
          return { name: 'Auth' };
        }
      },
    },
    {
      path: '/user/:id/update',
      name: 'UserUpdate',
      component: () => import('@/views/user-update.vue'),
      beforeEnter: () => {
        if (!userIsAuthenticated()) {
          return { name: 'Auth' };
        }
      }
    },
  ],
});
