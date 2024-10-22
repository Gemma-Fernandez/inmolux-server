const { Schema, model } = require("mongoose");

const viviendaSchema = new Schema({
  name: { type: String, required: [true, "Name required."] },
  city: { type: String, required: [true, "City required."] },
  description: { type: String, required: [true, "Name required."] },
  property_type: { type: String, required: [true, "Property Type required."] },
  bathrooms: { type: String, required: [true, "Bathrooms required."] },
  bedrooms: { type: String, required: [true, "Bedroom required."] },
  image1: { type: String, required: [true, "Image required"] },
  image2: { type: String },
  image3: { type: String },
  price: { type: Number, required: [true, "Price required"] },
  coordinates: [Number]
});

const Vivienda = model("Vivienda", viviendaSchema);
module.exports = Vivienda;
