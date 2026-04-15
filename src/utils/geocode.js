require("dotenv").config();

const request = require("postman-request");
const accessToken = process.env.MAPBOX_TOKEN;

const geocode = (address, callback) => {
    const loc_url =
        "https://api.mapbox.com/search/geocode/v6/forward?q=" +
        encodeURIComponent(address) +
        "&access_token=" +
        accessToken +
        "&limit=1";
    request({ url: loc_url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to GeoCoding service!!", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find Location Coordinates!!"); //undefined is default
        } else {
            const { geometry, properties } = body.features[0];
            // callback(loc_data, undefined);
            callback(undefined, {
                latitude: geometry.coordinates[1],
                longitude: geometry.coordinates[0],
                location: properties.full_address,
            });
        }
    });
};

module.exports = geocode;
