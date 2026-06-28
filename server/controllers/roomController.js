const pool = require("../config/db");

// ADD ROOM (Admin)
const addRoom = async (req, res) => {
    try {
        const { title, location, price, description, image } = req.body;

        const newRoom = await pool.query(
            "INSERT INTO rooms (title, location, price, description, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, location, price, description, image]
        );

        res.status(201).json({
            message: "Room added successfully",
            room: newRoom.rows[0]
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL ROOMS (User)
const getRooms = async (req, res) => {
    try {
        const rooms = await pool.query("SELECT * FROM rooms WHERE is_available=TRUE");

        res.json(rooms.rows);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, location, price, description, image } = req.body;

        const updatedRoom = await pool.query(
            `UPDATE rooms
             SET title = $1,
                 location = $2,
                 price = $3,
                 description = $4,
                 image = $5
             WHERE id = $6
             RETURNING *`,
            [title, location, price, description, image, id]
        );

        if (updatedRoom.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.json({
            success: true,
            message: "Room updated successfully",
            room: updatedRoom.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;

        // 👇 DEBUG 1
        console.log("Room ID:", id);

        const result = await pool.query(
            `UPDATE rooms
             SET is_available = FALSE
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        // 👇 DEBUG 2
        console.log("Result:", result.rows);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Room removed successfully",
            room: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = { addRoom, getRooms, updateRoom, deleteRoom};