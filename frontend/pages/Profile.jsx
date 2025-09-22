import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { MdEmail, MdLocalPhone, MdLocationOn } from "react-icons/md";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { updateDetailsSchema } from "../../validation/userDetails.js";

const Profile = () => {
  const { axios, navigate } = useAppContext();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    addresses: [],
  });

  const getUser = async () => {
    const { data } = await axios.get("/api/user/get-user");
    try {
      if (data.success) {
        const { name, email, phone } = data.user[0];
        setFormData((prev) => ({
          ...prev,
          name,
          email,
          phone,
          addresses: data.user[1],
        }));
        setUserDetails(data.user[0]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr) =>
        addr._id === id ? { ...addr, [field]: value } : addr
      ),
    }));
  };

  const handleSetDefaultAddress = (id) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr) => ({
        ...addr,
        isDefault: addr._id === id,
      })),
    }));
  };
  const handleRemoveAddress = (id) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((addr) => addr._id !== id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email) return toast.error("Please provide an Email");
      if (!formData.name) return toast.error("Please provide a Name");
      updateDetailsSchema.parse({
        email: formData.email,
        username: formData.name,
        phone: formData.phone,
      });
      const promise = axios.patch("/api/user/update-user", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.promise(promise, {
        loading: "Updating Profile...",
        success: () => {
          getUser();
          return "Profile updated";
        },
        error: (res) => {
          return res.message
        },
      });
    } catch (error) {
      console.log(JSON.parse(error));

      toast.error(JSON.parse(error)[0].message);
    }
  };

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card - Left Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-semibold">
                  <img src={assets.profile_icon} alt="Profile" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {userDetails.name}
                </h2>
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center text-sm">
                  <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center mr-3">
                    <MdEmail />
                  </div>
                  <span className="text-gray-900">{userDetails.email}</span>
                </div>

                <div className="flex items-center text-sm">
                  <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center mr-3">
                    <MdLocalPhone />
                  </div>
                  <span className="text-gray-900">
                    {userDetails.phone || "Not Provided"}
                  </span>
                </div>

                <div className="flex items-start text-sm">
                  <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center mr-3 mt-0.5">
                    <MdLocationOn />
                  </div>
                  <div>
                    {formData.addresses
                      .filter((addr) => addr.isDefault)
                      .map((addr) => (
                        <div key={addr._id}>
                          <div className="font-medium text-gray-900">
                            {addr.street}
                          </div>
                          <div className="text-gray-600">
                            {addr.city}, {addr.state} {addr.zipCode}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  type="submit"
                  form="profile-form"
                  className="w-full md:w-auto px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dull  cursor-pointer transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Edit Form - Right Side */}
          <form
            onSubmit={handleSubmit}
            id="profile-form"
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Edit Profile
              </h3>

              {/* Personal Information */}
              <div className="space-y-6">
                <div className="pb-4">
                  <h4 className="text-md font-medium text-gray-900 mb-4">
                    Personal Information
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User Name
                    </label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors mb-4"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="text"
                        value={formData.email || ""}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={formData.phone || ""}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Management */}
                <div className="border-t pt-6">
                  <p className="font-normal text-sm mb-6 text-center">
                    Note: The below information is for delivery purpose only,
                    Not Your Login Credentials
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-900">
                      Addresses
                    </h4>
                    <button
                      onClick={() => navigate("/add-address")}
                      type="button"
                      className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dull transition-colors cursor-pointer"
                    >
                      Add New Address
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.addresses.map((address, index) => (
                      <div
                        key={address._id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {`Address - ${index + 1}`}
                            {address.isDefault && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {!address.isDefault && (
                              <button
                                onClick={() =>
                                  handleSetDefaultAddress(address._id)
                                }
                                className="text-sm text-primary hover:text-primary-dull cursor-pointer"
                              >
                                Set as Default
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveAddress(address._id)}
                              className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              First Name
                            </label>
                            <input
                              type="text"
                              placeholder="First Name"
                              value={address.firstName}
                              onChange={(e) =>
                                handleAddressChange(
                                  address._id,
                                  "firstName",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Last Name
                            </label>
                            <input
                              type="text"
                              placeholder="First Name"
                              value={address.lastName}
                              onChange={(e) =>
                                handleAddressChange(
                                  address._id,
                                  "lastName",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Street
                            </label>
                            <input
                              type="text"
                              placeholder="Street"
                              value={address.street}
                              onChange={(e) =>
                                handleAddressChange(
                                  address._id,
                                  "street",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              City
                            </label>
                            <input
                              type="text"
                              placeholder="City"
                              value={address.city}
                              onChange={(e) =>
                                handleAddressChange(
                                  address._id,
                                  "city",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              State
                            </label>
                            <input
                              type="text"
                              placeholder="State"
                              value={address.state}
                              onChange={(e) =>
                                handleAddressChange(
                                  address._id,
                                  "state",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Zip Code
                            </label>
                            <input
                              type="text"
                              placeholder="Zip Code"
                              value={address.zipCode}
                              onChange={(e) =>
                                handleAddressChange(
                                  address._id,
                                  "zipCode",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Country
                            </label>
                            <input
                              type="text"
                              placeholder="Country"
                              value={address.country}
                              onChange={(e) =>
                                handleAddressChange(
                                  address._id,
                                  "country",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              placeholder="Phone Number"
                              value={address.phone}
                              onChange={(e) =>
                                handleAddressChange(
                                  address._id,
                                  "phone",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Profile;
