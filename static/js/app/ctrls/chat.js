

    




// controller for chat service
app.controller("myCtrl",['$location', '$scope', 'localStorageService', '$window','$interval', '$http','$firebaseObject','$firebaseArray','$firebaseAuth','GetClientToken',function($location, $scope, localStorageService, $window,$interval, $http,$firebaseObject,$firebaseArray,$firebaseAuth,GetClientToken){
var initialdataloaded = false;

    var token;
    // var url = $location.search();
    //   if(url) {
        
    //     var req = {
    //         method: 'POST',
    //         url: '/current',
    //         headers: {
    //             "Content-Type": "application/json"    
    //                 },
    //         data: url
    //     }
        
    //     $http(req).then(function(resp){
    //         console.log(resp);
    //         token = resp.data.token;
    //     })
    // }
    // getToken();
    GetClientToken.getToken()
        .then(function(resp){
            console.log(resp)
            token = resp.data.token;
        });



    $scope.today = new Date(); 
    $scope.chat = new Date(); 


    var localData = localStorageService.get('localData');
    $scope.data = localData || {
        myName : "",
        email : "",
        company : ""
    }

    $scope.showThis = {}
    $scope.show = function(which, that){
        $scope.showThis[which] = that
    }
    $scope.show('registerView', true);
    $scope.save = function() {
        localStorageService.set('localData',$scope.data);
        console.log($scope.data.email)
        $scope.show('registerView', false);
        $scope.show('chatView', true);
    }

    var msgData = localStorageService.get('msgData');
    $scope.records = msgData || [];
    // $scope.records = [];
    $scope.text;
    $scope.isTyping = false;
    $scope.func = function(text){       //func for posting data to api.ai and pushing clients and server data in array
        $scope.isTyping = true;

        if(text && text != ""){
            $scope.records.push({ 
                type : "c",
                data : text
            });
            var ob = {
                method: 'POST',
                url: 'https://api.api.ai/v1/query?v=20150910',
                headers: {
                    'Authorization': 'Bearer ' + token,
                        },
                data: {
                    "query": [
                        $scope.text
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
                                "token": token
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
                    "sessionId": $scope.data.email
                }
            }
            
            $http(ob).then( function(resp) {
                console.log(resp);
                $scope.records.push({
                    type : "s",
                    data : resp.data.result.fulfillment.speech
                
            })
                localStorageService.set('msgData',$scope.records);
                 $scope.isTyping = false;

            })
            
            $scope.text = "";
              
                  $scope.updateScroll();
              
             
        }
        else{
            return;
        }
    }
  
// make scroll down when new msg entered
  $scope.updateScroll = function(){
    var elem = document.getElementById("scrollDiv");
    elem.scrollTop = elem.scrollHeight;
  }


// firebase connection
  var ref = firebase.database().ref();
    var ref = firebase.database().ref('chat-interface1/')
    ref.on("child_added",function(requestSnapshot){
            //console.log(childsnapshot);
            if(initialdataloaded){
            console.log(requestSnapshot.val().message);
            console.log($scope.records)
                if(requestSnapshot.val().session_id == $scope.data.email){
                    $scope.records.push({ 
                        type : "r",
                        data : requestSnapshot.val().message
                    })
                    localStorageService.set('msgData',$scope.records);
                    $scope.$digest();


                }
            }   
    });

    ref.once('value', function(snapshot){
        initialdataloaded = true;
    })

}]);

//service for sending url and getting token
app.factory('GetClientToken',['$http','$location',function($http,$location){
    var GetClientToken = {};

    GetClientToken.getToken = function(){
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
    return GetClientToken;

}]);

//service for sending data to api.ai and getting responce text





//controller for main site where user register
app.controller('chatCtrl', function($scope,$http){
    
    $scope.submit = function(){

        var ChatClients = {
        "website_name" : $scope.webname,
        "website_url" : $scope.weburl,
        "client_token" : $scope.clientToken,
        "developer_token" : $scope.developerToken,
        "slack_url" : $scope.slackUrl
        };
        console.log(ChatClients);
        $http.post("/update/",ChatClients)
        .success(function(data, status, headers, config){
            console.log("inserted Successfully");
        });
    }
});


//directive for ngenter
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
          // other function of chat.js
          
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
    })
}]);

// app.service('apiLoaded', ['$q', 'GApi',function($q, GApi) {
//     var app = {}

//     app.init = function() {

//     }
//     gapi.clientHandle

//     return app;
// }])