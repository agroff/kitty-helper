import cattributes from "./Cattributes";
import bgApi from "./bgApi";
import rarityAlgorithm from './RarityAlgorithm';

/**
 * Literally a factory that makes kitties. Stop asking questions.
 */
class KittyFactory {

    /**
     * Gets the attributes with the custom rarity data added
     *
     * @param kittyData
     * @returns {{}}
     * @private
     */
    _getAttributes(kittyData) {
        var attributes = {},
            cattr      = cattributes.fetch();

        $.each(kittyData.cattributes, function(i, attribute) {
            var name = attribute.description;

            attributes[name] = cattr[name];
        });

        return attributes;
    }

    /**
     * Convert the raw kitty from the API into a custom data structure with more data
     *
     * @param kittyData
     * @returns {{}}
     * @private
     */
    _populateKitty(kittyData) {
        var kitty = {};

        kitty.fetched = Date.now();
        kitty.id = kittyData.id;
        kitty.kitty = kittyData;

        kitty.rarity = {
            score     : 0,
            attributes: this._getAttributes(kittyData),
        };

        kitty.rarity.score = rarityAlgorithm.calculateFromKitty(kitty);

        return kitty;
    }

    /**
     * Gets kitty from the internet
     *
     * @param kittyId
     * @param callback
     * @private
     */
    _fetchKitty(kittyId, callback) {
        var self = this;

        $.getJSON('https://api.cryptokitties.co/kitties/' + kittyId, function(data) {
            var fullKitty = self._populateKitty(data);

            //save kitty to cache
            bgApi.putKitty(fullKitty);
            callback(fullKitty);
        });
    }

    /**
     * Gets a kitty from cache if it can, otherwise via API
     *
     * @param kittyId
     * @param callback
     */
    getKitty(kittyId, callback) {
        var self = this;

        //try to load kitty from cache
        bgApi.getKitty(kittyId, function(fullKitty) {

            if(fullKitty !== false) {
                callback(fullKitty);
                return;
            }

            //load kitty from API/Web
            self._fetchKitty(kittyId, callback);
        });
    }

}

let kittyFactory = new KittyFactory();
export default  kittyFactory;