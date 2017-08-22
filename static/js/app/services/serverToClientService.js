goog.provide('chat.service.clientService');
goog.require('chat.module');

(function(){
    chat.service.clientService = function($http,$location) {
        var app = {};

        app.getToken = function(){
            var url = $location.search();
            if(url) {
                var req = {
                method: 'POST',
                url: '/current',
                headers: {
                    "Content-Type": "application/json"    
                        },
                data: url
                }
            }
            return $http(req);
        }
        return app;
    }
    chat.service.clientService.$inject = ['$http','$location'];
    chat.module.service('clientService', chat.service.clientService)
})();