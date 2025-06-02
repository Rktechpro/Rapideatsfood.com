import foodUserModel from "../Models/UserSchema.js";

// Add item to user cart
const addToCart = async (req, res) => {
  try {
    const { UserId, itemId } = req.body; // Destructure request body
    // Find user by ID
    let Userdata = await foodUserModel.findById(UserId);
    // Get user's cart data
    let cartData = await Userdata.cartData;
    // Update cart data
    if (!cartData[itemId]) {
      cartData[itemId] = 1; // Add new item
    } else {
      cartData[itemId] += 1; // Increment quantity
    }

    // Update user document in the database
    await foodUserModel.findByIdAndUpdate(UserId, { cartData });

    res.status(200).json({ success: true, message: "Added to cart!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add to cart!" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { UserId, itemId } = req.body;
    let Userdata = await foodUserModel.findById(UserId);
    let cartData = await Userdata.cartData;
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await foodUserModel.findByIdAndUpdate(UserId, { cartData });
    res.status(200).json({ success: true, message: "Removed From cart!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error!" });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { UserId } = req.body;
    let Userdata = await foodUserModel.findById(UserId);
    let cartData = await Userdata.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error!" });
  }
};

export { addToCart, removeFromCart, getUserCart };
