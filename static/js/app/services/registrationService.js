goog.provide('chat.service.registrationService');
goog.require('chat.module');

(function(){
    chat.service.registrationService = function($http,$location) {
        var app = {};

        app.registerUser = function(user){
        	console.log(user);
        	var q = $q.defer();
        	gapi.client.register_handler.register_handle(user).excute(function(resp){
        		q.resolve(resp);
        		console.log(resp);
        	})
        	return q.promise;

            // return $http.post("/update/", user)
        }
        return app;
    }
    chat.service.registrationService.$inject = ['$http','$location'];
    chat.module.service('registrationService', chat.service.registrationService)
})();



  // var q = $q.defer()
  //           gapi.client.course_meneger.add_update_course(info).execute(function(resp){
  //               q.resolve(resp)
  //               console.log(resp)
  //           })
  //           return q.promise
  //       };