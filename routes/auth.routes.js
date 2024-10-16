const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const {verifyToken, verifyAdmin} = require("../middlewares/auth.middlewares.js")


//POST- /auth/signup
router.post("/signup", async (req, res, next) => {
  const { email, password, username } = req.body; //FALTA USAR ROLE
  if (!email || !password || !username) {
    res.status(400).json({ message: "Todos los campos sonrequeridos" });
    return;
  }

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/gm;
  if (!regexPassword.test(password)) {
    res.status(400).json({message:"La contraseña debe tener al menos, una mayuscula, una minuscula, un numero y entre 8 y 16 caracteres"});
    return; // esto detiene la funcion. Actuando como clausula de guardia.
  }
  try {
    const foundUser= await User.findOne({email: email})
    if(foundUser){
        res.status(400).json({ message: "Usuario ya registrado con este email" })
        return;
    }
    const salt = await bcrypt.genSalt(12)
    const hashPassword= await bcrypt.hash(password, salt)

    await User.create({
        email,
        password: hashPassword,
        username
    })

    res.sendStatus(201)

  } catch (error) {
    next(error)
  }
});

//POST- /api7auth/login
router.post("/login", async (req, res, nest) => {
    const { email, passord} = req.body
    
    if(!email || !password) {
        res.status(400).json({message: "Todos los campos son requeridos"})
        return 
 }

 try {
    const foundUser = await User.findOne({email: email})

    if (!foundUser) {
        res.status(400).json({message: "Usuario no encontrado con ese email"})
        return 
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)

    if(!isPasswordCorrect) {
        res.status(400).json({message: "Contraseña no es correcta"})
      return 
    }

    const payload = {
        _id: foundUser._id,
        email: foundUser.email,
        role: foundUser.role
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "15d"
    })

    res.status(200).json({ authToken: authToken })

    
 } catch(error) {
    next(error)
 }
})

//GET- /api/auth/verify
router.get("/verify", verifyToken, (req, res)=>{
    res.status(200).json(req.payload)
})



module.exports= router