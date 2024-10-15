const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

/*const authRouter= require("./auth.routes.js")
router.use("/auth", authRouter);

const userRouter=require("./user.routes")
router.use("/users", userRouter)

const viviendasRouter= require("./viviendas.routes")
router.use("/viviendas", viviendasRouter);

const solicitudRouter= require("./solicitaciones.routes")
router.use("/solicitudes", solicitudRouter)*/


module.exports = router;
