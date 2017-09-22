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
  $(".h1-default").on('click', function(){
    editMarkdownCss("h1", "default");
  });
  $(".h1-red").on('click', function(){
    editMarkdownCss("h1", "red");
  });
  $(".h1-underline").on('click', function(){
    editMarkdownCss("h1", "underline");
  });
  $(".h1-leftLine").on('click', function(){
    editMarkdownCss("h1", "leftLine");
  });
  // 見出し2(h2)
  $(".h2-default").on('click', function(){
    editMarkdownCss("h2", "default");
  });
  $(".h2-blue").on('click', function(){
    editMarkdownCss("h2", "blue");
  });
  $(".h2-underline").on('click', function(){
    editMarkdownCss("h2", "underline");
  });
  $(".h2-leftLine").on('click', function(){
    editMarkdownCss("h2", "leftLine");
  });
  // コード
  $(".code-default").on('click', function(){
    editMarkdownCss("code", "default");
  });
  $(".code-red").on('click', function(){
    editMarkdownCss("code", "red");
  });
  $(".code-green").on('click', function(){
    editMarkdownCss("code", "green");
  });
  $(".code-blue").on('click', function(){
    editMarkdownCss("code", "blue");
  });
  // 強調
  $(".strong-default").on('click', function(){
    editMarkdownCss("strong", "default");
  });
  $(".strong-underline").on('click', function(){
    editMarkdownCss("strong", "underline");
  });
  $(".strong-red").on('click', function(){
    editMarkdownCss("strong", "red");
  });
  $(".strong-background").on('click', function(){
    editMarkdownCss("strong", "background");
  });
  // 初期化
  function initializeMarkdown(){
    // 見出し(h1)
    window.sessionStorage.setItem(['h1'],['default']);
    $(".h1-default").addClass('active');
    // 見出し2(h2)
    window.sessionStorage.setItem(['h2'],['default']);
    $(".h2-default").addClass('active');
    // コード
    window.sessionStorage.setItem(['code'],['default']);
    $(".code-default").addClass('active');
    // 強調
    window.sessionStorage.setItem(['strong'],['default']);
    $(".strong-default").addClass('active');
  }
  // オプションの変更処理
  function editMarkdownCss(tag, element){
    window.sessionStorage.setItem([tag],[element]);
    addActive(tag, "."+ tag +"-"+ element);
    refreshMarkdown();
  }
  // メニューにavtiveクラスを付与
  function addActive(tag, selector){
    $("[class*='"+ tag +"-']").removeClass('active');
    $(selector).addClass('active');
  }
  // メニューをクリック直後にstyleを反映させるための処理
  function refreshMarkdown(){
    var tmp = $('#output-markdown-contents').html();
    $('#output-markdown-contents').html(tmp);
  }
});
