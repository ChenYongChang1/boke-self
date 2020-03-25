module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: '8081',
  }
};
