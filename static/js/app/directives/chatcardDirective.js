goog.provide('chat.directive.chatCardDirective');
goog.require('chat.module');

(function(){
	chat.directive.chatCardDirective =  function(){
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
          // other function of chat.js
          
          },
    controllerAS: "chatCard"
     };
    }
    chat.directive.chatCardDirective.$inject = [];
    chat.module.directive('chatCard', chat.directive.chatCardDirective);
})();
