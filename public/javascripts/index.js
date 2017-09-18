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
    addCustomCss();
  });

  // 各要素ごとにstyleを適用(どのstyleかという情報はsessionから取得)
  function addCustomCss() {
    // 見出し1(h1)
    var h1 = window.sessionStorage.getItem(['h1']);
    switch (h1){
      case 'red':
        h1DefaultCss();
        $('.output-markdown h1').css({'color':'#db2828'});
        break;
      case 'underline':
        h1DefaultCss();
        $('.output-markdown h1').css({'text-decoration': 'underline'});
        break;
      case 'leftLine':
        h1DefaultCss();
        $('.output-markdown h1').css({'border-left': 'solid 5px #f2711c',
                  'padding': '0.25em 0.5em'});
        break;
      default:
        h1DefaultCss();
        break;
    }
    function h1DefaultCss() {
      $('.output-markdown h1').css({
        'color': '#000',
        'text-decoration': 'none',
        'border-left': 'none',
        'padding': '0 0'
      });
    }
  }
});
