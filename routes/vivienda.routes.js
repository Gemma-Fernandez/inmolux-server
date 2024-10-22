const express = require("express");
const router = express.Router();
const Vivienda = require("../models/Vivienda");
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares.js");



//mostrar viviendas
router.get("/", async (req, res, next) => {
  try {
    const response = await Vivienda.find();
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

//mostrar details viviendas
router.get("/:viviendasId", async (req, res, next) => {
  try {
    const response = await Vivienda.findById(req.params.viviendasId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//post add nueva vivienda
router.post("/addVivienda", verifyToken, verifyAdmin, async (req, res, next) => {

  try {

    

    const response = await Vivienda.create({
      name: req.body.name,
      city: req.body.city,
      description: req.body.description,
      property_type: req.body.property_type,
      bathrooms: req.body.bathrooms,
      bedrooms: req.body.bedrooms,
      image1: req.body.image1, 
      image2: req.body.image2,
      image3: req.body.image3,
      price: req.body.price
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// borrar vivienda especifica
router.delete(
  "/:viviendasId",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    try {
      await Vivienda.findByIdAndDelete(req.params.viviendasId);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

//PUT- actualizar una vivienda especifica
router.put("/:viviendasId/edit", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await Vivienda.findByIdAndUpdate(
      req.params.viviendasId,
      {
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        property_type: req.body.property_type,
        bathrooms: req.body.bathrooms,
        bedrooms: req.body.bedrooms,
        images: req.body.images,    
        price: req.body.price,
      },
      { new: true }
    );
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports=router;