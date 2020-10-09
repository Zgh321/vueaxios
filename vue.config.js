
module.exports = {
  //打包路径
  publicPath: './',

  //配置跨域
  devServer: {
    port: 8888,
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'https://www.liulongbin.top:8888/',
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域}
      },
    }
  },

  //打包添加hash
  css: {
    extract: {
      filename: 'assets/css/[name].[contenthash].css',
      chunkFilename: 'assets/css/[name].[contenthash].css',
    },
  },
  outputDir: undefined,
  assetsDir: 'assets',
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
};
