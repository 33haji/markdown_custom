$(function() {
  // パラメータを取得
  var param = new Object;
  var pair = location.search.substring(1).split('&');
  for(var i = 0; pair[i]; i++) {
      var kv = pair[i].split('=');
      param[kv[0]]=kv[1];
  }

  // errorメッセージ
  var errorMessage = decodeURIComponent(param.errorMessage);
  if (errorMessage && errorMessage != 'undefined') {
    // エラーメッセージを表示
    var errorMessageContents =
      '<div class="ui negative message">' +
        '<div class="header">' +
          errorMessage +
        '</div>' +
      '</div>';
    $('#message').append(errorMessageContents);
  }

  // successメッセージ
  var successMessage = decodeURIComponent(param.successMessage);
  if (successMessage && successMessage != 'undefined') {
    // エラーメッセージを表示
    var successMessageContents =
      '<div class="ui success message">' +
        '<div class="header">' +
          successMessage +
        '</div>' +
      '</div>';
    $('#message').append(successMessageContents);
  }
});
