<template>
  <div class="container">
    <div class="comment_reply">
      <div class="reply_top">
        <i class="el-icon-arrow-left" @click="back"></i>
        <span class="reply">转发话题</span>
        <div class="reply_send">
          <el-button type="text" @click="sendShare">发送</el-button>
        </div>
      </div>
      <div class="reply_input share_cards">
        <el-input
          type="textarea"
          :rows="30"
          placeholder="说点什么吧"
          v-model="shareText"
        >
        </el-input>
        <div class="upload_pics">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </div>

        <div class="topic" v-if="shareCard">
          <img :src="shareCard.thumbnail_pic" />
          <div class="share_infos" v-if="shareCard.user">
            <span
              v-if="shareCard.user.screen_nam0e"
              class="share_name"
              v-html="`@` + shareCard.user.screen_name"
            ></span>
            <span class="share_text" v-html="shareCard.text"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShareCard",
  data() {
    return {
      shareText: "",
      shareCard: {},
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed: {
    topic_id() {
      if (this.$route.query.topic_id) {
        return this.$route.query.topic_id;
      }
      return "";
    }
  },
  created() {
    this.initShareCard();
  },
  methods: {
    initShareCard() {
      this.axios
        .get("/api/shareCard", { params: { topic_id: this.topic_id } })
        .then(res => {
          if (res.data.ok === 1) {
            this.shareCard = res.data.data;
            console.log(this.shareCard.user.screen_name);
          }
        });
    },
    back() {
      this.$router.back(-1);
    },
    sendShare() {
      if (this.shareText === "") {
        this.$alert("请输入回复评论内容", "回复评论", {
          confirmButtonText: "确定"
        });
      }
      // user_id记得！！！ 图片信息
      this.axios
        .post("/api/reply", {
          topic_id: this.topic_id,
          content: this.shareText
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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style>
.share_cards {
  width: 750px;
  height: 100%;
  background: #ffffff;
  margin: 0 auto;
  position: relative;
}
.topic {
  position: absolute;
  top: 320px;
  height: 105px;
  width: 726px;
  background: #f2f2f2;
  display: flex;
  display: -webkit-flex;
  left: 13px;
}
.topic img {
  width: 105px;
  height: 105px;
}
.share_name {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
}
.share_text {
  color: #939393;
  font-size: 18px;
}
.share_infos {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: center;
}
.upload_pics {
  position: absolute;
  top: 120px;
  left: 13px;
}
</style>
