import utils from './utils';

class Router {

    constructor() {
        this.routes = [];
        this.lastPath = '';
        //this.currentRoutePath = '';
        this.teardown = utils.emptyFunction();
    }

    _pathsMatch(routePath, actualPath){
        var re = new RegExp(routePath);

        console.log(re.test(actualPath), routePath, actualPath);
        return re.test(actualPath);
    }

    _doRouting(oldPath, newPath) {
        var self = this;

        //teardown the old controller
        this.teardown();
        //overwrite with empty function so it doesn't get called twice
        this.teardown = utils.emptyFunction();

        //see if new route is registered
        this.routes.forEach(function(route) {

            if(self._pathsMatch(route.path, newPath)) {

                var teardown = route.callback(oldPath, newPath);
                //if the route returns a teardown function, store it
                if(utils.isFunction(teardown)) {
                    self.teardown = teardown;
                }
            }

        });

        this.lastPath = newPath;
    }

    /**
     * Adds a route. First parameter is a regular expression that matches location.pathname
     *
     * @param pathExpression - a regular expressions representing the path to match
     * @param callback - function to call when path matches
     */
    register(pathExpression, callback) {
        this.routes.push({
            path    : pathExpression,
            callback: callback
        });
    }

    start() {
        var self              = this,
            checkRouteUpdates = function() {
                var currentPath = window.location.pathname;

                if(currentPath !== self.lastPath) {
                    self._doRouting(self.lastPath, currentPath);
                }
            };

        setInterval(checkRouteUpdates, 100);
    }
}

export default Router;