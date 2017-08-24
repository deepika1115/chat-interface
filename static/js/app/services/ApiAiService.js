goog.provide('chat.service.apiAiService');
goog.require('chat.module');

(function(){
    chat.service.apiAiService = ['$http', '$location', '$q', function($http, $location, $q) {
        var app = {};
        app.token = null;
        app.userAuthentication = null;
        app.sendToBot = function(text) {
            var q = $q.defer();
            if(app.token){
                var ob = {
                    method: 'POST',
                    url: 'https://api.api.ai/v1/query?v=20150910',
                    headers: {
                        'Authorization': 'Bearer ' + app.token,
                    },
                    data: {
                        "query": [
                            text
                            ],
                        "contexts": 
                            [
                                {
                                    "name": "",
                                    "lifespan": 4
                                },
                                {
                                    "name": "token",
                                    "parameters": {
                                    "token": app.token
                                    // "key": 'key'
                                    }
                                }
                            ],
                        "location": {
                            "latitude": 37.459157,
                            "longitude": -122.17926
                            },
                        "timezone": "India/Delhi",
                        "lang": "en",
                        "sessionId": app.userAuthentication
                    }
                }
                
                $http(ob).then( function(resp) {
                    q.resolve(resp.data.result.fulfillment.speech);
                });
            }
            return q.promise;
        }    
        return app;
    }]

    chat.service.apiAiService.$inject = ['$http','$location', '$q'];
    chat.module.service('apiAiService', chat.service.apiAiService);
})();