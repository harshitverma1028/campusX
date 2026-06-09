// backend/routes/listings.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");   // <-- make sure this exists
const Listing = require("../models/Listing");

// CREATE LISTING
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, price, category, photo, lat, lng, upiId, upiQr } = req.body;

    const listing = new Listing({
      title,
      description,
      price,
      category,
      photo,
      upiId,
      upiQr,
      location: {
        type: "Point",
        coordinates: [lng || 0, lat || 0],
      },
      seller: req.user.id,
      available: true,
    });

    await listing.save();
    res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// GET AVAILABLE LISTINGS
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find({ available: true })
      .populate("seller", "name phone")
      .sort({ createdAt: -1 })
      .lean();

    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// GET MY LISTINGS (for logged-in seller)
router.get("/my", auth, async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(400).json({ msg: "Invalid user" });

    const myListings = await Listing.find({ seller: userId }).sort({ createdAt: -1 }).lean();
    res.json(myListings);
  } catch (err) {
    console.error("GET /api/listings/my err", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// MARK LISTING AS SOLD
router.put("/mark-sold/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ msg: "Listing not found" });
    if (listing.seller.toString() !== req.user.id) return res.status(403).json({ msg: "Unauthorized" });

    listing.available = false;
    await listing.save();

    res.json({ ok: true, msg: "Listing marked as sold" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// DELETE LISTING
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ msg: "Not found" });

    if (listing.seller.toString() !== req.user.id) return res.status(403).json({ msg: "Unauthorized" });

    await Listing.findByIdAndDelete(req.params.id);
    res.json({ ok: true, msg: "Listing deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
