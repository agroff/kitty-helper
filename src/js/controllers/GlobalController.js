import FiatConverter from '../app/FiatConverter';
import RarityPane from '../app/RarityPane';
import BgApi from '../app/BgApi';


class GlobalController{

    constructor(fiatConverter=null, rarityPane=null){
        this.$body = $("body");

        if(!fiatConverter){
            fiatConverter = new FiatConverter();
        }
        if(!rarityPane){
            rarityPane = new RarityPane();
        }

        this.fiatConverter = fiatConverter;
        this.rarityPane = rarityPane;

        this.api = new BgApi();
        this.settings = {};
    }

    _bindKittyCardHover(){
        var self = this;
        /**
         * Global bind for mouse enter kitty card.
         */
        this.$body.on("mouseenter", ".KittyCard", function() {
            var $card = $(this);

            if(self.settings.display_rarity !== 'never'){
                self.rarityPane.showRarityPanel($card, self.settings);
            }

            if(self.settings.convert_prices !== 'never') {
                self.fiatConverter.onEnter($card);
            }
        });

        /**
         * Global bind for mouse leave kitty card.
         */
        this.$body.on("mouseleave", ".KittyCard", function() {
            var $card = $(this);

            self.fiatConverter.onLeave($card, self.settings);
        });
    }

    _bindRarityPaneHover(){
        /**
         * Global bind for mouse enter rarity pane.
         */
        this.$body.on("mouseenter", ".kitty-helper-rarity-scale", function() {
            var $card = $(this).closest(".KittyCard");
            $card.addClass("rarity-hovered");
        });

        /**
         * Global bind for mouse leave rarity pane
         */
        this.$body.on("mouseleave", ".kitty-helper-rarity-scale", function() {
            var $card = $(this).closest(".KittyCard");
            $card.removeClass("rarity-hovered");
        });
    }

    run(){
        var self = this;

        this.api.getSettings(function(settings){
            self.settings = settings;
            self._bindKittyCardHover();
            self._bindRarityPaneHover();
        });
    }
}

export default GlobalController;