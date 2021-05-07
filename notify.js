const axios = require("axios");

// POST '/notify'
module.exports.lambda = async (event, context, callback) => {

    const cowinResponse = await axios.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict", {
        params: {
            district_id: event.districtId,
            date: event.date, //"06-05-2021"
        }
    });

    const centers = cowinResponse.data.centers;

    const availableCenters = centers.filter(center => {
        const availableSessions =  center.sessions.filter(session => session.available_capacity > 0);
        if(availableSessions){
            return availableSessions;
        }
    });

    console.log(availableCenters);

    const response = {
        statusCode: 201,
        body: JSON.stringify(availableCenters),
    };

    callback(null, response);
};