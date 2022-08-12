<template>
  <el-card>
    <div class="life_c">
      <div class="card_title">搜索结果</div>
      <div class="life_atc_cd" v-for="(i, index) in articleList" :key="i._id">
        <b class="atc_title">{{ i.title }}</b>
        <a @click="readArticle(i._id)"
          ><img :src="i.cover || '/image/logo.png'" alt=""
        /></a>
        <div class="atc_right_wrap">
          <div class="atc_content_wrap">
            <span
              class="atc_content"
              v-html="i.content.replace(/<img[^>]*>/, '')"
            >
            </span>
            <div class="stc_tool_bar">
              <span class="time_wrap">{{ i.publishDate | dataFormat }}</span>
              <span class="view_wrap">
                <img src="../../assets/image/see.png" alt="" />
                <span>{{ i.view }}</span>
              </span>
              <span class="like_wrap">
                <img
                  v-if="i.isLike"
                  src="../../assets/image/giveLike_On.png"
                  alt=""
                  @click="cancleLike(i._id, index)"
                />
                <img
                  v-else
                  src="../../assets/image/giveLike.png"
                  @click="giveLike(i._id, index)"
                  alt=""
                />
                <span>{{ i.like }}</span>
              </span>
              <span class="read_wrap">
                <a @click="readArticle(i._id)">阅读文章</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="el_pagination_c">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="queryInfo.pagenum"
        @current-change="handleChange"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 这里存放数据
  data() {
    return {
      queryInfo: {
        pagenum: 1,
        pagesize: 16,
      },
      articleList: [],
      total: 0,
    };
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getArticle();
  },
  mounted() {},
  // 方法集合
  methods: {
    async getArticle() {
      const { data: res } = await this.$http.get("/getArticleByPage", {
        params: {
          query: this.$route.params.query,
          pagenum: this.queryInfo.pagenum,
          pagesize: this.queryInfo.pagesize,
        },
      });
      res.data.articles.forEach((i) => {
        i.isLike = false;
      });
      this.total = res.data.total;
      this.articleList = res.data.articles;
    },
    readArticle(id) {
      let routeUrl = this.$router.resolve({
        path: `/content/${id}`,
      });
      console.log(routeUrl.href);
      window.open(routeUrl.href, "blank");
    },
    async cancleLike(id, index) {
      this.articleList[index].isLike = false;
      this.articleList[index].like -= 1;
      await this.$http.post("/handleLike", {
        a_id: id,
        isLike: true,
      });
    },
    async giveLike(id, index) {
      console.log(id);
      this.articleList[index].isLike = true;
      this.articleList[index].like += 1;
      await this.$http.post("/handleLike", {
        a_id: id,
        isLike: false,
      });
    },
    handleChange(val) {
      this.queryInfo.pagenum = val;
      this.getArticle();
    },
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    $route: {
      handler() {
        this.getArticle();
      },
    },
  },
};
</script>

<style scoped>
/* @import url(); 引入公共css类 */
/* 程序人生卡片 */
.atc_title {
  display: block;
}
.life_atc_cd > a {
  float: left;
  width: 23%;
  cursor: pointer;
  overflow: hidden;
}
.atc_right_wrap {
  overflow: hidden;
}
.life_atc_cd > a {
  width: 140px;
  height: 100px;
}
.life_atc_cd > a > img {
  width: 100%;
  height: 100%;
  transition: all 0.6s;
}
.atc_title {
  margin: 10px;
}
.atc_content_wrap {
  padding: 5px 10px;
}
.atc_content {
  height: 40px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.stc_tool_bar {
  margin-top: 13px;
  display: flex;
  justify-content: space-between;
  line-height: 32px;
}
.life_atc_cd {
  padding: 10px;
  border-bottom: 1px solid rgb(238, 238, 238);
  transition: all 0.6s;
}
.life_atc_cd:hover {
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
}
.life_atc_cd:hover a > img {
  transform: scale(1.3);
}
.read_wrap {
  color: #fff;
  padding: 1px 4px;
  background-color: #66cdaa;
  border-radius: 4px;
  cursor: pointer;
}
.like_wrap {
  margin-right: 90px;
}
.time_wrap {
  margin-left: 100px;
}
.stc_tool_bar img {
  vertical-align: middle;
}
.el_pagination_c {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>