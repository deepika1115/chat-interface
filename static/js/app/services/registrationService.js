goog.provide('chat.service.registrationService');
goog.require('chat.module');

(function(){
    chat.service.registrationService = function($http,$location) {
        var app = {};

        app.registerUser = function(user){ 
            return $http.post("/update/", user)
        }
        return app;
    }
    chat.service.registrationService.$inject = ['$http','$location'];
    chat.module.service('registrationService', chat.service.registrationService)
})();