import "../css/popup.css";
import cattributes from "./app/Cattributes";
import $ from "./lib/jquery-3.2.1.min";
import numeral from "numeral";
import SettingsController from './controllers/SettingsController';
import DataLoader from './app/DataLoader';
import EthereumConversionController from './controllers/EthereumConversionController';

window.$ = $;

var cattributeTab = {
    renderTable: function(attributes, rarity) {
        var html = "",
            total = rarity.total_kitties;

        $.each(attributes, function(name, item) {
            html += `
<div class="rarity-block">
    <div class="rarity-attribute">
        <span class="rarity-dot ${item.rarity}"></span>
        ${name}
    </div>
    <div class="rarity-attribute-percent" title="">
        <span class="cattribute-percent">
            ${numeral(item.percent).format('0.00a') }%
        </span>
        <span class="cattribute-count">
            ${item.count} kitties
        </span>
            
    </div>
</div>
`;
        });

        $("#cattribute-table").html(html);
        $("#cattribute-count").html(numeral(total).format('0,0') + ' Kitties');
    }
};

var navigation = {
    openTab : function(tabId){
        var $navLinks = $("nav span"),
            $item = $("#" + tabId + "-nav");

        $navLinks.removeClass('selected');
        $item.addClass("selected");

        $(".tab").hide();
        $("#" + tabId).show();
    },

    initialize:function(){
        var self = this,
            $navLinks = $("nav span"),
            initialTab = localStorage.getItem('kh-tab') || 'cattribute-tab';

        $navLinks.click(function() {
            var idToOpen = $(this).attr("data-opens");
            self.openTab(idToOpen);
            localStorage.setItem('kh-tab', idToOpen);
        });

        this.openTab(initialTab)
    }
};

//make links work
$(document).ready(function() {
    $('body').on('click', 'a', function() {
        chrome.tabs.create({url: $(this).attr('href')});
        return false;
    });
});

var dataLoader = new DataLoader();
dataLoader.loadEverything(function(data) {
    window.KH = data;
    console.log(data);

    var attributes = cattributes.fetch(),
        rarity = cattributes.fetchRarity();
    var settingsController = new SettingsController();
    var ethController = new EthereumConversionController();

    cattributeTab.renderTable(attributes, rarity);
    navigation.initialize();

    settingsController.run();
    ethController.run();
});



