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
          path: 'login',
          name: 'Login',
          component: () => import('@/views/login.vue'),
        },
        {
          path: 'signin',
          name: 'Signin',
          component: () => import('@/views/signin.vue'),
        },
      ],
    },
  ],
});
