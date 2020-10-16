/* eslint-disable jest/no-mocks-import */
import { mountQuasar } from '@quasar/quasar-app-extension-testing-unit-jest';
import * as All from 'quasar';
import Vue from 'vue';
import axios from 'axios';
import { config } from '@vue/test-utils';
import Login from '../../../../src/pages/auth/Login';
import LoginInvalid from '../__mocks__/auth/loginInvalid.json';
import loginSuccessful from '../__mocks__/auth/loginSuccessgul.json';
import mock from '../../adapter';
import store from '../../../../src/store';

config.mocks.$axios = axios;
config.mocks.$q = {
  notify({
    position, color, textColor, icon, messge,
  }) {
    return {
      position, color, textColor, icon, messge,
    };
  },
};
config.mocks.$store = store();

Vue.config.silent = true;

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key];
  if (val && val.component && val.component.name != null) {
    object[key] = val;
  }
  return object;
}, {});

describe('Mount Quasar', () => {
  const wrapper = mountQuasar(Login, {
    quasar: components,
  });
  const { vm } = wrapper;

  afterEach(() => {
    mock.reset();
  });

  it('has a created hook', () => {
    expect(typeof vm.onSubmit).toBe('function');
  });

  it('fails on empty fields', async () => {
    const button = wrapper.find('#submit');
    await button.trigger('click');
    Vue.nextTick(() => {
      expect(wrapper.html()).toContain('Email Address field is required');
    });
  });

  it('fails on invalid request fields', async () => {
    mock.onPost('/login').reply(422, LoginInvalid);
    await wrapper.vm.onSubmit();
    Vue.nextTick(() => {
      expect(wrapper.html()).toContain('The email field is required.');
    });
  });

  it('fails on request failure', async () => {
    mock.onPost('/login').reply(500, { error: 'Error' });
    await wrapper.vm.onSubmit();
    Vue.nextTick(() => {
      expect(wrapper.vm.$route.name).toEqual('server-error');
    });
  });

  it('login successfully', async () => {
    mock.onPost('/login').reply(200, loginSuccessful);
    wrapper.vm.form = {
      email: 'email@mail.com',
      password: '123456',
    };

    await wrapper.vm.onSubmit();
    Vue.nextTick(() => {
      expect(wrapper.vm.$route.name).toEqual('Index');
    });
  });
});
