<template>
  <div class="shareCard">
    <!-- 有数据 -->
    <ul v-if="shareList && shareList.length">
      <li v-for="(item, index) in shareList" :key="index">
        <div class="share_card">
          <div>
            <img :src="item.user.user_header_img" />
          </div>
          <div class="share_info">
            <span class="share_name" v-html="item.user.screen_name"></span>
            <span class="share_text" v-html="item.text"></span>
            <span class="share_date" v-html="item.created_at"></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style>
.shareCard {
  background: #ffffff;
  min-height: 175px;
}
.share_card {
  height: 100px;
  display: flex;
  display: -webkit-flex;
  padding-top: 20px;
}
.share_card div {
  margin-left: 13px;
}
.share_card img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.share_info {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: space-between;
  width: 670px;
  border-bottom: 1px solid #cfcfcf;
}
.share_name {
  font-size: 18px;
}
.share_text {
  font-size: 20px;
}
.share_date {
  color: #cfcfcf;
  font-size: 16px;
}
</style>

<script>
export default {
  name: "share",
  data() {
    return {
      shareList: []
    };
  },
  computed: {
    topic_id() {
      return this.$route.params.topic_id;
    }
  },
  mounted() {
    this.axios
      .get("/api/share", {
        params: { topic_id: this.topic_id }
      })
      .then(res => {
        if (res.data.ok === 1) {
          this.shareList = res.data.data;
        }
      });
  }
};
</script>
