const path = require("path");
const TerserPlugin = require("terser-webpack-plugin"); // 使用 TerserWebpackPlugin 进行代码压缩和混淆
const CompressionPlugin = require("compression-webpack-plugin"); // 使用 CompressionWebpackPlugin 进行 Gzip 压缩
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const webpack = require("webpack");

/**
 * config.devtool 是 Webpack 的配置选项之一，用于指定生成 Source Map 的方式。
 * Source Map 是一种文件，它存储了打包后的代码与原始源代码之间的映射关系，用于在浏览器开发者工具中进行调试。
 * source-map: 生成独立的 Source Map 文件。这种方式生成的 Source Map 最完整、最准确，但会增加构建时间和文件大小。适用于开发环境和生产环境，推荐在生产环境中使用以方便调试。
 * 当 config.devtool 的值设置为 none 时，Webpack 不会生成任何 Source Map 文件。这意味着在生产环境中无法进行源代码的调试，但可以获得最佳的构建性能和最小的打包文件大小。
 */

module.exports = {
  transpileDependencies: process.env.NODE_ENV === "development",
  productionSourceMap: false, // 禁用生产环境的源映射

  devServer: {
    port: 8080,
    hot: true,
    open: false, // 服务启动后自动打开浏览器
    proxy: {
      "/admin": {
        target: "http://localhost:8000/admin", // //代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true,
        pathRewrite: { "^/admin": "/" }, // 重写请求路径，去掉 '/api' 前缀
      },
    },
    client: {
      // 禁用错误覆盖
      overlay: false,
      // overlay: {
      //   errors: false,
      //   warnings: false,
      //   runtimeErrors: false,
      // },
    },
  },
  // 其他公共配置...
  configureWebpack: {
    // 公共的 Webpack 配置...
    resolve: {
      alias: {
        "particles.js": path.resolve(__dirname, "node_modules/particles.js"), // 设置 particles.js 的别名
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
        __VUE_I18N_LEGACY_API__: JSON.stringify(false),
      }),
    ],
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 开发环境的 Webpack 配置
      //  进行代码压缩和混淆
      config.plugin("terser").use(
        new TerserPlugin({
          terserOptions: {
            ecma: 5, // 指定 ECMAScript 版本
            compress: {
              warnings: false, // 是否显示压缩过程中的警告信息
              drop_console: true, // 否删除代码中的 console 日志语句
              drop_debugger: true, // 是否删除代码中的 debugger 语句
              // pure_funcs: ['console.log'], // 可以保留一些不会影响程序逻辑的打印函数
            },
            output: {
              comments: false, // 是否保留代码中的注释
            },
          },
        })
      );
      // 进行 Gzip 压缩
      config.plugin("compression").use(
        new CompressionPlugin({
          algorithm: "gzip",
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
      // splitChunks 第三方依赖库和公共模块可以进行缓存，提高页面加载速度，并且当应用代码发生变化时，只需要重新请求被修改的文件，而不是整个文件包
      config.optimization.splitChunks({
        chunks: "all", // 将所有类型的代码块都进行代码分割
        cacheGroups: {
          // 缓存组
          vendor: {
            name: "vendor", //用于将第三方依赖库拆分为单独的文件
            test: /[\\/]node_modules[\\/]/, // 指定匹配的模块路径
            priority: -10, // 值越小, 优先级越高, 确保第三方库被拆分为单独的文件
            chunks: "initial",
          },
          common: {
            name: "common", //  用于将公共模块拆分为单独的文件
            minChunks: 2, // 至少被两个模块引用的代码才会被拆分为单独的文件
            priority: -20,
            chunks: "initial",
            reuseExistingChunk: true, // 复用已有的拆分文件
          },
        },
      });

      config.devtool("nosources-source-map"); // 指定生成的 Source Map 的方式为无，即禁用源映射
      // config.productionSourceMap(false); // 禁用生产环境的源映射
    }

    // 添加插件 - Element Plus
    config.plugin("auto-import").use(
      AutoImport({
        resolvers: [ElementPlusResolver()],
      })
    );
    config
      .plugin("components")
      .use(Components({ resolvers: [ElementPlusResolver()] }));

    config.resolve.alias.set("@", path.resolve(__dirname, "src")); // 设置别名 @ 为 src 文件夹路径
  },
};
