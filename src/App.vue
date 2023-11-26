<template>
  <div class="wrapper">
    <Top />
    <router-view />
  </div>
</template>

<script>
import Top from './components/Top.vue'
export default {
  name: 'App',
  components: {
    Top
  }
}
</script>
<style less scoped>
.wrapper {
  height: 100vh;
  background-color: #eee;
}
</style>
