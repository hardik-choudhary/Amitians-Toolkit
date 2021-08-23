console.log("Amitians Toolkit Running...");
function fillForm(data) {
	var i;
	for (i = 1; i <= 25; i++){
	  document.querySelector(`.ace[id="${i}"][value="${data.tt_rating}"]`).click();
	} 
	
	document.querySelector('#rdbQuestion1.ace[value="1"]').click();
	document.querySelector('#rdbQuestion2.ace[value="1"]').click();
	document.querySelector('#rdbQuestion3.ace[value="1"]').click();

	document.querySelector('#FeedbackRating_Comments').value = data.tt_comment;
	
	document.querySelector('#btnSubmit[type="submit"]').click();
	
	console.log('Kam ho gaya!!');
	setTimeout(function(){
		StartInterval();
	}, 1000);
	
};

function start(){
	chrome.storage.local.get(['tt_rating', 'tt_comment'], function(items) {
		if(items.tt_rating && items.tt_comment){
			fillForm(items);
		}
		else{
			fillForm({'tt_rating': '5', 'tt_comment': 'Great'});
		}
	});
}
var interval, intervalRunning = false;
function startInterval(){
	console.log('Interval Started');
	interval = setInterval(function(){
		intervalRunning = true;
		if(document.querySelector('#FeedbackRating_Comments')){
			clearInterval(interval);
			start();
		}
	}, 500);
}

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

var AmizoneHomeUrls = ["http://s.amizone.net/Home", "https://s.amizone.net/Home", "http://s.amizone.net/Home/", "https://s.amizone.net/Home/"];
var AmizoneLoginUrls = ["http://s.amizone.net", "https://s.amizone.net", "http://s.amizone.net/", "https://s.amizone.net/"];
window.addEventListener("load", function(){
	showNotice();
	window.addEventListener("contextmenu", function(e){
		e.stopPropagation();
	}, true);
	if(AmizoneHomeUrls.includes(location.href)){
		document.querySelectorAll(".nav.nav-list a").forEach(function(item){
			item.addEventListener('click', function(event) {
				if(item.getAttribute("href") == "/FacultyFeeback/FacultyFeedback" && intervalRunning == false){
					startInterval();
				}
				else if(intervalRunning){
					console.log('Interval Ended');
					clearInterval(interval);
					intervalRunning = false;
				}
			});
		});
		//document.querySelector('.nav.nav-list [id="27"][href="/FacultyFeeback/FacultyFeedback"]').addEventListener("click", startInterval, {once:true});
	}
	
	function AutoLogin(aUsername, aPassword){
		let loginForm = document.querySelector("#loginform");
		loginForm.querySelector("input.input100[name='_UserName']").value = aUsername;
		loginForm.querySelector("input.input100[name='_Password']").value = aPassword;
		loginForm.querySelector("button.login100-form-btn").click();
	}
	
	if(AmizoneLoginUrls.includes(location.href)){
		chrome.storage.local.get(['tt_username', 'tt_password', 'tt_lastLoginError'], function(items) {
			if(items.tt_username && items.tt_username != null){
				let loginError = document.querySelector('.text-danger');
				let lastAttemptError = ((items.tt_lastLoginError && (Date.now() - items.tt_lastLoginError) < 30000) ? true : false);
				
				if(loginError.innerText.length > 0){
					chrome.storage.local.set({'tt_lastLoginError': Date.now()}, function() {console.log('Error Logged');});
					if(lastAttemptError || loginError.innerText != "UnAuthorize access of page !!"){
						setTimeout(()=>{
							alert("Auto Login Error: "+loginError.innerText+ " ;\nSuggestion: Update your username or password in plugin settings if needed");
						}, 1000)
					}
					else{
						AutoLogin(items.tt_username, items.tt_password);
					}
				}
				else{
					AutoLogin(items.tt_username, items.tt_password);
				}
			}
		});
	}
});