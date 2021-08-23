console.log("Amitians Toolkit Running...");

var interval, intervalRunning = false, ButtonsAdded = false;
var p2tEnabled = false, isTyping = false, micMuted = true;

function addButtons(){
	/* P2T Button */
	let buttonWrapper = document.createElement("item-widget");
	buttonWrapper.className = "item-widget";
	buttonWrapper.id = "pushtalk-button-wrapper";
	buttonWrapper.setAttribute("item", "item");
	buttonWrapper.innerHTML = `
		<style>
			.tt-tooltip {    
				position: absolute;
				background: #646464;
				border-radius:4px;
				padding: 6px 12px;
				font-family: arial;
				font-size: 12px;
				color: #fff;
			}
			.tt-tooltip:before {
				content: " ";
				width: 0;
				height: 0;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
				border-top: 10px solid #646464;
				position: absolute;
				bottom: -5px;
				left: 50%;
				transform: translate(-50%);
			}
		</style>
		<push-button>
			<div class="ts-push-button">
				<button id="tt-pushtalk-button" title="Enable Push To Talk" aria-label="Push To Talk" class="ts-push-button-action ts-sym togglable inset-border">
					<div class="button-overlay"></div>
					<ng-include class="iconWrapper">
						<svg class="icon-active" viewBox="0 0 171 171" style="width: 4rem;display: none;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,171.99544v-171.99544h171.99544v171.99544z" fill="none"></path><g fill="#ffffff"><path d="M48.01025,-0.0835c-1.41726,0.02211 -2.76769,0.60634 -3.75418,1.62415c-0.9865,1.01781 -1.52825,2.38583 -1.50607,3.80309v36.04944c-6.55844,4.95532 -10.6875,12.76758 -10.6875,21.33325v12.08606c0,22.10527 5.50482,59.00772 8.78796,73.07996c1.68751,7.22762 8.17175,12.42004 15.61377,12.42004h58.11328c7.40054,0 13.87547,-5.14882 15.5929,-12.33655c3.30785,-13.85666 8.76708,-50.22581 8.76708,-73.16345v-12.08606c0,-8.55985 -4.13043,-16.35756 -10.6875,-21.31238v-14.69531c-0.0003,-2.95115 -2.3926,-5.34345 -5.34375,-5.34375h-10.6875c-2.95115,0.0003 -5.34345,2.3926 -5.34375,5.34375v7.32678c-6.39156,-1.16482 -13.53131,-1.98303 -21.375,-1.98303c-3.72182,0 -7.2661,0.20873 -10.6875,0.52185v-16.5531c0.02263,-1.44621 -0.5419,-2.83984 -1.56465,-3.8626c-1.02275,-1.02275 -2.41638,-1.58728 -3.8626,-1.56465c-1.41726,0.02211 -2.76769,0.60634 -3.75418,1.62415c-0.9865,1.01781 -1.52825,2.38583 -1.50607,3.80309v18.03516c-3.89888,0.71125 -7.46253,1.53251 -10.6875,2.42139v-31.14404c0.02263,-1.44621 -0.5419,-2.83984 -1.56465,-3.8626c-1.02275,-1.02275 -2.41638,-1.58728 -3.8626,-1.56465zM85.5,42.75c12.4275,0 23.25673,2.20652 31.24841,4.57141c6.86822,2.03144 11.50159,8.2361 11.50159,15.40503v12.08606c0,21.15898 -5.5626,58.47999 -8.47486,70.67944c-0.59107,2.47378 -2.68017,4.13306 -5.19763,4.13306h-58.11328c-2.51873,0 -4.61939,-1.69818 -5.19763,-4.1748c-2.91631,-12.50804 -8.5166,-50.40499 -8.5166,-70.6377v-12.08606c0,-7.16893 4.62871,-13.36414 11.50159,-15.40503c7.99671,-2.35617 18.82091,-4.57141 31.24841,-4.57141zM69.46875,64.125c-1.92715,-0.02725 -3.71968,0.98526 -4.69121,2.64982c-0.97153,1.66457 -0.97153,3.72329 0,5.38786c0.97153,1.66457 2.76406,2.67708 4.69121,2.64982h32.0625c1.92715,0.02725 3.71968,-0.98526 4.69121,-2.64982c0.97153,-1.66457 0.97153,-3.72329 0,-5.38786c-0.97153,-1.66457 -2.76406,-2.67708 -4.69121,-2.64982zM69.46875,85.5c-1.92715,-0.02725 -3.71968,0.98526 -4.69121,2.64982c-0.97153,1.66457 -0.97153,3.72329 0,5.38786c0.97153,1.66457 2.76406,2.67708 4.69121,2.64982h32.0625c1.92715,0.02725 3.71968,-0.98526 4.69121,-2.64982c0.97153,-1.66457 0.97153,-3.72329 0,-5.38786c-0.97153,-1.66457 -2.76406,-2.67708 -4.69121,-2.64982z"></path></g></g></svg>
						<svg class="icon-inactive" viewBox="0 0 171 171" style="width: 4rem;" xmlns="http://www.w3.org/2000/svg" version="1.1"><g><g fill="none" fill-rule="nonzero" stroke-miterlimit="10" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><path d="m2,176.99544l0,-171.99544l171.99544,0l0,171.99544l-171.99544,0z" fill="none" id="svg_2"/><g fill="#ffffff" id="svg_3"><path d="m50.01025,4.9165c-1.41726,0.02211 -2.76769,0.60634 -3.75418,1.62415c-0.9865,1.01781 -1.52825,2.38583 -1.50607,3.80309l0,36.04944c-6.55844,4.95532 -10.6875,12.76758 -10.6875,21.33325l0,12.08606c0,22.10527 5.50482,59.00772 8.78796,73.07996c1.68751,7.22762 8.17175,12.42004 15.61377,12.42004l58.11328,0c7.40054,0 13.87547,-5.14882 15.5929,-12.33655c3.30785,-13.85666 8.76708,-50.22581 8.76708,-73.16345l0,-12.08606c0,-8.55985 -4.13043,-16.35756 -10.6875,-21.31238l0,-14.69531c-0.0003,-2.95115 -2.3926,-5.34345 -5.34375,-5.34375l-10.6875,0c-2.95115,0.0003 -5.34345,2.3926 -5.34375,5.34375l0,7.32678c-6.39156,-1.16482 -13.53131,-1.98303 -21.375,-1.98303c-3.72182,0 -7.2661,0.20873 -10.6875,0.52185l0,-16.5531c0.02263,-1.44621 -0.5419,-2.83984 -1.56465,-3.8626c-1.02275,-1.02275 -2.41638,-1.58728 -3.8626,-1.56465c-1.41726,0.02211 -2.76769,0.60634 -3.75418,1.62415c-0.9865,1.01781 -1.52825,2.38583 -1.50607,3.80309l0,18.03516c-3.89888,0.71125 -7.46253,1.53251 -10.6875,2.42139l0,-31.14404c0.02263,-1.44621 -0.5419,-2.83984 -1.56465,-3.8626c-1.02275,-1.02275 -2.41638,-1.58728 -3.8626,-1.56465l0.00001,0.00001zm37.48975,42.8335c12.4275,0 23.25673,2.20652 31.24841,4.57141c6.86822,2.03144 11.50159,8.2361 11.50159,15.40503l0,12.08606c0,21.15898 -5.5626,58.47999 -8.47486,70.67944c-0.59107,2.47378 -2.68017,4.13306 -5.19763,4.13306l-58.11328,0c-2.51873,0 -4.61939,-1.69818 -5.19763,-4.1748c-2.91631,-12.50804 -8.5166,-50.40499 -8.5166,-70.6377l0,-12.08606c0,-7.16893 4.62871,-13.36414 11.50159,-15.40503c7.99671,-2.35617 18.82091,-4.57141 31.24841,-4.57141zm-16.03125,21.375c-1.92715,-0.02725 -3.71968,0.98526 -4.69121,2.64982c-0.97153,1.66457 -0.97153,3.72329 0,5.38786c0.97153,1.66457 2.76406,2.67708 4.69121,2.64982l32.0625,0c1.92715,0.02725 3.71968,-0.98526 4.69121,-2.64982c0.97153,-1.66457 0.97153,-3.72329 0,-5.38786c-0.97153,-1.66457 -2.76406,-2.67708 -4.69121,-2.64982l-32.0625,0zm0,21.375c-1.92715,-0.02725 -3.71968,0.98526 -4.69121,2.64982c-0.97153,1.66457 -0.97153,3.72329 0,5.38786c0.97153,1.66457 2.76406,2.67708 4.69121,2.64982l32.0625,0c1.92715,0.02725 3.71968,-0.98526 4.69121,-2.64982c0.97153,-1.66457 0.97153,-3.72329 0,-5.38786c-0.97153,-1.66457 -2.76406,-2.67708 -4.69121,-2.64982l-32.0625,0z" id="svg_4"/></g></g><line fill="none" stroke="#fff" x1="19.75" y1="16" x2="151.25" y2="155" id="svg_6" stroke-linejoin="undefined" stroke-linecap="undefined" stroke-width="11"/></g></svg>
					</ng-include>
				</button>
			</div>
		</push-button>
	`;
	let parentNode = document.querySelectorAll(".ts-calling-unified-bar-selector [ng-repeat='group in ctrl.horizontalGroups']")[1].querySelector(".ts-items-group");
	parentNode.insertBefore(buttonWrapper, parentNode.querySelectorAll(".ts-items-group > .item-widget")[1]);
	
	let pushTalkButton = document.querySelector("#tt-pushtalk-button");
	pushTalkButton.addEventListener('mouseover',createTip);
	pushTalkButton.addEventListener('mouseout',cancelTip);
	pushTalkButton.addEventListener('click', togglePush2Talk);
	pushTalkButton = null;
	
	/* PIP Button */
	buttonWrapper = document.createElement("item-widget");
	buttonWrapper.className = "item-widget";
	buttonWrapper.id = "pip-button-wrapper";
	buttonWrapper.setAttribute("item", "item");
	buttonWrapper.innerHTML = `
		<push-button>
			<div class="ts-push-button">
				<button id="tt-pip-button" title="Picture in Picture" aria-label="Picture in Picture" class="ts-push-button-action ts-sym togglable inset-border">
					<div class="button-overlay"></div>
					<ng-include class="iconWrapper">
						<svg viewBox="0 0 171 171" style="width: 4rem;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,171.99544v-171.99544h171.99544v171.99544z" fill="none"></path><g fill="#ffffff"><path d="M28.5,28.5c-7.78807,0 -14.25,6.46193 -14.25,14.25v85.5c0,7.78807 6.46193,14.25 14.25,14.25h114c7.78807,0 14.25,-6.46193 14.25,-14.25v-85.5c0,-7.78807 -6.46193,-14.25 -14.25,-14.25zM28.5,42.75h114v85.5h-114zM78.375,57v35.625h49.875v-35.625z"></path></g></g></svg>
					</ng-include>
				</button>
			</div>
		</push-button>
	`;
	parentNode = document.querySelectorAll(".ts-calling-unified-bar-selector [ng-repeat='group in ctrl.horizontalGroups']")[1].querySelector(".ts-items-group");
	parentNode.insertBefore(buttonWrapper, parentNode.querySelectorAll(".ts-items-group > .item-widget")[2]);
	parentNode = null;
	buttonWrapper = null;

	let pipButton = document.querySelector("#tt-pip-button");
	pipButton.addEventListener('mouseover',createTip);
	pipButton.addEventListener('mouseout',cancelTip);
	pipButton.addEventListener('click', togglePictureInPicture);
	pipButton = null;
}

