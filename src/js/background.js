import KittyCache from './app/KittyCache';

var kittyCache = new KittyCache();

var messageRouter = function(request, sendResponse){

    //api to get a kitty
    if(request.method == "getKitty") {

        sendResponse(kittyCache.get(request.kittyId));
        return;
    }

    //api to put a kitty
    if(request.method == "putKitty") {
        kittyCache.put(request.fullKitty);
        return;
    }
};

//listen for messages
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        messageRouter(message, sendResponse);
    }
);


