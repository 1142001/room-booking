const express = require("express");
const router = express .Router();
const{registerUser, loginUser} = require("../controllers/authController");
const protect=require("../middleware/authMiddleware");


router.post("/register",registerUser);
router.get("/test",(req, res) =>{
    res.json({message:"Auth route working"});
});
router.post("/login",loginUser);
router.get("/profile",protect,(req,res) =>{
    res.json({
        message:"Protected route working",
        user:req.user
    });
}); 

module.exports = router;