<template>
  <el-card class="content_card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学习分享</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <h2>{{ articleInfo.title }}</h2>
    </div>
    <div class="info_wrap">
      <span>{{ articleInfo.publishDate | dataFormat }}</span>
      <span>
        <img src="../../assets/image/see.png" alt="" />
        {{ articleInfo.view }}
      </span>
    </div>
    <div class="article_content ql-container ql-snow">
      <div class="ql-editor ql-snow" v-html="articleInfo.content"></div>
    </div>
    <div id="SOHUCS" :sid="$route.params.id"></div>
  </el-card>
</template>

<script>
// import hljs from "highlight.js";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 这里存放数据
  data() {
    return {
      articleInfo: {},
    };
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.addView();
  },
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
  methods: {
    async addView() {
      const id = this.$route.params.id;
      const { data: res } = await this.$http.post("/addView", {
        id,
      });
      this.articleInfo = res.data;
    },
  },
};
</script>

<style scoped>
/* @import url(); 引入公共css类 */
.content_card {
  margin-top: 15px;
  width: 100%;
}
.el-breadcrumb {
  border-bottom: 2px solid #000;
  margin-bottom: 20px;
}
.info_wrap img {
  vertical-align: middle;
  margin-right: 2px;
}
.info_wrap > span {
  color: #666;
  margin: 0 20px;
}
.article_content {
  margin-top: 20px;
  width: 100%;
}
.article_content img {
  display: block;
}
</style>