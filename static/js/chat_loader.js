
var is_show = false, frame, button, div, module;
// module = angular.module("app", ['ngMaterial'])
window.onload = button(is_show);
// var hostname = window.location;
// var site = 'https://10-dot-sanskrut-dev.appspot.com?' + hostname;
function button(show) {

	var div_style = "position: fixed; bottom: 0; right: 0; z-index: 20000"
	div = document.getElementById("chat_frame");
	div.setAttribute('style', div_style);

	frame = document.createElement("iframe");
//?url=' + window.location.origin
	frame.setAttribute("src", 'https://10-dot-sanskrut-dev.appspot.com/chatService#/?url=' + window.location.origin); 
	frame.style.width = '300px';
	frame.style.height = '0';
	frame.style.scrolling = "no";
	frame.style.border = "0";
	frame.style.visibility = 'hidden';
	div.appendChild(frame);

var style = "line-height: 5rem; width: 5rem;height: 5rem; border-radius: 50%;" +
"font-size: 16px; text-align: center; text-transform: uppercase; text-decoration:none;" +
 "background-color: #ff7200; border: none; outline: none; cursor: pointer"



 

	button = document.createElement("button");
	button.innerHTML = "Chat";
	button.setAttribute("style", style);
	button.setAttribute("onmouseover", 'box-shadow:0 5px 25px 0 rgba(0,0,0,0.5)')
    // button.setAttribute('class', "md fab");
    button.setAttribute('onClick', "toggle()");
    div.appendChild(button);
}

function toggle() {
	is_show = !is_show;
	var visible =  is_show ? 'visible' : 'hidden';
	frame.style.visibility = visible;
	frame.style.height = is_show ? '435px' : '0'
}