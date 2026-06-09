const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    category: String,
    photo: String,

    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number], // [lng, lat]
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", ListingSchema);
