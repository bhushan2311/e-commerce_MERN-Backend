const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
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

exports.Categories = mongoose.model("Category", categoriesSchema);