function togglePush2Talk(){
	p2tEnabled = !p2tEnabled;
	if(p2tEnabled){
		document.querySelector("#tt-pushtalk-button").title = "Disable Push To Talk";
		document.querySelector("#tt-pushtalk-button").setAttribute("tooltip", "Disable Push To Talk");
		document.querySelector("#tt-pushtalk-button .icon-active").style.display = "block";
		document.querySelector("#tt-pushtalk-button .icon-inactive").style.display = "none";
		
	}
	else{
		document.querySelector("#tt-pushtalk-button").title = "Enable Push To Talk";
		document.querySelector("#tt-pushtalk-button").setAttribute("tooltip", "Enable Push To Talk");
		document.querySelector("#tt-pushtalk-button .icon-active").style.display = "none";
		document.querySelector("#tt-pushtalk-button .icon-inactive").style.display = "block";
	}
}

function removeButton(){
	if(document.querySelector("#tt-pip-button")){
		document.querySelector("#tt-pip-button").removeEventListener('mouseover',createTip);
		document.querySelector("#tt-pip-button").removeEventListener('mouseout',cancelTip);
		document.querySelector("#pip-button-wrapper").remove();
	}
}
function createTip(ev){
	let title = this.title;
	this.title = '';
	this.setAttribute("tooltip", title);
	
	let tooltipWrap = document.createElement("div");
	tooltipWrap.className = 'tt-tooltip';
	tooltipWrap.appendChild(document.createTextNode(title));
	document.body.appendChild(tooltipWrap);
	
	let linkProps = this.getBoundingClientRect();
	let tooltipProps = tooltipWrap.getBoundingClientRect(); 
	let topPos = linkProps.top - (tooltipProps.height + 7);
	let leftPos = linkProps.left - ((tooltipProps.width / 2) - linkProps.width / 2);
	tooltipWrap.setAttribute('style','top:'+topPos+'px;'+'left:'+leftPos+'px;');
}
function cancelTip(ev){
	this.title = this.getAttribute("tooltip");
	this.removeAttribute("tooltip");
	document.querySelector(".tt-tooltip").remove();
}

