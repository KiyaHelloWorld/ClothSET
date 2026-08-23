const express = require("express");
const router = express.Router();
const clothingController = require("../controllers/clothing");
const { verify, verifyAdmin } = require("../middleware/auth");

//post 
router.post("/", verify, verifyAdmin, clothingController.createClothing);

//get
router.get("/all", verify, verifyAdmin, clothingController.getAllClothing);

router.get("/active", clothingController.getAllActiveClothing);

router.get("/:clothingId", clothingController.getClothing);

router.get("/:clothingId/update", verify, verifyAdmin, clothingController.updateClothing);

//patch
router.patch("/:clothingId/update", verify, verifyAdmin, clothingController.updateClothing);

router.patch("/:clothingId/archive", verify, verifyAdmin, clothingController.archiveClothing);

router.patch("/:clothingId/activate", verify, verifyAdmin, clothingController.activateClothing);

//post
router.post("/search-by-name", clothingController.searchClothingByName);

router.post("/search-by-price", clothingController.searchClothingByPrice)

module.exports = router;