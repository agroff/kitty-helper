import $ from "../lib/jquery-3.2.1.min";
import numeral from 'numeral';
import etheriumPriceProvider from './EtheriumPriceProvider.js';
import utils from '../utils';



class FiatConverter {

    _extractPrice($textNode){
        var text  = $textNode.text(),
            price = utils.regex.extractFirstMatch(/(\d+(?:\.\d+)?)/, text);

        if(!price) {
            return 0;
        }

        //hacky AF but let's make sure its a number
        return price * 1;
    }

    _addFiatToDom($statusItem){
        var $textNode   = $(" .KittyStatus-note", $statusItem),
            $clonedText = $textNode.clone(),
            cryptoPrice = this._extractPrice($textNode),
            fiatPrice   = this.fiatPrice(cryptoPrice);

        $textNode.addClass("crypto-price");
        $clonedText.addClass("fiat-price");

        $clonedText.text("$" + fiatPrice);

        $textNode.after($clonedText);
    }

    _showFiat($statusItem) {
        $(".crypto-price", $statusItem).hide();
        $(".fiat-price", $statusItem).show();
    }

    _hideFiat($statusItem) {
        $(".fiat-price", $statusItem).hide();
        $(".crypto-price", $statusItem).show();
    }

    fiatPrice(cryptoPrice){
        var ethPrice = etheriumPriceProvider.fetch(),
            fiatPrice = (ethPrice * cryptoPrice);

        fiatPrice = numeral(fiatPrice).format('0.0a');
        if(fiatPrice < 1000) {
            fiatPrice = numeral(fiatPrice).format('0.00a');
        }

        return fiatPrice;
    }

    showFiatPrice($card){
        var $statusItem = $(".KittyStatus .KittyStatus-itemText", $card).first();

        if($statusItem.length === 0) {
            return;
        }

        if(!$card.hasClass("fiat-added")) {
            this._addFiatToDom($statusItem);
            $card.addClass("fiat-added");
        }

        this._showFiat($statusItem);
    }

    onEnter($card){
        this.showFiatPrice($card);
    }

    onLeave($card, settings){
        var $statusItem = $(".KittyStatus .KittyStatus-itemText", $card).first();

        if(settings.convert_prices != 'auto') {
            this._hideFiat($statusItem);
        }
    }
}



export default FiatConverter;