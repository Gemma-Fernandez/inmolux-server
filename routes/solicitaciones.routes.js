const express= require("express");
const router=express.Router();
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares.js");


const Solicitud= require("../models/Solicitud");

//GET- recupera todas las solicitudes
router.get("/", verifyToken, verifyAdmin, async (req, res, next)=>{
    try {
        const response= await Solicitud.find()
        res.status(202).json(response);
    } catch (error) {
        next(error)
    }
})

//POST- añadir una nueva solicitud
router.post("/", verifyToken, verifyAdmin, async (req, res, next)=>{
    try {
        const response= await Solicitud.create({
            vivienda: req.body.vivienda,
            user: req.body.user,
            message: req.body.message
        });
        res.status(201).json(response);
    } catch (error) {
        next(error)
    }
})

//DELETE- eliminar la solicitud
router.delete("/:solicitudId", verifyToken, verifyAdmin, async (req, res, next)=>{
    try {
        await Solicitud.findByIdAndDelete(req.params.solicitudId)
        res.status(200).send()
    } catch (error) {
        next(error)
    }
})

module.exports=router;


