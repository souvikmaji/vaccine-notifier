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

app.get("/", function (req, res) {
    let districtId = req.params[""];
    let date = "04-05-2021";


});

module.exports.handler = serverless(app);