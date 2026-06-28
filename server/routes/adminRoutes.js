const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminCheck = require("../middleware/adminMiddleware");

const {
    getAllUsers,
    getAllRoomsAdmin,
    getAllBookings
} = require("../controllers/adminController");

// Admin only
router.get("/users", protect, adminCheck, getAllUsers);
router.get("/rooms", protect, adminCheck, getAllRoomsAdmin);
router.get("/bookings", protect, adminCheck, getAllBookings);

module.exports = router;