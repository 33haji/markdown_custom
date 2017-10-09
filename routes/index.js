var express = require('express');
var router = express.Router();
var wkhtmltopdf = require('wkhtmltopdf');
var os = require('os');

/* ヘッダー */
router.get('/header', function(req, res, next) {
  res.render('header.html');
});
/* トップ */
router.get('/', function(req, res, next) {
  res.render('index.html');
});
/* 構築したMarkdownをページで表示 */
router.get('/page', function(req, res, next) {
  res.render('page.html');
});
/* MarkdownをPDFに変換 */
router.post('/pdf', function(req, res, next) {
  // パラメータを取得し、対象のページをPDFに変換
  if (req.body.pageUrl) {
    wkhtmltopdf(req.body.pageUrl, {
      output: 'test.pdf',
      lowquality: true
    }, function(code, signal) {
      res.render('index.html');
    });
  }
});

module.exports = router;
