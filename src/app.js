const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3000;

const hbs = require("hbs");
const { error } = require("console");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebare engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath); // we use hbs for partials

// Setup static directory to server
app.use(express.static(publicDir));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Narsimha",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "address is mandatory to get weather!",
        });
    }

    const user_address = req.query.address;
    geocode(user_address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error,
            });
        }
        forecast(latitude, longitude, (error, forecast_data) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            res.send({
                forecast: forecast_data,
                location: location,
                address: user_address,
            });
        });
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        name: "Narsimha",
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide search term",
        });
    }

    console.log(req.query);
    res.send({
        products: [],
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Narsimha",
    });
});

app.use("/help", (req, res) => {
    res.render("404", {
        page: "Searched Help Page",
        title: "404::Help Page Not Found",
        name: "Narsimha",
    });
});

app.use((req, res) => {
    res.render("404", {
        page: "Searched Page",
        title: "404::Page Not Found",
        name: "Narsimha",
    });
});

app.listen(PORT, () => {
    console.log("Server is up on port " + PORT);
});
