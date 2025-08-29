const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/news",
    createProxyMiddleware({
      target: "https://fe1fb71b44b3.ngrok-free.app/news",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/news": "/news" }, // ✅ keep the /news path
      onProxyReq: (proxyReq) => {
        proxyReq.setHeader("https://fe1fb71b44b3.ngrok-free.app/news", "true"); // ✅ fix header name
      },
      onProxyRes: (proxyRes) => {
        proxyRes.headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
        proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
      },
    })
  );
};