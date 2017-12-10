import "../css/cryptokitties.content.css";
import $ from "./lib/jquery-3.2.1.min";
import Router from './router';
import GlobalController from './controllers/GlobalController';
import MarketController from './controllers/MarketController'

//TODO, stop wrecking global namespace
window.$ = $;

//instantiate all controllers
let globalController = new GlobalController();
let marketController = new MarketController();


//run global controller
globalController.run();

//do routing
let router = new Router();
router.start();

router.register('^/marketplace.*', function(){
    marketController.run();

    return function(){
        marketController.destroy();
    };
});






