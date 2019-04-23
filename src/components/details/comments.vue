<template>
  <div>
    <ul v-if="commentsInfo && commentsInfo.length > 0">
      <li v-for="(item, index) in commentsInfo" :key="index" class="comm_list">
        <div class="comment_list">
          <div class="img">
            <img class="comments_image" :src="item.user.user_header_img" />
          </div>
          <!-- 评论者信息 -->
          <div class="comments_information">
            <div class="comments_name">
              <span v-html="item.user.screen_name"></span>
            </div>
            <div class="comments_mess">
              <span v-html="item.text"></span>
            </div>
            <!-- 附加评论 -->
            <div class="more_mess" v-if="item.comments">
              <div class="more_content">
                <ul
                  class="above"
                  v-if="item.comments && item.comments.length > 0"
                >
                  <li
                    v-for="(more_item, key) in item.comments"
                    :key="key"
                    class="more_content"
                  >
                    <span
                      class="more_name"
                      v-html="more_item.user.screen_name + `:`"
                    ></span>
                    <span class="more_message" v-html="more_item.text"></span>
                  </li>
                </ul>
                <div class="more_count">
                  <span>共{{ item.total_number }}条回复 ></span>
                  <div></div>
                </div>
              </div>
            </div>
            <!-- 其他信息 -->
            <div class="other_mess">
              <span class="create_date">{{
                item.created_at | commentDate(item.created_at)
              }}</span>
              <div class="like_icon">
                <i
                  :class="item.liked ? 'el-icon-star-on' : 'el-icon-star-off'"
                  v-html="item.like_count"
                  @click="isLikedFun(index)"
                ></i>
                <i class="el-icon-edit"></i>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "comments",
  data() {
    return {
      commentsInfo: []
    };
  },
  created() {
    this.getCommentsInfo();
  },
  computed: {
    topic_id() {
      return this.$route.params.topic_id;
    }
  },
  methods: {
    getCommentsInfo() {
      this.axios
        .get("http://localhost:8080/api/comments", {
          params: { topic_id: this.topic_id }
        })
        .then(res => {
          if (res.data.ok && res.data.ok === 1) {
            this.commentsInfo = res.data.data.data;
          }
        });
    },
    isLikedFun(index) {
      console.log(index);
      console.log(this.commentsInfo[index], "===");
      if (this.commentsInfo[index].liked) {
        this.commentsInfo[index].liked = false;
        this.axios
          .post("/api/likes/destory", { id: this.topic_id })
          .then(res => {});
      } else {
        this.commentsInfo[index].liked = true;
      }
    }
  }
};
</script>
<style>
li {
  list-style: none;
}
.comments {
  width: 100%;
}
.comment_icon {
  width: 0.875rem;
  height: 0.875rem;
  position: absolute;
  top: 1.55rem;
  left: 1.6rem;
}
.comments_list {
  width: 100%;
}
.comments_content {
  width: 100%;
}
.comm_list {
  background: #ffffff;
}
.comment_list {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-start;
  padding-top: 20px;
  justify-content: space-around;
  margin: 0 13px;
}
.img {
  width: 38px;
  height: 38px;
  position: relative;
}
.comments_image {
  width: 38px;
  height: 38px;
  border: 0.5px solid rgba(0, 0, 0, 0.06);
  border-radius: 50% 50%;
}
.comments_information {
  margin-left: 13px;
  width: 100%;
}
.comments_name {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #858585;
  line-height: 14px;
  margin-bottom: 8px;
}
.comments_mess {
  font-family: PingFangSC-Regular;
  font-size: 15px;
  color: #292929;
  line-height: 15px;
  display: flex;
  display: -webkit-flex;
}
.comments_info {
  widows: 100%;
  height: 34px;
  font-family: PingFangSC-Light;
  font-size: 12px;
  color: #a7a7ac;
  line-height: 34px;
  background: #ffffff;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 64px;
  border-bottom: 1px solid #dedfe0;
}
.comments_like {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  margin-right: 13px;
}
.comments_like .comments_icon {
  width: 18px;
  height: 18px;
  margin-right: 4px;
}
.comments_like span {
  margin-right: 14px;
}
.more_name {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #576b95;
}
.more_message {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #373737;
  line-height: 20px;
  margin-top: 4px;
}
.more_mess {
  background: #f7f7f7;
  display: flex;
  display: -webkit-flex;
  margin-top: 10px;
}
.above {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 10px 10px 2px 10px;
}
.more_content li {
  list-style: none;
}
.more_count {
  width: 278px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #576b95;
  letter-spacing: -0.085px;
  margin: 0px 0px 7px 10px;
}
.other_mess {
  display: flex;
  display: -webkit-flex;
  height: 16px;
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.other_mess .create_date,
i {
  line-height: 16px !important;
  font-size: 0.65rem !important;
  color: #999 !important;
}
.other_mess i {
  margin-top: 2px;
}
.like_icon {
  height: 16px;
  margin-top: -12px;
}
</style>
