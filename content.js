// // Listen for messages
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if (request.command == "translate")
//       sendResponse({trans_selection: translate(request.selection)});
//   });


// function translate(selection){
// 	return "translated:" + selection
// }