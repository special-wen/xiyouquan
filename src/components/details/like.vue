<template>
  <div class="likeCard">
    <!-- 没有数据 -->
    <div v-if="likeList.length === 0 && !request" class="noLikeList">
      <span>还没有人来喜欢过这个话题</span>
    </div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <ul>
        <li v-for="(item, index) in likeList" :key="index">
          <div class="like_card">
            <img :src="header_img(item.user_header_img)" />
            <div class="like_info">
              <span class="like_name" v-html="item.screen_name"></span>
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
<style>
.loading {
  margin-top: 30px;
}
.likeCard {
  min-height: 305px;
  background: #ffffff;
}
.noLikeList {
  background: #ffffff;
  margin-top: 10px;
  padding-left: 13px;
  padding-top: 13px;
  color: #697480;
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
      likeList: [],
      busy: false,
      page: 0,
      request: true
    };
  },
  computed: {
    topic_id() {
      return this.$route.params.topic_id;
    },
    header_img() {
      return function(item) {
        if (item) {
          return item;
        }
        return "http://avatars3.githubusercontent.com/u/27426408?s=40&v=4";
      };
    }
  },
  mounted() {},
  methods: {
    loadMore() {
      this.busy = true;
      //把busy置位true，这次请求结束前不再执行
      setTimeout(() => {
        this.page++;
        this.getLikeList(true);
        //调用获取数据接口，并且传入一个true，让axios方法指导是否需要拼接数组。
      }, 500);
    },
    getLikeList(flag) {
      this.request = true;
      this.axios
        .get("/api/like", {
          params: { topic_id: this.topic_id, page: this.page }
        })
        .then(res => {
          this.request = false;
          if (res.data.ok === 1) {
            if (flag) {
              this.likeList = this.likeList.concat(res.data.data.data);
              if (res.data.count === 0) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.likeList = res.data.data;
              console.log(this.likeList);
              this.busy = false;
            }
          }
        });
    }
  }
};
</script>
