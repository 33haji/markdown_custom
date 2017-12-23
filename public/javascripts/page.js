$(function() {
  // パラメータを取得
  const param = new Object;
  let pair = location.search.substring(1).split('&');
  for(let i = 0; pair[i]; i++) {
      let kv = pair[i].split('=');
      param[kv[0]]=kv[1];
  }
  // htmlを取得して表示
  const html = param.mdHtml;
  $('#markdown-contents').html(unescape(decodeURIComponent(html)));
  // highlight.js用に読み込むcssのパスを変更する
  const style = param.style;
  $('#highlightStyle').attr('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/' + style + '.min.css');

  // 描画時間を待ってからphantom-html-to-pdfにPDF変換開始を知らせる
  setTimeout(function() {
    window.PHANTOM_HTML_TO_PDF_READY = true;
  }, 4000);
});
