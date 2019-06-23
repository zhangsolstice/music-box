# 响应式音乐webapp

<a href='https:www.vuejs.org'><img src='https://img.shields.io/badge/vue-2.6.10-64b587.svg'></a> <a href='https://router.vuejs.org'><img src='https://img.shields.io/badge/vue--router-3.0.2-64b587.svg'></a> <a href='https://vuex.vuejs.org'><img src='https://img.shields.io/badge/vuex-3.1.0-64b587.svg'></a> <a href='https://ssr.vuejs.org'><img src='https://img.shields.io/badge/vue--server--renderer-2.6.10-64b587.svg'></a> <a href='https://pugjs.org/api/getting-started.html'><img src='https://img.shields.io/badge/pug-2.0.3-9f6758.svg'></a> <a href='http://stylus-lang.com'><img src='https://img.shields.io/badge/stylus-0.54.5-ed6d52.svg'></a> <a href='https://webpack.js.org'><img src='https://img.shields.io/badge/webpack-4.29.6-6599c4.svg'></a> <a href='https://www.npmjs.com'><img src='https://img.shields.io/badge/npm-6.9.0-e84f4c.svg'></a> <a href='https:www.nodejs.org'><img src='https://img.shields.io/badge/node-10.12.0-518345.svg'></a> <a href='https://koajs.com'><img src='https://img.shields.io/badge/koa-2.7.0-33333c.svg'></a> <a href='https://www.npmjs.com/package/axios'><img src='https://img.shields.io/badge/axios-0.19.0-e84f4c.svg'></a> <a href='https://github.com/Binaryify/NeteaseCloudMusicApi'><img src='https://img.shields.io/badge/NeteaseCloudMusicApi-3.13.0-25292d.svg'></a>

