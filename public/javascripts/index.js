/* 入力をMarkdownに変換 */
const app = angular.module('indexApp', ['ngSanitize']);
app.controller('markdownAreaCtrl', function($scope) {
  // inputMarkdownの初期化
  $scope.init = function() {
    // sessionから初期値を取得
    // outputMarkdownを取得してしまうとinputMarkdownが空になってしまう
    const initInputMarkdown = window.sessionStorage.getItem('inputMarkdown');
    $scope.inputMarkdown = initInputMarkdown;
  }
  // inputMarkdownに文字列が入力された時の処理
  $scope.$watch('inputMarkdown', function(newValue, oldValue) {
    // Markdown変換
    const $html = $.parseHTML(marked(newValue));
    setTimeout(function () {
      // ```で囲まれたcodeのみにhighlightを適用
      $('code', $html).each(function(i, block) {
        if (block.innerHTML.match(/\n/) === null) return true
        hljs.highlightBlock(block);
      });
      // html出力
      $("#output-markdown-contents").html($html);
    }, 200);
    // sessionに登録
    window.sessionStorage.setItem('inputMarkdown', $scope.inputMarkdown);
  });

  // page-buttonのclickイベント
  $scope.pageButtonClick = function() {
    // ページで表示用のurlを取得し、画面遷移
    const pageUrl = createPageUrl();
    window.location.href = pageUrl;
  };

  // pdf-buttonのclickイベント
  $scope.pdfButtonClick = function() {
    // loadingを表示 & 一定時間後に解除
    displayAndReleaseLoading();

    // ページで表示用のurlを取得
    const pageUrl = createPageUrl();
    // POSTでデータを送信
    const form = document.createElement('form');
    document.body.appendChild(form);
    const inputPageUrl = document.createElement('input');
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
    let param = '?'
    // Markdownのhtmlをパラメータに追加
    const mdHtml = $('#output-markdown-contents').html()
    param += 'mdHtml=' + encodeURIComponent(escape(mdHtml));
    // codeのhighlightに使用するstyleを追加
    const style = window.sessionStorage.getItem('code');
    param += '&style=' + style

    return 'http://' + location.host + '/page' + param;
  }

  /**
   * loadingを表示 & 一定時間後に解除する
   * @return {void}
   */
  function displayAndReleaseLoading () {
    // loadingを表示
    $('.ui.dimmer').addClass('active');
    // 一定時間後に解除する(5秒後)
    setTimeout(function () {
      $('.ui.dimmer').removeClass('active');
    }, 5000);
  }
});

$(function() {
  customItems = [];

  // 初期化処理
  initialize();

  // outputMarkdownの値が変更された時、classを追加してstyleを適用する
  $('#output-markdown-contents').on('DOMSubtreeModified propertychange', function() {
    $.each(customItems, function(index, tag) {
      let customName = window.sessionStorage.getItem([tag]);
      addAndRemoveClass(tag, customName);
    });
  });

  // inputMarkdown(textarea)とoutputMarkdwonのサイズを動的に変更する
  autosize($('textarea'));

  /**
   * 初期化処理
   * @return {void}
   */
  function initialize() {
    // custom要素を設定ファイルから取得
    $.getJSON("javascripts/conf/customMarkdownItems.json").done(function(data){
      customItems = data.customItems;
    });
    // cssを適用する
    setTimeout(function() {
      $.each(customItems, function(index, tag) {
        let customName = window.sessionStorage.getItem([tag]);
        addAndRemoveClass(tag, customName);
      });
    }, 500);
  }

  /**
   * 既存のclassを削除し、新たなmarkdown用のクラスを付与する
   * @param {string} tag          タグ(例：h1)
   * @param {string} customName 要素名(例：default)
   */
  function addAndRemoveClass(tag, customName) {
    let targetClass = ''
    if (tag === 'code') {
      // 'code'の場合はhighlight.js用に読み込むcssのパスを変更する
      $('#highlightStyle').attr('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/' + customName + '.min.css')
    } else {
      targetClass = '.output-markdown ' + tag;
    }
    $(targetClass).removeClass(function(index, className) {
      reg = new RegExp('\\b'+ tag +'-\\S+', 'g');
      return (className.match(reg) || []).join(' ');
    });
    $(targetClass).addClass(tag + '-' + customName);
  }
});
