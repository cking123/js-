<template>
  <div class="login-container">
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      status-icon
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3 class="title">美食商城后台管理登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        username: "",
        password: ""
      },
      rules2: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      checked: false
    };
  },
  methods: {
    handleSubmit(event) {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          //发送请求
          this.$axios
            .post("/apis/login", {
              data: {
                username: this.ruleForm2.username,
                password: this.ruleForm2.password
              }
            })
            .then(result => {
              if (result.data.flog) {
                this.logining = false;
                sessionStorage.setItem("user", this.ruleForm2.username);
                sessionStorage.setItem("auto", this.checked);
                this.$store.commit("adduser", this.ruleForm2.username);
                this.$router.push({ path: "/home" });
              } else {
                this.logining = false;
                this.$alert("输入信息有误", "出错", {
                  confirmButtonText: "ok"
                });
              }
            })
            .catch(err => {
              this.$message.error("未知错误");
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    }
  },
  created() {
    if (eval(sessionStorage.getItem("auto"))) {
      this.$axios
        .get("/apis/getusername")
        .then(result => {
          if (result.data.flog) {
              this.ruleForm2.username=result.data.info[0].username;
              this.ruleForm2.password=result.data.info[0].password;
          } else {
            this.$message.error(result.data.info);
            window.sessionStorage.clear();
          }
        })
        .catch(err => {
          this.$message.error("未知错误");
        });
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>