<template>
  <div class="container">
    <div class="comment_reply">
      <div class="reply_top">
        <i class="el-icon-arrow-left" @click="back"></i>
        <span class="reply">发布话题</span>
        <div class="reply_send">
          <el-button type="text" @click="sendTopic">发送</el-button>
        </div>
      </div>
      <div class="reply_input">
        <el-input
          type="textarea"
          :rows="30"
          :placeholder="`分享一个话题...`"
          v-model="topic_text"
        >
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "editTopic",
  data() {
    return {
      topic_text: ""
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    sendTopic() {
      if (this.topic_text === "") {
        this.$alert("请输入话题内容", "发布话题", {
          confirmButtonText: "确定"
        });
      }
      this.axios
        .post("/api/reply", {
          // topic_id: this.topic_id,
          // c_id: this.comment_id,
          content: this.topic_text
        })
        .then(res => {
          if (res.data.ok === 1) {
            this.$alert("发布话题成功", "发布话题", {
              confirmButtonText: "确定",
              callback: () => {
                this.$router.back(-1);
              }
            });
          } else {
            this.$alert("发布话题失败", "发布话题 ", {
              confirmButtonText: "确定"
            });
          }
        });
    }
  }
};
</script>
