goog.provide('chat.ctrl.ClientChatCtrl');
goog.require('chat.module');

goog.require('chat.service.clientService');
goog.require('chat.service.apiAiService');

goog.require('chat.directive.chatCardDirective');


(function() {
	chat.ctrl.ClientChatCtrl = function($timeout, $location, $scope, localStorageService, $window,$interval, $http,$firebaseObject,$firebaseArray,$firebaseAuth,clientService,apiAiService) {
    	
        var initialdataloaded;
        var localData;
        var msgData;
        var onLoad = function() {
            
         
            initialdataloaded = false;
            //service to send current url to backend and getting token
            clientService.init().then(function(){
                clientService.getToken().then(function(resp){
                    // console.log(resp)
                    if(resp) {
                        console.log(resp);
                        apiAiService.token = resp.result.client_token;
                    } else {
                        alert('plz register to use chat app');
                        return;
                    }
                })
            })
            
            

            var localData = localStorageService.get('localData');
            $scope.data = localData || {
                myName : "",
                email : "",
                company : ""
            }
            
        }

        onLoad();





        $scope.today = new Date(); 
        $scope.chat = new Date(); 

            $scope.showThis = {}
            $scope.show = function(elements){
                for(var key in elements) {
                    $scope.showThis[key] = elements[key]
               }
            }
            $scope.show({
                registerView: true,
                chatView: false
            })


        $scope.save = function() {
            localStorageService.set('localData',$scope.data);
            console.log($scope.data.email)
            $scope.show({
                registerView: false,
                chatView: true
            })
        }
        apiAiService.userAuthentication = $scope.data.email;

        var msgData = localStorageService.get('msgData');
        $scope.records = msgData || [];
        // $scope.records = [];
        $scope.text;
        $scope.isTyping = false;
        $scope.func = function(text){       //func for posting data to api.ai and pushing clients and server data in array
            // $scope.isTyping = true;

            if(text && text != ""){
                $scope.records.push({ 
                    type : "c",
                    data : text
                });
                $scope.text = "";
                
                // 
                apiAiService.sendToBot(text).then( function(botSays) {
                    $scope.records.push({
                        type : "s",
                        data : botSays  
                    })
                    localStorageService.set('msgData',$scope.records);
                    // $scope.isTyping = false;
                    
                })
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
                console.log(requestSnapshot.val().session_id);
                console.log('user frontend email');
                console.log($scope.data.email);

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

    chat.ctrl.ClientChatCtrl.$inject = ['$timeout', '$location', '$scope', 'localStorageService', '$window','$interval', '$http','$firebaseObject','$firebaseArray','$firebaseAuth','clientService','apiAiService'];
    chat.module.controller('ClientChatCtrl', chat.ctrl.ClientChatCtrl);

})();