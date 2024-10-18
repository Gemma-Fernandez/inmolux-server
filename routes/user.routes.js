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

//GET- /api/user/profile
router.get("/profile", verifyToken, async(req, res, next) => {
    
    try{
        const { _id, username, profile_image, email, role, wishlist } = req.payload;
    res.status(200).json({
        message: "Datos de usuario",
        user: { _id, username, profile_image, email, role, wishlist }
    })
}catch(error){
    next(error)
}
})

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

  //new routes 
  router.patch("/profile", verifyToken, async (req, res, next) => {
    try {
  
      
      const { email} = req.body;
  
      
      const updatedUser = await User.findByIdAndUpdate(
        req.payload._id,
        { email},
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.status(200).json({
        message: 'Email actualizado',
        user: updatedUser
      });
    } catch (error) {
      next(error);
    }
  });

  router.patch("/profile", verifyToken, async (req, res, next) => {
    try {
  
      
      const {username} = req.body;
  
      
      const updatedUser = await User.findByIdAndUpdate(
        req.payload._id,
        {username},
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.status(200).json({
        message: 'Email actualizado',
        user: updatedUser
      });
    } catch (error) {
      next(error);
    }
  });



module.exports=router;