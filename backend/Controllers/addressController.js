import AddressModel from "../Models/Address.js";

// Add Address - /api/address/add
export const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    await AddressModel.create({ ...address, userId });
    res.json({ success: true, message: "Address Added Successfully" });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

// Get Address - /api/address/get
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const addresses = await AddressModel.findById({ userId });
    res.json({ success: true, addresses });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
