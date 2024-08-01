const router = require("express").Router();

const {
    searchProduct,
    filterForProduct
} = require("../controllers/product");


router.post("/search-product", searchProduct);
router.post("/filter-product", filterForProduct);

module.exports = router;