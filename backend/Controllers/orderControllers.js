// Place Order COD: /api/order/cod

import OrderModel from "../Models/Orders.js";
import ProductModel from "../Models/Product.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.lenght === 0)
      return res.json({ success: true, message: "Invalid Data" });
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

// Get Orders by User ID - api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await OrderModel.findById({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("item.product address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get All Orders Data for Admin - api/orders/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.findById({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("item.product address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};