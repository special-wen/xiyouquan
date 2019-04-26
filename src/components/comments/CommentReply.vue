<template>
  <div class="container">
    <div class="comment_reply">
      <div class="reply_top">
        <i class="el-icon-arrow-left" @click="back"></i>
        <span class="reply">回复评论</span>
        <div class="reply_send">
          <el-button type="text" @click="sendReply">发送</el-button>
        </div>
      </div>
      <div class="reply_input">
        <el-input
          type="textarea"
          :rows="30"
          :placeholder="reply_place"
          v-model="reply"
        >
        </el-input>
      </div>
    </div>
  </div>
</template>
<style>
.container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.comment_reply {
  width: 750px;
  height: 100%;
  background: #ffffff;
}
.reply_top {
  height: 56px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  border-bottom: 1px solid #cfcfcf;
  background: #fafafa;
}
.reply_top i {
  margin-left: 13px;
  font-size: 20px !important;
}
.reply {
  margin: 0 auto;
}
.reply_top span {
  color: #282f3c;
  font-size: 20px;
}
.reply_send {
  margin-top: 3px;
  margin-right: 13px;
}
.reply_send span {
  color: #409eff;
}
.reply_input textarea {
  outline: none !important;
  -webkit-appearance: none !important;
  border-radius: 0 !important;
  border: none !important;
  font-size: 20px;
  padding-top: 20px;
}
.reply_input textarea:focus {
  outline: none !important;
  -webkit-appearance: none !important;
  border-radius: 0 !important;
}
</style>

<script>
export default {
  name: "CommentReply",
  data() {
    return {
      reply: ""
    };
  },
  computed: {
    topic_id() {
      if (this.$route.query.topic_id) {
        return this.$route.query.topic_id;
      }
      return "";
    },
    comment_id() {
      if (this.$route.query.c_id) {
        return this.$route.query.c_id;
      }
      return "";
    },
    reply_name() {
      if (this.$route.query.reply_name) {
        return this.$route.query.reply_name;
      }
      return "";
    },
    reply_place() {
      if (this.reply_name) {
        return "@" + this.reply_name;
      }
      return "";
    }
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    // 确认回复
    sendReply() {
      if (this.reply === "") {
        this.$alert("请输入回复评论内容", "回复评论", {
          confirmButtonText: "确定"
        });
      }
      this.axios
        .post("/api/reply", {
          topic_id: this.topic_id,
          c_id: this.comment_id,
          content: this.reply
        })
        .then(res => {
          if (res.data.ok === 1) {
            this.$alert("评论成功", "回复评论", {
              confirmButtonText: "确定",
              callback: () => {
                this.$router.back(-1);
              }
            });
          } else {
            this.$alert("评论失败", "回复评论", {
              confirmButtonText: "确定"
            });
          }
        });
    }
  }
};
</script>
