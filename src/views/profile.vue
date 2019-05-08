<template>
  <div :class="$style.profile">
    <div :class="$style.header_icon">
      <i class="el-icon-arrow-left" @click="back"></i>
    </div>
    <div :class="$style.user_card">
      <img src="" />
    </div>
  </div>
</template>
<style module>
.profile {
  width: 750px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 0 auto;
  background: #ffffff;
}
.header_icon {
  width: 100%;
  height: 55px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.header_icon i {
  font-size: 2.315rem !important;
  cursor: pointer;
  padding-left: 13px;
  color: #333 !important;
}
</style>

<script>
export default {
  name: "profile",
  data() {
    return {
      userInfo: {}
    };
  },
  computed: {
    uid() {
      if (this.$route.params.user_id) {
        return this.$route.params.user_id;
      }
      return "";
    }
  },
  created() {
    this.initUserInfo();
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    // 获取对应的用户信息
    initUserInfo() {
      this.axios
        .get("/api/userInfo", {
          params: {
            uid: this.uid
          }
        })
        .then(res => {
          if (res.data && res.data.ok === 1) {
            this.userInfo = res.data.data;
          }
        });
    }
  }
};
</script>
