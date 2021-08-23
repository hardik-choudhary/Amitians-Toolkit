window.addEventListener("load", function(){
	chrome.storage.local.get(['tt_rating', 'tt_comment', 'tt_username'], function(items) {
		if(items.tt_rating && items.tt_comment){
			console.log('Settings Onload: ', items.tt_rating, items.tt_comment);
			document.getElementById("tt_rating").value = items.tt_rating;
			document.getElementById("tt_comment").value = items.tt_comment;
		}
		else{			
			document.getElementById("tt_rating").value = '5';
			document.getElementById("tt_comment").value = "Great";
		}
		
		if(items.tt_username && items.tt_username != null){
			document.getElementById("tt_aUsername").value = items.tt_username;
			document.getElementById("tt_aPassword").value = "hidden";
		}
	});
	chrome.storage.local.get(['tt_updateTime'], function(result) {
		if(result.tt_updateTime && (Date.now() - result.tt_updateTime) < 1100){
			let msgElement = document.getElementById("tt_data_saved");
			msgElement.style.display = "block";
			setTimeout(function(){
				msgElement.style.display = "none";
			}, 3000);
		}
	});
});
	
document.getElementById("tt_save").addEventListener("click", function(){
	let rating = document.getElementById("tt_rating").value;
	let comment = document.getElementById("tt_comment").value;
	let tt_username = document.getElementById("tt_aUsername").value;
	let tt_password = document.getElementById("tt_aPassword").value;
	
	console.log('Settings Onsave: ', rating, comment);
	
	if (!['1','2','3','4','5'].includes(rating)) {
		rating = '5';
	}
	if(comment.length < 1){
		comment = "Great";
	}
	if(tt_username.length < 1){
		tt_username = null;
		tt_password = null;
	}
	
	chrome.storage.local.get(['tt_username', 'tt_password'], function(items) {
		if(items.tt_username && items.tt_password){
			if(tt_username == items.tt_username && tt_password == "hidden"){
				tt_password = items.tt_password;
			}
		}
		
		chrome.storage.local.set({'tt_rating': rating, 'tt_comment': comment, 'tt_username': tt_username, 'tt_password': tt_password, 'tt_updateTime': Date.now()}, function() {
			console.log('Settings saved');
		});
	});
});

