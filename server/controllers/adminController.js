const pool = require("../config/db");

// ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, email, role, created_at
             FROM users
             ORDER BY id DESC`
        );

        res.json({
            success: true,
            users: result.rows
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getAllRoomsAdmin = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM rooms ORDER BY id DESC`
        );

        res.json({
            success: true,
            rooms: result.rows
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getAllBookings = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
                b.id,
                b.status,
                b.created_at,
                u.name AS user_name,
                u.email,
                r.title AS room_title,
                r.location,
                r.price
             FROM bookings b
             JOIN users u ON b.user_id = u.id
             JOIN rooms r ON b.room_id = r.id
             ORDER BY b.id DESC`
        );

        res.json({
            success: true,
            bookings: result.rows
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    getAllUsers,
    getAllRoomsAdmin,
    getAllBookings
};