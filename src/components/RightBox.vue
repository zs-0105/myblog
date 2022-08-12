<template>
  <div class="container" :class="[{ fixed: isfixed }, { fixed2: isfixed2 }]">
    <!-- 个人简历模块 -->
    <div
      v-show="$route.meta.path == '/bloghome'"
      class="self_introduction_wrap"
    >
      <h2>章先生个人简历</h2>
      <p>职业:一个在学校坐牢自学前端的学生</p>
      <p>现居:江西省-南昌市</p>
      <p>Email:1641523731@qq.com</p>
      <div class="contact_link">
        <div class="qq_email">
          <a
            href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=1641523731@qq.com"
            target="blank"
            ><span class="iconfont icon-email"></span
          ></a>
        </div>
        <div class="qq_link">
          <a
            target="blank"
            href="tencent://Message/?Uin=1641523731&websiteName=www.oicqzone.com&Menu=yes"
            ><span class="iconfont icon-QQ-circle-fill"></span
          ></a>
        </div>
        <div class="weixin_link">
          <div class="host_weixin">
            <img src="../assets/image/weixin.png" alt="" />
          </div>
          <span class="iconfont icon-weixin"></span>
        </div>
      </div>
    </div>
    <!-- 文章点击排行榜 -->
    <el-card class="ranking">
      <div class="ranking_title"><h2>点击排行</h2></div>
      <div class="ranking_item_wrap">
        <div class="ranking_item" v-for="(i, index) in rankList" :key="i._id">
          <a @click="readArticle(i._id)" style="color: black">
            <span class="ranking_index" :class="{ orange_bgc: index <= 2 }">{{
              index + 1
            }}</span>
            <span class="ranking_atc_title">{{ i.title }}</span>
          </a>
        </div>
      </div>
    </el-card>
    <!-- 站长推荐 -->
    <el-card class="host_recommend">
      <div class="host_recommend_title"><h2>站长推荐</h2></div>
      <div class="host_recommend_item_wrap">
        <div class="host_recommend_item" v-for="i in rankList" :key="i._id">
          <a style="cursor: pointer" @click="readArticle(i._id)">
            <img
              :src="i.cover ? baseUpCoverUrl + i.cover : '/image/logo.png'"
              alt=""
            />
            <span class="host_recommend_item_title" style="color: black">{{
              i.title
            }}</span>
          </a>
        </div>
      </div>
    </el-card>
    <!-- 优秀博客 -->
    <el-card class="blog_link">
      <div class="blog_link_title"><h2>优秀博客</h2></div>
      <div class="blog_link_wrap">
        <a
          :href="i.link"
          v-for="(i, index) in linkList"
          :key="i._id"
          :style="{ 'background-color': colorList[index] }"
          target="_blank"
          >{{ i.blogName }}</a
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import { baseUpCoverUrl } from "../config";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 这里存放数据
  data() {
    return {
      rankList: [],
      linkList: [],
      colorList: [],
      isfixed: false,
      isfixed2: false,
      baseUpCoverUrl,
    };
  },
  computed: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    this.getRankList();
    await this.getBlogLinks();
    this.getColorList();
    console.log('test');
  },
  mounted() {
    window.addEventListener("scroll", this.handleFixed);
  },
  // 方法集合
  methods: {
    async getRankList() {
      const { data: res } = await this.$http.get(
        `/getArticleOrderByView/${10}`
      );
      this.rankList = res.data.articles;
    },
    async getBlogLinks() {
      const { data: res } = await this.$http.get("/getAllBlogLink");
      this.linkList = res.data.blogLink;
    },
    readArticle(id) {
      let routeUrl = this.$router.resolve({
        path: `/content/${id}`,
      });
      window.open(routeUrl.href, "_blank");
    },
    color() {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      let color = "rgba(" + r + "," + g + "," + b + ",0.8)";
      return color;
    },
    getColorList() {
      for (let index = 0; index < this.linkList.length; index++) {
        this.colorList.push(this.color());
      }
    },
    handleFixed() {
      const top = document.body.scrollTop || document.documentElement.scrollTop;
      if (this.$route.meta.path == "/bloghome") {
        if (top >= 1437) {
          this.isfixed = true;
        } else {
          this.isfixed = false;
        }
      } else {
        if (top >= 1182) {
          this.isfixed2 = true;
        } else {
          this.isfixed2 = false;
        }
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleFixed);
  },
};
</script>

<style scoped>
/* @import url(); 引入公共css类 */
/* 个人简历模板 */
.fixed {
  position: fixed;
  right: 159px;
  top: -1370px;
}
.fixed2 {
  position: fixed;
  right: 159px;
  top: -1115px;
}
.container {
  transition: all 1s;
  width: 282px;
}
.self_introduction_wrap {
  box-sizing: border-box;
  height: 260px;
  padding: 10px 20px;
  background-color: #2a2a2a;
}
.self_introduction_wrap h2 {
  color: #89919a;
}
.self_introduction_wrap p {
  font-size: 12px;
  line-height: 30px;
  text-shadow: 0 1px 2px rgb(0 0 0 / 50%);
  color: #d0d2d4;
}
.contact_link {
  display: flex;
  text-align: center;
}
.qq_email {
  flex: 1;
}
.qq_email > a {
  color: rgb(231, 109, 231);
}
.qq_link {
  flex: 1;
}
.qq_link > a {
  color: #409eff;
}
.weixin_link {
  flex: 1;
  position: relative;
  transition: all 0.6s;
}
.weixin_link:hover img {
  display: block;
  opacity: 1;
  transform: translateY(50%);
}
.weixin_link img {
  width: 100px;
  position: absolute;
  top: -300%;
  left: -15%;
  opacity: 0;
  transition: all 0.6s;
}
.weixin_link > span {
  color: #5fe453;
}
.icon-weixin,
.icon-email,
.icon-QQ-circle-fill {
  font-size: 53px;
}
/* 点击排行 */
.ranking {
  margin-top: 15px;
}
.ranking_item:nth-child(even) {
  background-color: #f6f6f6;
}
.ranking_title {
  text-align: center;
}
.ranking_title > h2 {
  border-bottom: 2px solid #000;
}
.ranking_index {
  padding: 0 5px;
  background-color: #b1b1b1;
  color: #eee;
}
.orange_bgc {
  background-color: #ff6600;
}
.ranking_atc_title {
  display: block;
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ranking_item {
  margin-bottom: 8px;
  cursor: pointer;
}
.ranking_item > a {
  display: flex;
}
/* 博主推荐 */
.host_recommend_title {
  text-align: center;
}
.host_recommend_title h2 {
  border-bottom: 2px solid #000;
}
.host_recommend_item img {
  width: 70px;
  height: 46px;
  margin-right: 5px;
}
.host_recommend_item {
  padding: 5px 0;
}
.host_recommend_item a {
  display: flex;
  justify-content: center;
  align-items: center;
}
.host_recommend_item a img {
  flex: 1;
}
.host_recommend_item_title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  flex: 2;
  height: 46px;
  overflow: hidden;
}
/* 优秀博客 */
.blog_link_title {
  text-align: center;
}
.blog_link_title h2 {
  border-bottom: 2px solid #000;
}
.blog_link_wrap a {
  float: left;
  margin: 10px 5px 5px 0;
  padding: 5px;
  cursor: pointer;
}
.blog_link {
  padding-bottom: 20px;
}
</style>