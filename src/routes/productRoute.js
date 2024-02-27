const router = require("express").Router();
const {
	createProduct,
	getAllProducts,
	deleteProduct,
	updateProduct,
	getProductsPopulatedWithCategory,
	createProductNameIndex,
	getProductStatistics,
} = require("../controllers/productController");
const Product = require("../db/models/Product");
const authenticateAndAuthorize = require("../middleware");

// getAllProducts
router.get("/", async (req, res) => {
	try {
		const products = await getAllProducts();
		if (products) {
			return res.json({ products, count: products.length });
		}
		return res.status(500).json({ message: "something went wrong..." });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

// createProduct
router.post("/", async (req, res) => {
	try {
		const response = await createProduct(req.body);
		if (response) {
			return res.json({ message: "New Product Added" });
		}
		return res.json({ message: "something went wrong..." });
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

// updateProduct
router.put("/:id", async (req, res) => {
	try {
		const updatedProduct = await updateProduct(req.params.id, req.body);
		if (updatedProduct) {
			return res.json({
				updatedProduct: { ...updatedProduct._doc, ...req.body },
			});
		}
		return res.json({ message: "something went wrong..." });
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

// deleteProduct
router.delete("/:id", async (req, res) => {
	try {
		const deletedProduct = await deleteProduct(req.params.id);
		if (deletedProduct) {
			return res.json({ deletedProduct });
		}
		return res.json({ message: "something went wrong..." });
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/withCategory", async (req, res) => {
	try {
		const products = await getProductsPopulatedWithCategory();
		if (products) {
			return res.json({ products, count: products.length });
		}
		return res.status(500).json({ message: "something went wrong..." });
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.get(
	"/createIndex",
	authenticateAndAuthorize("admin"),
	async (req, res) => {
		try {
			const response = await createProductNameIndex();
			if (response) {
				return res.json({
					message: 'Index on "name" field created successfully.',
				});
			}
			return res.status(500).json({ message: "something went wrong..." });
		} catch (error) {
			return res.status(500).json({ message: "Internal server error" });
		}
	}
);

router.get(
	"/statistics",
	authenticateAndAuthorize("admin"),
	async (req, res) => {
		try {
			const aggregatedResults = await getProductStatistics();
			if (aggregatedResults) {
				return res.json({
					aggregatedResults,
				});
			}
			return res.status(500).json({ message: "something went wrong..." });
		} catch (error) {
			return res.status(500).json({ message: "Internal server error" });
		}
	}
);

module.exports = router;
