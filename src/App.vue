<template>
  <div id="app" class="app">
    <Header></Header>
    <div class="main">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>
<style lang="less">
.main {
  width: 1202px;
  margin: 0 auto;
  padding-top: 70px;
}
</style>
