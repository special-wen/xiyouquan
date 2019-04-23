<template>
  <div class="topic_details">
    <!-- 话题详情页 -->
    <topic-details></topic-details>
  </div>
</template>
<script>
import topicDetails from "../components/details/topicDetails";
export default {
  name: "topicDetails",
  components: {
    "topic-details": topicDetails
  }
};
</script>

<style>
.topic_details {
  width: 750px;
  margin: 0 auto;
}
.back {
  font-size: 28px;
  line-height: 46px !important;
  margin-left: 13px;
}
.go_back {
  width: 100%;
  height: 46px;
  background: #fafafa;
}
.go_back span {
  font-size: 20px;
  line-height: 46px;
  margin-left: 290px;
}
.more {
  font-size: 28px;
  line-height: 46px !important;
  margin-left: 290px;
}
.details_icon {
  margin-top: 10px;
}
</style>
