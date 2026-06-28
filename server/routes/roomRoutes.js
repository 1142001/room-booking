const express = require("express");
const router = express.Router();

const {
    addRoom,
    getRooms,
    updateRoom,
    deleteRoom
} = require("../controllers/roomController");
const protect = require("../middleware/authMiddleware");
const adminCheck=require("../middleware/adminMiddleware");

// Admin add room
router.post("/add", protect, adminCheck, addRoom);

// User get rooms
router.get("/", getRooms);
router.put("/update/:id", protect, adminCheck, updateRoom);
router.delete("/delete/:id", protect, adminCheck, deleteRoom);

module.exports = router;