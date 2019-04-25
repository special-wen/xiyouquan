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
    }
  }
};