# Tree

    .
    ├─ [288]  build  //  webpack相关配置
    │  ├─ [ 128]  middleware  //  koa中间件
    │  │  ├─ [ 701]  dev.js  //  改造webpack-dev-middleware为koa中间件
    │  │  └─ [ 713]  hot.js  //  改造webpack-hot-middleware为koa中间件
    │  ├─ [2.0K]  setup-dev-server.js  //  开发环境自动构建
    │  ├─ [1.7K]  utils.js  //  构建相关工具
    │  ├─ [2.7K]  webpack.config.base.js  //  webpack基本配置
    │  ├─ [ 985]  webpack.config.dev.js  //  webpack开发配置
    │  ├─ [ 902]  webpack.config.prod.js  //  webpack生产配置
    │  └─ [1.1K]  webpack.config.server.js  //  webpack服务端配置
    ├─ [ 160]  config  //  配置
    │  ├─ [ 331]  config.js  //  项目基本配置
    │  ├─ [  50]  dev.env.js  //  项目开发环境
    │  └─ [  49]  prod.env.js  //  项目生产环境
    ├─ [ 128]  public  //  模板主页目录
    │  ├─ [7.1K]  favicon.ico  //  app图标 github头像
    │  └─ [ 413]  index.template.html  //  模板主页
    │─ [ 448]  src  //  源码
    │  ├─ [ 512]  api  //  后台数据获取
    │  │  ├─ [ 253]  albums.js  //  所有专辑数据
    │  │  ├─ [ 287]  artist.js  //  艺人详情数据
    │  │  ├─ [ 479]  artists.js  //  所有艺人数据
    │  │  ├─ [ 136]  base.js  //  axios配置
    │  │  ├─ [ 299]  creator.js  //  用户详情数据
    │  │  ├─ [ 488]  detail.js  //  歌单/电台/专辑详情数据
    │  │  ├─ [ 172]  hot.js  //  所有排行详情数据
    │  │  ├─ [ 523]  login.js  //  登录/登出/登录状态数据
    │  │  ├─ [ 140]  newsongs.js  //  新歌数据
    │  │  ├─ [ 316]  personal.js  //  登录后推荐歌曲/歌单数据
    │  │  ├─ [ 897]  playlists.js  //  所有歌单数据
    │  │  ├─ [ 294]  radios.js  //  所有电台数据
    │  │  ├─ [ 211]  search.js  //  所有搜索数据
    │  │  └─ [ 434]  songs.js  //  歌曲详情/歌曲音频/歌曲视频/歌曲歌词数据
    │  ├─ [ 192]  assets  //  静态资源
    │  │  ├─ [ 128]  fonts  //  字体
    │  │  │  └─ [279K]  SourceCodeVariable.ttf  //  仅仅想使用正在写代码用的等宽字体
    │  │  ├─ [1.4K]  images  //  图片/图标
    │  │  └─ [  96]  styles  //  样式目录
    │  │    └─ [ 863]  global.styl  //  项目样式格式化
    │  ├─ [ 256]  components  //  所有子组件
    │  │  ├─ [ 160]  common  //  所有通用子组件
    │  │  │  ├─ [4.8K]  collect.vue  //  收藏选取/新建歌单子组件
    │  │  │  ├─ [3.4K]  control-all.vue  //  歌单/电台/专辑详情所有歌曲的播放/添加/收藏子组件
    │  │  │  └─ [5.8K]  song-list.vue  //  歌单/电台/专辑详情所有歌曲列表，单个歌曲播放/添加/收藏子组件
    │  │  ├─ [ 224]  bar-components-wrapper  //  底部bar所有子组件
    │  │  │  ├─ [  96]  nav-slider  //  底部bar左1，菜单页面开关目录
    │  │  │  │  └─ [1.7K]  nav-slider.vue  //  底部bar左1，菜单页面开关子组件
    │  │  │  ├─ [  96]  search  //  底部bar左2，搜索页面开关目录
    │  │  │  │  └─ [2.5K]  search.vue  //  底部bar左2，搜索页面开关子组件
    │  │  │  ├─ [  96]  logo  //  底部bar居中logo目录
    │  │  │  │  └─ [ 260]  logo.vue  //  底部bar居中logo子组件
    │  │  │  ├─ [  96]  user  //  底部bar右2，用户页面开关目录
    │  │  │  │  └─ [1.8K]  user.vue  //  底部bar右2，用户页面开关子组件
    │  │  │  └─ [  96]  player-slider  //  底部bar右1，播放器页面开关目录
    │  │  │     └─ [5.8K]  player-slider.vue  //  底部bar右1，播放器页面开关子组件
    │  │  ├─ [ 544]  content-components-wrapper  //  主页面所有子组件
    │  │  │  ├─ [  96]  album  //  专辑详情页面目录
    │  │  │  │  └─ [3.3K]  album.vue  //  专辑详情子组件
    │  │  │  ├─ [  96]  albums  //  所有专辑页面目录
    │  │  │  │  └─ [3.4K]  albums.vue  //  所有专辑子组件
    │  │  │  ├─ [  96]  artist  //  艺人详情页面目录
    │  │  │  │  └─ [3.9K]  artist.vue  //  艺人详情子组件
    │  │  │  ├─ [ 128]  artists  //  所有艺人页面目录
    │  │  │  │  ├─ [ 10K]  artists.vue  //  所有艺人子组件
    │  │  │  │  └─ [ 963]  category.js  //  艺人分类
    │  │  │  ├─ [  96]  creator  //  用户详情页面目录
    │  │  │  │  └─ [6.8K]  creator.vue  //  用户详情子组件
    │  │  │  ├─ [ 128]  hots  //  排行详情页面目录
    │  │  │  │  ├─ [ 735]  category.js  //  排行分类
    │  │  │  │  └─ [5.7K]  hots.vue  //  排行详情子组件
    │  │  │  ├─ [  96]  playlist  //  歌单详情页面目录
    │  │  │  │  └─ [5.5K]  playlist.vue  //  歌单详情子组件
    │  │  │  ├─ [ 128]  playlists  //  所有歌单页面目录
    │  │  │  │  ├─ [1.4K]  category.js  //  歌单分类
    │  │  │  │  └─ [ 14K]  playlists.vue  //  所有歌单子组件
    │  │  │  ├─ [  96]  radio  //  电台详情页面目录
    │  │  │  │  └─ [3.2K]  radio.vue  //  电台详情子组件
    │  │  │  ├─ [ 128]  radios  //  所有电台页面目录
    │  │  │  │  ├─ [ 862]  category.js  //  电台分类
    │  │  │  │  └─ [7.0K]  radios.vue  //  所有电台子组件
    │  │  │  ├─ [ 448]  recommend  //  主页子组件目录
    │  │  │  │  ├─ [3.0K]  carousel.js  //  主页轮播
    │  │  │  │  ├─ [2.1K]  introduction.js  //  主页技术栈
    │  │  │  │  ├─ [4.0K]  recommend-albums.vue  //  主页专辑子组件
    │  │  │  │  ├─ [2.3K]  recommend-artists.vue  //  主页艺人子组件
    │  │  │  │  ├─ [3.1K]  recommend-carousel.vue  //  主页轮播子组件
    │  │  │  │  ├─ [2.5K]  recommend-hot.vue  //  主页排行子组件
    │  │  │  │  ├─ [1.6K]  recommend-introduction.vue  //  主页技术栈子组件
    │  │  │  │  ├─ [4.0K]  recommend-newsongs.vue  //  主页推荐新歌子组件（登录前后数据不同）
    │  │  │  │  ├─ [6.8K]  recommend-personal.vue  //  主页个性推荐子组件（需登录）
    │  │  │  │  ├─ [ 12K]  recommend-playlists.vue  //  主页推荐歌单子组件（登录前后数据不同）
    │  │  │  │  ├─ [5.2K]  recommend-radios.vue  //  主页推荐电台子组件（登录前后数据不同）
    │  │  │  │  └─ [1.8K]  recommend.vue  //  主页子组件
    │  │  │  ├─ [  96]  recommend-songs  //  主页个性推荐每日歌曲详情目录
    │  │  │  │  └─ [1.1K]  recommend-songs.vue  //  主页个性推荐每日歌曲详情子组件
    │  │  │  ├─ [ 320]  search  //  搜索目录
    │  │  │  │  ├─ [ 228]  category.js  //  搜索结果分类，单曲/歌单/电台/艺人/专辑子组件
    │  │  │  │  ├─ [2.9K]  search-albums.vue  //  搜索结果专辑子组件
    │  │  │  │  ├─ [2.2K]  search-artists.vue  //  搜索结果艺人子组件
    │  │  │  │  ├─ [4.5K]  search-playlists.vue  //  搜索结果歌单子组件
    │  │  │  │  ├─ [2.8K]  search-radios.vue  //  搜索结果电台子组件
    │  │  │  │  ├─ [ 610]  search-songs.vue  //  搜索结果单曲子组件
    │  │  │  │  ├─ [3.6K]  search.vue  //  搜索结果搜索结果专辑子组件
    │  │  │  │  └─ [2.9K]  searching.vue  //  搜索子组件
    │  │  │  └─ [ 224]  user  //  用户详情目录
    │  │  │    ├─ [ 239]  country-codes.js  //  登录前电话区号
    │  │  │    ├─ [  45]  login-signup.js  //  登录前
    │  │  │    ├─ [2.8K]  login-signup.vue  //  登录前子组件
    │  │  │    ├─ [8.0K]  user-info.vue  //  登陆后子组件
    │  │  │    └─ [ 560]  user.vue  //  用户登录前后子组件
    │  │  ├─ [ 128]  nav-components-wrapper  //  菜单目录
    │  │  │  ├─ [  96]  author  //  菜单作者目录
    │  │  │  │  └─ [ 531]  author.vue  //  菜单作者子组件
    │  │  │  └─ [  96]  nav-items  //  菜单项目录
    │  │  │    └─ [2.1K]  nav-items.vue  //  菜单项子组件
    │  │  └─ [ 256]  player-components-wrapper  //  播放器目录
    │  │    ├─ [  96]  audio-player  //  播放器音频目录
    │  │    │  └─ [ 27K]  audio-player.vue  //  播放器音频子组件
    │  │    ├─ [5.7K]  audio.js  //  播放器音频处理
    │  │    ├─ [  96]  player-animation  //  播放器音频动画目录
    │  │    │  └─ [ 599]  player-animation.vue  //  播放器音频动画子组件
    │  │    ├─ [  96]  player-list  //  播放器列表目录
    │  │    │  └─ [7.8K]  player-list.vue  //  播放器列表子组件
    │  │    ├─ [  96]  song-lyric  //  播放器音频歌词目录
    │  │    │  └─ [2.3K]  song-lyric.vue  //  播放器音频歌词子组件
    │  │    └─ [  96]  video-player  //  播放器视频目录
    │  │       └─ [1.4K]  video-player.vue  //  播放器视频子组件
    │  ├─ [  96]  lib  //  库目录
    │  │  └─ [ 811]  common.js  //  通用工具库
    │  ├─ [ 128]  router  //  vue-router目录
    │  │  ├─ [ 278]  router.js  //  路由配置
    │  │  └─ [2.3K]  routes.js  //  路由
    │  ├─ [ 224]  store  //  vuex目录
    │  │  ├─ [ 30K]  actions.js  //  vuex actions
    │  │  ├─ [1.8K]  getters.js  //  vuex getters
    │  │  ├─ [7.1K]  mutations.js  //  vuex mutations
    │  │  ├─ [2.5K]  state.js  //  vuex state
    │  │  └─ [ 323]  store.js  //  vuex 主
    │  │─ [ 256]  views  //  所有页面目录
    │  │  ├─ [ 145]  404.vue  //  404页面
    │  │  ├─ [ 991]  bar.vue  //  底部bar
    │  │  ├─ [1.1K]  content.vue  //  主页面
    │  │  ├─ [1.0K]  nav.vue  //  菜单页面
    │  │  ├─ [5.6K]  player.vue  //  播放器页面
    │  │  └─ [1.7K]  space-travel.js  //  除播放器之外所有页面背景动画
    │  ├─ [ 695]  app.vue  //  跟组件
    │  ├─ [ 732]  entry-client.js  //  客户端入口js
    │  ├─ [ 756]  entry-server.js  //  服务店入口js
    │  └─ [ 461]  main.js  //  基本入口js
    ├─ [  28]  .gitignore  //  git过滤配置
    ├─ [ 114]  .editorconfig  //  编辑器配置
    ├─ [  68]  postcss.config.js  //  postcss配置
    ├─ [ 439]  babel.config.js  //  babel配置
    ├─ [ 428]  .eslintrc.js  //  eslint配置
    ├─ [  15]  .eslintignore  //  eslint过滤配置
    ├─ [2.4K]  server.js  //  服务器
    ├─ [298K]  package-lock.json
    ├─ [3.1K]  package.json
    └─ [6.2K]  README.md

