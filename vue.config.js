console.log(process.env.VUE_APP_BASE_URL);

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
