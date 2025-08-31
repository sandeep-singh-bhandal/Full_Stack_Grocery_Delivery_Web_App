import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firtName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: true,
    },
    zipcode: {
      type: Number,
      default: true,
    },
    country: {
      type: String,
      default: true,
    },
    phone: {
      type: Number,
      default: true,
    },
  },
  { timestamps: true }
);

const AddressModel =
  mongoose.models.address || mongoose.model("address", addressSchema);

export default AddressModel;
