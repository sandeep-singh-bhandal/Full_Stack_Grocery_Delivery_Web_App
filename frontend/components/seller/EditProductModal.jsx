import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import { assets, categories } from "../../assets/assets";

export default function EditProductModal() {
  const { setShowEditProductModal, axios } = useAppContext();
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const { data } = await axios.post("/api/product/add", formData);
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-full w-full bg-black/40 absolute z-1 flex justify-center items-center backdrop-blur-sm">
      <div className="flex items-center bg-white shadow-md rounded-xl py-6 px-5 max-w-5xl max-h-10/12 border border-gray-200">
        <div className="no-scrollbar flex overflow-y-scroll justify-between">
          <form
            onSubmit={onSubmitHandler}
            className="md:p-10 p-4 space-y-5 max-w-full "
          >
            <div>
              <p className="text-base font-medium">Product Image</p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                {Array(4)
                  .fill("")
                  .map((_, index) => (
                    <label
                      key={index}
                      htmlFor={`image${index}`}
                      className="relative"
                    >
                      <input
                        onChange={(e) => {
                          const updatedFiles = [...files];
                          updatedFiles[index] = e.target.files[0];
                          setFiles(updatedFiles);
                        }}
                        accept="image/*"
                        type="file"
                        id={`image${index}`}
                        hidden
                      />
                      <img
                        className="max-w-24 cursor-pointer"
                        src={
                          files[index]
                            ? URL.createObjectURL(files[index])
                            : assets.upload_area
                        }
                        alt="uploadArea"
                        width={100}
                        height={100}
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 cursor-pointer bg-white rounded-full active:translate-y-0.5 "
                        onClick={() => {
                          const updatedFiles = [...files];
                          updatedFiles.splice(index, 1);
                          setFiles(updatedFiles);
                        }}
                      >
                        <img src={assets.remove_icon} alt="remove" />
                      </button>
                    </label>
                  ))}
              </div>
            </div>

            <div className="flex gap-10">
              <div className="flex flex-col gap-1 w-2xl">
                <label className="text-base font-medium" htmlFor="product-name">
                  Product Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  id="product-name"
                  type="text"
                  placeholder="Type here"
                  className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 w-3xl">
                <label
                  className="text-base font-medium"
                  htmlFor="product-description"
                >
                  Product Description
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  id="product-description"
                  rows={4}
                  className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
                  placeholder="Type here"
                ></textarea>
              </div>
            </div>
            <div className="flex w-full gap-10">
              <div className="flex flex-col gap-1 w-5/12">
                <label className="text-base font-medium" htmlFor="category">
                  Category
                </label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  id="category"
                  className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                >
                  <option value="">Select Category</option>
                  {categories.map((item, index) => (
                    <option key={index} value={item.path}>
                      {item.path}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-5 flex-wrap w-7/12">
                <div className="flex-1 flex flex-col gap-1 w-32">
                  <label
                    className="text-base font-medium"
                    htmlFor="product-price"
                  >
                    Product Price
                  </label>
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    id="product-price"
                    type="number"
                    placeholder="0"
                    className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1 w-32">
                  <label
                    className="text-base font-medium"
                    htmlFor="offer-price"
                  >
                    Offer Price
                  </label>
                  <input
                    onChange={(e) => setOfferPrice(e.target.value)}
                    value={offerPrice}
                    id="offer-price"
                    type="number"
                    placeholder="0"
                    className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer hover:bg-primary-dull">
                Save
              </button>
              <button onClick={()=>setShowEditProductModal(false)} className="px-8 py-2.5 bg-red-500 text-white font-medium rounded cursor-pointer hover:bg-red-600">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
