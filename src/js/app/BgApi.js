/**
 * For Chrome extensions, we use the background page as a long running process and persistent data store.
 * Since the message API is losely defined and pretty ugly, we'll use this class as an intermediary to define
 * communication between the background script and the front end scripts.
 */
class BgApi {

    _apiCall(request, callback = function() { }) {
        chrome.runtime.sendMessage(request, function(response) {
            callback(response);
        });
    }

    getKitty(kittyId, callback) {
        var request = {
            method : "getKitty",
            kittyId: kittyId
        };

        this._apiCall(request, callback);
    }

    putKitty(fullKitty) {
        var request = {
            method   : "putKitty",
            fullKitty: fullKitty
        };

        this._apiCall(request);
    }

    getSettings(callback) {
        var request = {
            method: "getSettings",
        };

        this._apiCall(request, callback);
    }

    putSettings(settings) {
        var request = {
            method  : "putSettings",
            settings: settings
        };

        this._apiCall(request);
    }

    getCattributes(callback){
        var request = {
            method: "getCattributes",
        };

        this._apiCall(request, callback);
    }

    getEthereumPrice(callback){
        var request = {
            method: "getEthereumPrice",
        };

        this._apiCall(request, callback);
    }

}

//var bgApi = new BgApi();
export default BgApi;