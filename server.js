const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

const port = process.env.PORT || 5000;

const app = express();

app.use('/api1', createProxyMiddleware({
  target: 'https://official-joke-api.appspot.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api1': '',
  },
}));

app.use(history());
app.use(serveStatic(`${__dirname}/dist/spa`));
app.listen(port);
