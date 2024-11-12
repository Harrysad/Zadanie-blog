const express = require('express');
const router = express.Router();

const postApiController = require('../api/postApiController');

router.get("/", postApiController.index);
router.get("/:id", postApiController.post);
router.post("/", postApiController.create);
router.put("/:id", postApiController.update);
router.delete("/:id", postApiController.delete);

module.exports = router;