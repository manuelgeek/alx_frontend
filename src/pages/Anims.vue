<template>
  <q-page class="tw-w-full flex flex-center flex-wrap">
    <div class="tw-w-full tw-flex tw-flex-wrap">
      <div class="tw-w-full tw-mt-3 md:tw-mt-10">
        <h2 class="tw-text-3xl text-primary tw-font-bold">Animations</h2>
        <hr>
      </div>

      <div v-if="!loading" ref="scrollTargetRef" class="tw-w-full">
        <q-infinite-scroll
          @load="onLoad"
          :offset="250" class="tw-w-full tw-mt-6 tw-flex tw-flex-wrap tw-justify-center"
        >
          <div
          v-for="(anim, $index) in anims" :key="$index"
          class="my-card tw-w-full md:tw-w-1/3 tw-p-4 tw-flex tw-flex-col"
        >
          <q-card class="my-card tw-flex-1">
            <img :src="anim.attributes.posterImage.medium" alt="image" />

            <q-card-section class="tw-flex tw-justify-between">
              <div>
                <div class="text-h6 text-primary"><a target="_blank" class="text-primary" :href="`https://www.youtube.com/watch?v=${anim.attributes.youtubeVideoId}`">{{ anim.attributes.canonicalTitle }}</a></div>
                <div class="tw-w-full text-subtitle2">
                  <div>
                    <p>From: {{ anim.attributes.startDate | dateFormat }}</p>
                    <p>To: {{ anim.attributes.startDate | dateFormat }}</p>
                  </div>
                </div>
              </div>
              <div class="tw-flex tw-flex-col tw-justify-center">
                <q-avatar
                  class="tw-self-end tw-font-bold" size="35px" color="warning" text-color="white"
                >
                  {{ anim.attributes.ageRating }}
                </q-avatar>
                <div class="text-subtitle2 tw-mt-3">
                  <q-badge outline color="primary" :label="`#${anim.attributes.showType }`" />
                </div>
              </div>
            </q-card-section>

            <q-separator></q-separator>

            <q-card-actions class="tw-flex tw-justify-between">
              <q-item>
                <q-item-section>
                  <q-item-label caption>
                    Avg. Rating: <strong>{{ anim.attributes.averageRating }}</strong>
                  </q-item-label>
                  <q-item-label caption>
                    Popularity Rank: <strong>{{ anim.attributes.popularityRank }}</strong>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <div>
                <q-btn flat round color="red" icon="favorite"
                       :label="anim.attributes.favoritesCount | numFormat" />
                <q-btn flat round color="blue" icon="visibility"
                       :label="anim.attributes.userCount | numFormat" />
              </div>
            </q-card-actions>
          </q-card>
        </div>
          <template v-slot:loading>
            <div class="tw-w-full row tw-flex tw-justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </div>
      <div v-else class="tw-w-full tw-mt-6 tw-flex tw-flex-wrap">
        <div class="tw-w-full tw-flex tw-justify-center">
          <q-circular-progress
            indeterminate
            size="30px"
            color="primary"
            class="q-ma-md"
          />
        </div>
        <div v-for="i in 9"
             :key="i"
             class="my-card tw-w-full md:tw-w-1/3 tw-p-3">
          <q-card class="tw-h-64 tw-flex tw-flex-wrap tw-content-between tw-bg-gray-300">
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import helpers from 'src/utils/helpers';
import moment from 'moment';

export default {
  name: 'Anims',
  data() {
    return {
      loading: true,
      anims: [],
      links: '',
    };
  },
  mounted() {
    this.getAmins('https://kitsu.io/api/edge/anime?page[limit]=9&page[offset]=0');
  },
  methods: {
    getAmins(url) {
      this.$axios.get(url).then((response) => {
        this.loading = false;
        if (this.links === '') {
          this.anims = response.data.data;
        } else {
          response.data.data.forEach((data) => this.anims.push(data));
        }
        this.links = response.data.links;
      });
    },
    onLoad(index, done) {
      setTimeout(() => {
        if (this.links.next !== null) {
          this.getAmins(this.links.next);
          done();
        }
      }, 4000);
    },
  },
  filters: {
    numFormat(num) {
      return helpers.numberToString(num);
    },
    dateFormat(date) {
      return moment(date, 'YYYY-MM-DD').format('Do MMMM YYYY');
    },
  },
};
</script>

<style scoped>

</style>
