goog.provide('chat.service.registrationService');
goog.require('chat.module');

(function(){
  chat.service.registrationService = function($http,$location,$q, GApi) {
    var app = {};

   
    app.init = function(){    
        return GApi.load('api_collection', 'v1.0', '/_ah/api')
    }

        


    app.registerUser = function(user){
        console.log(user)
        	
        var q = $q.defer();
      	gapi.client.chatinterface.register_handler.register_handle(user).execute(function(resp){
      		q.resolve(resp);
      		console.log(resp);
      	})
      	return q.promise;

          // return $http.post("/update/", user)
    }
    return app;
  }
  chat.service.registrationService.$inject = ['$http','$location','$q', 'GApi'];
  chat.module.service('registrationService', chat.service.registrationService)

})(); 






