//Route Validation Function
/**
* Takes in the **express()** function
* @param {Object} app - The **express()** function
* @param {Object} [opt] - The options
* @param {String} [opt.path='/x'] - The redirect path
* @example  //For the option
{ path: '/PnF' }
*
* @returns {function():void}
*/

const routeCheck = (app, opt) => {

    //Error checking
    if (!app._router) {
        const err = new TypeError('The input must be the express() function itself');
        throw err;
    }

    //Get the stacks
    const stacks = app._router.stack;

    //Create a new map object 
    const allRoutes = new Map([]);

    //Loop through the stacks
    stacks.forEach(stack => {

        //Get the inner stack
        const innerStack = stack.handle.stack;

        //Exclude all the falsy values
        if (innerStack) {

            //Loop thorugh the inner stack
            innerStack.forEach(routes => {
                const path = routes.route;

                //Exclude all the falsy values
                if (path) {
                    const innerPath = path.path;

                    //Store the results in the map
                    allRoutes.set(innerPath, 'x');
                }

            });
        }

    });


    //The middleware
    return (req, res, next) => {

        //Get the path
        const reqPath = req.url;

        //Macth the rest with the map
        const pathExists = allRoutes.get(reqPath);

        //Redirect to 404 PnF if match failed
        if (!pathExists) {
            return res.redirect(opt.path);
        }

        //If all good
        return next();

    };

};


module.exports = {
    routeCheck,
};