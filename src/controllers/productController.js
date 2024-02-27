const { Category } = require("../db/models");
const Product = require("../db/models/Product");
const { createCategory } = require("./categoryController");

/**
 * Creates a new product in MongoDB
 * @param {Object} product - Product object with properties name, price, and quantity
 */
async function createProduct(product) {
	const { category, ...rest } = product;
	let categoryId = null;
	if (category) {
		const isCategory = await Category.find({ name: category });
		if (isCategory) {
			console.log({ isCategory });
			categoryId = isCategory[0]._id;
		} else {
			const response = await createCategory();
			categoryId = response._id;
			console.log({ response: response._id });
		}
	}
	console.log({ categoryId });
	try {
		const newProduct = new Product({ ...rest, category: categoryId });
		console.log(newProduct);
		const response = await newProduct.save();
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

/**
 * Retrieves all products with populated category details from MongoDB
 * @returns {Array} - Array of product objects with populated category details
 */
async function getProductsPopulatedWithCategory() {
	// Your implementation here
	try {
		const products = await Product.find({}).populate("category");
		console.log(products);
		return products;
	} catch (error) {
		console.log(error);
		return Error(error);
	}
}

/**
 * Creates an index on the "name" field of the "Product" collection in MongoDB
 */
async function createProductNameIndex() {
	// Your implementation here
	try {
		await Product.createIndexes({ name: 1 }); // Creating index on the "name" field in ascending order
		return true;
	} catch (error) {
		console.log('Error creating index on "name" field:', error);
		return Error(error);
	}
}

/**
 * Executes an aggregation pipeline to calculate product statistics
 * @returns {Object} - Aggregated product statistics
 */
async function getProductStatistics() {
	// Your implementation here
	try {
		const pipeline = [
			{
				$group: {
					_id: null, // Grouping all documents together
					totalProducts: { $sum: 1 }, // Counting total number of products
					averagePrice: { $avg: "$price" }, // Calculating average price
					highestQuantity: { $max: "$quantity" }, // Finding highest quantity
				},
			},
		];

		const results = await Product.aggregate(pipeline);

		if (results.length > 0) {
			return results[0]; // Returning the first (and only) result object
		} else {
			return null; // Returning null if no results found
		}
	} catch (error) {
		console.error("Error calculating product statistics:", error);
		throw error; // Rethrow the error for handling in the calling function
	}
}

module.exports = {
	createProduct,
	getAllProducts,
	deleteProduct,
	updateProduct,
	getProductsPopulatedWithCategory,
	createProductNameIndex,
	getProductStatistics,
};
