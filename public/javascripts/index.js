/* 入力をMarkdownに変換 */
var app = angular.module('indexApp', ['ngSanitize']);
app.controller('markdownAreaCtrl', function($scope) {
  // inputMarkdownに文字列が入力された時の処理
  $scope.$watch('inputMarkdown', function(newValue, oldValue) {
    // Markdown変換
    $scope.outputMarkdown = marked(newValue);
  });

  // page-buttonのclickイベント
  $scope.pageButtonClick = function() {
    // ページで表示用のurlを取得し、画面遷移
    var pageUrl = createPageUrl();
    window.location.href = pageUrl;
  };

  // pdf-buttonのclickイベント
  $scope.pdfButtonClick = function() {
    // ページで表示用のurlを取得
    var pageUrl = createPageUrl();
    // POSTでデータを送信
    var form = document.createElement('form');
    document.body.appendChild(form);
    var inputPageUrl = document.createElement('input');
    inputPageUrl.setAttribute('type', 'hidden');
    inputPageUrl.setAttribute('name', 'pageUrl');
    inputPageUrl.setAttribute('value', pageUrl);
    form.appendChild(inputPageUrl);
    form.setAttribute('action', 'http://' + location.host + '/pdf');
    form.setAttribute('method', 'POST');
    form.submit();
  };

  /**
   * customしたMarkdownを画面表示するURLを構築
   * @return {string} URL
   */
  function createPageUrl() {
    var param = '?';
    // Markdownのhtmlをパラメータに追加
    param += 'mdHtml=' + encodeURIComponent($scope.outputMarkdown);
    // custom情報をパラメータに追加
    $.each(customItems, function(index, tag) {
      param += '&' + tag + '=' + tag + '-' + window.sessionStorage.getItem([tag]);
    });

    return 'http://' + location.host + '/page' + param;
  }
});

$(function() {
  // custom要素を設定ファイルから取得
  customItems = [];
  $.getJSON("javascripts/conf/customMarkdownItems.json").done(function(data){
    customItems = data.customItems;
  });

  // outputMarkdwonの値が変更された時、classを追加してstyleを適用する
  $('#output-markdown-contents').on('DOMSubtreeModified propertychange', function() {
    $.each(customItems, function(index, tag) {
      var customName = window.sessionStorage.getItem([tag]);
      addAndRemoveClass(tag, customName);
    });
  });

  /**
   * 既存のclassを削除し、新たなmarkdown用のクラスを付与する
   * @param {string} tag          タグ(例：h1)
   * @param {string} customName 要素名(例：default)
   */
  function addAndRemoveClass(tag, customName) {
    $('.output-markdown ' + tag).removeClass(function(index, className) {
      reg = new RegExp('\\b'+ tag +'-\\S+', 'g');
      return (className.match(reg) || []).join(' ');
    });
    $('.output-markdown ' + tag).addClass(tag + '-' + customName);
  }
});
