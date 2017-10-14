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
  if (req.body.pageUrl) {
    // パラメータを取得し、対象のページをPDFに変換
    var filePath = 'test.pdf';
    wkhtmltopdf(req.body.pageUrl, {
      output: filePath,
      encoding: 'utf8',
      lowquality: true
    }, function(code, signal) {
      // ダウンロード処理
      res.download(filePath, function(err){
        if (err) {
          res.redirect('/?errorMessage=PDFのダウンロードに失敗しました');
        }
      });
    });
  } else {
    res.redirect('/?errorMessage=エラーが発生しました');
  }
});

module.exports = router;
