import rarityPaneTemplate from "../templates/RarityPaneTemplate";
import kittyFactory from "./KittyFactory";
import utils from '../utils';

class RarityPane {

    constructor() {
        this.settings = {};
    }

    _loadingKitty($card) {
        var html = `
<div class="kitty-loader">
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
</div>
`;
        $card.append(html);
    }

    _kittyLoaded($card) {
        $(".kitty-loader", $card).remove();
    }

    /**
     * Fetch kitty data and render pane if we haven't already.
     *
     * @param $card
     * @param kittyId
     * @private
     */
    _ensureRarityPaneExists($card, kittyId) {
        var self = this;

        //check if we've already done this
        if($card.hasClass("has-rarity-scale")) {
            return;
        }

        this._loadingKitty($card);
        //get the kitty data
        kittyFactory.getKitty(kittyId, function(kitty) {

            self._kittyLoaded($card);

            //turn the kitty into html
            var rarityPaneHtml = rarityPaneTemplate.getHtml(kitty);

            //add hte rarity pane to kitty card
            $card.append(rarityPaneHtml);

            //set class so we know not to render the pane again
            $card.addClass("has-rarity-scale");

            if(self.settings.scoring_algorithm === 'never') {
                $card.addClass("rarity-hidden");
            }
        });
    }

    /**
     * On enter, get the kitty id from the card, render rarity pane
     * @param $card
     * @param settings
     */
    showRarityPanel($card, settings) {
        //find kitty id
        var kittyId = utils.kittyCardToId($card);

        this.settings = settings;

        this._ensureRarityPaneExists($card, kittyId);
    }

    /**
     * Currently not doing anything on leave for the rarity pane
     * @param $card
     */
    onCardLeave($card) {
    }
}

export default RarityPane;