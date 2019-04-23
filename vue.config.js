const userInfo = require("./mock/userInfo.json");
const loginInfo = require("./mock/loginInfo.json");
const signInfo = require("./mock/signInfo.json");
const hot = require("./mock/hot.json");
const hotTopic = require("./mock/hotTopic.json");
const topicDetails = require("./mock/topicDetails.json");
const comments = require("./mock/comments.json");
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
    }
  }
};
