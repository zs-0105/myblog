<template>
  <div class="container">
    <el-card>
      <div id="SOHUCS" sid="来说两句吧"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 这里存放数据
  data() {
    return {};
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  mounted() {
    window.changyan = undefined;
    window.cyan = undefined;
    this.$loadScript("https://changyan.sohu.com/upload/changyan.js", () => {
      window.changyan.api.config({
        appid: "cyvVSEhwv", // 此处换成你的畅言应用的appid,
        conf: "4bcb93270cbb2c88dba9ddf309ef48f5", // 此处换成你畅言应用的conf。
      });
    });
  },
};
</script>

<style scoped>
/* @import url(); 引入公共css类 */
</style>