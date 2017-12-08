import "../css/popup.css";
import cattributes from "./app/Cattributes";
import $ from "./lib/jquery-3.2.1.min";
import numeral from "numeral";

window.$ = $;

var attrs = cattributes.fetch();
var html = "";

$.each(attrs, function(name,item){
    html += `
<div class="rarity-block">
    <div class="rarity-attribute">
        <span class="rarity-dot ${item.rarity}"></span>
        ${name}
    </div>
    <div class="rarity-attribute-percent">
        ${numeral(item.percent).format('0.0a') }%
    </div>
</div>
`;
});

$("#cattribute-table").html(html);
