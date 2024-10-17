const router = require("express").Router();


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter= require("./auth.routes.js")
router.use("/auth", authRouter);

const userRouter=require("./user.routes.js")
router.use("/user", userRouter)

const viviendaRouter= require("./vivienda.routes")
router.use("/vivienda", viviendaRouter);

const solicitudRouter= require("./solicitaciones.routes")
router.use("/solicitud", solicitudRouter)

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);


module.exports = router;
