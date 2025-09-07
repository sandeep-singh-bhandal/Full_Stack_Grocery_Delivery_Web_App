import { useState } from "react";
import { assets } from "../assets/assets";
import { MdEmail, MdLocalPhone, MdLocationOn } from "react-icons/md";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Software Developer passionate about creating amazing user experiences.",
    addresses: [
      {
        id: 1,
        type: "Home",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        isDefault: true,
      },
      {
        id: 2,
        type: "Work",
        street: "456 Business Ave",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        isDefault: false,
      },
    ],
  });

  const [newAddress, setNewAddress] = useState({
    type: "Home",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [showAddAddress, setShowAddAddress] = useState(false);

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
        addr.id === id ? { ...addr, [field]: value } : addr
      ),
    }));
  };

  const handleSetDefaultAddress = (id) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    }));
  };

  const handleAddNewAddress = () => {
    if (
      newAddress.street &&
      newAddress.city &&
      newAddress.state &&
      newAddress.zipCode
    ) {
      const newId = Math.max(...formData.addresses.map((a) => a.id)) + 1;
      setFormData((prev) => ({
        ...prev,
        addresses: [
          ...prev.addresses,
          { ...newAddress, id: newId, isDefault: false },
        ],
      }));
      setNewAddress({
        type: "Home",
        street: "",
        city: "",
        state: "",
        zipCode: "",
      });
      setShowAddAddress(false);
    }
  };

  const handleRemoveAddress = (id) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((addr) => addr.id !== id),
    }));
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
                  {formData.firstName} {formData.lastName}
                </h2>
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center text-sm">
                  <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center mr-3">
                    <MdEmail />
                  </div>
                  <span className="text-gray-900">{formData.email}</span>
                </div>

                <div className="flex items-center text-sm">
                  <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center mr-3">
                    <MdLocalPhone />
                  </div>
                  <span className="text-gray-900">{formData.phone}</span>
                </div>

                <div className="flex items-start text-sm">
                  <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center mr-3 mt-0.5">
                    <MdLocationOn />
                  </div>
                  <div>
                    {formData.addresses
                      .filter((addr) => addr.isDefault)
                      .map((addr) => (
                        <div key={addr.id}>
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
            </div>
          </div>

          {/* Edit Form - Right Side */}
          <div className="lg:col-span-2">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
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
                        type="tel"
                        value={formData.phone}
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
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-900">
                      Addresses
                    </h4>
                    <button
                      onClick={() => setShowAddAddress(true)}
                      className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dull transition-colors cursor-pointer"
                    >
                      Add New Address
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {`Address - ${address.id}`}
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
                                  handleSetDefaultAddress(address.id)
                                }
                                className="text-sm text-primary hover:text-primary-dull cursor-pointer"
                              >
                                Set as Default
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveAddress(address.id)}
                              className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="md:col-span-2">
                            <input
                              type="text"
                              placeholder="Street Address"
                              value={address.street}
                              onChange={(e) =>
                                handleAddressChange(
                                  address.id,
                                  "street",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="City"
                              value={address.city}
                              onChange={(e) =>
                                handleAddressChange(
                                  address.id,
                                  "city",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="State"
                              value={address.state}
                              onChange={(e) =>
                                handleAddressChange(
                                  address.id,
                                  "state",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                            />
                            <input
                              type="text"
                              placeholder="ZIP Code"
                              value={address.zipCode}
                              onChange={(e) =>
                                handleAddressChange(
                                  address.id,
                                  "zipCode",
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

                  {/* Add New Address Form */}
                  {showAddAddress && (
                    <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">
                        Add New Address
                      </h5>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Street Address"
                          value={newAddress.street}
                          onChange={(e) =>
                            setNewAddress((prev) => ({
                              ...prev,
                              street: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="City"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress((prev) => ({
                                ...prev,
                                city: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            value={newAddress.state}
                            onChange={(e) =>
                              setNewAddress((prev) => ({
                                ...prev,
                                state: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                          />
                          <input
                            type="text"
                            placeholder="ZIP Code"
                            value={newAddress.zipCode}
                            onChange={(e) =>
                              setNewAddress((prev) => ({
                                ...prev,
                                zipCode: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={handleAddNewAddress}
                            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dull transition-colors cursor-pointer"
                          >
                            Add Address
                          </button>
                          <button
                            onClick={() => setShowAddAddress(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="border-t pt-6">
                  <button className="w-full md:w-auto px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dull  cursor-pointer transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
