import rarityPaneTemplate from "../templates/RarityPaneTemplate";
import kittyFactory from "./KittyFactory";
import utils from '../utils';

class RarityPane {

    /**
     * Fetch kitty data and render pane if we haven't already.
     *
     * @param $card
     * @param kittyId
     * @private
     */
    _ensureRarityPaneExists($card, kittyId) {
        //check if we've already done this
        if($card.hasClass("has-rarity-scale")) {
            return;
        }

        //get the kitty data
        kittyFactory.getKitty(kittyId, function(kitty) {

            //turn the kitty into html
            var rarityPaneHtml = rarityPaneTemplate.getHtml(kitty);

            //add hte rarity pane to kitty card
            $card.append(rarityPaneHtml);

            //set class so we know not to render the pane again
            $card.addClass("has-rarity-scale");
        });
    }

    /**
     * On enter, get the kitty id from the card, render rarity pane
     * @param $card
     */
    onCardEnter($card) {
        //find kitty id
        var kittyId = utils.kittyCardToId($card);

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