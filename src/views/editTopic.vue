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
        <div :class="$style.topic_type">
          <el-radio v-model="type" label="1">学习</el-radio>
          <el-radio v-model="type" label="2">食物</el-radio>
          <el-radio v-model="type" label="3">圈子</el-radio>
        </div>
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
<style module>
.uploadFile {
  position: absolute;
  top: 330px;
  left: 100px;
}
.topic_type {
  position: absolute;
  top: 474px;
  left: 61px;
}
</style>

<script>
export default {
  name: "editTopic",
  data() {
    return {
      topic_text: "",
      type: "1"
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
      } else {
        let created_at = new Date().valueOf();
        this.axios
          .post("/api/edit", {
            text: this.topic_text,
            created_at: created_at,
            type: parseInt(this.type)
          })
          .then(res => {
            if (res.data.ok === 1) {
              const topic_id = res.data.data.topic_id;
              this.$alert("发布话题成功", "发布话题", {
                confirmButtonText: "确定",
                callback: () => {
                  this.$router.push({
                    path: `/topic/details/${topic_id}`
                  });
                }
              });
            } else {
              this.$alert(res.data.data.msg, "发布话题 ", {
                confirmButtonText: "确定",
                callback: () => {
                  this.$router.push({ path: "/login" });
                }
              });
            }
          });
      }
    }
  }
};
</script>
