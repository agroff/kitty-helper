import BgApi from './BgApi';
import cattributes from './Cattributes';

/**
 * Since most of the important data is loaded asynchronously, I thought it'd be smart to load it all
 * in the beginning, clobber the global namespace with it, then we can just access it immediately when
 * needed. Probably a bad design pattern but it can be fixed later.
 */
class DataLoader{

    constructor(){
        this.api = new BgApi();
        this.data = {};
    }

    _loadSettings(callback){
        var self = this;
        this.api.getSettings(function(settings){
            self.data.settings = settings;
            callback();
        })
    }

    _loadRarity(callback) {
        let self = this;

        this.api.getCattributes(function(rarity) {
            self.data.rarity = rarity;
            callback(rarity);
        });

    }

    _loadEtherium(callback) {
        let self = this;

        this.api.getEthereumPrice(function(data){
            self.data.ethereum = data;
            callback();
        });

    }

    loadEverything(callback){
        let self = this;

        this._loadSettings(function(){

            self._loadRarity(function(){

                self._loadEtherium(function(){
                    callback(self.data);
                });

            });

        })
    }

}

export default DataLoader;