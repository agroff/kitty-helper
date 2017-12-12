import KittyCache from './app/KittyCache';
import Database from './app/Database';
import DataLoader from './app/DataLoader';
import $ from "./lib/jquery-3.2.1.min";
import cattributes from './app/Cattributes';
import config from './config';
import etheriumPriceProvider from './app/EtheriumPriceProvider';

window.$ = $;

var kittyCache = new KittyCache();
var database = new Database();
var dataLoader = new DataLoader();

var messageRouter = function(request, sendResponse) {

    //console.log("background request", request);

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
    if(request.method == "getSettings") {
        sendResponse(database.getSettings());
        return;
    }

    //api to put settings
    if(request.method == "putSettings") {
        database.putSettings(request.settings);
        return;
    }

    //api to get cattributes
    if(request.method == "getCattributes") {
        sendResponse(database.getRarity());
        return;
    }

    //api to get ethereum
    if(request.method == "getEthereumPrice") {
        sendResponse(database.getEthereum());
        return;
    }
};

//listen for messages
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        messageRouter(message, sendResponse);
    }
);

var initialDataLoaded = false;
var broadcastDataReady = function() {
    if(initialDataLoaded) {
        return;
    }
    chrome.tabs.query({active: true}, function(tabs) {
        tabs.forEach(function(tab) {
            var id      = tab.id,
                request = {
                    message: "remote data loaded"
                };
            chrome.tabs.sendMessage(id, request);
        });

    });
    initialDataLoaded = true;
};

//every minutes we'll call remote update methods which will interact with the database
// and if the data is too old, update it.
var updateData = function() {
    cattributes.update(function() {
        etheriumPriceProvider.update(function(){
            broadcastDataReady();
        });
    });
};

updateData();
setInterval(updateData, config.cron.checkForUpdatesSeconds * 1000);

// dataLoader.loadRemoteData(function(data) {
//     console.log("data loaded");
//     console.log(data);
// });

