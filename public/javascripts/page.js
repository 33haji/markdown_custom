$(function(){
  // パラメータを取得
  var param = new Object;
  var pair = location.search.substring(1).split('&');
  for(var i = 0; pair[i]; i++) {
      var kv = pair[i].split('=');
      param[kv[0]]=kv[1];
  }
  // htmlを取得
  var html = param.mdHtml;
  // 表示
  $('#markdown-contents').html(decodeURIComponent(html));
  // cssを適用
  addCustomMarkdownClass(param);

  /**
   * 各要素ごとにclssを追加(どのclassかという情報はパラメータから取得)
   */
  function addCustomMarkdownClass(param) {
    // 見出し1(h1)
    var h1 = param.h1;
    addAndRemoveClass('h1', h1);

    // 見出し2(h2)
    var h2 = param.h2;
    addAndRemoveClass('h2', h2);

    // コード
    var code = param.code;
    addAndRemoveClass('code', code);

    // 強調
    var strong = param.strong;
    addAndRemoveClass('strong', strong);
  }

  /**
   * 既存のclassを削除し、新たなmarkdown用のクラスを付与する
   * @param {string} tag          タグ(例：h1)
   * @param {string} classElement 要素名(例：default)
   */
  function addAndRemoveClass(tag, classElement) {
    $('#markdown-contents ' + tag).removeClass(function(index, className) {
      reg = new RegExp('\\b'+ tag +'-\\S+', 'g');
      return (className.match(reg) || []).join(' ');
    });
    $('#markdown-contents ' + tag).addClass(classElement);
  }
});
