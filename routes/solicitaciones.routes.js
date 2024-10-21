const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyAdmin,
} = require("../middlewares/auth.middlewares.js");

const Solicitud = require("../models/Solicitud");

//GET- recupera todas las solicitudes para el admin
router.get("/", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await Solicitud.find()
      .populate("vivienda", "name city")
      .populate("user", "username email");
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

//-----------------Solicitudes-------------
//GET- recupera todas las solicitudes de un usuario
router.get("/:userId", verifyToken, async (req, res, next) => {
  try {
    const { userId } = req.params;

    const response = await Solicitud.find({ user: userId }).populate(
      "vivienda",
      "name city"
    );
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});



//POST- añadir una nueva solicitud
router.post("/", verifyToken, async (req, res, next) => {
  try {
    const newSolicitud = await Solicitud.create({
      vivienda: req.body.vivienda,
      user: req.payload._id,
      message: req.body.message,
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

//DELETE- eliminar la solicitud
router.delete(
  "/:solicitudId",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    try {
      await Solicitud.findByIdAndDelete(req.params.solicitudId);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
