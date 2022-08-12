<template>
  <div class="re_container">
    <el-card>
      <div class="re_title">
        <span>优秀个人博客</span>
        <a @click="uploadLink">提交链接</a>
      </div>
      <div class="re_container">
        <a
          v-for="(i, index) in linkList"
          :key="i._id"
          :href="i.blogLink"
          target="blank"
          :style="{ 'background-color': colorList[index] }"
          >{{ i.blogName }}</a
        >
      </div>
      <div class="bottom_title">成功的路上虽然艰辛，但你不是孤军奋战！</div>
    </el-card>
    <el-dialog
      title="提交链接"
      :visible.sync="dialogVisible"
      width="25%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        size="middle"
      >
        <el-form-item prop="blogName">
          <el-input
            placeholder="博客名："
            v-model="ruleForm.blogName"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="blogLink">
          <el-input
            placeholder="博客地址："
            v-model="ruleForm.blogLink"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="blogAuthor">
          <el-input
            placeholder="博主邮箱："
            v-model="ruleForm.blogAuthor"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 这里存放数据
  data() {
    var validateLink = (rule, value, callback) => {
      const reg =
        /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的网址"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      const reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      ruleForm: {
        blogName: "",
        blogLink: "",
        blogAuthor: "",
      },
      rules: {
        blogLink: [
          { required: true, message: "请输入博客地址", trigger: "blur" },
          { validator: validateLink, trigger: "blur" },
        ],
        blogName: [
          { required: true, message: "请输入博客名", trigger: "blur" },
        ],
        blogAuthor: [
          { required: true, message: "请输入博主邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
      },
      linkList: [],
      colorList: [],
    };
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    await this.getBlogLinks();
    this.getColorList();
  },
  mounted() {},
  // 方法集合
  methods: {
    async getBlogLinks() {
      const { data: res } = await this.$http.get("/getAllBlogLink");
      this.linkList = res.data.blogLink;
    },
    uploadLink() {
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post("/upBlogLink", {
            ...this.ruleForm,
          });
          if (res.meta.status !== 200) return this.$msg_e(res.meta.msg);
          this.$msg_s("提交成功,等等博主审核");
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
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
  },
};
</script>

<style lang='less'>
/* @import url(); 引入公共css类 */
.re_container {
  margin-bottom: 75px;
}
.re_title {
  border-bottom: 1px solid #eee;
  padding: 5px 0px;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 20px;
    color: #484848;
    border-bottom: 2px solid #000;
    padding-right: 10px;
    line-height: 66px;
  }
  a {
    display: inline-block;
    color: #000;
    cursor: pointer;
  }
}
.el-dialog {
  border-radius: 10px;
}
.el-dialog__header {
  border-radius: 10px;
  background: rgb(247, 247, 247);
}
.el-dialog__title {
  font-weight: bold;
  font-family: NSimSun;
  color: rgb(180, 180, 180);
}
.el-dialog__footer {
  display: flex;
  justify-content: center;
  .dialog-footer {
    button {
      height: 30px;
      width: 200px;
      padding: 0;
    }
  }
}
.el-form-item__content {
  display: flex;
  justify-content: center;
}
.el-form-item__error {
  margin-left: 35px;
}
.el-input {
  width: 80%;
}
.re_container {
  padding: 20px;
  a {
    display: inline-block;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    font-size: 20px;
  }
}
.bottom_title {
  text-align: right;
  font-size: 20px;
  font-family: cursive;
  color: #66cdaa;
  text-shadow: 5px 5px 6px;
}
</style>