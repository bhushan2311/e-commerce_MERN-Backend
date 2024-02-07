const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: {
    type: [mongoose.Schema.Types.Mixed],
    required: true
  },
  totalPrice: {
    type: Number,
  },
  totalItems: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",            // refer user, we will give u its id
    required: true,
  },
  paymentMethod: {
    type: String,
    default: "pending",
  },
  selectedAddress: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

/* In Mongoose, a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents. */
const virtuals = orderSchema.virtual("id");
virtuals.get(function () {
  return this._id; // return _id as id bcz we are using id in frontend not using _id
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
//we want id not _id as we are using id in frontend, in console.log we get id while in database it is still stored _id (which is not a problem as we achieved what we want)

exports.Order = mongoose.model("Order", orderSchema);
