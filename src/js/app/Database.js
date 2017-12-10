class Database {

    /**
     * Set up and load the data structure
     */
    constructor() {
        this.data = {};

        this.availableTables = [
            "user",
            "ethereum",
            "settings",
            "rarity",
            "kitties"
        ];

        this._loadDefaults();
        this._loadData();
    }

    /**
     * Provide sensible defaults
     * @private
     */
    _loadDefaults() {
        this.data.user = {
            "address": false
        };

        this.data.ethereum = {
            "price_usd"    : '429.59',
            "price_btc"    : '0.03247032',
            "24hour_change": '-38.03',
            "updated"      : "1512880601074"
        };

        this.data.settings = this._getDefaultSettings();

        this.data.rarity = {
            "total_kitties": 0,
            "attributes"   : {}
        };

        this.data.kitties = [];
    }

    /**
     * Default Settings
     * @returns {{scoring_algorithm: string, display_rarity: string, convert_prices: string, hide_method: string, rarity_thresholds: {legendary: string, epic: string, rare: string, uncommon: string}}}
     * @private
     */
    _getDefaultSettings() {
        return {
            "scoring_algorithm": "main",
            "display_rarity"   : "hover",
            "convert_prices"   : "hover",
            "hide_method"      : "fade",
            "rarity_thresholds": {
                "legendary": "3",
                "epic"     : "7.5",
                "rare"     : "15",
                "uncommon" : "25",
            }
        }
    }

    /**
     * Overwrite default tables if they exist in database
     * @private
     */
    _loadData() {
        var self = this,
            data = localStorage.getItem("kh-db") || '{}';
        data = JSON.parse(data) || {};

        this.availableTables.forEach(function(table) {
            if(data.hasOwnProperty(table)) {
                self.data[table] = data[table];
            }
        });
    }

    /**
     * Saves the data
     * @private
     */
    _persistData() {
        var dataString = JSON.stringify(this.data);
        localStorage.setItem("kh-db", dataString);
    }

    /**
     * Returns current settings
     * @returns {*|{scoring_algorithm: string, display_rarity: string, convert_prices: string, hide_method: string, rarity_thresholds: {legendary: string, epic: string, rare: string, uncommon: string}}}
     */
    getSettings() {
        return this.data.settings;
    }

    /**
     * overwrites current settings
     * @param settings
     */
    putSettings(settings) {
        this.data.settings = settings;
        this._persistData();
    }
}

export default Database;