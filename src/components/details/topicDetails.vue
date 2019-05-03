<template>
  <div>
    <div class="go_back">
      <i class="el-icon-arrow-left back" @click="goBack()"></i>
      <span>话题详情</span>
      <i class="el-icon-more more"></i>
    </div>
    <div class="details_list">
      <div class="user_info" v-if="topicDetails.user_info">
        <img
          v-if="topicDetails.user_info.user_header_img"
          :src="topicDetails.user_info.user_header_img"
        />
        <div class="name_date">
          <p
            class="user_name"
            v-if="topicDetails.user_info.screen_name"
            v-html="topicDetails.user_info.screen_name"
          ></p>
          <p
            class="date"
            v-if="topicDetails.edit_at"
            v-html="topicDetails.edit_at"
          ></p>
        </div>
      </div>
      <div class="hot_content">
        <p v-if="topicDetails.text" v-html="topicDetails.text"></p>
        <ul
          class="img_totle"
          :class="{
            img_type_1:
              topicDetails.pics.length <= 3 || topicDetails.pics.length >= 5,
            img_type_2: topicDetails.pics.length === 4
          }"
          v-if="topicDetails.pics && topicDetails.pics.length > 0"
        >
          <li v-for="(item, index) in topicDetails.pics" :key="index">
            <img class="topic_img" :src="item.url" />
          </li>
        </ul>
      </div>
    </div>
    <div class="details_icon" v-if="icon">
      <div
        class="icon"
        v-for="(item, index) in icon"
        :key="index"
        @click="re_tag(index)"
      >
        <span
          v-html="item.tag"
          :class="index === clickIndex ? 'tag_active' : ''"
        ></span>
        <div :class="index === clickIndex ? 'details_active' : ''"></div>
      </div>
    </div>
    <share v-if="clickIndex === 0"></share>
    <comments v-if="clickIndex === 1" :commentRes="coment_res"></comments>
    <like v-if="clickIndex === 2"></like>
    <div @click="changeAction" class="addComment">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="发表评论"
        v-model="comment"
        class="comment_input"
      >
      </el-input>
    </div>

    <div v-if="type === 0" class="icons">
      <div class="like_icons">
        <i class="el-icon-share" @click="share"></i>
        <i
          :class="liked ? 'el-icon-star-on' : 'el-icon-star-off'"
          @click="isLikedFun"
        ></i>
      </div>
    </div>
    <div v-else-if="type === 1" class="comments_but">
      <el-button type="primary" size="small" @click="createComment()"
        >发送</el-button
      >
    </div>
  </div>
</template>
<script>
import comments from "../comments/CommentsList";
import like from "./like";
import share from "./share";
export default {
  name: "topicDetails",
  components: {
    share: share,
    comments: comments,
    like: like
  },
  data() {
    return {
      topicDetails: {},
      icon: [
        {
          name: "share",
          tag: "转发"
        },
        {
          name: "comments",
          tag: "评论"
        },
        {
          name: "like",
          tag: "赞"
        }
      ],
      clickIndex: 1,
      comment: "",
      type: 0, //0:所有图标 1：发送
      topic_id: 0,
      liked: false,
      coment_res: {}
    };
  },
  created() {
    this.initTopicDetails();
  },
  methods: {
    // 判断用户是否是登录状态！！！！！！！！不是：点击发送后，跳转登录/注册页面！！！！
    // 初始化
    initTopicDetails() {
      this.topic_id = this.$route.params.topic_id;
      console.log(this.topic_id);
      this.axios
        .get("/api/topicDetails", {
          params: { topic_id: this.topic_id }
        })
        .then(res => {
          if (res.data && res.data.ok && res.data.ok === 1) {
            this.topicDetails = res.data.data.topic_details.hot_topic;
            for (let i in this.icon) {
              if (this.icon[i].name === "share") {
                this.icon[i].tag += this.topicDetails.share_count;
              } else if (this.icon[i].name === "comments") {
                this.icon[i].tag += this.topicDetails.comment_count;
              } else if (this.icon[i].name === "like") {
                this.icon[i].tag += this.topicDetails.like_count;
              }
            }
          }
        });
    },
    goBack() {
      this.$router.back(-1);
    },
    re_tag(index) {
      this.clickIndex = index;
    },
    changeAction() {
      if (this.type === 0) {
        this.type = 1;
      }
    },
    createComment() {
      console.log(this.comment);
      if (this.comment) {
        this.axios
          .get("/api/createComment", {
            params: { comment: this.comment, topic_id: this.topic_id }
          })
          .then(res => {
            if (res.data && res.data.ok === 1) {
              this.$alert("评论成功", "评论", {
                confirmButtonText: "确定"
              });
              this.coment_res = res.data.data;
              this.comment = "";
              this.type = 0;
            }
          });
      }
    },
    isLikedFun() {
      if (this.liked) {
        this.axios
          .post("/api/destory", {
            topic_id: this.topic_id,
            attitude: "heart"
          })
          .then(res => {
            if (res.data.ok === 1) {
              this.liked = false;
            }
          });
      } else {
        this.axios
          .post("/api/create", {
            topic_id: this.topic_id,
            attitude: "heart"
          })
          .then(res => {
            if (res.data.ok === 1) {
              this.liked = true;
            }
          });
      }
    },
    share() {
      this.topic_id = this.$route.params.topic_id;
      this.$router.push({
        path: `/compose/share`,
        query: {
          topic_id: this.topic_id
        }
      });
    }
  }
};
</script>
<style>
.details_list {
  background: #ffffff;
  padding: 0 13px;
}
.details_icon {
  background: #ffffff;
  width: 750px;
  height: 42px;
  display: flex;
  display: -webkit-flex;
  box-shadow: 0 1px 0 0 #e6e6e6;
}
.icon {
  padding-left: 10px;
}
.details_icon span {
  font-size: 18px;
  line-height: 42px;
  color: #a5aeb5;
  margin-right: 40px;
}
.details_active {
  width: 20px;
  height: 3px;
  background: #697480;
  margin-left: 4px;
}
.tag_active {
  color: #697480 !important;
}
.addComment {
  height: 54px;
}
.comment_input {
  height: 54px;
  width: 750px !important;
  position: fixed;
  bottom: 0;
}
.create_comment {
  position: relative;
  height: 60px;
  background: #ffffff;
}
.icons {
  position: fixed;
  bottom: 20px;
  right: 210px;
}
.like_icons {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
}
.like_icons i {
  margin-left: 20px;
}
.comments_but {
  position: fixed;
  bottom: 10px;
  right: 210px;
}
</style>
