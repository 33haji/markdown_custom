// Markdownの入力と出力
var app = angular.module('indexApp', []);
app.controller('textareaCtrl', function($scope) {
  $scope.$watch('inputText', function(newValue, oldValue) {
    $scope.outputText = $scope.inputText;
  });
});