function togglePictureInPicture() {
	if (document.pictureInPictureElement) {
		document.exitPictureInPicture();
	}
	else if (document.pictureInPictureEnabled) {
		if(document.querySelector('video')){
			document.querySelector('video').requestPictureInPicture();
		}
		else{
			alert("No video exists");
		}
    }
}

function push2Talk(shouldMute = false) {
	console.log('push2Talk Called');
	let isMuted = document.querySelector("#microphone-button").getAttribute("aria-label") == "Unmute";
	if (shouldMute != isMuted) {
		document.querySelector("#microphone-button").click();
	}
}
function addInputListeners(elem) {
    if(elem) {
		elem.addEventListener("focusin", function () {
			isTyping = true;
		});
		elem.addEventListener("focusout", function () {
			isTyping = false;
		});
    }
}

document.addEventListener("focusin", function (event) {
    const nodeName = event.target.nodeName;
    const label = event.target.getAttribute("aria-labelledby") || "";
    if (["INPUT", "BUTTON"].includes(nodeName) || event.target.getAttribute("contenteditable")){
		isTyping = true;
		addInputListeners(event.target);
    }
});

document.addEventListener("keydown", function (event) {
	if(p2tEnabled && event.code == "Space" && !isTyping && micMuted){
		event.stopPropagation();
		micMuted = false;
		push2Talk();
	}
});
document.addEventListener("keyup", function (event){
	if(p2tEnabled && event.code == "Space" && !isTyping && !micMuted) {
		event.stopPropagation();
		micMuted = true;
		push2Talk(true);
	}
});

