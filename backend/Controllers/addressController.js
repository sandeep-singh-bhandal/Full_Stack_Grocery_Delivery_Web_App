import AddressModel from "../Models/Address.js";

// Add Address - /api/address/add
export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const { userId } = req.user;

    const count = await AddressModel.countDocuments();

    await AddressModel.create({
      ...address,
      isDefault: count === 0 ? true : false,
      userId,
    });
    res.json({ success: true, message: "Address Added Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// Get Address - /api/address/get
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.user;
    const addresses = await AddressModel.find({ userId });
    res.json({ success: true, addresses });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
