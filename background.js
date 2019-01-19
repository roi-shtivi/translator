'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "title": "Translate", 
    "contexts":["selection"],
    "id": "contextSelection"});

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlContains: '<all_url>'},
      })
      ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// // ContextMenu on click listener
// chrome.contextMenus.onClicked.addListener(function(info) {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {command: "translate", selection: info.selectionText}, function(response) {
//       console.log(response.trans_selection);
//     });
//   });
// });

function makeCall() {   
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = processResponse(xhr);
	xhr.open("GET", 'http://www.morfix.co.il/wow', true);
	xhr.send(null);
}
function processResponse(xhr) {
	return function(){
		if (xhr.readyState == XMLHttpRequest.DONE) {
		    var htmlObject = document.createElement('div');
		    htmlObject.innerHTML = xhr.responseText;
		    var translations = htmlObject.getElementsByClassName("translation translation_he heTrans");
		    for (var i=0; i< translations.length; i++){
		    	console.log(translations[i].innerHTML);
		    }
		}
	}
}
makeCall();
