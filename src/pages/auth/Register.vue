<template>
  <q-page class="flex flex-center flex-wrap tw-content-center">
    <div class="tw-w-full text-center">
      <h1 class="text-primary tw-text-4xl">ALX Front End</h1>
    </div>
    <div class="tw-w-full md:tw-w-1/2 lg:tw-w-1/3">
      <q-card class="tw-px-4 md:tw-px-8 tw-py-4 md:tw-py-4">
        <h3 class="text-primary tw-text-2xl text-center tw-py-4">Create an Account</h3>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            filled
            name="name"
            v-model="form.name"
            label="Full Name *"
            lazy-rules
            :rules="[required('Full Name')]"
          />
          <p v-if="validateErrors.name" class="tw-text-red-500 tw-text-xs tw-italic tw--mt-4">
            {{ validateErrors.name[0] }}
          </p>

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
            :rules="[required('Password'), minimum('Password', 6)]"
          />
          <p v-if="validateErrors.password" class="tw-text-red-500 tw-text-xs tw-italic tw--mt-4">
            {{ validateErrors.password[0] }}
          </p>

          <q-input
            filled
            name="password"
            type="password"
            v-model="form.password_confirmation"
            label="Confirm Password"
            lazy-rules
            :rules="[required('Password Confirm'),
            confirmPassword('Password Confirmation', form.password)]"
          />

          <q-field
            ref="toggle"
            :value="form.accept"
            :rules="[check()]"
            borderless
            dense
          >
            <template v-slot:control>
              <q-checkbox
                v-model="form.accept"
                label="I accept the terms and conditions"
                 />
            </template>
          </q-field>

          <div class="flex justify-center">
            <q-btn id="register" label="Register" type="submit" color="primary" :loading="loading"/>
          </div>

          <q-card-actions class="tw-w-full tw-flex justify-center">
            <span class="body-2" >Already Have an account ?
              <router-link class="tw-font-bold" :to="{ name: 'Login' }">LOGIN</router-link> </span>
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
  name: 'Register',
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        accept: false,
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
      this.$axios.post('/register', this.form)
        .then((response) => {
          this.$store
            .dispatch('user/loginUser', response.data).then(() => {
              this.$q.notify({
                position: 'top-right',
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: response.data.message,
              });
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
