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

    // 見出し2(h2)
    var h2 = window.sessionStorage.getItem(['h2']);
    switch (h2){
      case 'blue':
        h2DefaultCss();
        $('.output-markdown h2').css({'color':'#2185d0'});
        break;
      case 'underline':
        h2DefaultCss();
        $('.output-markdown h2').css({'text-decoration': 'underline'});
        break;
      case 'leftLine':
        h2DefaultCss();
        $('.output-markdown h2').css({'border-left': 'solid 5px #00b5ad',
                                      'padding': '0.25em 0.5em'});
        break;
      default:
        h2DefaultCss();
        break;
    }
    function h2DefaultCss() {
      $('.output-markdown h2').css({
        'color': '#000',
        'text-decoration': 'none',
        'border-left': 'none',
        'padding': '0 0'
      });
    }

    // コード
    var code = window.sessionStorage.getItem(['code']);
    switch (code){
      case 'red':
        codeDefaultCss();
        $('.output-markdown pre, .output-markdown p code').css({'background-color': '#FFFAFA',
                                                                'color': '#db2828'});
        break;
      case 'green':
        codeDefaultCss();
        $('.output-markdown pre, .output-markdown p code').css({'background-color': '#F5FFFA',
                                                                'color': '#21ba45'});
        break;
      case 'blue':
        codeDefaultCss();
        $('.output-markdown pre, .output-markdown p code').css({'background-color': '#F8F8FF',
                                                                'color': '#2185d0'});
        break;
      default:
        codeDefaultCss();
        break;
    }
    function codeDefaultCss() {
      $('.output-markdown pre, .output-markdown p code').css({
        'background-color': '#f7f7f7',
        'color': '#000',
        'padding': '9.5px'
      });
    }

    // 強調
    var strong = window.sessionStorage.getItem(['strong']);
    switch (strong){
      case 'underline':
        strongDefaultCss();
        $('.output-markdown strong').css({'border-bottom': '2px solid #ff3333'});
        break;
      case 'red':
        strongDefaultCss();
        $('.output-markdown strong').css({'color': '#db2828'});
        break;
      case 'background':
        strongDefaultCss();
        $('.output-markdown strong').css({'background-color': '#ffff66'});
        break;
      default:
        strongDefaultCss();
        break;
    }
    function strongDefaultCss() {
      $('.output-markdown strong').css({
        'border-style': 'none',
        'color': '#000',
        'background-color': '#FFF'
      });
    }
  }
});
