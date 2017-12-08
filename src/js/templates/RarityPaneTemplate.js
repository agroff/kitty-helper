import utils from '../utils';

class RarityPaneTemplate {

    _getAttribute(name, meta) {
        return `
<div class="rarity-attribute">
    <span class="rarity-dot ${meta.rarity}"></span>
    ${name}
</div>`;

    }

    _getAttributes(kitty) {
        var self          = this,
            i             = 0,
            attributeList = kitty.rarity.attributes,
            sort          = utils.object.sortByNumericProperty,
            attributes    = {
                rare  : '',
                common: ''
            };

        attributeList = sort(attributeList, "percent", 'asc');

        $.each(attributeList, function(name, meta) {
            var attrHtml = self._getAttribute(name, meta);

            if(i <= 2) {
                attributes.rare += attrHtml;
            }
            else {
                attributes.common += attrHtml;
            }
            i++;
        });

        return attributes;
    }

    getHtml(kitty) {
        var score      = kitty.rarity.score,
            attributes = this._getAttributes(kitty);

        return `
<div class="kitty-helper-rarity-scale">

    <div class="rarity-row-one">
        <div class="rarity-score">${score}</div>
        <div class="rarity-attributes">
            ${attributes.rare}
        </div>
    </div>
    
    <div class="rarity-row-two">
        <div class="rarity-attributes">
            ${attributes.common}
        </div>
    </div>
</div>
`;
    }
}

let rarityPane = new RarityPaneTemplate();
export default rarityPane;