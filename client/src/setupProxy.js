const { createProxyMiddleware } = require('http-proxy-middleware');
//https://xcel-app.herokuapp.com/api
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://xcel-app.herokuapp.com/api',
      changeOrigin: true,
    })
  );
};