<!-- Please remove this file from your project -->
<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <h2 class="text-2xl leading-7 font-semibold">
          Welcome Right Hand Solutions!
        </h2>
        <p class="mt-3 text-gray-600">
          Powered by Selka24  dhe Kristiiii.
        </p>
        <b-button type="button" class="primary-btn" @click="createBucket">Create Bucket</b-button>
        <b-button type="button" @click="getBucket">Get Bucket</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  methods:{
    ...mapActions({
      actCreateBucket: 'auth/actCreateBucket',
      actGetBucket: 'auth/actGetBucket'
    }),
    createBucket(){
      this.actCreateBucket();
    },
    getBucket(){
      this.actGetBucket();
    }
  }
}
</script>
