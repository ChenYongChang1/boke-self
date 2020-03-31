const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 定义压缩文件类型
const productionGzipExtensions = ["js", "css"];
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  css: {
    requireModuleExtension: true, // 是否开启支持‘foo.module.css’样式
    extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: false, // 是否在构建样式地图，false将提高构建速度
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  parallel: require("os").cpus().length > 1,
  devServer: {
    host: "0.0.0.0",
    port: "8080"
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"), //匹配文件名
        threshold: 10240, //对10K以上的数据进行压缩
        minRatio: 0.5,
        deleteOriginalAssets: false //是否删除源文件
      })
    ]
  }
};
