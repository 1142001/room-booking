const pool = require("../config/db");

// CREATE BOOKING (User)
const createBooking = async (req, res) => {
    try {

        console.log("CREATE BOOKING HIT");
        console.log("REQ BODY:", req.body);

        const { user_id, room_id } = req.body;

        const result = await pool.query(
            `INSERT INTO bookings (user_id, room_id, status)
             VALUES ($1, $2, 'pending')
             RETURNING *`,
            [user_id, room_id]
        );

        console.log("INSERT RESULT:", result.rows);

        res.status(201).json({
            success: true,
            message: "Booking created",
            booking: result.rows[0]
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET USER BOOKINGS
const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        const bookings = await pool.query(
            `SELECT b.*, r.title, r.location, r.price 
             FROM bookings b
             JOIN rooms r ON b.room_id = r.id
             WHERE b.user_id = $1`,
            [userId]
        );

        res.json(bookings.rows);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await pool.query(`
            SELECT b.*, u.name, u.email, r.title, r.location, r.price
            FROM bookings b
            JOIN users u ON b.user_id = u.id
            JOIN rooms r ON b.room_id = r.id
            ORDER BY b.id DESC
        `);

        res.json(bookings.rows);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updated = await pool.query(
            `UPDATE bookings
             SET status = $1
             WHERE id = $2
             RETURNING *`,
            [status, id]
        );

        if (updated.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.json({
            success: true,
            message: "Booking status updated",
            booking: updated.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `SELECT 
                b.id,
                b.status,
                b.created_at,
                r.title,
                r.location,
                r.price
             FROM bookings b
             JOIN rooms r ON b.room_id = r.id
             WHERE b.user_id = $1
             ORDER BY b.created_at DESC`,
            [userId]
        );

        res.json({
            success: true,
            count: result.rows.length,
            bookings: result.rows
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const result = await pool.query(
            `UPDATE bookings
             SET status = 'cancelled'
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Booking not found or not allowed"
            });
        }

        res.json({
            success: true,
            message: "Booking cancelled successfully",
            booking: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { createBooking, getUserBookings , getAllBookings, updateBookingStatus, getMyBookings, cancelBooking};