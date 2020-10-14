<template>
  <q-page class="flex flex-center flex-wrap tw-content-center">
    <div class="tw-w-full text-center">
      <h1 class="text-primary tw-text-4xl">ALX Front End</h1>
    </div>
    <div class="tw-w-full md:tw-w-1/2 lg:tw-w-1/3">
      <q-card class="tw-px-4 md:tw-px-8 tw-py-4 md:tw-py-4">
        <h3 class="text-primary tw-text-2xl text-center tw-py-4">Login to Account</h3>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            filled
            name="email"
            type="email"
            v-model="form.email"
            label="Email Address *"
            lazy-rules
            :rules="[required('Email Address'), emailFormat()]"
          />
          <p v-if="validateErrors.email" class="tw-text-red-500 tw-text-xs tw-italic tw--mt-4">
            {{ validateErrors.email[0] }}
          </p>

          <q-input
            filled
            name="password"
            type="password"
            v-model="form.password"
            label="Password"
            lazy-rules
            :rules="[required('Password')]"
          />

          <div class="col-md-12 d-flex justify-end">
            <router-link class="tw-underline c-gray-text text-15-b" :to="{name: 'Login'}">
              Forgot password ?
            </router-link>
          </div>

          <div class="flex justify-center">
            <q-btn label="Login" type="submit" color="primary" :loading="loading"/>
          </div>

          <q-card-actions class="tw-w-full tw-flex justify-center">
            <span class="body-2" >Don't Have an account ?
              <router-link class="tw-font-bold" :to="{ name: 'Register' }">
                REGISTER
              </router-link> </span>
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import validations from 'src/utils/validations';
import helpers from 'src/utils/helpers';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      loading: false,
      ...validations,
      validateErrors: [],
    };
  },

  methods: {
    onSubmit() {
      this.loading = true;
      this.validateErrors = [];
      this.$axios.post('/login', this.form)
        .then((response) => {
          this.$store
            .dispatch('user/loginUser', response.data).then(() => {
              this.loading = false;
              helpers.clearForm(this.form);
              this.$router.push({ name: 'Index' });
            });
        }).catch((error) => {
          if (error.response && error.response.status === 422) {
            this.validateErrors = error.response.data.errors;
          } else {
            this.$q.notify({
              position: 'top-right',
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'An Error Occurred, try again',
            });
          }
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>

</style>
