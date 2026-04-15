require("dotenv").config();

const request = require("postman-request");
const accessToken = process.env.WEATHER_API_TOKEN;

const forecast = (lattitude, longitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=" +
        accessToken +
        "&query=" +
        encodeURIComponent(lattitude) +
        "," +
        encodeURIComponent(longitude) +
        "&units=m";
    // console.log(url);

    request({ url, json: true }, (error, { body } = {}) => {
        // log(response);// const data = JSON.parse(response.body);// log(data.current);// log(response.body.current);
        if (error) {
            callback("Unable to connect to weather service!!");
        } else if (body.error) {
            // console.log(body.error);
            callback("Unable to find the location!");
        } else {
            callback(
                undefined,
                body.current.weather_descriptions[0] +
                    ". It is currently " +
                    body.current.temperature +
                    " degress out. It feels like " +
                    body.current.feelslike +
                    " degrees out.",
            );
        }
    });
};
module.exports = forecast;
