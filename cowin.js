const axios = require("axios");


const cowinUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict";

const getAvailableCenters = async function (districtId, age, date) {
    console.log(districtId, date);
    
    const response = await axios.get(cowinUrl, {
        headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
        },
        params: {
            district_id: districtId,
            date: date
        }
    });

    const centers = response.data.centers;

    const availableCenters = centers.filter(center => {
        const availableSessions = center.sessions.filter(session => session.available_capacity > 0 && session.min_age_limit < age);
        if (availableSessions.length > 0) {
            return availableSessions;
        }
    });

    return availableCenters;
};

module.exports = getAvailableCenters;