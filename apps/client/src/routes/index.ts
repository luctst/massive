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
        },
      ],
    },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      component: () => import('@/views/favorite.vue'),
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home.vue'),
    },
  ],
});
