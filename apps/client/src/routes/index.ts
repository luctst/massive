import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

function userIsAuthenticated() {
  return useUserStore().isConnected;
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
          component: () => import('@/views/signin.vue'),
        },
      ],
    },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      component: () => import('@/views/favorite.vue'),
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
      component: () => import('@/views/home.vue'),
      meta: {
        headerTitle: 'header.routes.home',
      },
      beforeEnter: () => {
        if (!userIsAuthenticated()) {
          return { name: 'Auth' };
        }
      },
    },
    {
      path: '/explorer',
      name: 'Explorer',
      component: () => import('@/views/explorer.vue'),
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
      component: () => import('@/views/article.vue'),
      beforeEnter: () => {
        if (!userIsAuthenticated()) {
          return { name: 'Auth' };
        }
      },
    },
    {
      path: '/media/:id',
      name: 'Media',
      component: () => import('@/views/media.vue'),
      beforeEnter: () => {
        if (!userIsAuthenticated()) {
          return { name: 'Auth' };
        }
      },
    },
    {
      path: '/user/:id',
      name: 'User',
      component: () => import('@/views/user.vue'),
      beforeEnter: () => {
        if (!userIsAuthenticated()) {
          return { name: 'Auth' };
        }
      },
    },
  ],
});
