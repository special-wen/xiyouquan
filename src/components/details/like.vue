<template>
  <div class="likeCard">
    <!-- 有数据 -->
    <ul v-if="likeList && likeList.length">
      <li v-for="(item, index) in likeList" :key="index">
        <div class="like_card">
          <img :src="item.user.user_header_img" />
          <div class="like_info">
            <span class="like_name" v-html="item.user.screen_name"></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style>
.likeCard {
  background: #ffffff;
  min-height: 175px;
}
.like_card {
  height: 40px;
  display: flex;
  display: -webkit-flex;
  padding-top: 20px;
  margin-left: 13px;
}
.like_card img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.like_name {
  font-size: 18px;
  color: #333;
}
.like_info {
  width: 670px;
  border-bottom: 1px solid #cfcfcf;
  margin-left: 20px;
}
</style>

<script>
export default {
  name: "like",
  data() {
    return {
      likeList: []
    };
  },
  computed: {
    topic_id() {
      return this.$route.params.topic_id;
    }
  },
  mounted() {
    this.axios
      .get("/api/like", {
        params: { topic_id: this.topic_id }
      })
      .then(res => {
        if (res.data.ok === 1) {
          this.likeList = res.data.data.data;
        }
      });
  }
};
</script>
