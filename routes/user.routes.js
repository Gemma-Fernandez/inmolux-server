const express= require("express");
const router=express.Router();
const {verifyToken} = require("../middlewares/auth.middlewares.js")

const User= require("../models/User.model");
//GET - All users
router.get("/", verifyToken, async (req, res, next)=>{
    try {
        const response = await User.find()
        res.status(200).json(response);
        
    } catch (error) {
        next(error);
    }
});


//GET- /api/user/:userId
router.get("/:userId", verifyToken, async (req, res, next)=>{
    try {
        const response = await User.findById(req.params.userId)
        res.status(200).json(response);
        
    } catch (error) {
        next(error);
    }
});
//PUT- /api/user/:userId
router.put("/:userId", verifyToken, async(req, res, next)=>{
    try {
        const response= await User.findByIdAndUpdate( req.params.userId, {
            username:req.body.username,
            wishlist: req.body.wishlist,
            profile_picture: req.body.profile_picture
        }, {new: true});
        res.status(202).json(response);
    } catch (error) {
        next(error)
    }
})

//user populate(vivendasId)
router.get('/vivienda/:viviendasId', verifyToken, async (req, res, next) => {
    try {
        const response = await User.find({wishlist: req.params.viviendasId})
        .populate('wishlist')
     res.status(200).json(response)
    }catch(error) {
      next(error)
    }
  })


module.exports=router;