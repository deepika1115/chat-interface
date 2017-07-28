var is_show = false, frame, button, div, module;
module = angular.module("app", ['ngMaterial'])
window.onload = button(is_show);

function button(show) {
	div = document.getElementById("chat_frame");
    div.setAttribute("ng-app", "app");

	frame = document.createElement("iframe");
	frame.setAttribute("src", "https://10-dot-sanskrut-dev.appspot.com");
	frame.style.width = '300px';
	frame.style.height = '0';
	frame.style.scrolling = "no";
	frame.style.border = "0";
	frame.style.visibility = 'hidden';
    div.appendChild(frame);

	button = document.createElement("md-button");
	button.innerHTML = "Chat";
    button.setAttribute('class', "md fab");
    button.setAttribute('onClick', "toggle()");
    div.appendChild(button);
}

function toggle() {
	is_show = !is_show;
	var visible =  is_show ? 'visible' : 'hidden';
	frame.style.visibility = visible;
	frame.style.height = is_show ? '455px' : '0'
}

// Loading AngularJS & Angular Material, if Angular is already not in
// if(typeof window.angular === 'undefined'){
// 		var count = 0;
// 		var address = [
// 			{	
// 				add:'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js', 
// 				type: 'script'
// 			},
// 			{	
// 				add:'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js',
// 				type: 'script'
// 			},
// 			{	
// 				add:'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js',
// 				type: 'script'
// 			},
// 			{	
// 				add:'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js',
// 				type: 'script'
// 			},
// 			{	
// 				add:'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js',
// 				type: 'script'
// 			},
// 			{	
// 				add:'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js',
// 				type: 'script'
// 			},
// 			{	
// 				add:'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js',
// 				type: 'link'
// 			}];
// 		address.forEach( function(para) {
// 			var script = getAngularJS(para);
//         	document.getElementsByTagName("head")[count].appendChild(script);
//         	count++;
// 		})
        
//         if(angularJS.complete){
//             document.write = document._write;
//         }
//         else{
//             angularJS.onload = function(){
//                 setTimeout(function(){
//                     document.write = document._write;
//                 }, 0);
//  				button(is_show);
//             }
//         }
//     }
//     else{
//         button(is_show);
//     }

//     function getAngularJS(src) {
//         var script = document.createElement(src.type);
//         script.type = "text/javascript";
//         script.src = src.add;
//         return script;
//     }