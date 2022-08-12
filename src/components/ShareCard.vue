<template>
  <el-card class="box-card">
    <div class="card_title">技术分享</div>
    <div class="atc_box_c">
      <div style="cursor: pointer" class="a_card" v-for="(i, index) in articleList" :key="i._id">
        <a @click="readArticle(i._id)"
          ><img
            :src="i.cover ? baseUpCoverUrl + i.cover : '/image/logo.png'"
            alt=""
        /></a>
        <b>{{ i.title }}</b>
        <div class="content" v-html="i.content"></div>
        <div class="b_tool">
          <a @click="readArticle(i._id)">+文章阅读</a>
          <div class="like">
            <img
              @click="cancleLike(i._id, index)"
              v-if="i.isLike"
              src="../assets/image/giveLike_On.png"
              alt=""
            />
            <img
              @click="giveLike(i._id, index)"
              v-else
              src="../assets/image/giveLike.png"
              alt=""
            />
            <span>{{ i.like }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="el_pagination_c" v-if="$route.meta.path !== '/bloghome'">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="pagenum"
        :page-size="pagesize"
        @current-change="handleChange"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import { baseUpCoverUrl } from "../config";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 这里存放数据
  data() {
    return {
      pagenum: 1,
      total: 0,
      articleList: [],
      baseUpCoverUrl,
    };
  },
  props: ["pagesize"],
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getArticle();
  },
  // 方法集合
  methods: {
    readArticle(id) {
      let routeUrl = this.$router.resolve({
        path: `/content/${id}`,
      });
      window.open(routeUrl.href, "_blank");
    },
    async getArticle() {
      const { data: res } = await this.$http.get("/getArticleByPage", {
        params: {
          type: 0,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      });
      res.data.articles.forEach((i) => {
        i.isLike = false;
      });
      this.total = res.data.total;
      this.articleList = res.data.articles;
    },
    async cancleLike(id, index) {
      this.articleList[index].isLike = false;
      this.articleList[index].like -= 1;
      const { data: res } = await this.$http.post("/handleLike", {
        a_id: id,
        isLike: true,
      });
    },
    async giveLike(id, index) {
      this.articleList[index].isLike = true;
      this.articleList[index].like += 1;
      const { data: res } = await this.$http.post("/handleLike", {
        a_id: id,
        isLike: false,
      });
    },
    handleChange(val) {
      this.pagenum = val;
      this.getArticle();
    },
  },
};
</script>

<style scoped lang='less'>
/* @import url(); 引入公共css类 */
/* 技术 分享卡片*/
.atc_box_c {
  margin-top: 20px;
  width: 100%;
  height: 100%;
}
.el-card {
  padding-bottom: 20px;
}
.a_card {
  position: relative;
  float: left;
  flex: 1;
  width: 33%;
  height: 340px;
  padding: 2.4%;
  transition: all 0.6s;
  box-sizing: border-box;
  border-left: 1px solid rgb(238, 238, 238);
  border-bottom: 1px solid rgb(238, 238, 238);
}
.atc_box_c > .a_card:hover {
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
}
.atc_box_c > .a_card:hover a > img {
  transform: scale(1.3);
}
.a_card > a {
  width: 100%;
  height: 160px;
  display: block;
  overflow: hidden;
}
.a_card > a > img {
  width: 100%;
  height: 100%;
  transition: all 0.6s;
}
.a_card > a > img:hover {
  transform: scale(1.3);
}
.a_card > b {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 8px 0;
}
.content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  height: 60px;
  box-sizing: border-box;
  /deep/ p {
    padding: 0;
    margin: 0;
    font-weight: 400;
  }
  /deep/ ul {
    padding: 0;
    margin: 0;
    font-weight: 400;
  }
  /deep/ ol {
    padding: 0;
    margin: 0;
    font-weight: 400;
  }
  /deep/ ol li {
    padding: 0;
    margin: 0;
    font-weight: 400;
  }
  /deep/ h1 {
    display: none;
  }
  /deep/ h2 {
    display: none;
  }
  /deep/ h3 {
    display: none;
  }
  /deep/ p strong {
    font-weight: 400;
  }
  /deep/ p br {
    display: none;
  }
  /deep/ img {
    display: none;
  }
  /deep/ pre {
    display: none;
  }
}
.b_tool {
  position: absolute;
  width: 85%;
  bottom: 10px;
  display: flex;
  padding: 15px auto;
  justify-content: space-between;
}
.b_tool > a {
  color: green;
  cursor: pointer;
}
.like > img {
  width: 20px;
  height: 100%;
  cursor: pointer;
  vertical-align: bottom;
}
.el_pagination_c {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;
}
</style>