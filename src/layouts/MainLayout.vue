<template>
  <q-layout view="lHh Lpr lFf" class="tw-bg-gray-200">
    <q-header elevated class="tw-px-4 md:tw-px-10">
      <q-toolbar>
        <q-toolbar-title>
          ALX App
        </q-toolbar-title>

        <q-btn stretch :to="{name: 'Index'}" flat label="Home" />
        <q-btn stretch :to="{name: 'Anims'}" flat label="Anims" />

        <q-btn-dropdown v-if="$store.getters['user/isAuthenticated']" stretch flat>
          <template #label>
            <p class="tw-px-2 tw-capitalize tw-hidden lg:tw-block">{{ user.name }}</p>
            <q-avatar color="white" text-color="primary">{{ user.name | abbreviate}}</q-avatar>
          </template>
          <q-list>
            <q-item clickable tabindex="0" @click="logout">
              <q-item-section class="tw-cursor-pointer" side>
                <q-icon name="logout" ></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container class="tw-container tw-mx-auto tw-px-4 md:tw-px-10 tw-pb-8">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  computed: {
    user() {
      return this.$store.getters['user/currentUser'];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logOut').then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
  },
  filters: {
    abbreviate(name) {
      return name.match(/[A-Z]/g).join('');
    },
  },
};
</script>
