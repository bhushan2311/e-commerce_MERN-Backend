const mongoose = require("mongoose");

const brandsSchema = new mongoose.Schema({
  value: {
    type:String,
    required:true
},
  label: {
    type:String,
    required:true
},
  checked: {
    type:Boolean,
    required:true
},
});

exports.Brands = mongoose.model("Brand", brandsSchema);
