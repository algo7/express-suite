//Route Validation Function
/**
* Takes in the **express()** function
* @param {Object} app - The **express()** function
* @example  //For the option
{ redirectPath: '/PnF' }
*
* @returns {function():void}
*/

const routeCheck = (app, {
    redirectPath = '',
} = {}) => {

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

            if (!redirectPath) {
                return res.sendStatus(404);
            }
            return res.redirect(redirectPath);
        }

        //If all good
        return next();

    };

};

//Route Validation Function
/**
 * @returns {function():void}
 */
const emptyInputCheck = ({
    checkGet = false,
    emptyBodyMsg = 'The request body is empty!',
    emptyFieldMsg = 'Some fields are missing!',
    supressFieldKey = false,
} = {}) => {

    return (req, res, next) => {

        //Solve cors issue || Browser will send an OPTIONS request
        //that expects a HTTP staus code of 200 
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }

        //Wether to check the body of GET requests as well
        if (!checkGet) {
            //Let the get method pass
            if (req.method === 'GET') {
                return next();
            }
        }

        //Deconstruct the request to get the body out
        const { body, } = req;

        //Check if the input is any flase value 
        //(when nothing is pass into the middleware)
        if (!body) {
            res.status(400).json({ msg: 'The middleware requires an input', });
            return;
        }

        // Array for storing non-0 values
        let checkZ = [];
        // Array for storing 0s
        let zArray = [];
        // Array for storing falses
        let fArray = [];
        // Array for storing the keys
        let KeyArray = [];

        //Extract the value from the request body
        for (const key in body) {

            const element = body[key];

            if (element !== 0 && element !== false) {
                checkZ.push(element);
                KeyArray.push(key);
            }

            if (element === false) {
                fArray.push(element);
            }

            if (element === 0) {
                zArray.push(element);
            }
        }

        //Make sure the array is not empty (0 & false count as valid values)
        if (checkZ.length === 0 && zArray.length === 0 && fArray.length === 0) {
            res.status(400).json({ msg: emptyBodyMsg, });
            return;
        }

        //Check for falsy values in the array without 0s and falses
        for (let index = 0; index < checkZ.length; index++) {
            const nonZinput = checkZ[index];
            const nonZinputKey = KeyArray[index];

            //Return false if there is any falsy value
            if (!nonZinput && supressFieldKey === false) {
                res.status(400).json({
                    msg: emptyFieldMsg,
                    field: nonZinputKey,
                });
                return;
            }

            //Supress field key
            if (!nonZinput) {
                res.status(400).json({
                    msg: emptyFieldMsg,
                });
                return;
            }


        }

        return next();

    };
};


module.exports = {
    routeCheck,
    emptyInputCheck,
};