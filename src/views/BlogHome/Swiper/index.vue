<template>
  <!-- 轮播图 -->
  <div class="container" style="width: 616px">
    <el-carousel height="260px">
      <el-carousel-item v-for="item in swiperList" :key="item._id">
        <a :href="item.redirect">
          <img
            :src="baseUpSwiperUrl + item.pic"
            style="width: 100%; height: 100%"
            alt=""
          />
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { baseUpSwiperUrl } from "../../../config";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 这里存放数据
  data() {
    return {
      swiperList: [],
      baseUpSwiperUrl,
    };
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getSwiper();
  },
  mounted() {},
  // 方法集合
  methods: {
    async getSwiper() {
      const { data: res } = await this.$http.get("/getSwiper");
      this.swiperList = res.data.swipers;
    },
  },
  // 监听属性 类似于data概念
  computed: {},
};
</script>

<style>
/* @import url(); 引入公共css类 */
/* 轮播图样式 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>