const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  cnpj: {
    type: String,
    require: true,
    unique: true,
  },
  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  intern_contact: {
    type: String,
  },
  profession: {
    type: String,
  
  },
  business_segment: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address_street: {
    type: String,
  },
  address_number: {
    type: String,
  },
  district: {
    type: String,
  },
  zip_code: {
    type: String,
  },
  complement: {
    type: String,
  },

  site: {
    type: String,
  },
  planting_culture: {
    type: String,
  },
  cultivations: {
    type: [String],
    require:true,
  },
  whatsapp: { type: String },
  facebook: {
    type: String,
  },
  instagram: { type: String },
  linkedin: { type: String },
  specialties: { type: String },
  contact_type: { type: String },
  degree_relevance: {
    type: Number,
  },
  image_url: {
    type: String,
    default: "NA",
  },
  observation: { type: String },
  situation: { type: String },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
