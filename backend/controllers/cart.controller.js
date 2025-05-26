import Listing from "../models/listing.model.js";

export const getCartListings = async (req, res) => {
  try {
    const listings = await Listing.find({ _id: { $in: req.user.cartitems } });

    //add quantity for each listing
    const cartItems = listings.map((listing) => {
      const item = req.user.cartItems.find((item) => item.id === listing.id);
      return { ...listing.toJSON(), qiantity: item.quantity };
    });
    res.json(cartItems)
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { listingId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(
      (item) => item.id === listingId.id
    );
    if (existingItem) {
      existingItem.qiantity += 1;
    } else {
      user.cartItems.push(listingId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { listingId } = req.body;
    const user = req.user;
    if (!listingId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== listingId);
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.error("Error removing all items from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: listingId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id === listingId);
    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== listingId);
        await user.save();
        return res.json(user.cartItems);
      }

      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
