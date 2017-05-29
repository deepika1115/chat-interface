var app = angular.module('myApp', ['ngMaterial', 'LocalStorageModule','ngRoute']);
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
    
    
    var msgData = localStorageService.get('msgData');
    $scope.records = msgData || [];
    $scope.text;
    
    $scope.func = function(text){
        $scope.records.push(text);
        localStorageService.set('msgData',$scope.records);
        $scope.text = "";
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
    controller: function($scope, $location) {
        $scope.class = "chat_space";
        console.log()
        $scope.changeClass = function(){
            if ($scope.class === "chat_space" && $location.url() == '/max')
              $scope.class = "chat_default";
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
        controller: "myCtrl"     
    })
}]);