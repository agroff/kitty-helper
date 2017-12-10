import "../css/popup.css";
import cattributes from "./app/Cattributes";
import $ from "./lib/jquery-3.2.1.min";
import numeral from "numeral";
import SettingsController from './controllers/SettingsController';

window.$ = $;

var cattributeTab = {
    renderTable: function(attributes) {
        var html = "";

        $.each(attributes, function(name, item) {
            html += `
<div class="rarity-block">
    <div class="rarity-attribute">
        <span class="rarity-dot ${item.rarity}"></span>
        ${name}
    </div>
    <div class="rarity-attribute-percent">
        ${numeral(item.percent).format('0.00a') }%
    </div>
</div>
`;
        });

        $("#cattribute-table").html(html);
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

var attributes = cattributes.fetch();
var settingsController = new SettingsController();

cattributeTab.renderTable(attributes);
navigation.initialize();
settingsController.run();


