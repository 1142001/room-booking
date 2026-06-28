const express = require("express");
const router = express.Router();

const {
    createBooking,
    getUserBookings,
    getAllBookings,
    updateBookingStatus,
    getMyBookings,
    cancelBooking
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");
const adminCheck = require("../middleware/adminMiddleware");

// Create booking
router.post("/add", protect,createBooking);
router.post("/create", protect, createBooking);
router.put("/cancel/:id", protect, cancelBooking);

// Get user bookings
router.get("/my", protect, getUserBookings);
router.get("/all", protect, adminCheck, getAllBookings);
router.put("/status/:id", protect, adminCheck, updateBookingStatus);
router.get("/my",protect, getMyBookings);

module.exports = router;