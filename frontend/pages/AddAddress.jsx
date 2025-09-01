import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, handleChange, name, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);
const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>{" "}
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="text"
                handleChange={handleChange}
                address={address}
                name="firstName"
                placeholder={"Enter Your First Name"}
              />
              <InputField
                type="text"
                handleChange={handleChange}
                address={address}
                name="lastName"
                placeholder={"Enter Your Last Name"}
              />
            </div>
            <InputField
              type="email"
              handleChange={handleChange}
              address={address}
              name="email"
              placeholder={"Enter Your Email Address"}
            />
            <InputField
              type="text"
              handleChange={handleChange}
              address={address}
              name="street"
              placeholder={"Enter Your Street"}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="text"
                handleChange={handleChange}
                address={address}
                name="city"
                placeholder={"Enter Your City"}
              />
              <InputField
                type="text"
                handleChange={handleChange}
                address={address}
                name="state"
                placeholder={"Enter Your State"}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="number"
                handleChange={handleChange}
                address={address}
                name="zipCode"
                placeholder={"Enter Your Zip Code"}
              />
              <InputField
                type="text"
                handleChange={handleChange}
                address={address}
                name="country"
                placeholder={"Enter Your Country "}
              />
            </div>
            <InputField
              type="number"
              handleChange={handleChange}
              address={address}
              name="phone"
              placeholder={"Enter Your Phone Number "}
            />
            <button className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase">
              Save Address
            </button>
          </form>
        </div>
        <img
          src={assets.add_address_iamge}
          alt="add adress"
          className="md:mr-16 mb-16 md:mt-0"
        />
      </div>
    </div>
  );
};

export default AddAddress;
