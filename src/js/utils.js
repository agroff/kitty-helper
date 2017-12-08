//let utils =

export default {

    kittyCardToId : function($card){
        var $parent = $card.closest(".KittyCard-wrapper"),
            idText = $(".KittyCard-subname", $parent).text(),
            re = /Kitty\s(\d+)/i;

        console.log(idText);

        return this.regex.extractFirstMatch(re, idText)
    },

    regex: {
        /**
         * Accepts a regular rexpression and a string and returns the contents of the first capture group if found.
         * Otherwise, return null;
         * @param regex
         * @param text
         * @returns {*}
         */
        extractFirstMatch: function(regex, text) {
            var matches = text.match(regex);

            if(matches && matches[1]) {
                return matches[1];
            }

            return null;
        }
    },


    object : {

        /**
         * Accepts an object who's values are also object with a numerical property.
         * Supply the name of the numeric property you want to sort by and rejoice in your
         * sorted object.
         *
         * @param obj - An object of objects to sort
         * @param property - The numeric property on the sub object
         * @param direction - `asc` or `desc` sort direction
         * @returns {{}}
         */
        sortByNumericProperty :  function (obj, property, direction = 'asc') {

            var sortable = [],
                newObject = {};

            $.each(obj, function(key, item){
                sortable.push({
                    key : key,
                    item : item
                });
            });

            sortable.sort(function(a, b) {
                if(direction === 'asc'){
                    return a["item"][property] - b["item"][property];
                }
                else {
                    return b["item"][property] - a["item"][property];
                }

            });

            $.each(sortable, function(i, item){
                newObject[item.key] = item.item;
            });


            return newObject; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
        }
    }

};