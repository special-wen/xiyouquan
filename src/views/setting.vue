<template>
  <div :class="$style.setting">
    <div :class="$style.setting_top">
      <i class="el-icon-arrow-left" @click="back"></i>
      <span :class="$style.title" v-html="title"></span>
    </div>

    <!-- 如果对应的uid和登陆的uid是相同的，则展示可以进行编辑的表单 -->
    <!-- 如果没有登陆，则仅仅只是展示 -->
    <div :class="$style.setting_user_info">
      <div :class="$style.edit_userInfo">
        <div :class="$style.set_tit">
          <span>修改用户基本信息</span>
        </div>
        <div :class="$style.screen_name">
          <span>用户名：</span>
          <el-input
            size="small"
            :disabled="!isme"
            placeholder="用户名"
            v-model="screen_name"
          >
          </el-input>
        </div>
        <!-- 头像修改 -->
        <div :class="$style.edit_header">
          <span>用户头像：</span>
          <el-upload
            class="avatar-uploader"
            action="/api/pics"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="url" :src="url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- <img :src="url" /> -->
        </div>
      </div>
      <div :class="$style.info_send">
        <el-button type="text" @click="setInfo" :disabled="!isme"
          >保存</el-button
        >
      </div>
    </div>
    <div :class="$style.setting_user_password">
      <div :class="$style.set_tit">
        <span>修改密码</span>
      </div>
      <div :class="$style.pass_word">
        <span>密码：</span>
        <el-input
          size="small"
          placeholder="请输入6-12位登录密码"
          v-model="password"
          show-password
          :disabled="!isme"
          @input="passwordChange()"
        ></el-input>
      </div>
      <div :class="$style.pass_word">
        <span>确认密码：</span>
        <el-input
          size="small"
          placeholder="确认登录密码"
          v-model="password_again"
          show-password
          :disabled="!isme"
          @input="passwordChange()"
        ></el-input>
      </div>
      <div :class="$style.error">
        <span v-html="errorTips"></span>
      </div>
      <div :class="$style.setting_send">
        <el-button type="text" @click="setPassword" :disabled="!isme"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>
<style module>
.error span {
  color: red;
}
.screen_name {
  display: flex;
  display: -webkit-flex;
  /* flex-direction: row; */
}
.set_tit {
  margin: 10px 0;
}
.set_tit span {
  color: #333;
}
.setting_user_info {
  margin-top: 20px;
  margin-left: 13px;
  border-bottom: 1px solid #cfcfcf;
}
.edit_userInfo {
  width: 340px;
}
.pass_word {
  display: flex;
  display: -webkit-flex;
  margin: 10px 0;
}
.pass_word span {
  width: 160px;
}
.setting_user_password {
  width: 340px;
  margin-left: 13px;
}
.edit_userInfo span {
  width: 100px;
}
.screen_name,
.edit_header,
.pass_word span {
  color: #333;
  font-size: 14px;
}
.edit_header {
  display: flex;
  display: -webkit-flex;
  height: 50px;
  align-items: center;
  margin-top: 10px;
}
.edit_header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.setting {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 750px;
  margin: 0 auto;
  background: #ffffff;
}
.setting_top {
  height: 56px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  border-bottom: 1px solid #cfcfcf;
  background: #fafafa;
}
.setting_top i {
  margin-left: 13px;
  font-size: 20px;
}
.title {
  color: #282f3c;
  font-size: 20px;
  margin: 0 auto;
}
.setting_send {
  margin-top: 3px;
  margin-right: 13px;
}
</style>
<script>
export default {
  name: "setting",
  data() {
    return {
      userInfo: {},
      cur_uid: 0,
      header_img: [],
      screen_name: "",
      password: "",
      password_again: "",
      errorTips: "",
      url: "",
      tag: false // 判断是否可以点击登录注册
    };
  },
  computed: {
    uid() {
      if (this.$route.params.uid) {
        return this.$route.params.uid;
      }
      return "";
    },
    isme() {
      if (parseInt(this.uid) === parseInt(this.cur_uid)) {
        return true;
      }
      return false;
    },
    title() {
      if (this.isme) {
        return "修改个人资料";
      }
      return "查看资料";
    }
  },
  created() {
    this.initPageInfo();
    this.getLoginUserInfo();
  },
  methods: {
    initPageInfo() {
      this.axios
        .get("/api/pageInfo", { params: { uid: this.uid } })
        .then(res => {
          if (res.data && res.data.ok === 1) {
            this.userInfo = res.data.data.user_info;
            this.screen_name = this.userInfo.screen_name;
            if (this.userInfo.user_header_img) {
              this.url = this.userInfo.user_header_img;
            } else {
              this.url =
                "http://avatars3.githubusercontent.com/u/27426408?s=40&v=4";
            }
          }
        });
    },
    getLoginUserInfo() {
      this.axios.get("/api/config").then(res => {
        if (res.data && res.data.ok === 1 && res.data.data.login) {
          this.cur_uid = this.userInfo.uid;
        } else {
          this.isLogin = false;
        }
      });
    },
    back() {
      this.$router.back(-1);
    },
    setInfo() {
      // console.log(this.header_img);
      let curHeaderURL = this.header_img[this.header_img.length - 1];
      this.axios
        .post("/api/change", {
          uid: this.uid,
          screen_name: this.screen_name,
          type: "user_info",
          user_header_img: curHeaderURL || this.url
        })
        .then(res => {
          // if (res.data && res.data.ok === 1) {
          this.$alert(res.data.data.msg, "修改信息 ", {
            confirmButtonText: "确定"
          });
          // }
        });
    },
    passwordChange() {
      if (this.password || this.password_again) {
        let pass_reg = /^[a-zA-Z0-9]{6,12}$/;
        if (!pass_reg.test(this.password)) {
          this.tag = false;
          this.errorTips = "密码格式有误";
        } else if (this.password !== this.password_again) {
          this.tag = false;
          this.errorTips = "两次密码不一致";
        } else {
          this.errorTips = "";
          this.tag = true;
        }
      }
    },
    setPassword() {
      if (this.tag) {
        this.axios
          .post("/api/change", {
            uid: this.uid,
            password: this.password,
            type: "pass_word"
          })
          .then(res => {
            this.$alert(res.data.data.msg, "修改信息 ", {
              confirmButtonText: "确定"
            });
            this.password = "";
            this.password_again = "";
          });
      } else {
        this.$alert("请填写正确的密码格式", "修改信息 ", {
          confirmButtonText: "确定"
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    handleAvatarSuccess(res, file) {
      console.log(res.data.picInfo[0].path);
      if (res.ok === 1) {
        this.url = res.data.picInfo[0].path;
        this.header_img = this.header_img.concat(res.data.picInfo[0].path);
      }
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
