<template>
  <!-- 底部 -->
  <div class="footer" style="width: 1519px">
    <div class="to_weixin">
      <div class="wx_i">
        <img src="../assets/image/weixin.png" alt="" />
        <span>微信公众号</span>
      </div>
      <div class="wx_i">
        <img src="../assets/image/weixin.png" alt="" />
        <span>我的微信</span>
      </div>
    </div>
    <div class="copyright">
      <p>Copyright © www.zhangshui.club All Rights Reserved.</p>
      <p>
        备案号:
        <a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index"
          >赣ICP备2022004104号</a
        >
      </p>
    </div>
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
};
</script>

<style scoped>
/* @import url(); 引入公共css类 */
.footer {
  background: #373d41;
  border-top: 10px solid #66cdaa;
  margin-top: 50px;
  padding-bottom: 30px;
}
.to_weixin {
  display: flex;
  justify-content: center;
}
.wx_i {
  text-align: center;
  color: #73777a;
  line-height: 32px;
  margin: 20px;
}
.to_weixin img {
  display: block;
  width: 80px;
  height: 80px;
}
.copyright {
  text-align: center;
  color: #73777a;
}
.copyright a {
  color: #73777a;
}
</style>