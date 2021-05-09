const axios = require("axios");
const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;
const mongoUrl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.mrwko.mongodb.net?retryWrites=true&w=majority`;

const cowinUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict";


// POST '/notify'
module.exports.lambda = async (event, context) => {
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
        const client = await MongoClient.connect(mongoUrl);
        const db = client.db("myFirstDatabase");


        await addUser(db, body.districtId, body.mobile, body.age);

        client.close();
       
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

const addUser = function (db, code, mobile, age) {
    const collection = db.collection("notificationList");
    const updateOp = {};
    updateOp[code] =  { mobile: mobile, age: age };
    return collection.updateOne({ "name": "mobiles" }, { "$addToSet": updateOp });
};

const getDate = function (i) {
    var today = new Date();
    today.setDate(today.getDate() + i);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return dd + "-" + mm + "-" + yyyy;
};

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