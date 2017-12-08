class  KittyCache{
    constructor(){
        this.cacheLimit = 1000;
        //this.cacheLimit = 20;
        this.cache = [];
    }

    get(kittyId){

        kittyId = kittyId.toString();

        for(var i in this.cache){
            var kitty = this.cache[i],
                id = kitty.id.toString();

            //are you my kitty?
            if(id === kittyId){
                console.log("found kitty :)");
                return kitty;
            }
        }

        console.log("didnt found kitty :(");
        return false;
    }

    put(fullKitty){
        while(this.cache.length > this.cacheLimit){

            console.log(
                "bye bye kitty! "
                + this.cache.length
                + " is too many. Dont wanna be old kitty lady"
            );
            this.cache.shift();
        }

        console.log("Yay! New kitty friend! :D :D ");
        this.cache.push(fullKitty);
    }
}

export default KittyCache;