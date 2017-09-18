var express = require('express');
var router = express.Router();

/* ヘッダー */
router.get('/header', function(req, res, next) {
  res.render('header.html');
});
/* トップ */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Custom Markdown' });
});

module.exports = router;
