/* 入力をMarkdownに変換 */
var app = angular.module('indexApp', ['ngSanitize']);
app.controller('markdownAreaCtrl', function($scope) {
  $scope.$watch('inputMarkdown', function(newValue, oldValue) {
    $scope.outputMarkdown = marked($scope.inputMarkdown);
  });
});

/* Markdownのstyleを変換 */
$(function() {
  $('#output-markdown-contents').on('DOMSubtreeModified propertychange', function() {
    addCustomMarkdownClass();
  });

  /**
   * 各要素ごとにclssを追加(どのclassかという情報はsessionから取得)
   */
  function addCustomMarkdownClass() {
    // 見出し1(h1)
    var h1 = window.sessionStorage.getItem(['h1']);
    addAndRemoveClass('h1', h1);

    // 見出し2(h2)
    var h2 = window.sessionStorage.getItem(['h2']);
    addAndRemoveClass('h2', h2);

    // コード
    var code = window.sessionStorage.getItem(['code']);
    addAndRemoveClass('code', code);

    // 強調
    var strong = window.sessionStorage.getItem(['strong']);
    addAndRemoveClass('strong', strong);
  }

  /**
   * 既存のclassを削除し、新たなmarkdown用のクラスを付与する
   * @param {string} tag          タグ(例：h1)
   * @param {string} classElement 要素名(例：default)
   */
  function addAndRemoveClass(tag, classElement) {
    $('.output-markdown ' + tag).removeClass(function(index, className) {
      reg = new RegExp('\\b'+ tag +'-\\S+', 'g');
      return (className.match(reg) || []).join(' ');
    });
    $('.output-markdown ' + tag).addClass(tag + '-' + classElement);
  }
});
