module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  css: {
    modules: true, // 是否开启支持‘foo.module.css’样式
    extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: false, // 是否在构建样式地图，false将提高构建速度
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  parallel: require('os').cpus().length > 1, 
  devServer: {
    host: '0.0.0.0',
    port: '8080',
  },
  // chainWebpack: config => {
  //   config
	// .pugin('插件名字')
	// .use(引入的插件的变量, 一定不要使用new 关键字)
	// .tag: c => {
	//  // c 是一个数组
	//  c[0] = {插件的配置项}
	//  return c;
	// }
  // }
};
