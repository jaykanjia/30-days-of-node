const { Category } = require("../db/models");

/**
 * Creates a new Category in MongoDB
 * @param {Object} category - Category object with properties name, price, and quantity
 */
async function createCategory(category) {
	try {
		const response = await category.save();
		return response;
	} catch (error) {
		console.log(error);
		return Error(error);
	}
}

/**
 * Retrieves all categories from MongoDB
 * @returns {Array} - Array of Category objects
 */
async function getAllCategories() {
	// Your implementation here
	try {
		const categories = await Category.find({});
		return categories;
	} catch (error) {
		console.log(error);
		return Error(error);
	}
}

/**
 * Updates a Category in MongoDB
 * @param {string} CategoryId - ID of the Category to update
 * @param {Object} updatedCategory - Updated Category object
 */
async function updateCategory(categoryId, updatedCategory) {
	// Your implementation here
	try {
		const response = await Category.findByIdAndUpdate(
			categoryId,
			updatedCategory
		);
		return response;
	} catch (error) {
		console.log(error);
		return Error(error);
	}
}

/**
 * Deletes a Category from MongoDB
 * @param {string} categoryId - ID of the Category to delete
 */
async function deleteCategory(categoryId) {
	// Your implementation here
	try {
		const response = await Category.findByIdAndDelete(categoryId);
		return response;
	} catch (error) {
		console.log(error);
		return Error(error);
	}
}

module.exports = {
	createCategory,
	getAllCategories,
	deleteCategory,
	updateCategory,
};
