import NoInternet from 'pages/auth/errors/NoInternet';
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
      { path: 'anims', name: 'Anims', component: () => import('pages/Anims') },
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
    name: 'server-error',
    path: '/error',
    component: () => import('pages/auth/errors/Error50x'),
  },
  {
    name: 'no-internet',
    path: '/offline',
    component: NoInternet,
  },
  {
    name: 'not-found',
    path: '*',
    component: () => import('pages/auth/errors/Error404.vue'),
  },
];

export default routes;
