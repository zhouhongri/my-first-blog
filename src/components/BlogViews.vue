<template>
  <div class="app">
    <left-layout class="left-container"></left-layout>
    <router-view class="main-container"></router-view>
  </div>
</template>

<script>
  import LeftLayout from '../components/LeftLayout'

  export default {
    name: "BlogViews",
    components: {LeftLayout}
  }
</script>

<style scoped>

</style>