# Features and Screenshots

## features

- 响应式界面
- 测试浏览器：pc chrome/ios12 chrome
- 获取网易绝大部分数据
- 安卓机（不知道型号的华为）与iphone7 比较有点卡
- 由于网易会修改接口，请及时升级NeteaseCloudMusicApi

## screenshots
  |screenshots|description|
  |:-|:-|
  |![recommend](https://raw.githubusercontent.com/zhangsolstice/music-box/master/screenshot/recommend.gif "recommend")| - recommend<br />- 首页<br />- 网易轮播有广告，暂改为静态<br />- 个性推荐显示根据用户是否登录<br />- 推荐歌单、推荐电台、推荐新歌数据根据用户是否登录而不同<br />- 排行榜数据在所有排行榜中随机一个<br />- 热门歌手、最新专辑与登录无关 |
  |![playlists](https://raw.githubusercontent.com/zhangsolstice/music-box/master/screenshot/playlists.gif "playlists")| - playlists<br />- 所有歌单<br />- 初始加载55个，每下拉至最底部加载10个<br />- 菜单选项包括网易歌单页选项所有值<br />- 选项‘精品歌单’只存在于网易客户端 |
  |![radios](https://raw.githubusercontent.com/zhangsolstice/music-box/master/screenshot/radios.gif "radios")| - radios<br />- 所有电台<br />- 现接口只能取10个左右数据<br />- 菜单选项包括网易歌单页选项所有值 |
  |![artists](https://raw.githubusercontent.com/zhangsolstice/music-box/master/screenshot/artists.gif "artists")| - artists<br />- 所有艺人<br />- 初始加载55个，每下拉至最底部加载10个<br />- 菜单选项包括网易歌单页选项所有值 |
  |![albums](https://raw.githubusercontent.com/zhangsolstice/music-box/master/screenshot/albums.gif "albums")| - albums<br />- 所有专辑<br />- 初始加载55个，每下拉至最底部加载10个<br />- 菜单选项包括网易歌单页选项所有值 |
  |![hots](https://raw.githubusercontent.com/zhangsolstice/music-box/master/screenshot/hots.gif "hots")| - hots<br />- 所有排行<br />- 菜单选项包括网易歌单页选项所有值 |
  |![details](https://raw.githubusercontent.com/zhangsolstice/music-box/master/screenshot/details.gif "details")| - details<br />- 歌单、电台、专辑、艺人、用户详情页<br />- 歌单详情页有5个推荐歌单且因为每首歌的艺人和专辑有所不同所以有下拉详情<br />- 电台和专辑详情页无相关推荐且基本不存在上一条原因所以单曲只有播放或添加<br />- 艺人详情页基本与歌单详情页相同<br />- 用户详情页与本人详情页相同 |
  |![user](https://raw.githubusercontent.com/zhangsolstice/music-box/master/screenshot/user.gif "user")| - user<br />- 本人详情页<br />- 本人登录后与用户详情页相同 |
  |![search](https://raw.githubusercontent.com/zhangsolstice/music-box/master/screenshot/search.gif "search")| - search<br />- 搜索<br />- 搜索结果：单曲、专辑、歌手、歌单、电台<br />- 初始加载55个，每下拉至最底部加载10个<br />- 搜索历史储存在localstorage |
  |![player](https://raw.githubusercontent.com/zhangsolstice/music-box/master/screenshot/player.gif "player")| - player<br />- 播放器<br />- 从各个页面都可添加或取代当前播放列表<br />- 背景为当前单曲专辑<br />- 播放列表储存在localstorage<br />- ios声音控制无效 |
  |![404](https://raw.githubusercontent.com/zhangsolstice/music-box/master/screenshot/404.gif "404")| - 404 |
