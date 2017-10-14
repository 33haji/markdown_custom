$(function() {
  // errorメッセージ
  var errorMessage = $.cookie('errorMessage');
  if (errorMessage) {
    // エラーメッセージを表示
    var errorMessageContents =
      '<div class="ui negative message">' +
        '<div class="header">' +
          errorMessage +
        '</div>' +
      '</div>';
    $('#message').innerHTML = errorMessageContents;
    // Cookieから要素を削除
    $.removeCookie('errorMessage');
  }

  // successメッセージ
  var successMessage = $.cookie('successMessage');
  if (successMessage) {
    // エラーメッセージを表示
    var successMessageContents =
      '<div class="ui success message">' +
        '<div class="header">' +
          successMessage +
        '</div>' +
      '</div>';
    $('#message').append(successMessageContents);
    // Cookieから要素を削除
    $.removeCookie('successMessage');
  }
});
