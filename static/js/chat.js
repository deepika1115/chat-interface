var app = angular.module('myApp', ['ngMaterial', 'LocalStorageModule']);

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('chat');
}); 

app.controller("myCtrl",function($scope, localStorageService, $window){
	$scope.today = new Date(); 

    var client = new ApiAi.ApiAiClient({accessToken: '0193cf9c63c14b3188633ea7315deb91'});

	var localData = localStorageService.get('localData');
    $scope.data = localData || {
		myName : "",
		email : "",
		company : ""
	}


	$scope.save = function() {
		localStorageService.set('localData',$scope.data);
	}
    
    
    
    var msgData = localStorageService.get('msgData');
    $scope.records = msgData || [];
    $scope.serverRecords = [];
    $scope.text;
    $scope.botsays;
    
    $scope.func = function(text){
        if(text && text != ""){
            $scope.records.push(text);
            client.textRequest(text).then( function(botSays) {
                $scope.serverRecords.push(botSays.result.fulfillment.messages)
                console.log(botSays.result.fulfillment.messages[0].speech)
            }).catch( function(err) {
                console.log(err)
            })
            localStorageService.set('msgData',$scope.records);
            $scope.text = "";
        }
        else{
            return;
        }
       

        
  }


});

app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });
