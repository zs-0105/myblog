<template>
  <div class="container">
    <el-card class="aboutme">
      <img src="../../assets/image/avator.jpg" alt="" />
      <p>sdks</p>
      <p>男、00后</p>
      <p>现居江西南昌</p>
      <p>一名学习前端的在校学生</p>
      <p>是万千程序猿中的一只</p>
      <p>喜欢编程，喜欢探索新技术，大学生活迷茫过，失落过，还好没有放弃</p>
      <p>希望看到这里的你也不要轻易地放弃</p>
      <p>这条路上的你并不是孤军奋战，有千千万万的猿在陪你前行</p>
      <p>联系方式：1641523731@qq.com</p>
      <div class="b_text">
        本博客已经开源，源码上传到github。<br />
        本博客后端采用nodejs+mongodb、express框架完成。
        前端采用了vue前端框架、axios、element-ui。如果有不清楚的欢迎来信。
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* @import url(); 引入公共css类 */
.aboutme {
  text-align: center;
}
.aboutme img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.b_text {
  background-color: #f6f6f4;
}
</style>