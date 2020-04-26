### 安装vue-cli3环境：
  - npm更新至最新
  - node版本>=8.9
  - 安装vue-cli3: `npm install -g @vue/cli 或 yarn global add @vue/cli`
  - vue-V：查看vue版本
### 运行
  - cd xiyouquan
  - yarn install
  - yarn serve
### 目前进度：
  - 登录，注册，各个模块页面显示，点赞，点击跳转写了一点点
  - 发送的api你在vue.config.js里面看，具体vue中哪里发送了，我忘记了，你自己看看吧，文件不是很多，可以全局搜索，vs的全局搜索是`shift+ctrl+F`，我不知道你那个是不是和我的一样
### 目录结构说明：
  - mock:存放本地的mock数据
    - hot.json: 首页中搜索框的热门信息
    - hotTopic.json: 热门信息
    - loginInfo.json: 登录成功或失败信息   (我想把这个文件改了，改成只有是否登录成功字段）
    - signInfo.json: 注册成功或失败信息    (这个我也想改，也是改成只有是否注册成功字段)
    - userInfo.json: 用户信息             (目前没有用到我想把上两个改了用这个)
  - node_modules:不用管，打包好的东西
  - public: 我也不知道这个有什么用
  - src
    - assets:可以存放一些静态资源：如imgages
    - components: 组件
      - foodTopic.vue:    首页中显示的餐饮组件
      - friendsTopic.vue: 首页中显示的圈子组件
      - hotTopic.vue:     首页中显示的热门组件
      - studyTopic.vue:   首页中显示的学习组件
    - css：
      - app.css:  全局默认样式修改
    - plugins: 插件
      - element.js: elementUI插件
    - views: 各种组件页面的入口或不用划分组件的
      - forget.vue: 忘记密码（这个功能我还没有做，把入口页放着占坑）
      - index.vue:  首页中的东西,以及小导航的入口
      - login.vue:  登录，注册页面
      - topicDetails.vue： 跳转的详情页 （功能正在完善）
    - vuex
      - modules: 各种类型的store
        - hot.js：   搜索框中默认信息
        - login.js： 登录 用户信息
        - topic.js： 详情页  
      -store.js 把上面的sotre统一管理
    - APP.vue： 入口，占坑
    - main.js:  各种东西的配置
    - router.js:路由配置
  - vue.config.js: 各种配置，如各种请求api

