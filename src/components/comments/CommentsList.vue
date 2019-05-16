<template>
  <div class="commentCard">
    <div v-if="commentsInfo.length === 0 && !request" class="noComments">
      <span>没有评论，快来占沙发吧～</span>
    </div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <ul>
        <li
          v-for="(item, index) in commentsInfo"
          :key="index"
          class="comm_list"
        >
          <div class="comment_list">
            <div class="img">
              <img
                class="comments_image"
                @click="profile(index)"
                :src="header_img(item.user_info.user_header_img)"
              />
            </div>
            <!-- 评论者信息 -->
            <div class="comments_information">
              <div class="comments_name">
                <span v-html="item.user_info.user_screen_name"></span>
              </div>
              <div class="comments_mess">
                <span v-html="item.comment.text"></span>
              </div>
              <!-- 附加评论 -->
              <div class="more_mess" v-if="item.comment.flow_comment_info">
                <div class="more_content">
                  <ul
                    class="above"
                    v-if="
                      item.comment.flow_comment_info &&
                        item.comment.flow_comment_info.length > 0
                    "
                  >
                    <li
                      v-for="(more_item, key) in item.comment.flow_comment_info"
                      :key="key"
                      class="more_content"
                    >
                      <span
                        class="more_name"
                        v-html="more_item.screen_name + `:`"
                      ></span>
                      <span class="more_message" v-html="more_item.text"></span>
                    </li>
                  </ul>
                  <div class="more_count" @click="moreComments(item)">
                    <span
                      v-html="`共 ` + item.comment.flow_count + ` 条回复>`"
                    ></span>
                    <div></div>
                  </div>
                </div>
              </div>
              <!-- 其他信息 -->
              <div class="other_mess">
                <span class="create_date">{{
                  item.comment.created_at | commentDate(item.comment.created_at)
                }}</span>
                <div class="like_icon">
                  <i class="el-icon-edit" @click="twoLevelComment(index)"></i>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div
        class="loading"
        v-loading="!busy || request"
        element-loading-spinner="el-icon-loading"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "comments",
  data() {
    return {
      commentsInfo: [],
      comment: {},
      busy: false,
      page: 0,
      request: true
    };
  },
  props: ["commentRes"],
  computed: {
    topic_id() {
      return this.$route.params.topic_id;
    },
    header_img() {
      return function(item) {
        if (item) {
          return item;
        }
        return "http://127.0.0.1/img/header.jpg";
      };
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    commentRes(newVal, oldVal) {
      console.log(newVal);
      this.commentsInfo.unshift(newVal.comment_info);
    }
  },
  methods: {
    loadMore() {
      this.busy = true;
      //把busy置位true，这次请求结束前不再执行
      setTimeout(() => {
        this.page++;
        this.getCommentsInfo(true);
        //调用获取数据接口，并且传入一个true，让axios方法指导是否需要拼接数组。
      }, 500);
    },

    //获取评论列表中的评论
    getCommentsInfo(flag) {
      this.request = true;
      this.axios
        .get("/api/comments", {
          params: { topic_id: this.topic_id, page: this.page }
        })
        .then(res => {
          this.request = false;
          if (res.data.ok && res.data.ok === 1) {
            if (flag) {
              this.commentsInfo = this.commentsInfo.concat(
                res.data.data.comment_info
              );
              if (res.data.count === 0) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.commentsInfo = res.data.data.comment_info;
              this.busy = false;
            }
          }
        });
    },
    // 二级评论评论页面
    twoLevelComment(index) {
      let c_id = this.commentsInfo[index].comment.cid;
      let name = this.commentsInfo[index].user_info.user_screen_name;
      this.$router.push({
        path: `/compose/reply`,
        query: {
          topic_id: this.topic_id,
          c_id: c_id,
          reply_name: name
        }
      });
    },
    // 评论盖楼页面
    moreComments(item) {
      console.log(item);
      this.$router.push({
        path: `/compose/comments/`,
        query: {
          topic_id: this.topic_id,
          c_id: item.comment.cid
        }
      });
    },
    // 别人的主页
    profile(index) {
      const user_id = this.commentsInfo[index].user_info.uid;
      this.$router.push({
        path: `/profile/${user_id}`
      });
    }
  }
};
</script>
<style>
.loading {
  margin-top: 30px;
}
.commentCard {
  min-height: 305px;
  background: #ffffff;
}
.noComments {
  background: #ffffff;
  margin-top: 10px;
  padding-left: 13px;
  padding-top: 13px;
  color: #697480;
}
.topic_img {
  width: 127px;
  height: 127px;
}
.img_totle {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  padding-top: 10px;
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
