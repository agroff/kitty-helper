class Cattributes {

    _getCattributeTotals() {
        return {
            "oldlace"     : "5",
            "wolfgrey"    : "22",
            "gerbil"      : "42",
            "cottoncandy" : "68",
            "violet"      : "175",
            "wingtips"    : "372",
            "mainecoon"   : "599",
            "jaguar"      : "952",
            "googly"      : "1275",
            "cerulian"    : "1321",
            "whixtensions": "1648",
            "chartreux"   : "1749",
            "fabulous"    : "2107",
            "peach"       : "3973",
            "bubblegum"   : "4865",
            "dali"        : "5095",
            "otaku"       : "5677",
            "gold"        : "5764",
            "skyblue"     : "6855",
            "bloodred"    : "6984",
            "scarlet"     : "7002",
            "tigerpunk"   : "7979",
            "limegreen"   : "8217",
            "beard"       : "9454",
            "emeraldgreen": "9560",
            "cloudwhite"  : "9854",
            "spock"       : "9990",
            "laperm"      : "10724",
            "calicool"    : "10784",
            "barkbrown"   : "10963",
            "chestnut"    : "12249",
            "mauveover"   : "12812",
            "tongue"      : "13411",
            "cymric"      : "15255",
            "shadowgrey"  : "19009",
            "coffee"      : "19119",
            "saycheese"   : "19383",
            "salmon"      : "20454",
            "royalpurple" : "20952",
            "mintgreen"   : "22364",
            "chocolate"   : "22719",
            "swampgreen"  : "22879",
            "lemonade"    : "23296",
            "topaz"       : "23502",
            "sphynx"      : "23589",
            "simple"      : "23788",
            "orangesoda"  : "23990",
            "aquamarine"  : "24388",
            "munchkin"    : "24664",
            "greymatter"  : "24738",
            "raisedbrow"  : "26047",
            "happygokitty": "27572",
            "soserious"   : "27962",
            "strawberry"  : "28517",
            "ragamuffin"  : "28868",
            "sizzurp"     : "29794",
            "himalayan"   : "29888",
            "pouty"       : "30679",
            "crazy"       : "37660",
            "thicccbrowz" : "38331",
            "luckystripe" : "41241",
            "kittencream" : "56887",
            "granitegrey" : "57862",
            "totesbasic"  : "64308",
        };
    }

    percentToRarity(percent) {
        if(percent <= 3){
            return "very-rare"
        }
        if(percent <= 7.5){
            return "rare"
        }
        if(percent <= 15){
            return "uncommon"
        }
        return "common";
    }

    fetch() {
        var self = this,
            cattributes = this._getCattributeTotals();
        var totalKitties = 139589;
        var formattedCattributes = {};

        $.each(cattributes, function(name, count) {
            var percent = (count / totalKitties) * 100;

            percent = percent.toFixed(2);

            formattedCattributes[name] = {
                "percent": percent,
                "rarity" : self.percentToRarity(percent)
            }
        });

        return formattedCattributes;
    }
}

let cattributes = new Cattributes();
export default cattributes