var app = angular.module('chatApp',[]);
app.controller('chatCtrl', function($scope,$http){
	
	$scope.submit = function(){

		var ChatClients = {
		"website_name" : $scope.webname,
		"website_url" : $scope.weburl,
		"client_token" : $scope.clientToken,
		"developer_token" : $scope.developerToken,
		"slack_url" : $scope.slackUrl
		};
		console.log(ChatClients);
		$http.post("/update/",ChatClients)
	    .success(function(data, status, headers, config){
	        console.log("inserted Successfully");
	    });
	}
});
