<template>
  <div :class="$style.comments_flow">
    <div :class="$style.comments_flow_title" v-if="hotFlow">
      <i class="el-icon-arrow-left" :class="$style.back" @click="back"></i>
      <span
        v-if="hotFlow.total_number"
        :class="$style.title"
        v-html="hotFlow.total_number + `条回复`"
      ></span>
    </div>
    <div :class="$style.comments_root" v-if="hotFlow.user">
      <img
        v-if="hotFlow.user.user_header_img"
        :src="hotFlow.user.user_header_img"
      />
      <div :class="$style.comments_root_info">
        <span
          v-if="hotFlow.user.screen_name"
          :class="$style.root_name"
          v-html="hotFlow.user.screen_name"
        ></span>
        <span
          v-if="hotFlow.text"
          :class="$style.root_text"
          v-html="hotFlow.text"
        ></span>
        <div :class="$style.root_create_info" v-if="hotFlow">
          <span>{{
            hotFlow.created_at | commentDate(hotFlow.created_at)
          }}</span>
          <div :class="$style.like_icon" v-if="hotFlow">
            <i
              :class="hotFlow.liked ? 'el-icon-star-on' : 'el-icon-star-off'"
              v-html="hotFlow.like_count"
              @click="isLikedFun()"
            ></i>
            <i class="el-icon-edit" @click="comments()"></i>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.comments_child" v-if="childHotFlow">
      <ul v-if="childHotFlow && childHotFlow.length > 0">
        <li v-for="(item, index) in childHotFlow" :key="index">
          <div :class="$style.child_comment">
            <img :src="item.user.user_header_img" />
            <div :class="$style.comment_info">
              <span
                :class="$style.child_name"
                v-html="item.user.screen_name"
              ></span>
              <span :class="$style.child_text" v-html="item.text"></span>
              <div :class="$style.child_create_info">
                <span>{{
                  item.created_at | commentDate(item.created_at)
                }}</span>
                <div :class="$style.like_icon">
                  <i
                    :class="item.liked ? 'el-icon-star-on' : 'el-icon-star-off'"
                    v-html="item.like_count"
                    @click="childLikedFun(index)"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style module>
.comments_flow {
  width: 750px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  margin: 0 auto;
}
.comments_flow_title {
  width: 100%;
  height: 55px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  background: #fafafa;
  border-bottom: 1px solid #f2f2f2;
}
.back {
  color: #282f3c;
  font-size: 20px !important;
}
.title {
  color: #282f3c;
  margin-left: 320px;
}
.comments_root {
  display: flex;
  display: -webkit-flex;
  padding: 13px 13px;
  border-bottom: 1px solid #f2f2f2;
}
.comments_root img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}
.comments_root_info {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  margin-left: 13px;
  width: 670px;
}
.root_name {
  color: #333;
  font-size: 0.875rem;
  margin-bottom: 6px;
}
.root_text {
  font-size: 1rem;
  color: #333;
  line-height: 1.4;
}
.root_create_info {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  margin-top: 12.75px;
  justify-content: space-between;
}
.root_create_info span,
i {
  font-size: 0.68rem;
  color: #999;
  line-height: 0.9375rem;
}
.comments_child {
  background: #f7f7f7;
}
.child_comment {
  display: flex;
  display: -webkit-flex;
  padding: 13px 13px 0px 13px;
}
.child_comment img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}
.comment_info {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  margin-left: 13px;
  width: 100%;
  border-bottom: solid 1px #e6e6e6;
}
.child_name {
  color: #333;
  font-size: 0.875rem;
  margin-bottom: 6px;
}
.child_text {
  font-size: 1rem;
  color: #333;
  line-height: 1.4;
}
.child_create_info {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  margin-top: 12.75px;
  justify-content: space-between;
  margin-bottom: 13px;
}
.child_create_info span,
i {
  font-size: 0.68rem;
  color: #999;
  line-height: 0.9375rem;
}
</style>
<script>
export default {
  name: "moreComments",
  data() {
    return {
      hotFlow: {},
      childHotFlow: []
    };
  },
  computed: {
    topic_id() {
      if (this.$route.query.topic_id) {
        return this.$route.query.topic_id;
      }
      return "";
    },
    c_id() {
      if (this.$route.query.c_id) {
        return this.$route.query.c_id;
      }
      return "";
    }
  },
  created() {
    this.initHotFlow();
    this.initChildHotFlow();
  },
  methods: {
    // 初始化主楼评论
    initHotFlow() {
      console.log(this.$route.params);
      this.axios
        .get("/api/hotflow", {
          params: { topic_id: this.topic_id, c_id: this.c_id }
        })
        .then(res => {
          if (res.data && res.data.ok === 1) {
            this.hotFlow = res.data.data;
          }
        });
    },
    // 初始化楼层评论
    initChildHotFlow() {
      this.axios
        .get("/api/hotFlowChild", {
          params: { topic_id: this.topic_id, root_id: this.c_id }
        })
        .then(res => {
          if (res.data && res.data.ok === 1) {
            this.childHotFlow = res.data.data.childHotFlow;
          }
        });
    },
    back() {
      this.$router.back(-1);
    },
    isLikedFun() {
      if (this.hotFlow.liked) {
        this.axios
          .post("/api/destory", { c_id: this.c_id, type: "comment" })
          .then(res => {
            if (res.data.ok === 1) {
              this.hotFlow.liked = false;
              this.hotFlow.like_count--;
            }
          });
      } else {
        this.axios
          .post("/api/update", { c_id: this.c_id, type: "comment" })
          .then(res => {
            if (res.data.ok === 1) {
              this.hotFlow.liked = true;
              this.hotFlow.like_count++;
            }
          });
      }
    },
    childLikedFun(index) {
      if (this.childHotFlow[index].liked) {
        this.axios
          .post("/api/destory", {
            c_id: this.childHotFlow[index].cid,
            type: "comment"
          })
          .then(res => {
            if (res.data.ok === 1) {
              this.childHotFlow[index].liked = false;
              this.childHotFlow[index].like_count--;
            }
          });
      } else {
        this.axios
          .post("/api/update", {
            c_id: this.childHotFlow[index].cid,
            type: "comment"
          })
          .then(res => {
            if (res.data.ok === 1) {
              this.childHotFlow[index].liked = false;
              this.childHotFlow[index].like_count--;
            }
          });
      }
    },
    comments() {
      this.$router.push({
        path: `/compose/reply`,
        query: {
          topic_id: this.topic_id,
          c_id: this.c_id,
          reply_name: this.hotFlow.user.screen_name
        }
      });
    }
  }
};
</script>
