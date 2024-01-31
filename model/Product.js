const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        min:[1,'wrong minimum price'],
        max:[10000,'wrong maximum price'],
        required:true,
    },
    discountPercentage:{
        type:Number,
        min:[0,'wrong minimum discount'],
        max:[99,'wrong maximum discount'],
    },
    rating:{
        type:Number,
        min:[0,'wrong minimum rating'],
        max:[5,'wrong maximum rating'],
        default:1,
    },
    stock:{
        type:Number,
        min:[0,'wrong minimum stock'],
        default:1,
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
})

/* In Mongoose, a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents. */
const virtuals = productSchema.virtual('id');
virtuals.get(function(){
    return this._id;        // return _id as id bcz we are using id in frontend not using _id
})

productSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function(doc,ret) {delete ret._id}
})
//we want id not _id as we are using id in frontend, in console.log we get id while in database it is still stored _id (which is not a problem as we achieved what we want)

exports.Product = mongoose.model('Product',productSchema)