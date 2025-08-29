const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/weather",
    createProxyMiddleware({
      target: "https://22ce0f376a9f.ngrok-free.app", // ✅ ngrok URL for Spring Boot
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/weather": "/weather",
      },
    })
  );
};