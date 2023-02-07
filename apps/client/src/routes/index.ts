import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/auth.vue'),
      children: [
        {
          path: 'signin',
          name: 'Signin',
          component: () => import('@/views/signin.vue'),
          meta: {
            headerTitle: 'header.routes.home',
          },
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
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home.vue'),
      meta: {
        headerTitle: 'header.routes.home',
      },
    },
  ],
});
