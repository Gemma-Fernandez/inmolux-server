const express= require("express");
const router=express.Router();
const {verifyToken} = require("../middlewares/auth.middlewares.js")

const User= require("../models/User.model");
const Vivienda = require("../models/Vivienda.js")
const Solicitud= require("../models/Solicitud")

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
      const { viviendasId } = req.params;
        const response = await User.find({wishlist: viviendasId})
        .populate('wishlist')

        if(response.length === 0) {
          return res.status(404).json({message: 'Esta vivienda aún no se ha añadido a ninguna whishlist :( ).'})
        }
     res.status(200).json(response)
    }catch(error) {
      next(error)
    }
  })

  //new routes 
  router.patch("/profile/email", verifyToken, async (req, res, next) => {
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

  router.patch("/profile/username", verifyToken, async (req, res, next) => {
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

  //----------wishList----------

  

  router.post("/profile/wishlist", verifyToken, async (req, res, next) => {
    try {
    
    const {viviendasId} =req.body;
    const userId = req.payload._id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { wishlist: viviendasId } }, 
        { new: true }
      ).populate('wishlist');
  

      res.status(200).json({wishlist: updatedUser.wishlist });
    }catch (error) {
      console.log(error)
    }
  })

  //delete wishlist
  router.delete("/profile/wishlist/:viviendasId", verifyToken, async (req, res, next) => {
    try {
      const { viviendasId } = req.params;
      const userId = req.payload._id;
  
     
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { wishlist: viviendasId } },
        { new: true }
      ).populate('wishlist');
  
      res.status(200).json({ wishlist: updatedUser.wishlist });
    } catch (error) {
      next(error);
    }
  });


  router.get('/wishlist/vivienda', verifyToken, async (req, res, next) => {
    try {
     
      const userId = req.payload._id;
      const user = await User.findById(userId).populate("wishlist")
  
      if (!user) {
        return res.status(400).json({ message: 'User no encontrado.' });
      }
  
      //const wishlistIds = user.wishlist; 
  
      //if (wishlistIds.length === 0) {
      //  return res.status(200).json({ message: 'wishlist vacia!' });
      //}
      //const viviendas = await Vivienda.find({ _id: { $in: wishlistIds } });
  
      res.status(200).json(user.wishlist); 
    } catch (error) {
      next(error);
    }
  });


module.exports=router;