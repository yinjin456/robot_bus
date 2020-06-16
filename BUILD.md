# 开发指南

## 一、准备

### :hammer: 开发工具
- WebStorm / VS code
- npm
- Vue Devtools
- git & github

### :globe_with_meridians: 开发环境

- 自动安装（如果自动安装失败请按照以下顺序手动安装进行排查）
注：多数安装失败都是由于源不稳定导致，可以使用淘宝镜像进行下载
```
npm install
```

- 手动安装
```
npm i element-ui -S
npm install --save vue-router
npm install --save nprogress
npm install axios
npm install js-cookie --save
npm install --save js-base64
npm install --save vue-clipboard2
npm install
```

<br>

## 二、开发

### :book:  项目目录（src）说明

api：api接口<br>
assets：资源文件<br>
components：自定义组件<br>
config：页面配置文件（目前只有菜单配置）<br>
pages：页面<br>
router：路由配置<br>
App.vue<br>
main.js：全局配置<br>


### :walking:  开发流程
页面：创建vue页面
在router.js中注册，配置，然后在需要的地方引入即可



### :walking:  命名原则

文件夹命名：拼接模式

文件命名：在驼峰原则基础上将首字母大写

变量命名：驼峰命名法



<br>

## 三、构建&生产

### :bulb: 热重启编译 （开发用）
运行前将vue.config.js文件内容进行注释
```
npm run serve
```

### :flags: 压缩编译 （产品用）
运行前将vue.config.js文件内容进行解注释，此时构建将会生成静态网页，然后直接拖放到服务器上就可以运行。
另外一种部署方法是在服务器上运行一份同样的vue框架（需要在服务器上安装vue、nodejs、还有其他用过的库之类的环境）
```
npm run build
```

### :video_game: 运行测试
```
npm run test
```

### :wind_chime: 分析修复文件
```
npm run lint
```

### :paperclip: 自定义配置
See [Configuration Reference](https://cli.vuejs.org/config/).
