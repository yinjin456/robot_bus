const path = require('path');
// eslint-disable-next-line no-unused-vars
var env= process.env.NODE_ENV;
// eslint-disable-next-line no-unused-vars
function resolve(dir) {
    return path.join(__dirname, dir)
}

// 上面代码貌似没用上，不过不碍事
module.exports = {
    //基本路径
    // baseUrl: './', //加 ./ 解决404问题
    publicPath:'./',//vue-cli3.3+新版本使用
    outputDir: 'dist',
    // 放置静态资源的地方 (js/css/img/font/...)
    assetsDir: 'static',
    //以多页模式构建应用程序。
    pages: undefined,
    //是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
    parallel: require('os').cpus().length > 1,
    // 是否在保存的时候使用 `eslint-loader` 进行检查。
    // 有效的值：`ture` | `false` | `"error"`
    // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
    // lintOnSave: false,

    // 是否为生产环境构建生成 source map？这样打包的dist文件体积会很小（正式版）
    //为true带测试环境，提交会大很多
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        publicPath: '../',  //这里解决静态资源引用路径问题
        // 设置代理
        proxy: {
            "/api": {
                target: "119.3.46.32", // 跨域访问
                ws: true, // 是否启用websockets
                changOrigin: true, //开启代理
                secure: false, // 将安全设置为false,才能访问https开头的
                pathRewrite: {
                    '^/api': '/' //这里理解成用‘/api’代替target里面的地址
                }
            }
        }
    }
};
