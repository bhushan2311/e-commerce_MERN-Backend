const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'user'
    },
    addresses:{
        type:[mongoose.Schema.Types.Mixed],
        required:true
    },
    name:{
        type:String
    },
    orders:{
        type:[mongoose.Schema.Types.Mixed]
    },
});

/* In Mongoose, a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents. */
const virtuals = userSchema.virtual('id');
virtuals.get(function(){
    return this._id;        // return _id as id bcz we are using id in frontend not using _id
})

userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function(doc,ret) {delete ret._id}
})
//we want id not _id as we are using id in frontend, in console.log we get id while in database it is still stored _id (which is not a problem as we achieved what we want)

exports.User = mongoose.model('User',userSchema)