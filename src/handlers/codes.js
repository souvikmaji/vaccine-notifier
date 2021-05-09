const fs = require("fs");

let districtCodes;

fs.readFile("./src/data/districtCodes.json", (err, data) => {
    if(err) {
        console.error("error reading district codes json file");
    }
    districtCodes = JSON.parse(data);
});

// GET '/codes'
module.exports.lambda = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify(districtCodes)
    };

    callback(null, response);
};