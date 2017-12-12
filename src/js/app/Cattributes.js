import Database from './Database';
import utils from '../utils';
import BgApi from './BgApi';
import config from '../config';

class Cattributes {

    constructor() {
        this.api = new BgApi();
        this.db = new Database();
        this.apiUrl = "http://104.236.1.36/kittyexplorer.json";
    }

    _getCattributeTotals() {
        return KH.rarity;
    }

    percentToRarity(percent) {
        if(percent <= 3) {
            return "very-rare"
        }
        if(percent <= 7.5) {
            return "rare"
        }
        if(percent <= 15) {
            return "uncommon"
        }
        return "common";
    }


    update(callback) {
        var self   = this,
            rarity = this.db.getRarity(),
            updateMinutes = config.cron.cattributeUpdateMinutes;

        if(!rarity.updated || utils.olderThan(updateMinutes, rarity.updated)) {

            console.log("Fetching new Cattributes.");

            $.getJSON(this.apiUrl, function(data) {
                var data = data.kittyexplorer;
                self.db.putRarity({
                    updated      : Date.now(),
                    total_kitties: data.total,
                    fancy        : data.fancy_types,
                    attributes   : data.cattributes
                });
                callback();
            })
        }
        else {
            console.log('Cattributes up to date.');
            callback();
        }

    }

    fetchRarity(){
        return this._getCattributeTotals();
    }

    fetch() {
        var self        = this,
            cattributes = this._getCattributeTotals();
        var formattedCattributes = {};

        $.each(cattributes.attributes, function(name, cattribute) {

            formattedCattributes[name] = cattribute;
            formattedCattributes[name].rarity = self.percentToRarity(cattribute.percent);
        });

        return formattedCattributes;
    }
}

let cattributes = new Cattributes();
export default cattributes