import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/Auth.vue'),
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/Login.vue'),
        },
        {
          path: 'signin',
          name: 'Signin',
          component: () => import('@/views/Signin.vue'),
        },
      ],
    },
  ],
});
