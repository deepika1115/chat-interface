var app = angular.module('chatApp',[]);
app.controller('chatCtrl', function($scope,$http){
	
	$scope.submit = function(){

		var ChatClients = {
		"websiteName" : $scope.webname,
		"websiteUrl" : $scope.weburl,
		"clientToken" : $scope.clientToken,
		"developerToken" : $scope.developerToken,
		"slackUrl" : $scope.slackUrl
		};
		console.log(ChatClients);
		$http.post("/update/",ChatClients)
	    .success(function(data, status, headers, config){
	        console.log("inserted Successfully");
	    });
	}

});
