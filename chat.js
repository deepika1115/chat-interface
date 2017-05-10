var app = angular.module('myApp', ['ngMaterial']);
app.controller("myCtrl",function($scope,$timeout){
	$scope.today = new Date(); 
	

	$scope.myName;
	 $scope.email;
	 $scope.company;
    
               

$scope.records = [];
  $scope.text;
  $scope.func = function(text){
    $scope.records.push(text);
    $scope.text = "";
  }
	

});