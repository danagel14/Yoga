const Product = require("../modules/Product");
const Category = require("../modules/Category");
const { verifyToken } = require("../lib/utils");

const { getWeather } = require("../lib/weather");

let temperature;

const showShop = async (req, res) => {
    try {
        const products = await Product.find();
        const categories = await Category.find();
        
        temperature = await getWeather();

        if(!temperature) return res.status(404).send("No results found");

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