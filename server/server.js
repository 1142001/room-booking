const express= require("express");
const pool=require("./config/db");
const authRoutes=require("./routes/authRoutes");
const roomRoutes=require("./routes/roomRoutes");
const bookingRoutes=require("./routes/bookingRoutes");
const adminRoutes=require("./routes/adminRoutes");


const app= express();
const cors= require("cors");
app.use(cors());
app.use(express.json());
app.get("/",(req,res) =>{
    res.send("Room/PG Booking API is Running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/rooms",roomRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/admin",adminRoutes);

const PORT = process.env.PORT || 5000;

pool.connect()
    .then(() =>{
        console.log("Postgresql Connected Successfullly");
    })
    .catch((err) =>{
        console.log("Database Connection Failed");
        console.log(err.message);
    });


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});