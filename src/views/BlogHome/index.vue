<template>
  <div class="wrap">
    <div class="left">
      <!-- banner 轮播/两图/个人介绍-->
      <div class="banner">
        <!-- 轮播图 -->
        <Swiper></Swiper>
        <!-- 右侧两小图 -->
        <div class="right_container">
          <a href="/content/6264b021116b9ea6c0705912" target="_balnk"
            ><img
              :src="baseUpCoverUrl+'1650765856438.jpeg'"
              alt=""
            />
            <span>js单线程、同步异步</span></a
          >
          <a href="/content/6263a592382869431c8cabe3" target="_blank"
            ><img
              :src="baseUpCoverUrl+'1650697614824.png'"
              alt=""
            />
            <span>js原型链</span>
          </a>
        </div>
      </div>
      <!-- 技术分享卡片 -->
      <ShareCard :pagesize="6" />
      <!-- 程序人生卡片 -->
      <LifeCard />
    </div>
    <right-box></right-box>
  </div>
</template>

<script>
import Swiper from "./Swiper";
import LifeCard from "@/components/LifeCard";
import ShareCard from "@/components/ShareCard";
import RightBox from "@/components/RightBox";
import { baseUpCoverUrl } from "../../config";
export default {
  name: "BlogHome",
  // import引入的组件需要注入到对象中才能使用
  components: {
    Swiper,
    LifeCard,
    ShareCard,
    RightBox,
  },
  // 这里存放数据
  data() {
    return {
      baseUpCoverUrl
    };
  },
  mounted() {},
};
</script>

<style scoped>
/* @import url(); 引入公共css类 */
/* banner右部位 */
.banner {
  width: 900px;
  display: flex;
  justify-content: space-between;
}
.right_container {
  background-color: #ccc;
  width: 30%;
  height: 260px;
  float: right;
}

.right_container > a > img {
  width: 100%;
  height: 125px;
  cursor: pointer;
  transition: all 0.6s;
  filter: brightness(70%);
}
.right_container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.right_container > a {
  height: 125px;
  display: block;
  color: #fff;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.right_container a span {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  cursor: pointer;
}
.right_container a img:hover {
  transform: scale(1.2);
  filter: brightness(100%);
}
</style>