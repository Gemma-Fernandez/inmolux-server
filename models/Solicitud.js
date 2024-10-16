const { Schema, model } = require("mongoose");

const solicitudSchema = new Schema( 
    {
        vivienda: [{ type: Schema.Types.ObjectId, ref: 'Vivienda'}],
         sender: [{ type: Schema.Types.ObjectId, ref: 'User'}],
         message: {type: String, required: [true, 'Message is required.']}
    }
);

module.exports=mongoose.model("Solicitud", solicitudSchema);