function showNotice(){
	let noticeWrap = document.createElement("div");
	noticeWrap.className = 'tt-running-notice';
	noticeWrap.innerHTML = `
		<span>Amitians Toolkit is running</span>
		<svg xmlns="http://www.w3.org/2000/svg" style="margin-left: 10px; cursor: pointer;" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
	`;
	noticeWrap.setAttribute('style','z-index: 9999999;display: flex; align-items: center;top: 70px; right: 20px; position: fixed; background: #0058ff; padding: 10px 20px; color: #fff; font-weight: 600;')
	document.body.appendChild(noticeWrap);
	noticeWrap.addEventListener('click', removeNotice);
}

function removeNotice(){
	document.querySelector(".tt-running-notice").remove();
}

function StartInterval(){
	interval = setInterval(function(){
		intervalRunning = true;
		if(!ButtonsAdded){
			if(document.querySelector("#microphone-button")){
				clearInterval(interval);
				addButtons();
				ButtonsAdded = true;
				setTimeout(showNotice, 1000);
			}
		}
	}, 1000);
}

window.onpopstate = history.onpushstate = function(e) {
    if(location.href.includes('/_#/pre-join-calling') || location.href.includes('/_#/calling') && !intervalRunning){
		StartInterval();
		console.log('Interval Started');
	}
	else if(intervalRunning){
		clearInterval(interval);
		intervalRunning = false;
		ButtonsAdded = false;
		p2tEnabled = false;
		console.log('Interval Ended');
	}
}