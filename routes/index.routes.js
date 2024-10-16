const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter= require("./auth.routes.js")
router.use("/auth", authRouter);

/*const userRouter=require("./users.routes")
router.use("/user", userRouter)*/

/*const viviendaRouter= require("./viviendas.routes")
router.use("/vivienda", viviendaRouter);

const solicitudRouter= require("./solicitaciones.routes")
router.use("/solicitud", solicitudRouter)*/


module.exports = router;
