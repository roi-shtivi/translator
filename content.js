//Listen for messages
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.command == "translate"){
            var trans = makeCall(request.selection);
            sendResponse({trans_selection: trans});
        }
    });

function makeCall(word) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = processResponse(xhr);
    xhr.open("GET", 'https://school.morfix.co.il/' + word, true);
    xhr.send(null);
}
function processResponse(xhr) {
    return function(){
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var htmlObject = document.createElement('div');
            htmlObject.innerHTML = xhr.responseText;
            var translations = htmlObject.getElementsByClassName("normal_translation_div");
            var res = [];
            for (var i=0; i< translations.length; i++){
                var trans = translations[i].innerHTML;
                res[i] = (trans.replace(/<span class=\"clearOutputLanguageMeaningsString\">; <\/span>/g, ";"));
            }
            alert(res);
        }
    }
}
