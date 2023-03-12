import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

function userIsAuthenticated() {
  return useUserStore().user !== null;
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
      beforeEnter: () => {
        if (!userIsAuthenticated()) {
          return { name: 'Auth' };
        }
      },
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
  ],
});
