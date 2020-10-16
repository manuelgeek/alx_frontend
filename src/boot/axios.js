/* eslint-disable no-undef */
import Vue from 'vue';
import axios from 'axios';

export default async ({ router, store }) => {
  axios.interceptors.request.use((config) => {
    NProgress.configure({ showSpinner: false });
    NProgress.start();
    if (store.getters['user/isAuthenticated']) {
      config.headers.Authorization = `Bearer ${store.getters['user/token']}`;
    }
    config.baseURL = process.env.API_BASE_URL;
    // console.log('Starting Request', config);
    return config;
  });

  axios.interceptors.response.use((response) => {
    NProgress.done();
    // console.log(response);
    return response;
  });

  axios.interceptors.response.use(null, (error) => {
    if (error.response) {
      /*
      * The request was made and the server responded with a
      * status code that falls out of the range of 2xx
      */
      if (error.response.status === 401) {
        store.dispatch('user/logOut').then(() => {
          router.push({ name: 'Login' });
        });
      }
      if (error.response.status === 500 || error.response.status === 502) {
        router.push({ name: 'server-error' });
      }
      if (error.response.status === 404) {
        router.push({ name: 'not-found' });
      }
      // console.log(error.response);
    } else if (error.request) {
      /*
      * The request was made but no response was received, `error.request`
      * is an instance of XMLHttpRequest in the browser and an instance
      * of http.ClientRequest in Node.js
      */
      // console.log(error.request);
      router.push({ name: 'no-internet' });
    } else {
      // * Something happened in setting up the request and triggered an Error
      // console.log('Error', error.message);
      router.push({ name: 'no-internet' });
    }
    // console.log(error);
    return Promise.reject(error);
  });

  Vue.prototype.$axios = axios;
};

export { axios };
