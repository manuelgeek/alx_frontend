<template>
  <q-page class="tw-w-full flex flex-center flex-wrap">
    <div class="tw-w-full tw-flex tw-flex-wrap">
      <div class="tw-w-full">
        <h2 class="tw-text-3xl text-primary tw-font-bold">Animations</h2>
        <hr>
      </div>

      <div class="tw-w-full tw-mt-6 tw-flex tw-flex-wrap">
        <div class="my-card tw-w-full md:tw-w-1/3 tw-p-3 tw-flex tw-flex-col">
          <q-card class="my-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg">

            <q-card-section class="tw-flex tw-justify-between">
              <div>
                <div class="text-h6">Our Changing Planet</div>
                <div class="tw-w-full text-subtitle2">
                  <div>
                    <p>From: 12th sept 2020</p>
                    <p>To: 12th sept 2020</p>
                  </div>
                </div>
              </div>
              <div class="tw-flex tw-flex-col tw-justify-center">
                <q-avatar class="tw-self-end" size="35px" color="primary" text-color="white">
                  TV
                </q-avatar>
                <div class="text-subtitle2 tw-mt-3">
                  <q-badge outline color="primary" :label="`#general`" />
                </div>
              </div>
            </q-card-section>

            <q-separator></q-separator>

            <q-card-actions class="tw-flex tw-justify-between">
              <q-item>
                <q-item-section>
                  <q-item-label caption>Avg. Rating: 654</q-item-label>
                  <q-item-label caption>Popularity Rank: 324</q-item-label>
                </q-item-section>
              </q-item>
              <div>
                <q-btn flat round color="red" icon="favorite" label="322" />
                <q-btn flat round color="blue" icon="visibility" label="32223" />
              </div>
            </q-card-actions>

            <q-card-section class="q-pt-none">
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Anims',
};
</script>

<style scoped>

</style>
