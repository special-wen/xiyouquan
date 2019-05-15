<template>
  <div :class="$style.profile">
    <div :class="$style.header_icon">
      <i class="el-icon-arrow-left" @click="back"></i>
    </div>
    <div :class="$style.user_card" v-if="info.user">
      <img :src="header_img(info.user.user_header_img)" />
      <span v-if="info.user.screen_name" v-html="info.user.screen_name"></span>
    </div>
    <div :class="$style.topicCount_card" v-if="info.user">
      <span
        v-if="info.user.statuses_count"
        v-html="`共 ` + info.user.statuses_count + ` 条话题`"
      ></span>
      <span v-else>还没有发布过话题</span>
      <el-button plain v-if="isme" @click="setting">编辑个人资料</el-button>
    </div>
    <div :class="$style.topic_card">
      <div v-if="topic.length === 0">快来发布第一篇话题吧</div>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      >
        <ul v-if="topic && topic.length > 0">
          <li
            :class="$style.list"
            v-for="(item, index) in topic"
            :key="index"
            @click="goDetailed(index)"
          >
            <div :class="$style.info_list">
              <div :class="$style.user_info">
                <img :src="header_img(item.user_header_img)" />
                <div :class="$style.name_date">
                  <p :class="$style.user_name" v-html="item.screen_name"></p>
                  <p :class="$style.date">
                    {{ item.created_at | commentDate(item.created_at) }}
                  </p>
                </div>
              </div>
              <div :class="$style.hot_content">
                <p v-html="item.text"></p>
                <ul
                  :class="{
                    [$style.img_totle]: true,
                    [$style.img_type_1]:
                      item.pics.length <= 3 || item.pics.length >= 5,
                    [$style.img_type_2]: item.pics.length === 4
                  }"
                  v-if="item.pics && item.pics.length > 0"
                >
                  <li v-for="(pic, index) in item.pics" :key="index">
                    <img :class="$style.topic_img" :src="pic" />
                  </li>
                </ul>
              </div>
            </div>
            <div :class="$style.info_icon">
              <i class="el-icon-edit-outline" v-html="item.comment_count"></i>
              <i
                :class="[item.like ? 'el-icon-star-on' : 'el-icon-star-off']"
                v-html="item.like_count"
                @click="isLiked(index, $event)"
              ></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style module>
.info_list {
  width: 715px;
  margin: 10px 15px;
}
.info_icon {
  width: 720px;
  height: 22px;
  margin: 0 1.2rem;
  padding: 0rem 0.375rem 1rem 0;
}
.info_icon i {
  margin-right: 60px;
  font-size: 12px;
  color: #939393;
}
.topic_img {
  width: 127px;
  height: 127px;
  margin: 0px 2px;
}
.img_type_1 {
  width: 400px;
}
.img_type_2 {
  width: 300px;
}
.img_totle {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  padding-top: 10px;
}
.user_info .date {
  color: #939393;
  font-size: 0.6875rem;
}
.name_date {
  margin-left: 10px;
}
.list {
  width: 750px;
  border-bottom: 1px solid #a5adb5;
}
.user_info img {
  width: 40px;
  height: 40px;
  border-radius: 50% 50%;
}
.user_info {
  height: 50px;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
}
.profile {
  width: 750px;
  min-height: 511.2px;
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
  font-size: 1.7rem !important;
  cursor: pointer;
  padding-left: 13px;
  color: #333 !important;
}
.user_card {
  height: 50px;
  padding: 0rem 0.9375rem 1rem;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.user_card img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user_card span {
  font-size: 1.3125rem;
  color: #333;
  margin-left: 20px;
}
.topicCount_card {
  padding: 0 0.9375rem 1.6875rem;
  border-bottom: 1px solid #f2f2f2;
}
.topicCount_card span {
  margin-right: 20px;
}
</style>

<script>
export default {
  name: "profile",
  data() {
    return {
      info: [],
      topic: [],
      cur_uid: 0,
      busy: false,
      page: 0
    };
  },
  computed: {
    uid() {
      if (this.$route.params.user_id) {
        return this.$route.params.user_id;
      }
      return "";
    },
    isme() {
      if (parseInt(this.uid) === parseInt(this.cur_uid)) {
        return true;
      }
      return false;
    },
    header_img() {
      return function(item) {
        if (item) {
          return item;
        }
        return "http://avatars3.githubusercontent.com/u/27426408?s=40&v=4";
      };
    }
  },
  created() {
    this.initUserInfo();
    this.getLoginUserInfo();
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    // 获取对应的用户信息
    initUserInfo() {
      this.axios
        .get("/api/info", {
          params: {
            uid: this.uid
          }
        })
        .then(res => {
          if (res.data && res.data.ok === 1) {
            this.info = res.data.data;
          }
        });
    },
    initTopicCardInfo() {},
    // 获取登陆信息
    getLoginUserInfo() {
      this.axios.get("/api/config").then(res => {
        if (res.data && res.data.ok === 1 && res.data.data.login) {
          this.userInfo = res.data.data.user_info;
          this.cur_uid = this.userInfo.uid;
        } else {
          this.isLogin = false;
        }
      });
    },
    //进入修改用户信息页面
    setting() {
      // console.log(this.uid, this.cur_uid);
      this.$router.push({
        path: `/profile/setting/${this.uid}`
      });
    },
    loadMore() {
      this.busy = true;
      //把busy置位true，这次请求结束前不再执行
      setTimeout(() => {
        this.page++;
        this.initTopic(true);
        //调用获取数据接口，并且传入一个true，让axios方法指导是否需要拼接数组。
      }, 500);
    },
    initTopic(flag) {
      var param = {
        page: this.page,
        uid: this.uid
      };
      this.axios.get("/api/topic", { params: param }).then(res => {
        if (res.data && res.data.ok && res.data.ok === 1) {
          if (flag) {
            this.topic = this.topic.concat(res.data.data);
            if (res.data.count === 0) {
              this.busy = true;
            } else {
              this.busy = false;
            }
          } else {
            this.topic = res.data.data;
            console.log("==");
            this.busy = false;
          }
        }
      });
    },
    goDetailed(index) {
      const topic_id = this.topic[index].topic_id;
      this.$router.push({
        path: `/topic/details/${topic_id}`
      });
    },
    //未登陆公用方法
    loginAlert() {
      this.$alert("请先登陆再进行其他操作", "", {
        confirmButtonText: "确定",
        callback: () => {
          this.$router.push({
            path: "/login"
          });
        }
      });
    },
    isLiked(index, ev) {
      ev.cancelBubble = true;
      // 如果用户没有登陆，跳登陆页面
      if (this.cur_uid === 0) {
        this.loginAlert();
      } else {
        const topic_id = this.topic[index].topic_id;
        let created_at = new Date().valueOf();
        if (!this.topic[index].like) {
          this.axios
            .post("/api/create", {
              uid: this.cur_uid,
              topic_id: topic_id,
              created_at: created_at,
              attitude: "heart"
            })
            .then(res => {
              if (res.data.ok === 1) {
                this.topic[index].like = true;
                this.topic[index].like_count++;
              }
            });
        } else {
          this.axios
            .post("/api/destory", {
              uid: this.cur_uid,
              topic_id: topic_id,
              attitude: "heart"
            })
            .then(res => {
              if (res.data.ok === 1) {
                this.topic[index].like = false;
                this.topic[index].like_count--;
              }
            });
        }
      }
    }
  }
};
</script>
