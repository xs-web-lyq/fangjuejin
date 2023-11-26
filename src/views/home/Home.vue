<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
// import Top from './Top.vue'
import Content from './content.vue'
export default {
  name: 'Home',
  components: {
    Content
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  width: 1400px;
  margin: 0 auto;

}
</style>
