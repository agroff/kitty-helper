import BgApi from '../app/BgApi';

class SettingsController{
    constructor(){
        this.api = new BgApi();
        this.settings = {};

        this.selectFields = [
            "scoring_algorithm",
            "display_rarity",
            "convert_prices",
            "hide_method",
            "display_cattributes"
        ];
    }

    _saveSettings(){
        var self = this;

        this.selectFields.forEach(function(fieldId) {
            self.settings[fieldId] = $("#" + fieldId).val();
        });

        this.api.putSettings(this.settings);
    }

    _renderSettings(){
        var self = this;

        this.selectFields.forEach(function(fieldId){
            var value = self.settings[fieldId];
            $("#"+fieldId).val(value);
            console.log(fieldId, value)
        });
    }

    run(){
        var self = this;

        this.api.getSettings(function(settings) {
            console.log(settings);
            self.settings = settings;
            self._renderSettings();
        });

        $(".setting-select").change(function(){
            self._saveSettings();
        });
    }
}

export default SettingsController;