const { Schema, model } = require("mongoose");

const viviendaSchema = new Schema({
  name: { type: String, required: [true, "Name required."] },
  city: { type: String, required: [true, "City required."] },
  description: { type: String, required: [true, "Name required."] },
  property_type: { type: String, required: [true, "Property Type required."] },
  bathrooms: { type: String, required: [true, "Bathrooms required."] },
  bedrooms: { type: String, required: [true, "Bedroom required."] },
  image: { type: String, required: [true, "Image required"] },
  price: { type: Number, required: [true, "Price required"] },
});

const Vivienda = model("Vivienda", viviendaSchema);
module.exports = Vivienda;
