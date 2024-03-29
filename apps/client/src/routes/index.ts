import { createRouter, createWebHashHistory, RouteLocation } from 'vue-router';
import { useUserStore } from '@/stores/user';
import http from '@/utils/http';

function userIsAuthenticated() {
  const userStore = useUserStore();

  if (window.location.search.includes('id_token')) {
    if (userStore.user) return true;

    return http.get(`auth/google/callback${window.location.search}`)
    .then(res => {
      const user = {
        ...res.data.user,
        jwt: res.data.jwt,
      }

      userStore.setUserManually(user);
      return true;
    })
    .catch(() => false);
  }

  return userStore.user !== null;
}

const wrapperAuth = async (): Promise<any> => {
  try {
    if (userIsAuthenticated() instanceof Promise) {
      return await userIsAuthenticated();
    }

    if (userIsAuthenticated() === false) {
      return { name: 'Auth' };
    }

    return true;
  } catch (error) {
    return { name: 'Auth' };
  }
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
      path: '/',
      name: 'Home',
      component: () => import('@/views/home-view.vue'),
      meta: {
        headerTitle: 'header.routes.home',
      },
      beforeEnter: async () => wrapperAuth(),
      children: [
        {
          path: 'bookmarks',
          name: 'Bookmarks',
          component: () => import('@/views/favorite-view.vue'),
          meta: {
            headerTitle: 'header.routes.bookmarks',
          },
        },
        {
          path: 'explorer',
          name: 'Explorer',
          component: () => import('@/views/explorer-view.vue'),
          meta: {
            headerTitle: 'header.routes.explorer',
          },
        },
        {
          path: 'article/:id',
          name: 'Article',
          component: () => import('@/views/article-view.vue'),
        },
        {
          path: 'media/:id',
          name: 'Media',
          component: () => import('@/views/media-view.vue'),
        },
        {
          path: 'user/:id',
          name: 'User',
          component: () => import('@/views/user-view.vue'),
        },
        {
          path: 'user/:id/update',
          name: 'UserUpdate',
          component: () => import('@/views/user-update.vue'),
        },
      ],
    },
  ],
});
