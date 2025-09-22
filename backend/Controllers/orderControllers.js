// Place Order COD: /api/order/cod

import OrderModel from "../Models/Orders.js";
import ProductModel from "../Models/Product.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items, address } = req.body;
    
    if (!address || items.length === 0)
      return res.json({ success: false, message: "Invalid Data" });
    //Calculate Amount using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await ProductModel.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    //Add Tax Charge 2%
    amount += Math.floor(amount * 0.02);
    await OrderModel.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Place Order Stripe - api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items, address } = req.body;
    const { origin } = req.headers;
    if (!address || items.length === 0)
      return res.json({ success: false, message: "Invalid Data" });

    let productData = [];
    //Calculate Amount using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await ProductModel.findById(item.product);
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    //Add Tax Charge 2%
    amount += Math.floor(amount * 0.02);
    const order = await OrderModel.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    //Stripe Gateway Initialization
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    //create line items for stripe
    const line_items = productData.map((item)=>{
      return {}
    })

    return res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Orders by User ID - api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.user;
    const orders = await OrderModel.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get All Orders Data for Admin - api/orders/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
