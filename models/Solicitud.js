const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const solicitudSchema = new Schema( 
    {
        vivienda: { type: Schema.Types.ObjectId, ref: 'Vivienda'},
         user: { type: Schema.Types.ObjectId, ref: 'User'},
         message: {type: String, required: [true, 'Message is required.']}
    }
);

module.exports=mongoose.model("Solicitud", solicitudSchema);