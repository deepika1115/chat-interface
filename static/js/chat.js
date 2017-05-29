var app = angular.module('myApp', ['ngMaterial', 'LocalStorageModule','ngRoute']);
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
    
    
    
    // var msgData = localStorageService.get('msgData');
    // $scope.records = msgData || [];
    $scope.records = [];
    $scope.text;
    $scope.isTyping = false;
    $scope.func = function(text){
        $scope.isTyping = true;
        if(text && text != ""){
            $scope.records.push({ 
                type : "c",
                data : text
            });
            client.textRequest(text).then( function(botSays) {
                $scope.records.push({
                    type : "s",
                    data : botSays.result.fulfillment.messages[0].speech
                })
                $scope.isTyping = false;
                $scope.$apply();
                console.log(botSays.result.fulfillment.messages[0].speech)
            }).catch( function(err) {
                console.log(err)
            })
            // localStorageService.set('msgData',$scope.records);
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

// Directive part

app.directive('chatCard', function(){
    return{
    restrict:'E',
    templateUrl: 'templates/connectingCard.html',
    link : function(scope, element, attrs) {

    },
    controller: function($scope, $location) {
        $scope.class = "chat_space";
        console.log()
        $scope.changeClass = function(){
            if ($scope.class === "chat_space" && $location.url() == '/max')
              $scope.class = "chat_max";
            else
              $scope.class = "chat_space";
          };

    },
    controllerAS: "chatCard"
     };
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/chat.html",
        controller: "myCtrl"
    })
    .when("/max", {
        templateUrl : "templates/connectingCard.html",
        controller: "cardCtrl"     
    })
}]);