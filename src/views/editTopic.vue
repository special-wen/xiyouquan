<template>
  <div :class="$style.container">
    <div :class="$style.comment_reply">
      <div :class="$style.reply_top">
        <i class="el-icon-arrow-left" @click="back"></i>
        <span :class="$style.reply">发布话题</span>
        <div :class="$style.reply_send">
          <el-button type="text" @click="sendTopic">发送</el-button>
        </div>
      </div>
      <div :class="$style.reply_input">
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
        <div :class="$style.uploadFile">
          <el-upload
            action="/api/pics"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="getPicURL"
            :on-change="picChange"
            list-type="picture-card"
            :limit="9"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<style module>
.container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.uploadFile {
  position: absolute;
  top: 300px;
  left: 190px;
}
.topic_type {
  position: absolute;
  top: 474px;
  left: 190px;
}
.comment_reply {
  width: 750px;
  height: 100%;
  background: #ffffff;
  margin: 0 auto;
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
  name: "editTopic",
  data() {
    return {
      topic_text: "",
      type: "1",
      dialogImageUrl: "",
      dialogVisible: false,
      picsInfo: [],
      uploadID: [],
      pics_url: ""
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    sendTopic() {
      console.log(this.picsInfo, this.uploadID, "==");
      this.uploadID.map((item, index) => {
        if (item === 0) {
          this.picsInfo[index] = "";
        }
      });
      this.picsInfo.map(item => {
        if (item !== "") {
          this.pics_url += item.path + ",";
        }
      });
      this.pics_url = this.pics_url.substring(0, this.pics_url.length - 1);
      if (this.topic_text === "" && this.pics_url === "") {
        this.$alert("请输入话题内容", "发布话题", {
          confirmButtonText: "确定"
        });
      } else {
        let created_at = new Date().valueOf();
        this.axios
          .post("/api/edit", {
            text: this.topic_text,
            created_at: created_at,
            type: parseInt(this.type),
            pics: this.pics_url
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
    },
    // eslint-disable-next-line no-unused-vars
    handleRemove(file, fileList) {
      // console.log(file.uid);
      let index = this.uploadID.indexOf(file.uid);
      this.uploadID[index] = 0;
    },
    // eslint-disable-next-line no-unused-vars
    handlePreview(file) {
      // console.log(file.uid);
    },
    getPicURL(res) {
      console.log(this.uploadID);
      if (res.ok === 1) {
        this.picsInfo = this.picsInfo.concat(res.data.picInfo);
      }
    },
    // eslint-disable-next-line no-unused-vars
    picChange(file, fileList) {
      if (this.uploadID.indexOf(file.uid) === -1) {
        this.uploadID.push(file.uid);
      }
      // this.picsInfo[this.picsInfo.length - 1] = file.uid;
    }
  }
};
</script>
