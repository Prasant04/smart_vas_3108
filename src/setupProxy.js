const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://4374c9ecdbbf.ngrok-free.app",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "^/api": "" },
      onProxyReq: (proxyReq) => {
        proxyReq.setHeader("ngrok-skip-browser-warning", "true");
      },
      onProxyRes: (proxyRes) => {
        proxyRes.headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
        proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
      },
    })
  );
};
