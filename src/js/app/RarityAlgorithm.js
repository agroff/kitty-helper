import cattributes from "./Cattributes";

/**
 * uses rarity data to generate a rarity score between 1 and 100
 */
class RarityAlgorithm{


    _getMaxValue(){
        var maxValue = 0,
            cattr = cattributes.fetch();

        $.each(cattr, function(attributeName, attribute){
            var percent = attribute.percent * 1;

            if(percent > maxValue){
                maxValue = percent;
            }
        });

        return maxValue;
    }

    _scaleToHundreds(score, maxScore){
        return (score / maxScore) * 100;
    }

    calculateFromKitty(kitty){
        var self = this,
            kittyAttributes = kitty.rarity.attributes,
            maxValue = this._getMaxValue(),
            attributeCount = -1.5,
            totalScore = 1; //free point

        if(kitty.kitty.is_fancy === true){
            totalScore = 90;

            //literally just making up numbers
            if(kitty.kitty.fancy_type === 'DuCat'){
                totalScore = 81;
            }
        }

        $.each(kittyAttributes, function(attributeName, attribute){
            var score = maxValue - attribute.percent;
            score = self._scaleToHundreds(score, maxValue);

            //super rare traits are weighted more heavily
            if(score > 98){
                score += 15;
            }
            if(score > 80) {
                score += 5;
            }

            //we'll throw out super common attributes as they water down the average
            if(score < 40){
                score -= 15;
            }
            attributeCount++;

            totalScore += score;
            console.log(attributeName + " ("+ attribute.percent+"%) scored: " + score.toFixed(2));
        });

        //poor kitty has no valuable attributes... No redeeming qualities... destined to a life of despair... its prolly cute tho
        if(attributeCount <= 0){
            attributeCount = 1;
        }

        totalScore = totalScore / attributeCount;

        //invent some more numbers
        totalScore = (totalScore - 40) * 1.8;

        totalScore = Math.floor(totalScore);

        if(totalScore < 1){
            totalScore = 1;
        }
        if(totalScore > 99){
            totalScore = 99;
        }

        console.log(kitty.id + ": " + totalScore);
        console.log("------------------");
        return totalScore;
    }
}

let rarityAlgorithm = new RarityAlgorithm();
export default  rarityAlgorithm;