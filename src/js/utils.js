export default {

    /**
     * finds the ID inside a kitty card
     *
     * @param $card jQuery object of a KittyCard
     * @returns string - cardId
     */
    kittyCardToId: function($card) {
        var $parent = $card.closest(".KittyCard-wrapper"),
            idText  = $(".KittyCard-subname", $parent).text(),
            re      = /Kitty\s(\d+)/i;

        return this.regex.extractFirstMatch(re, idText)
    },

    /**
     * Since we often can't be directly notified of events like DOM updates we occasionally need to query for them.
     * This utility function handles all the complexity of that while making sure we don't query forever.
     *
     * @param selector - jQuery selector to query DOM for
     * @param callback - function to run when selector has results
     * @param intervalSpeed - how often to check in miliseconds
     * @param giveUpAfter - max time to try in seconds (prevents running forever)
     */
    whenSelectorFound: function(selector, callback,  intervalSpeed = 50, giveUpAfter = 10, negateSelectorCondition = false,) {
        var startTime    = Date.now(),
            maxMsElapsed = giveUpAfter * 1000,
            interval, checkForSelector;

        checkForSelector = function() {
            var elapsed = Date.now() - startTime;

            if(elapsed > maxMsElapsed) {
                clearInterval(interval);
            }

            var conditionMet = $(selector).length > 0;
            if(negateSelectorCondition){
                conditionMet = !conditionMet;
            }

            if(conditionMet) {
                clearInterval(interval);
                callback();
            }
        };

        interval = setInterval(checkForSelector, intervalSpeed);
    },

    whenSelectorNotFound:function(selector, callback, intervalSpeed = 50, giveUpAfter = 10){
        this.whenSelectorFound(selector, callback, intervalSpeed, giveUpAfter, true);
    },

    /**
     * Self explanatory - supposedly this is the best way in chrome.
     * @param variableToTest
     * @returns {boolean}
     */
    isFunction: function(variableToTest) {
        return typeof(variableToTest) == 'function';
    },

    /**
     * Just returns an empty function.
     * Mostly just use this since I dont like how my IDE formats empty functions into two lines
     * @returns {Function}
     */
    emptyFunction: function() {
        return function() {
        };
    },

    /**
     * Regex helpers
     */
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
        },

        /**
         * escapes a string so it's safe to use in a regex. Stolen from:
         * https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
         *
         * @param string
         * @returns {void|*|XML}
         */
        escape : function(string) {
            return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }
    },

    /**
     * Object Helpers
     */
    object: {

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
        sortByNumericProperty: function(obj, property, direction = 'asc') {

            var sortable  = [],
                newObject = {};

            $.each(obj, function(key, item) {
                sortable.push({
                    key : key,
                    item: item
                });
            });

            sortable.sort(function(a, b) {
                if(direction === 'asc') {
                    return a["item"][property] - b["item"][property];
                }
                else {
                    return b["item"][property] - a["item"][property];
                }

            });

            $.each(sortable, function(i, item) {
                newObject[item.key] = item.item;
            });

            return newObject; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
        }
    }

};