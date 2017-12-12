import config from '../config';
import utils from '../utils';
import Database from './Database';
import BgApi from './BgApi';

class EtheriumPriceProvider {

    constructor(){
        this.apiUrl = 'https://api.coinmarketcap.com/v1/ticker/ethereum/';
        //this.api = new BgApi();
        this.db = new Database();
    }

    update(callback) {
        var self          = this,
            ethereum      = this.db.getEthereum(),
            updateMinutes = config.cron.ethUpdateMinutes;

        if(!ethereum.updated || utils.olderThan(updateMinutes, ethereum.updated)) {

            console.log("Fetching new Ethereum price.");

            $.getJSON(this.apiUrl, function(data) {
                data = data[0];
                console.log(data);
                self.db.putEthereum({
                    "price_usd"    : data.price_usd,
                    "price_btc"    : data.price_btc,
                    "24hour_change": (data.percent_change_24h / 100) * data.price_usd,
                    "updated"      : Date.now()
                });
                callback();
            })
        }
        else {
            console.log('Ethereum price up to date.');
        }

    }

    priceData(){
        return KH.ethereum;
    }

    fetch(){
        return KH.ethereum.price_usd;
        //return 477.75;
    }
}

var etheriumPriceProvider = new EtheriumPriceProvider();
export default etheriumPriceProvider;