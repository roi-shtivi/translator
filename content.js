// Listen for messages
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.command == "translate"){
    	var trans = makeCall(request.selection);
    	sendResponse({trans_selection: trans});
    }
  });

function makeCall(word) {
	var xhr = new XMLHttpRequest();
	var lang = "he";
	var english = /^[A-Za-z0-9]*$/;
	if (english.test(word)){
		lang = "en";
	}
	xhr.onreadystatechange = processResponse(xhr, lang);
	xhr.open("GET", 'http://www.morfix.co.il/' + word, true);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=ISO-8859-1");
	xhr.send(null);
}
function processResponse(xhr, lang) {
	return function(){
		if (xhr.readyState == XMLHttpRequest.DONE) {
		    var htmlObject = document.createElement('div');
		    htmlObject.innerHTML = xhr.responseText;
		    if (lang == "he"){
		    	var translations = htmlObject.getElementsByClassName("default_trans");
			}
			if (lang == "en"){
				var translations = htmlObject.getElementsByClassName("translation translation_he heTrans");
			}
		    for (var i=0; i< translations.length; i++){
		    	console.log(translations[i].innerHTML);
		    }
		}
	}
}