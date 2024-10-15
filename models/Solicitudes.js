const { Schema, model } = require("mongoose");

const solicitudesSchema = new Schema( 
    {
        admin: [{ type: Schema.Types.ObjectId, ref: 'User'}],
         sender: [{ type: Schema.Types.ObjectId, ref: 'User'}],
         message: {String, required: [true, 'Message is required.']}
    }
);

module.exports=mongoose.model("Solicitudes", solicitudesSchema);