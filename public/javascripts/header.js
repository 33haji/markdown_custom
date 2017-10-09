/* サイドバー */
$(function(){
  // ハンバーガーメニューの処理
  $("#sidebar-area-content").hide();
  $("#sidebar").on('click', function(){
    if ($("#sidebar-area-content").css('display') == 'none') {
        $("#sidebar-area-content").slideDown('fast');
    } else {
        $("#sidebar-area-content").slideUp('fast');
    }
  });
  $(document).on('click touchend', function(event) {
    // メニュー外をクリックした時にメニューを閉じる
    if (!$(event.target).closest('#sidebar-area-content').length
        && !$(event.target).closest('#sidebar').length) {
      $("#sidebar-area-content").slideUp('fast');
    }
  });

  // ハンバーガーメニュー内のメニューの処理
  $(".ui.dropdown").hover(function(){
    var element = $("#menu-" + $(this).data("element"));
    if (element.css('display') == 'none') {
        element.show();
    } else {
        element.hide();
    }
  });

  // メニューの処理を実装
  // 初期化処理
  initializeCustomMenu();
  // 見出し1(h1)
  $(".menu-h1-default").on('click', function(){
    editMarkdownCss("h1", "default");
  });
  $(".menu-h1-red").on('click', function(){
    editMarkdownCss("h1", "red");
  });
  $(".menu-h1-underline").on('click', function(){
    editMarkdownCss("h1", "underline");
  });
  $(".menu-h1-leftLine").on('click', function(){
    editMarkdownCss("h1", "leftLine");
  });
  // 見出し2(h2)
  $(".menu-h2-default").on('click', function(){
    editMarkdownCss("h2", "default");
  });
  $(".menu-h2-blue").on('click', function(){
    editMarkdownCss("h2", "blue");
  });
  $(".menu-h2-underline").on('click', function(){
    editMarkdownCss("h2", "underline");
  });
  $(".menu-h2-leftLine").on('click', function(){
    editMarkdownCss("h2", "leftLine");
  });
  // コード
  $(".menu-code-default").on('click', function(){
    editMarkdownCss("code", "default");
  });
  $(".menu-code-red").on('click', function(){
    editMarkdownCss("code", "red");
  });
  $(".menu-code-green").on('click', function(){
    editMarkdownCss("code", "green");
  });
  $(".menu-code-blue").on('click', function(){
    editMarkdownCss("code", "blue");
  });
  // 強調
  $(".menu-strong-default").on('click', function(){
    editMarkdownCss("strong", "default");
  });
  $(".menu-strong-underline").on('click', function(){
    editMarkdownCss("strong", "underline");
  });
  $(".menu-strong-red").on('click', function(){
    editMarkdownCss("strong", "red");
  });
  $(".menu-strong-background").on('click', function(){
    editMarkdownCss("strong", "background");
  });
  /**
   * カスタムメニューの初期化処理
   * @return void
   */
  function initializeCustomMenu(){
    // custom要素を設定ファイルから取得
    customItems = [];
    $.getJSON("javascripts/conf/customMarkdownItems.json").done(function(data){
      customItems = data.customItems;
    });
    setTimeout(function(){
      // それぞれのtag要素に対して初期化処理を行う
      $.each(customItems, function(index, tag) {
        window.sessionStorage.setItem([tag],['default']);
        $(".menu-"+ tag +"-default").addClass('active');
      });
    }, 100);
  }
  /**
   * カスタム情報変更処理
   * @param  {string} tag     タグ(例：h1)
   * @param  {string} customName 要素名(例：default)
   * @return void
   */
  function editMarkdownCss(tag, customName){
    // sessionにカスタム情報をセット
    window.sessionStorage.setItem([tag],[customName]);
    // メニューにavtiveクラスを付与
    $("[class*='menu-"+ tag +"-']").removeClass('active');
    $(".menu-"+ tag +"-"+ customName).addClass('active');
    // メニューをクリック直後にstyleを反映させるための処理
    var tmp = $('#output-markdown-contents').html();
    $('#output-markdown-contents').html(tmp);
  }
});
