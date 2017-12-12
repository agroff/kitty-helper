import etheriumPriceProvider from '../app/EtheriumPriceProvider';
import moment from 'moment';

class EthereumConversionController{

    constructor(){
        this.priceData = etheriumPriceProvider.priceData();
        this.storageKey = 'kh-last-eth-price';
    }

    _bind(){
        var price = this.priceData.price_usd,
            key = this.storageKey,
            $eth = $("#convertEth"),
            $usd = $("#convertUsd");

        $eth.keyup(function() {
            let usd = $eth.val() * price;
            usd = usd.toFixed(2);
            $usd.val(usd);
            localStorage.setItem(key, $eth.val());
        });

        $usd.keyup(function() {
            let eth =parseFloat($usd.val()) / parseFloat(price);
            eth = eth.toFixed(10);
            $eth.val(eth);
            localStorage.setItem(key, eth);
        });
    }

    _updateDom(){
        var change = this.priceData['24hour_change'],
            updated = this.priceData.updated / 1000,
            price = this.priceData.price_usd * 1;

        updated = moment.unix(updated).fromNow();
        price = price.toFixed(2);

        if(change > 0){
            change = '+$'+change.toFixed(2);
        }
        else {
            change = Math.abs(change).toFixed(2);
            change = '-$'+change;
            $(".eth-change").addClass('negative');
        }

        $('.eth-price').html('$' + price);
        $('.eth-updated').html("updated " + updated);
        $('.eth-change').html(change +' 24hr');
    }

    run(){
        let lastPrice = localStorage.getItem(this.storageKey) || 1;

        this._updateDom();
        this._bind();

        $("#convertEth").val(lastPrice);
        $("#convertEth").trigger("keyup");

    }
}

export default EthereumConversionController;