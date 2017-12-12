import "../css/cryptokitties.content.css";
import $ from "./lib/jquery-3.2.1.min";
import Router from './router';
import GlobalController from './controllers/GlobalController';
import MarketController from './controllers/MarketController';
import DataLoader from './app/DataLoader';

//TODO, stop wrecking global namespace
window.$ = $;
window.KH = {};

//instantiate data loader
let dataLoader = new DataLoader();

//instantiate all controllers
let globalController = new GlobalController();
let marketController = new MarketController();

//run global controller
globalController.run();

//do routing
let router = new Router();
router.start();

router.register('^/marketplace.*', function() {
    marketController.run();

    return function() {
        marketController.destroy();
    };
});

dataLoader.loadEverything(function(data) {
    window.KH = data;

    console.log(window.KH);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    if(request.message == "remote data loaded") {
        dataLoader.loadEverything(function(data) {
            window.KH = data;
            console.log(data);
        });
    }
});







