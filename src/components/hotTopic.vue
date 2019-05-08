<template>
  <div
    class="hot_list"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <div class="loading">加载中...</div>
    <ul v-if="hotList && hotList.length > 0">
      <li
        class="list"
        v-for="(item, index) in hotList"
        :key="index"
        @click="goDetailed(index)"
      >
        <div class="info_list">
          <div class="user_info">
            <img
              :src="item.hot_topic.user_info.user_header_img"
              @click="profile(index, $event)"
            />
            <div class="name_date">
              <p
                class="user_name"
                v-html="item.hot_topic.user_info.screen_name"
              ></p>
              <p class="date" v-html="item.hot_topic.edit_at"></p>
            </div>
          </div>
          <div class="hot_content">
            <p v-html="item.hot_topic.text"></p>
            <ul
              class="img_totle"
              :class="{
                img_type_1:
                  item.hot_topic.pics.length <= 3 ||
                  item.hot_topic.pics.length >= 5,
                img_type_2: item.hot_topic.pics.length === 4
              }"
              v-if="item.hot_topic.pics && item.hot_topic.pics.length > 0"
            >
              <li v-for="(pic, index) in item.hot_topic.pics" :key="index">
                <img class="topic_img" :src="pic.url" />
              </li>
            </ul>
          </div>
        </div>
        <div class="info_icon">
          <i
            @click="share(index, $event)"
            class="el-icon-share"
            v-html="item.hot_topic.share_count"
          ></i>
          <i
            class="el-icon-edit-outline"
            v-html="item.hot_topic.comment_count"
          ></i>
          <i
            :class="[
              item.hot_topic.like ? 'el-icon-star-on' : 'el-icon-star-off'
            ]"
            v-html="item.hot_topic.like_count"
            @click="isLiked(index, $event)"
          ></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "hotTopic",
  data() {
    return {
      hotList: [],
      busy: false,
      page: 0
    };
  },
  created() {},
  methods: {
    // 无限滚动
    loadMore() {
      this.busy = true;
      //把busy置位true，这次请求结束前不再执行
      setTimeout(() => {
        this.page++;
        this.initHotTopicList(true);
        //调用获取数据接口，并且传入一个true，让axios方法指导是否需要拼接数组。
      }, 500);
    },
    initHotTopicList(flag) {
      var param = {
        page: this.page
      };
      this.axios.get("/api/hotTopic", { params: param }).then(res => {
        if (res.data && res.data.ok && res.data.ok === 1) {
          if (flag) {
            this.hotList = this.hotList.concat(res.data.data.cards);
            if (res.data.data.count === 0) {
              this.busy = true;
            } else {
              this.busy = false;
            }
          } else {
            this.hotList = res.data.data.cards;
            this.busy = false;
          }
        }
      });
    },
    goDetailed(index) {
      const topic_id = this.hotList[index].hot_topic.topic_id;
      this.$router.push({
        path: `/topic/details/${topic_id}`
      });
    },
    isLiked(index, ev) {
      ev.cancelBubble = true;
      const topic_id = this.hotList[index].hot_topic.topic_id;
      if (!this.hotList[index].hot_topic.like) {
        this.axios
          .post("/api/create", {
            topic_id: topic_id,
            attitude: "heart"
          })
          .then(res => {
            if (res.data.ok === 1) {
              this.hotList[index].hot_topic.like = true;
              this.hotList[index].hot_topic.like_count++;
            }
          });
      } else {
        this.axios
          .post("/api/destory", {
            topic_id: topic_id,
            attitude: "heart"
          })
          .then(res => {
            if (res.data.ok === 1) {
              this.hotList[index].hot_topic.like = false;
              this.hotList[index].hot_topic.like_count--;
            }
          });
      }
    },
    share(index, ev) {
      ev.cancelBubble = true;
      const topic_id = this.hotList[index].hot_topic.topic_id;
      this.$router.push({
        path: `/compose/share`,
        query: {
          topic_id: topic_id
        }
      });
    },
    profile(index, ev) {
      ev.cancelBubble = true;
      const user_id = this.hotList[index].hot_topic.user_info.uid;
      this.$router.push({
        path: `/profile/${user_id}`
      });
    }
  }
};
</script>
<style>
.list {
  width: 750px;
  border-bottom: 1px solid #a5adb5;
}
.user_info img {
  width: 40px;
  height: 40px;
  border-radius: 50% 50%;
}
.info_list {
  width: 715px;
  margin: 10px 15px;
}
.user_info {
  height: 50px;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
}
.info_icon {
  width: 720px;
  height: 22px;
  margin: 0 1.2rem;
  padding: 0rem 0.375rem 1rem 0;
}
.info_icon i {
  margin-right: 60px;
  font-size: 18px;
  color: #939393;
}
.name_date {
  margin-left: 10px;
}
.user_info .date {
  color: #939393;
  font-size: 0.6875rem;
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
</style>
