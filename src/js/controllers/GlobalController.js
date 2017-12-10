import FiatConverter from '../app/FiatConverter';
import RarityPane from '../app/RarityPane';


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
    }

    _bindKittyCardHover(){
        var self = this;
        /**
         * Global bind for mouse enter kitty card.
         */
        this.$body.on("mouseenter", ".KittyCard", function() {
            var $card = $(this);

            self.rarityPane.onCardEnter($card);
            self.fiatConverter.onEnter($card);
        });

        /**
         * Global bind for mouse leave kitty card.
         */
        this.$body.on("mouseleave", ".KittyCard", function() {
            var $card = $(this);

            self.fiatConverter.onLeave($card);
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
        this._bindKittyCardHover();
        this._bindRarityPaneHover()
    }
}

export default GlobalController;
 
