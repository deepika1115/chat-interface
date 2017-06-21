var app = angular.module('myApp', ['ngMaterial', 'LocalStorageModule','ngRoute','firebase']);
app.config(function (localStorageServiceProvider, $httpProvider) {
    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
  localStorageServiceProvider
    .setPrefix('chat');
}); 

app.controller("myCtrl",['$scope', 'localStorageService', '$window','$interval', '$http','$firebaseObject','$firebaseArray',function($scope, localStorageService, $window,$interval, $http,$firebaseObject,$firebaseArray){

	
var initialdataloaded = false;

//var auth = $firebaseAuth();
    $scope.today = new Date(); 

	var localData = localStorageService.get('localData');
    $scope.data = localData || {
		myName : "",
		email : "",
		company : ""
	}


	$scope.save = function() {
		localStorageService.set('localData',$scope.data);
	console.log($scope.data.email)
    }

    
    
    
    var msgData = localStorageService.get('msgData');
    $scope.records = msgData || [];
    // $scope.records = [];
    $scope.text;
    $scope.isTyping = false;
    $scope.func = function(text){
        $scope.isTyping = true;
        var token = '0193cf9c63c14b3188633ea7315deb91';
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

                    data : resp.data.result.fulfillment.message.speech
                })
                $scope.isTyping = false;
                console.log(resp.result.fulfillment.messages.speech)
            }).catch( function(err) {
                console.log(err)
            })
             localStorageService.set('msgData',$scope.records);
             $scope.text = "";

                   

        }
        else{
            return;
        }
       

        
  }


  var ref = firebase.database().ref();
    // var ref = new Firebase('https://chat-interface1.firebaseio.com/');
    // var obj = $firebaseObject(ref);
    // var playersRef = ref.child("chat-interface1");

    // var playersKey = playersRef.key();
    // console.log(playersKey);
   

    // var obj = $firebaseArray(ref);
    // obj.$loaded().then(function() {
    // console.log(Object.keys(obj[0]).length);
    
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

    // ref.orderByChild("notify").equalTo(1).limitToLast(1).on("child_added",function(){
    //     if(snapshot.val().notify == 1){
    //         console.log(snapshot.val().message.notify)
    //     }
    // });

        
        

        // for (i in obj[0]){
        //     console.log(i);
        //     var ref = firebase.database().ref("chat-interface1/" + i).once('value').then(function(snapshot) {
        //         console.log(snapshot.val().message);
            //     $scope.records.push({ 
            //     type : "r",
            //     data : snapshot.val().message
            // })
        //     });
            
        // }
     // angular.forEach(obj, function(value, key) {
     //      console.log(key, value);
     //   });
  // });

}]);

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
              $scope.class = "chat_default";
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