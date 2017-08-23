goog.provide('chat.ctrl.ClientChatCtrl');
goog.require('chat.module');
goog.require('chat.service.clientService');

(function() {
	chat.ctrl.ClientChatCtrl = function( $location, $scope, localStorageService, $window,$interval, $http,$firebaseObject,$firebaseArray,$firebaseAuth,clientService) {
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
        clientService.getToken()
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

    }

    chat.ctrl.ClientChatCtrl.$inject = ['$location', '$scope', 'localStorageService', '$window','$interval', '$http','$firebaseObject','$firebaseArray','$firebaseAuth','clientService']
    chat.module.controller('ClientChatCtrl', chat.ctrl.ClientChatCtrl);

})();