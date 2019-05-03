<template>
  <div class="container_index">
    <div class="navbar">
      <div class="navbar_top">
        <img class="header_img" :src="header_img" alt="" />
        <el-input placeholder="请输入内容" v-model="input">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <i class="el-icon-message"></i>
        <i class="el-icon-edit"></i>
      </div>
      <div class="navbar_bottom">
        <span>西柚圈</span>
        <ul class="navbar_list">
          <li
            v-for="(item, index) in navbar"
            :key="index"
            @click="showModule(index)"
          >
            <span v-html="item"></span>
            <div :class="index === clickIndex ? 'active' : ''"></div>
          </li>
        </ul>
      </div>
    </div>
    <hot-topic v-if="clickIndex === 0"></hot-topic>
    <study-topic v-if="clickIndex === 1"></study-topic>
    <food-topic v-if="clickIndex === 2"></food-topic>
    <friends-topic v-if="clickIndex === 3"></friends-topic>
    <div class="login_sign_btn" v-if="!isLogin">
      <el-button type="primary" round @click="login()">登录/注册</el-button>
    </div>
  </div>
</template>
<script>
import hotTopic from "../components/hotTopic";
import studyTopic from "../components/studyTopic";
import friendsTopic from "../components/friendsTopic";
import foodTopic from "../components/foodTopic";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "index",
  data() {
    return {
      navbar: ["热门", "学习", "餐饮", "圈子"],
      clickIndex: 0
    };
  },
  components: {
    "hot-topic": hotTopic,
    "study-topic": studyTopic,
    "friends-topic": friendsTopic,
    "food-topic": foodTopic
  },
  computed: {
    ...mapGetters(["getUserLoginInfo", "getHotWords"]),
    header_img() {
      if (this.getUserLoginInfo) {
        return this.getUserLoginInfo.user_header_img;
      }
      return "https://avatar.csdn.net/C/1/C/3_xq_520.jpg";
    },
    uid() {
      if (this.getUserLoginInfo) {
        return this.getUserLoginInfo.user_id;
      }
      return "";
    },
    isLogin() {
      if (this.getUserLoginInfo) {
        return true;
      }
      return false;
    },
    input() {
      return "大家都在搜 " + this.getHotWords;
    }
  },
  created() {
    this.setHotWords(this.uid);
  },
  methods: {
    ...mapActions(["setHotWords"]),
    showModule(index) {
      this.clickIndex = index;
    },
    login() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style>
.container_index {
  width: 750px;
  background: #ffffff;
  margin: 0 auto;
}
.navbar {
  border-bottom: 1px solid #a5adb5;
}
.navbar_top {
  height: 57.38px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  margin: 0 13px;
}
.navbar_bottom {
  height: 56.22px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.navbar_bottom span {
  color: #a5adb5;
  margin-left: 20px;
  font-size: 20px;
}
.header_img {
  width: 32.5px;
  height: 32.5px;
  border-radius: 50% 50%;
  margin-right: 13px;
}
.el-input {
  width: 587.5px !important;
}
.el-icon-message {
  color: #282f3c;
  font-size: 30px;
  margin-left: 12px;
}
.el-icon-edit {
  color: #282f3c;
  font-size: 30px;
  margin-left: 12px;
}
.navbar_list {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  margin-left: 17px;
}
.navbar_list li {
  margin: 0 50px;
}
.navbar_list li span {
  color: #a5adb5;
}
.active {
  width: 30px;
  height: 3px;
  background: #fe9600;
  border-radius: 1.5px;
  margin-left: 24px;
}
.login_sign_btn {
  width: 108px;
  position: fixed;
  bottom: 10px;
  left: 494px;
}
</style>
