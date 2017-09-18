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
  // 見出し1(h1)
  window.sessionStorage.setItem(['h1'],['default']);
  $(".h1-default").on('click', function(){
    window.sessionStorage.setItem(['h1'],['default']);
    refreshMarkdown();
  });
  $(".h1-red").on('click', function(){
    window.sessionStorage.setItem(['h1'],['red']);
    refreshMarkdown();
  });
  $(".h1-underline").on('click', function(){
    window.sessionStorage.setItem(['h1'],['underline']);
    refreshMarkdown();
  });
  $(".h1-leftLine").on('click', function(){
    window.sessionStorage.setItem(['h1'],['leftLine']);
    refreshMarkdown();
  });
  // メニューをクリック直後にstyleを反映させるための処理
  function refreshMarkdown(){
    var tmp = $('#output-markdown-contents').html();
    $('#output-markdown-contents').html(tmp);
  }
});
