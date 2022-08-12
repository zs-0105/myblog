<template>
  <div style="width: 100%">
    <!-- 头部导航 -->
    <el-header ref="header" :class="{ hide: flag == 1 }">
      <div class="logo">
        <a href="/">
          <img style="height: 100%" src="../assets/image/blog.png" alt=""
        /></a>
      </div>
      <el-menu
        :default-active="$route.meta.path"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#000000"
        text-color="#ccc"
        active-text-color="#fff"
        router
      >
        <el-menu-item index="/bloghome">博客首页</el-menu-item>
        <el-menu-item index="/share">技术分享</el-menu-item>
        <el-menu-item index="/life">生活碎片</el-menu-item>
        <el-menu-item index="/recommend">博客推荐</el-menu-item>
        <el-menu-item index="/aboutme">关于我</el-menu-item>
        <el-menu-item index="/message" data-item="/comment">留言</el-menu-item>
        <el-menu-item @click="handleSearch">
          <img style="height: 50%" src="../assets/image/search.png" alt="" />
        </el-menu-item>
      </el-menu>

      <div class="search_container" :class="{ emerge: !isSearch }">
        <div class="el_container">
          <el-input
            placeholder="请输入内容"
            v-model="query"
            class="input-with-select"
            @focus="handleFocus"
            @blur="handleBlur"
          >
          </el-input>
          <el-button @click="submit">搜索</el-button>
          <div class="history" v-show="historyShow">
            <div
              class="his_item"
              v-for="item in historyList"
              :key="item"
              @click="goSearchDetail(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </el-header>

    <!-- 返回顶部按钮 -->
    <div class="backTop" v-show="toTopShow" @click="handleToTop"></div>
  </div>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 这里存放数据
  data() {
    return {
      flag: 0,
      isSearch: false,
      query: "",
      speed: 2,
      setSpeed: 2,
      toTopShow: false,
      historyList: [],
      historyShow: false,
    };
  },
  mounted() {
    const that = this;
    var timer = null;
    document.addEventListener("wheel", function (e) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        that.onScroll(e);
        that.handleScrolls();
      }, 60);
    });
  },
  methods: {
    // 控制头部的显示与隐藏
    onScroll(e) {
      if (e.deltaY && e.deltaY > 0) {
        this.flag = 1;
      } else if (e.deltaY && e.deltaY < 0) {
        this.flag = 2;
      } else {
        return false;
      }
    },
    // 搜索框的显示与隐藏
    handleSearch() {
      this.isSearch = !this.isSearch;
      //如果本地存储的数据historyList有值，直接赋值给data中的historyList
      if (JSON.parse(localStorage.getItem("historyList"))) {
        this.historyList = JSON.parse(localStorage.getItem("historyList"));
      }
    },
    // 搜索
    submit() {
      if (!this.query) return alert("请输入搜索内容");
      // 没有搜索记录，把搜索值push进数组首位，存入本地
      if (!this.historyList.includes(this.query)) {
        this.historyList.unshift(this.query);
        localStorage.setItem("historyList", JSON.stringify(this.historyList));
      } else {
        //有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
        let i = this.historyList.indexOf(this.query);
        this.historyList.splice(i, 1);
        this.historyList.unshift(this.query);
        localStorage.setItem("historyList", JSON.stringify(this.historyList));
      }
      let routeUrl = this.$router.resolve({
        path: `/search/${this.query}`,
      });
      this.isSearch = false;
      this.query = "";
      window.open(routeUrl.href, "blank");
    },
    //点击历史搜索，跳转搜索结果页
    goSearchDetail(query) {
      let routeUrl = this.$router.resolve({
        path: `/search/${query}`,
      });
      this.isSearch = false;
      window.open(routeUrl.href, "blank");
    },
    // 搜索框获取焦点显示搜索历史
    handleFocus() {
      if (this.historyList.length > 0) {
        this.historyShow = true;
      }
    },
    // 失去焦点隐藏搜索历史
    handleBlur() {
      setTimeout(() => {
        this.historyShow = false;
      }, 100);
    },
    // 回到顶部
    handleToTop() {
      let speed = this.speed;
      const setSpeed = this.setSpeed;
      const self = this;
      const timer = setInterval(function () {
        self.scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
        if (self.scrollTop > 0) {
          self.scrollTop =
            self.scrollTop - speed > 0 ? self.scrollTop - speed : 0;
          speed += setSpeed;
          window.scrollTo(0, self.scrollTop);
        } else {
          clearInterval(timer);
        }
      }, 1);
      this.toTopShow = false;
      this.flag = 0;
    },
    // 控制回到顶部按钮显示与隐藏
    handleScrolls() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollTop = scrollTop;
      if (scrollTop > 500) {
        this.toTopShow = true;
      } else {
        this.toTopShow = false;
      }
    },
  },
};
</script>

<style  lang='less'>
/* @import url(); 引入公共css类 */
.el-header {
  position: relative;
  background-color: black;
  padding: 0;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  height: 70px;
  transition: all 0.4s;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  .logo {
    height: 100%;
    margin-left: 50px;
  }
  .el-menu {
    width: 50%;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
  }
  .search_container {
    position: absolute;
    left: 180px;
    width: 1160px;
    height: 90px;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    z-index: 99;
    transition: all 0.7s;
    top: 60px;
    .el_container {
      position: relative;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      .el-input {
        width: 600px;
      }
      .el-button {
        background-color: black;
        width: 150px;
        color: white;
      }
      .history {
        position: absolute;
        width: 596px;
        top: 40px;
        left: 207px;
        background-color: #ffffff;
        border-radius: 3px;
        box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
        padding: 10px 0;
        .his_item {
          height: 30px;
          padding-left: 10px;
          line-height: 30px;
        }
        .his_item:hover {
          background-color: #eee;
        }
      }
    }
  }
}
.search {
  height: 30px;
}
.hide {
  transform: translateY(-65px);
}
.emerge {
  visibility: hidden;
  opacity: 0;
  transform: translateY(10px);
}
.backTop {
  width: 66px;
  height: 63px;
  background-image: url("../assets/image/backTop.png");
  position: fixed;
  right: 100px;
  bottom: 100px;
}
</style>