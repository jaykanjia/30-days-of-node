const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	name: { type: String, require: true },
	price: { type: Number, require: true, min: 0 },
	quantity: { type: Number, require: true, min: 0 },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
