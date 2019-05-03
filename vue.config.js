const userInfo = require("./mock/userInfo.json");
const loginInfo = require("./mock/loginInfo.json");
const signInfo = require("./mock/signInfo.json");
const hot = require("./mock/hot.json");
const hotTopic = require("./mock/hotTopic.json");
const topicDetails = require("./mock/topicDetails.json");
const comments = require("./mock/comments.json");
const createComment = require("./mock/createComment");
const update = require("./mock/update"); //评论点赞
const destory = require("./mock/destory");
const create = require("./mock/create");
const reply = require("./mock/reply");
const shareList = require("./mock/shareList");
const likeList = require("./mock/like");
const share = require("./mock/share"); //转发时的信息
const hotFlow = require("./mock/hotFlow.json");
const childHotFlow = require("./mock/childHotFlow.json");
module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    port: 8080,
    before(app) {
      app.get("/api/userInfo", (req, res) => {
        res.json(userInfo);
      });
      app.post("/api/loginInfo", (req, res) => {
        res.json(loginInfo);
      });
      app.post("/api/signInfo", (req, res) => {
        res.json(signInfo);
      });
      app.get("/api/hot", (req, res) => {
        res.json(hot);
      });
      app.get("/api/hotTopic", (req, res) => {
        res.json(hotTopic);
      });
      app.get("/api/topicDetails", (req, res) => {
        res.json(topicDetails);
      });
      app.get("/api/comments", (req, res) => {
        res.json(comments);
      });
      app.get("/api/createComment", (req, res) => {
        res.json(createComment);
      });
      app.post("/api/update", (req, res) => {
        res.json(update);
      });
      app.post("/api/destory", (req, res) => {
        res.json(destory);
      });
      app.post("/api/create", (req, res) => {
        res.json(create);
      });
      app.post("/api/reply", (req, res) => {
        res.json(reply);
      });
      app.get("/api/share", (req, res) => {
        res.json(shareList);
      });
      app.get("/api/like", (req, res) => {
        res.json(likeList);
      });
      app.get("/api/shareCard", (req, res) => {
        res.json(share);
      });
      app.get("/api/hotflow", (req, res) => {
        res.json(hotFlow);
      });
      app.get("/api/hotFlowChild", (req, res) => {
        res.json(childHotFlow);
      });
    }
  }
};
