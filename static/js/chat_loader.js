var is_show = false, frame, button, div, module;
// module = angular.module("app", ['ngMaterial'])
window.onload = button(is_show);
// var hostname = window.location;
// var site = 'https://10-dot-sanskrut-dev.appspot.com?' + hostname;


function button(show) {

var div_style = "position: fixed; bottom: 0; right: 0; z-index: 20000"

	div = document.getElementById("chat_frame");

	div.setAttribute('style', div_style);

    div.setAttribute("ng-app", "app");

	frame = document.createElement("iframe");
// /?url=' + window.location.origin
	frame.setAttribute("src", 'https://10-dot-sanskrut-dev.appspot.com');
	frame.style.width = '300px';
	frame.style.height = '0';
	frame.style.scrolling = "no";
	frame.style.border = "0";
	frame.style.visibility = 'hidden';
	div.appendChild(frame);

var style = "line-height: 5rem; width: 5rem;height: 5rem; border-radius: 50%; \
\font-size: 16px; text-align: center; text-transform: uppercase; text-decoration:none; \
 background-color: #ff7200; border: none; outline: none";

	button = document.createElement("button");
	button.innerHTML = "Chat";
	button.setAttribute("style", style);
    // button.setAttribute('class', "md fab");
    button.setAttribute('onClick', "toggle()");
    div.appendChild(button);
}

function toggle() {
	is_show = !is_show;
	var visible =  is_show ? 'visible' : 'hidden';
	frame.style.visibility = visible;
	frame.style.height = is_show ? '430px' : '0'
}
// Loading AngularJS & Angular Material, if Angular is already not in
// if(typeof window.angular === 'undefined'){
// 		var count = 0;
// 		var address = [
// 				'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js', 
// 				'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js',
// 				'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js',
// 				'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js',
// 				'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js'
// 			];

// 		var addr_css = ['https://fonts.googleapis.com/icon?family=Material+Icons',
// 						'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css'
// 			];

// 		address.forEach( function(para) {
// 			var script = getAngularJS(para);
//         	document.getElementsByTagName("head")[count].appendChild(script);
//         	count++;
// 		})

// 		add_css.forEach( function(para) {
// 			var link = getAngularCSS(para);
//         	document.getElementsByTagName("head")[count].appendChild(link);
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
//         var script = document.createElement(script);
//         script.type = "text/javascript";
//         script.src = address;
//         return script;
//     }
//     function getAngularCSS(href) {
//         var link = document.createElement(link);
//         link.rel = "stylesheet";
//         link.href = addr_css;
//         return link;
//     }