var app = angular.module('chatApp',[]);
app.controller('chatCtrl', function($scope,$http){
	
	$scope.submit = function(){

		var chatClients = {
		"website_name" : $scope.webname,
		"website_url" : $scope.weburl,
		"bot_token" : $scope.token,
		"slack_url" : $scope.slackurl
		};
		console.log(chatClients);
		$http.post("/update/",chatClients)
	    .success(function(data, status, headers, config){
	        console.log("inserted Successfully");
	    });
	}

});
