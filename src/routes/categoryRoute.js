const router = require("express").Router();
const {
	createCategory,
	getAllCategories,
	updateCategory,
	deleteCategory,
} = require("../controllers/categoryController");
const Category = require("../db/models/Category");

// getAllCategories
router.get("/", async (req, res) => {
	try {
		const categories = await getAllCategories();
		if (categories) {
			return res.json({ categories, count: categories.length });
		}
		return res.status(500).json({ message: "something went wrong..." });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

// createCategory
router.post("/", async (req, res) => {
	try {
		const newCategory = new Category(req.body);
		const response = await createCategory(newCategory);
		if (response) {
			return res.json({ message: "New Category Added" });
		}
		return res.json({ message: "something went wrong..." });
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

// updateCategory
router.put("/:id", async (req, res) => {
	try {
		const updatedCategory = await updateCategory(req.params.id, req.body);
		if (updatedCategory) {
			return res.json({
				updatedCategory: { ...updatedCategory._doc, ...req.body },
			});
		}
		return res.json({ message: "something went wrong..." });
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

// deleteCategory
router.delete("/:id", async (req, res) => {
	try {
		const deletedCategory = await deleteCategory(req.params.id);
		if (deletedCategory) {
			return res.json({ deletedCategory });
		}
		return res.json({ message: "something went wrong..." });
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
