var express = require('express');
var router = express.Router();
var fs = require('fs');
var conversion = require("phantom-html-to-pdf")({
	phantomPath: require("phantomjs-prebuilt").path
});

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
  var pageUrl = req.body.pageUrl
	if (pageUrl) {
    // パラメータを取得し、対象のページをPDFに変換
    var filePath = 'customMarkdown_' + Math.random().toString(36).slice(-8) + '.pdf';

		// localではダウンロード出来ないが、bluemix上では上手くいく
		conversion({ url: pageUrl, injectJs: [ './../public/javascripts/page.js' ], waitForJS: true }, function(err, pdf) {
      if (err) {
        console.log(err);
        return;
      }
      // ダウンロード処理
      res.download(pdf.stream.path, filePath, function(err){
        // サーバのPDFファイルは削除
        fs.unlinkSync(pdf.stream.path);

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
