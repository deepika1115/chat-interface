goog.provide('chat.ctrl.RegisterCtrl');
goog.require('chat.module');
goog.require('chat.service.registrationService');

(function() {
   chat.ctrl.RegisterCtrl = function($scope, $http, registrationService) {
   	$scope.submit = function(){

        var ChatClients = {
        "website_name" : $scope.webname,
        "website_url" : $scope.weburl,
        "client_token" : $scope.clientToken,
        "developer_token" : $scope.developerToken,
        "slack_url" : $scope.slackUrl
        };
        registrationService.registerUser(ChatClients).then( function(resp) {
          if(resp.OK) {
            //$location.path('')
          }
        })
        
    }
   }
   chat.ctrl.RegisterCtrl.$inject = ['$scope', '$http', 'registrationService'];
   chat.module.controller('RegisterCtrl', chat.ctrl.RegisterCtrl)
})();