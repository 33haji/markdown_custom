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

  // Markdownのcssの変更(実際の変更処理はindex.js)
  initializeMarkdown();
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
  // 初期化
  function initializeMarkdown(){
    // 見出し(h1)
    window.sessionStorage.setItem(['h1'],['default']);
    $(".menu-h1-default").addClass('active');
    // 見出し2(h2)
    window.sessionStorage.setItem(['h2'],['default']);
    $(".menu-h2-default").addClass('active');
    // コード
    window.sessionStorage.setItem(['code'],['default']);
    $(".menu-code-default").addClass('active');
    // 強調
    window.sessionStorage.setItem(['strong'],['default']);
    $(".menu-strong-default").addClass('active');
  }
  // オプションの変更処理
  function editMarkdownCss(tag, element){
    window.sessionStorage.setItem([tag],[element]);
    addActive(tag, ".menu-"+ tag +"-"+ element);
    refreshMarkdown();
  }
  // メニューにavtiveクラスを付与
  function addActive(tag, selector){
    $("[class*='menu-"+ tag +"-']").removeClass('active');
    $(selector).addClass('active');
  }
  // メニューをクリック直後にstyleを反映させるための処理
  function refreshMarkdown(){
    var tmp = $('#output-markdown-contents').html();
    $('#output-markdown-contents').html(tmp);
  }
});
