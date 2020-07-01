// 라우팅 설정 로직

const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

// CREATE
router.post("/", ctrl.create);

// READ
router.get("/", ctrl.show);
router.get("/:id", ctrl.index);

// UPDATE
router.put("/:id", ctrl.update);

// DELETE
router.delete("/:id", ctrl.destroy);

module.exports = router;
