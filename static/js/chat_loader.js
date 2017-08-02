
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
	frame.setAttribute("src", 'https://10-dot-sanskrut-dev.appspot.com/?url=' + window.location.origin); 
	console.log(frame.src);
	console.log(frame.baseURI);
	frame.style.width = '300px';
	frame.style.height = '0';
	frame.style.scrolling = "no";
	frame.style.border = "0";
	frame.style.visibility = 'hidden';
	div.appendChild(frame);

var style = "line-height: 5rem; width: 5rem;height: 5rem; border-radius: 50%; \
\font-size: 16px; text-align: center; text-transform: uppercase; text-decoration:none; \
 background-color: #ff7200; border: none; outline: none; cursor: pointer";



 // var style = "font-size:100% !important;\
 // position:fixed !important;\
 // bottom:15px !important;\
 // right:20px !important;\
 // left:auto !important;\
 // height:48px !important;\
 // width:auto !important;\
 // z-index:10000000000000 !important;\
 // background:#4c3dc7 !important;\
 // border:0 !important;\
 // border-radius:100px !important;\
 // box-shadow:0 3px 15px 0 rgba(0,0,0,0.25) !important;\
 // box-sizing:border-box !important;\
 // padding:0 20px !important;\
 // transition:all .4s,bottom .8s ease-in-out !important;\
 // cursor:pointer !important;\
 // outline:none !important;\
 // display:inline-block !important;\
 // margin:0 !important;\
 // -webkit-font-smoothing:antialiased !important;\
 // -webkit-tap-highlight-color:rgba(0,0,0,0) !important;\
 // animation-name:loadBubble;\
 // animation-iteration-count:1;\
 // animation-timing-function:ease-in-out;\
 // animation-duration:.2s;"


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