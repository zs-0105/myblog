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
  // 方法集合
  methods: {},
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  beforeCreate() {},
  // 生命周期 - 数据挂载之前
  beforeMount() {},
  // 生命周期 - 数据更新之前
  beforeUpdate() {},
  // 生命周期 - 数据更新之后
  updated() {},
  // 生命周期 - 页面销毁之前
  beforeDestroy() {},
  // 生命周期 - 页面销毁完成
  destroyed() {},
};
</script>

<style scoped>
/* @import url(); 引入公共css类 */
</style>