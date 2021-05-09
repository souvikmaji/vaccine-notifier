const axios = require("axios");
const fs = require("fs");

axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
    .then(response => {
        const statesResponse = response.data;
    
        let codesJson = {};
        let districtResPromises = statesResponse.states.map(state => {
            codesJson[state.state_name] = {};
            codesJson[state.state_name]["id"] = state.state_id;

            return axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+state.state_id).then(response => {
            
                const districtsResponse = response.data;
    
                codesJson[state.state_name]["districts"] = {};
                districtsResponse.districts.forEach(district => {
                    codesJson[state.state_name]["districts"][district.district_name] = district.district_id;
                });
            
                return codesJson;
            });
        });

        Promise.allSettled(districtResPromises)
            .then(() => {
      
                fs.writeFile("districtCodes.json", JSON.stringify(codesJson), (err, data) => {
                    if(err) {
                        console.log("error writing json:", e);
                    }

                    console.log("successfullt wriiten to file");
            
                });
            })
            .catch(e => {
                console.log("error fetching district information", e);
            });
    })
    .catch(e => {
        console.log("error downloading state district codes", e);
    });