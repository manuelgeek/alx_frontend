import store from '../store';

const ifNotAuthenticated = (_to, _from, next) => {
  if (!store().getters['user/isAuthenticated']) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (_to, _from, next) => {
  if (store().getters['user/isAuthenticated']) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: ifAuthenticated,
    children: [
      { path: '', name: 'Index', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/GuestLayout'),
    beforeEnter: ifNotAuthenticated,
    children: [
      { path: 'register', name: 'Register', component: () => import('pages/auth/Register') },
      { path: 'login', name: 'Login', component: () => import('pages/auth/Login') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: 'not-found',
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
