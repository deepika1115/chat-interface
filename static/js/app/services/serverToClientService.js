goog.provide('chat.service.clientService');
goog.require('chat.module');

(function(){
    chat.service.clientService = function($q, $http, $location, GApi) {
        var app = {};

        //load api
        app.init = function(){    
            return GApi.load('api_collection', 'v1.0', '/_ah/api')
        }


        app.getToken = function(){
            
            var url = $location.search();
            if(url) {
                var req = {
                // method: 'POST',
                // url: '/current',
                // headers: {
                //     "Content-Type": "application/json"    
                //         },
                "current_url" : url,
                "project_key" : 'key'
                }
            }
            // return $http(req);
            var q = $q.defer();
            gapi.client.chatinterface.client_handler.client_handle(req).execute(function(resp){
                q.resolve(resp);
                console.log(resp);
            })
            return q.promise;
        }
        return app;
    }
    chat.service.clientService.$inject = ['$q', '$http','$location', 'GApi'];
    chat.module.service('clientService', chat.service.clientService);
})();