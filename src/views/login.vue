<template>
  <div class="login_sign">
    <div class="close_icon" @click="close()">
      <i class="el-icon-close"></i>
    </div>
    <div class="login">
      <p class="title">登录注册更精彩</p>
      <p class="tips">登录注册表示同意<span>用户协议、隐私条款</span></p>
    </div>
    <div class="input_form" v-if="type === 'login'">
      <el-input
        v-model="loginUserInfo.login_tel"
        placeholder="手机号或邮箱"
        @input="formLoginChange()"
      ></el-input>
      <el-input
        placeholder="请输入密码"
        v-model="loginUserInfo.login_password"
        show-password
        @input="formLoginChange()"
      ></el-input>
      <div class="error">
        <span class="errorTips" v-html="errorTips"></span>
      </div>
      <div class="login_btn">
        <button @click="loginAct()" :disabled="!tag">
          登录
        </button>
      </div>
    </div>
    <!-- 注册模块 -->
    <div class="input_form" v-else-if="type === 'sign'">
      <el-input
        v-model="singUserInfo.sign_tel"
        placeholder="手机号或邮箱"
        @input="formSignChange()"
      ></el-input>
      <el-input
        placeholder="请输入6-12位登录密码"
        v-model="singUserInfo.sign_password"
        show-password
        @input="formSignChange()"
      ></el-input>
      <el-input
        placeholder="确认密码"
        v-model="singUserInfo.sign_again_password"
        show-password
        @input="formSignChange()"
      ></el-input>
      <div class="error">
        <span class="errorTips" v-html="errorTips"></span>
      </div>
      <div class="login_btn">
        <button @click="signAct()" :disabled="!tag">注册</button>
      </div>
    </div>
    <div class="sign_forget">
      <span>
        <a @click="sign" v-if="type === 'login'">注册账号</a>
        <a @click="login" v-if="type === 'sign'">登录</a>|
        <a @click="forget">忘记密码</a>
      </span>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      loginUserInfo: {
        login_tel: "", //登录手机号
        login_password: "" // 登录密码
      },
      singUserInfo: {
        sign_tel: "",
        sign_password: "",
        sign_again_password: ""
      },
      errorTips: "",
      tag: false, // 判断是否可以点击登录注册
      type: "login" // 判断类型
    };
  },
  methods: {
    ...mapActions(["setUserLoginInfo"]),
    sign() {
      this.type = "sign";
    },
    close() {
      this.$router.back(-1);
    },
    forget() {
      this.$router.push({ path: "/forget" });
    },
    login() {
      this.type = "login";
    },
    // 监听登录表单数据
    formLoginChange() {
      if (this.loginUserInfo.login_tel && this.loginUserInfo.login_password) {
        let tel_reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        let pass_reg = /^[a-zA-Z0-9]{6,12}$/;
        if (
          !tel_reg.test(this.loginUserInfo.login_tel) ||
          !pass_reg.test(this.loginUserInfo.login_password)
        ) {
          this.tag = false;
          this.errorTips = "手机号或密码格式有误";
        } else {
          this.errorTips = "";
          this.tag = true;
        }
      } else {
        this.tag = false;
        this.errorTips = "请输入注册信息";
      }
    },
    // 监听注册表单数据
    formSignChange() {
      console.log("---");
      if (
        this.singUserInfo.sign_tel &&
        this.singUserInfo.sign_password &&
        this.singUserInfo.sign_again_password
      ) {
        let tel_reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        let pass_reg = /^[a-zA-Z0-9]{6,12}$/;
        if (
          !tel_reg.test(this.singUserInfo.sign_tel) ||
          !pass_reg.test(this.singUserInfo.sign_password)
        ) {
          this.tag = false;
          this.errorTips = "手机号或密码格式有误";
        } else if (
          this.singUserInfo.sign_password !==
          this.singUserInfo.sign_again_password
        ) {
          this.tag = false;
          this.errorTips = "两次密码不一致";
        } else {
          this.errorTips = "";
          this.tag = true;
        }
      }
    },
    // 登录
    loginAct() {
      let params = {
        username: this.loginUserInfo.login_tel,
        password: this.loginUserInfo.login_password
      };
      this.axios
        .post("/api/loginInfo", params)
        .then(res => {
          if (res.data && res.data.ok && res.data.ok === 1) {
            this.setUserLoginInfo(res.data.data.user_info);
            this.$router.push({ path: "/" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 注册
    signAct() {
      let params = {
        username: this.singUserInfo.sign_tel,
        password: this.singUserInfo.sign_password
      };
      this.axios
        .post("http://localhost:8080/api/signInfo", params)
        .then(res => {
          if (res.data && res.data.ok && res.data.ok === 1) {
            this.setUserLoginInfo(res.data.data.user_info);
            this.$router.push({ path: "/" });
          }
        });
    }
  }
};
</script>

<style>
.login_sign {
  width: 750px;
  background: #ffffff;
  margin: 0 auto;
  height: 615px;
}
.close_icon {
  padding-top: 18.75px;
}
.el-icon-close {
  font-size: 30px;
  color: #959595;
}
.login {
  padding: 40px 30px 0px;
}
.title {
  font-size: 2.475rem;
  line-height: 4.8rem;
}
.tips {
  font-size: 1.2375rem;
  line-height: 2.4125rem;
  color: #636366;
}
.tips span {
  color: #507daf;
}
.input_form {
  width: 600px;
  margin-left: 30px;
}
.input_form input {
  margin: 10px 0;
}
.login_btn {
  margin-top: 60px;
}
.login_btn button {
  width: 500px;
  height: 40px;
  background: rgba(27, 154, 244, 0.5);
  border-radius: 1.5rem;
  color: #ffffff;
  font-size: 20px;
  line-height: 20px;
}
.sign_forget {
  margin-top: 10px;
  margin-left: 210px;
  /* text-align: center; */
}
.sign_forget span {
  color: #5184bc;
}
.error span {
  color: red;
}
</style>
