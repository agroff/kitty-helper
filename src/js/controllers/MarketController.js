import utils from '../utils';
import config from '../config';
import KittyCard from '../app/KittyCard'
import BgApi from '../app/BgApi';
import FiatConverter from '../app/FiatConverter';

class MarketController {
    constructor() {
        this.monitorIntervalId = 0;
        this.processedClass = 'kh-processed';
        this.dropdownClass = 'kh-speed-dropdown';
        this.dropdownValueKey = 'kh-min-speed';

        this.fiatConverter = new FiatConverter();

        this.api = new BgApi();
        this.settings = {};
    }

    _getSpeedDropdownOptionHtml() {
        return `
        <option value="all">Show All Kitties</option>
        <option value="fast">Only Fast</option>
        <option value="swift">Swift and Better</option>
        <option value="snappy" selected="true">Snappy and Better</option>
        <option value="brisk">Brisk and Better</option>
        <option value="plodding">Plodding and Better</option>
        <option value="slow">Slow and Better</option>
`;
    }

    _renderSpeedDropdown() {
        var self = this;

        if($("." + this.dropdownClass).length > 0) {
            return;
        }

        var $currentDropdown = $(".BrowseDropdown"),
            $newDropdown     = $currentDropdown.clone(),
            $newSelect       = $("select", $newDropdown);

        $newDropdown.addClass(this.dropdownClass);
        $newSelect.html(this._getSpeedDropdownOptionHtml());
        $newSelect.addClass("speed-select");
        $newSelect.change(function(){
            self._hideSlowKitties();
        });

        $currentDropdown.before($newDropdown);

        var selectValue = localStorage.getItem(this.dropdownValueKey) || 'snappy';
        $newSelect.val(selectValue);
    }

    _processKitty($kittyCard) {
        var selectedSpeed = $(".speed-select").val(),
            settings = this.settings;

        this._hideSlowKitty($kittyCard, selectedSpeed);

        if(settings.convert_prices === 'auto'){
            this.fiatConverter.showFiatPrice($kittyCard);
        }

        $kittyCard.addClass(this.processedClass);
        $kittyCard.closest(".KittiesGrid-item").addClass(this.processedClass);
    }

    _hideSlowKitty($kittyCard, selectedSpeed) {
        var speeds       = config.reproductionSpeeds,
            minSpeedRank = 20,
            hideMethod   = this.settings.hide_method,
            kitty        = new KittyCard($kittyCard),
            speed        = kitty.getSpeed(),
            speedRank    = speeds[speed].rank;

        //when "all" is selected we use the default speed rank since that key doesn't exist in speed config.
        if(speeds.hasOwnProperty(selectedSpeed)) {
            minSpeedRank = speeds[selectedSpeed].rank;
        }

        if(minSpeedRank < speedRank) {
            kitty.hide(hideMethod)
        }
        else {
            kitty.show(hideMethod);
        }
    }

    _hideSlowKitties() {
        var self          = this,
            selectedSpeed = $(".speed-select").val();

        //store value for later
        localStorage.setItem(this.dropdownValueKey, selectedSpeed);

        $(".KittyCard").each(function() {
            self._hideSlowKitty($(this), selectedSpeed);
        });
    }

    _monitorDom() {
        var self = this;

        this.monitorIntervalId = setInterval(function() {
            var $newKitties = $(".KittyCard").not("." + self.processedClass);
            console.log("New Kitties: " + $newKitties.length);

            $newKitties.each(function() {
                self._processKitty($(this));
            });
        }, 200);
    };

    run() {
        var self = this;

        this.api.getSettings(function(settings){
            self.settings = settings;

            //make sure DOM is fully updated before trying to modify the marketplace page
            utils.whenSelectorFound('.KittyCard', function() {
                if(settings.hide_method !== 'disabled') {
                    self._renderSpeedDropdown();
                }
                self._monitorDom();
                self._hideSlowKitties();
            });
        });
    }

    destroy() {
        clearInterval(this.monitorIntervalId);
    }
}

export default MarketController;