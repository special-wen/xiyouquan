<template>
  <div class="hot_list">
    <ul v-if="hotList && hotList.length > 0">
      <li class="list" v-for="(item, index) in hotList" :key="index">
        <div class="info_list">
          <div class="user_info">
            <img :src="item.hot_topic.user_info.user_header_img" />
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
              <li v-for="(item, index) in item.hot_topic.pics" :key="index">
                <img class="topic_img" :src="item.url" />
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "friendsTopic",
  data() {
    return {
      hotList: []
    };
  },
  created() {
    this.axios
      .get("http://localhost:8080/api/hotTopic")
      .then(res => {
        if (res.data && res.data.ok && res.data.ok === 1) {
          this.hotList = res.data.data.cards;
          console.log(this.hotList);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {}
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
}
.topic_img {
  width: 127px;
  height: 127px;
  margin: 0 2px;
}
.img_type_1 {
  width: 400px;
}
.img_type_2 {
  width: 300px;
}
</style>
