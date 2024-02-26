const Product = require("../db/models/Product");

/**
 * Creates a new product in MongoDB
 * @param {Object} product - Product object with properties name, price, and quantity
 */
async function createProduct(product) {
	try {
		const response = await product.save();
		return response;
	} catch (error) {
		console.log(error);
		return Error(error);
	}
}

/**
 * Retrieves all products from MongoDB
 * @returns {Array} - Array of product objects
 */
async function getAllProducts() {
	// Your implementation here
	try {
		const products = await Product.find({});
		return products;
	} catch (error) {
		console.log(error);
		return Error(error);
	}
}

/**
 * Updates a product in MongoDB
 * @param {string} productId - ID of the product to update
 * @param {Object} updatedProduct - Updated product object
 */
async function updateProduct(productId, updatedProduct) {
	// Your implementation here
	try {
		const response = await Product.findByIdAndUpdate(productId, updatedProduct);
		return response;
	} catch (error) {
		console.log(error);
		return Error(error);
	}
}

/**
 * Deletes a product from MongoDB
 * @param {string} productId - ID of the product to delete
 */
async function deleteProduct(productId) {
	// Your implementation here
	try {
		const response = await Product.findByIdAndDelete(productId);
		return response;
	} catch (error) {
		console.log(error);
		return Error(error);
	}
}

module.exports = {
	createProduct,
	getAllProducts,
	deleteProduct,
	updateProduct,
};
