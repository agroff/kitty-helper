import "../css/cryptokitties.content.css";
import $ from "./lib/jquery-3.2.1.min";
import fiatConverter from './app/FiatConverter';
import rarityPane from './app/RarityPane';

//TODO, stop wrecking global namespace
window.$ = $;
window.chrome = chrome;

var $body = $("body");

/**
 * Global bind for mouse enter kitty card.
 */
$body.on("mouseenter", ".KittyCard", function() {
    var $card = $(this);

    rarityPane.onCardEnter($card);
    fiatConverter.onEnter($card);
});

/**
 * Global bind for mouse leave kitty card.
 */
$body.on("mouseleave", ".KittyCard", function() {
    var $card = $(this);

    fiatConverter.onLeave($card);
});

/**
 * Global bind for mouse enter rarity pane.
 */
$body.on("mouseenter", ".kitty-helper-rarity-scale", function() {
    var $card = $(this).closest(".KittyCard");
    $card.addClass("rarity-hovered");
});

/**
 * Global bind for mouse leave rarity pane
 */
$body.on("mouseleave", ".kitty-helper-rarity-scale", function() {
    var $card = $(this).closest(".KittyCard");
    $card.removeClass("rarity-hovered");
});

