goog.provide('chat.module');
goog.provide('chat.ctrl');
goog.provide('chat.service');
goog.provide('chat.directive');

(function() {
	chat = {}
	chat.ctrl = {};
	chat.service = {};
	chat.directive = {};
	chat.module = angular.module('chatModule', ['ngMaterial', 'LocalStorageModule','ngRoute','firebase', 'angular-google-gapi']);

	chat.module.config(['$routeProvider', 'localStorageServiceProvider', '$httpProvider', '$mdThemingProvider', function($routeProvider, localStorageServiceProvider, $httpProvider, $mdThemingProvider) {
		$routeProvider
		.when("/", {
	       templateUrl : "templates/client_info.html",
	       controller: "RegisterCtrl"
	     })
		.when("/chatService",{
			templateUrl : "templates/chat.html",
			controller : "ClientChatCtrl"
		})
        .when("/client", {
	       templateUrl : "templates/chat.html",
	       controller: "myCtrl"
	     })
	    .when("/max", {
	       templateUrl : "templates/connectingCard.html",
	       controller : "ClientChatCtrl"
	    })
	  $mdThemingProvider.theme('default')
	    .primaryPalette('light-green')
	    .accentPalette('deep-orange');
	  localStorageServiceProvider
	    .setPrefix('chat');

	}]); 
})();



 