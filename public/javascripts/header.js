/* headerメニュー */
$(function(){
  // headerメニューのclickイベント
  $("[id*='-menu'] > [class*='-menu-button']").on('click touchend', function() {
    let menuName =  $(this).parent().attr("id").split('-')[0];
    if (!$("#" + menuName + "-menu").hasClass('active')) {
      $("#" + menuName + "-menu").addClass('active');
      $("#" + menuName + "-contents").slideDown('fast');
    } else {
      $("#" + menuName + "-menu").removeClass('active');
      $("#" + menuName + "-contents").slideUp('fast');
    }
  });
  // メニュー外をクリックした時にメニューを閉じる
  $(document).on('click touchend', function(event) {
    let headerMenuNames = ['output', 'custom'];
    $.each(headerMenuNames, function(index, menuName) {
      if (!$(event.target).closest("#" + menuName + "-menu").length
          && !$(event.target).closest("#" + menuName + "-contents").length) {
        $("#" + menuName + "-menu").removeClass('active');
        $("#" + menuName + "-contents").slideUp('fast');
      }
    })
  });

  // "CUSTOM"メニューの処理を実装
  // 初期化処理
  initializeCustomMenu();

  // clickイベント
  $("[class*='menu-']").on('click', function(){
    let element = $(this).data("element");
    if (!element) return;
    let tag =  element.split('-')[0];
    let customName = element.split('-')[1];
    editMarkdownCss(tag, customName);
  });

  /**
   * カスタムメニューの初期化処理
   * @return void
   */
  function initializeCustomMenu(){
    // 画面読み込み時は隠す
    $("[id*='menu-']").hide();
    // mouseover時のイベント
    $("[id*='custom-contents-']").hover(function(){
      let element = $("#menu-" + $(this).data("element"));
      if (element.css('display') == 'none') {
          element.show();
      } else {
          element.hide();
      }
    });
    // custom要素を設定ファイルから取得
    customItems = [];
    $.getJSON("javascripts/conf/customMarkdownItems.json").done(function(data){
      customItems = data.customItems;
    });
    setTimeout(function(){
      // それぞれのtag要素に対して初期化処理を行う
      $.each(customItems, function(index, tag) {
        // sessionから情報を取得
        let sessionItem = window.sessionStorage.getItem([tag]);
        let customName = sessionItem ? sessionItem.split('_')[0] : 'default'

        $("#custom-contents-"+ tag +"-" + customName).addClass('active');
      });
    }, 500);
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
    $("[id*='custom-contents-"+ tag +"-']").removeClass('active');
    $("#custom-contents-"+ tag +"-"+ customName.split('_')[0]).addClass('active');
    // メニューをクリック直後にstyleを反映させるための処理
    let tmp = $('#output-markdown-contents').html();
    $('#output-markdown-contents').html(tmp);
  }
});
