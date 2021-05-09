const getAvailableCenters = require("./cowin.js");
const getDate = require("./utils.js");
const mongo = require("./mongoHelpers.js");

// POST '/notify'
module.exports.lambda = async (event) => {
    const body = JSON.parse(event.body);

    for (let i = 0; i < 7; i++) {
        let date = getDate(i);

        const availableCenters = await getAvailableCenters(body.districtId, body.age, date);

        console.log(availableCenters);

        if (availableCenters.length > 0) {
            const response = {
                statusCode: 200,
                body: JSON.stringify(availableCenters),
            };

            return response;
        }
    }

    try {   
        const db = mongo.connect();

        await mongo.addUser(db, body.districtId, body.mobile, body.age);

        mongo.client.close();
       
    } catch(err) {
        const response = {
            statusCode: 500,
        };

        return response;
    }

    const response = {
        statusCode: 201
    };

    return response;
};