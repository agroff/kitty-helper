class BgApi{

    _apiCall(request, callback=function(){}){
        chrome.runtime.sendMessage(request, function(response) {
            callback(response);
        });
    }

    getKitty(kittyId, callback){
        var request = {
            method : "getKitty",
            kittyId : kittyId
        };

        this._apiCall(request, callback);
    }

    putKitty(fullKitty){
        var request = {
            method : "putKitty",
            fullKitty: fullKitty
        };

        this._apiCall(request);
    }

}

var bgApi = new BgApi();
export default bgApi;