// Markdownの入力と出力
var app = angular.module('indexApp', ['ngSanitize']);
app.controller('markdownAreaCtrl', function($scope) {
  $scope.$watch('inputMarkdown', function(newValue, oldValue) {
    $scope.outputMarkdown = marked($scope.inputMarkdown);
  });
});
