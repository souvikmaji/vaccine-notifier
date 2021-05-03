const serverless = require("serverless-http");
const express = require("express");
const fs = require("fs");
const axios = require('axios');

let districtCodes;

fs.readFile("districtCodes.json", (err, data) => {
    if(err) {
        console.error("error reading district codes json file");
    }
    districtCodes = JSON.parse(data);
});

const app = express();
console.log(districtCodes);

app.get("/codes", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(districtCodes));
    // let districtId = ;
    // let date = "04-05-2021";

	// axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions', params = {
	// 	calendarByDistrict: districtId,
	// 	date: date
	// })

});

module.exports.handler = serverless(app);