// vue.config.js

const { defineConfig } = require("@vue/cli");

module.exports = defineConfig({
  productionSourceMap: false, // 禁用生产环境的源映射

  configureWebpack: {
    // 生产环境特定的配置项
    plugins: [
      // 添加自定义的 Webpack 插件或调整现有插件的配置
      // ...

      // 示例：使用 CompressionWebpackPlugin 进行 Gzip 压缩
      new require("compression-webpack-plugin").CompressionWebpackPlugin({
        algorithm: "gzip",
        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],

    optimization: {
      // 示例：配置代码分割，将第三方依赖库和公共模块拆分为单独的文件
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: -10,
            reuseExistingChunk: true,
          },
        },
      },

      // 示例：使用 TerserWebpackPlugin 进行代码压缩和混淆
      minimizer: [
        new require("terser-webpack-plugin")({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
  },
});
