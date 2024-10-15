const { Schema, model } = require("mongoose")

const viviendasSchema = new Schema(
    {
name: {String, required: [true, 'Name required.']},
city: {String, required: [true, 'City required.']},
description: {String, required: [true, 'Name required.']},
property_type: {String, required: [true, 'Property Type required.']},
bathrooms: {String, required: [true, 'Bathrooms required.']},
bedrooms: {String, required: [true, 'Bedroom required.']},
image: {required: [true, 'Image required']},
price: {Number, required: [true, 'Price required']},
admin: [{ type: Schema.Types.ObjectId, ref: 'User'}]
}
)

const Viviendas = model("Viviendas", viviendasSchema);
module.exports = Viviendas;