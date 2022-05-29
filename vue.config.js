console.log("--------------------------------------------");
console.log("环境：", process.env.ENV);
console.log("后端接口：", process.env.VUE_APP_BASE_URL);
console.log("波场接口：", process.env.VUE_APP_TRON_API_URL);
console.log("--------------------------------------------");

module.exports = {
  publicPath: "/",
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [],
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== "production") return;
    config.optimization.splitChunks({
      chunks: "all",
      maxSize: 1024 * 1024,
      automaticNameDelimiter: ".",
    });

    const chunkFilename = "js/[name].js";
    config.output.filename(chunkFilename).chunkFilename(chunkFilename).end();
  },
};
