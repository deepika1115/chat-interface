
var app = angular.module('myApp', ['ngMaterial', 'LocalStorageModule']);
app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('chat');
}); 
app.controller("myCtrl",function($scope, localStorageService){
	$scope.today = new Date(); 
	var localData = localStorageService.get('localData');
    $scope.data = localData || {
		myName : "",
		email : "",
		company : ""
	}


	$scope.save = function() {
		localStorageService.set('localData',$scope.data);
	}
	
       

$scope.records = [];
  $scope.text;
  $scope.func = function(text){
    $scope.records.push(text);
    $scope.text = "";
  }
	
});