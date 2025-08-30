const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://22cef037e5d7.ngrok-free.app",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/news": "/news" }, // ✅ keep the /news path
      onProxyReq: (proxyReq) => {
        proxyReq.setHeader("https://22cef037e5d7.ngrok-free.app", "true"); // ✅ fix header name
      },
      onProxyRes: (proxyRes) => {
        proxyRes.headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
        proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
      },
    })
  );
};