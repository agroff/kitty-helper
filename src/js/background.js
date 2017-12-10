import KittyCache from './app/KittyCache';
import Database from './app/Database';

var kittyCache = new KittyCache();
var database = new Database();

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

    //api to get settings
    if(request.method == "getSettings"){
        sendResponse(database.getSettings());
        return;
    }

    //api to put settings
    if(request.method == "putSettings"){
        database.putSettings(request.settings);
        return;
    }
};

//listen for messages
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        messageRouter(message, sendResponse);
    }
);


