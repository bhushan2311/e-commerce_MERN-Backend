const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    quantity: {type:Number, required:true},
    product: {type:mongoose.Schema.Types.ObjectId, ref:'Product', required:true},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}
})

/* In Mongoose, a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents. */
const virtuals = cartSchema.virtual('id');
virtuals.get(function(){
    return this._id;        // return _id as id bcz we are using id in frontend not using _id
})

cartSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function(doc,ret) {delete ret._id}
})
//we want id not _id as we are using id in frontend, in console.log we get id while in database it is still stored _id (which is not a problem as we achieved what we want)

exports.Cart = mongoose.model('Cart',cartSchema)