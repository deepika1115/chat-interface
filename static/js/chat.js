var env = {};

// Import variables if present (from env.js)
if(window){  
  Object.assign(env, window.__env);
}




var app = angular.module('myApp', ['ngMaterial', 'LocalStorageModule','ngRoute','firebase']);

// Register environment in AngularJS as constant
app.constant('__env', env);
//make environment available in angular  
function logEnvironment($log, __env){
    $log.debug('Environment variables:');
    $log.debug(__env)
}
  
logEnvironment.$inject = ['$log', '__env'];
  
app.run(logEnvironment);

// function disableLogging($logProvider, __env){  
//   $logProvider.debugEnabled(__env.enableDebug);
// }

// // Inject dependencies
// disableLogging.$inject = ['$logProvider', '__env'];

// app.config(disableLogging);  





    
app.config(function (localStorageServiceProvider, $httpProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('light-green')
    .accentPalette('deep-orange');
  localStorageServiceProvider
    .setPrefix('chat');
}); 

app.controller("myCtrl",['$scope', 'localStorageService', '$window','$interval', '$http','$firebaseObject','$firebaseArray','$firebaseAuth',function($scope, localStorageService, $window,$interval, $http,$firebaseObject,$firebaseArray,$firebaseAuth){
var initialdataloaded = false;

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
        var token = __env.token;
        if(text && text != ""){
            $scope.records.push({ 
                type : "c",
                data : text
            });
            var ob = {
                method: 'POST',
                url: __env.apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + token,
                        },
                data: {
                    "query": [
                        $scope.text
                    ],
                    "contexts": [{
                        "name": "",
                        "lifespan": 4
                    }],
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

