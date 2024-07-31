const Product = require("../modules/Product");
const Category = require("../modules/Category");
const { verifyToken } = require("../lib/utils");

const axios = require('axios');

let temperature;

const showShop = async (req, res) => {
    try {
        const products = await Product.find();
        const categories = await Category.find();
        
        // weather
        const city = 'tel aviv'
        const url_location = `http://api.openweathermap.org/geo/1.0/direct?appid=${process.env.WEATHER_KEY}`;
        const url_weather = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.WEATHER_KEY}`;
        let full_url = `${url_location}&q=${city}`;
        const api_res = await axios.get(full_url);

        if((api_res.data) && (api_res.data.length > 0)){
            const lon = api_res.data[0].lon;
            const lat = api_res.data[0].lat;
            
            const weather = `${url_weather}&lon=${lon}&lat=${lat}`;

            const weather_res = await axios.get(weather);
            temperature = {temp:weather_res.data.main.temp , icon:weather_res.data.weather[0].icon}
        }
        else
        {
           return res.status(404).send("No results found");
        }
        res.render("index", {user: verifyToken(req.cookies.token), token: req.cookies.token, products, categories:[{}, ...categories], temperatore: temperature});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong. Input should be in English only");
    }
}
const showCart = async (req, res) => {
    res.render("cart", {user: verifyToken(req.cookies.token), token: req.cookies.token,temperatore: temperature});
}
const showMenu = async (req, res) => {
    res.render("showMenu", {user: verifyToken(req.cookies.token), token: req.cookies.token,temperatore: temperature});
};
module.exports = {
    showShop,
    showCart,
    showMenu
};