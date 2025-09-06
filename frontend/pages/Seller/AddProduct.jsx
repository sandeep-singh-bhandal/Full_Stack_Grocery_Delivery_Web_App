import { useState } from "react";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    offerPrice: "",
  });

  const [images, setImages] = useState([]);

  const { axios, fetchProducts } = useAppContext();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      Object.entries(productData).map(([key, value]) => {
        if (key === "description") {
          formData.append("description", JSON.stringify(value.split("\n")));
        } else formData.append(key, value);
      });
      images.forEach((item) => formData.append("files", item));

      const loadingToast = toast.loading("Adding Product...");
      const { data } = await axios.post("/api/product/add", formData);
      toast.dismiss(loadingToast);
      await fetchProducts();
      if (data.success) {
        toast.success(data.message);
        setProductData({
          name: "",
          description: "",
          category: "",
          price: "",
          offerPrice: "",
        });
        setImages([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="no-scrollbar flex flex-1 flex-col h-[95vh] overflow-y-scroll justify-between">
      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-5 max-w-lg"
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
                      const updatedImages = [...images];
                      updatedImages[index] = e.target.files[0];
                      setImages(updatedImages);
                    }}
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    className="max-w-24 cursor-pointer"
                    src={
                      images[index]
                        ? URL.createObjectURL(images[index])
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
                      const updatedImages = [...images];
                      updatedImages.splice(index, 1);
                      setImages(updatedImages);
                    }}
                  >
                    <img src={assets.remove_icon} alt="remove" />
                  </button>
                </label>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
            value={productData.name}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            onChange={(e) =>
              setProductData({
                ...productData,
                description: e.target.value,
              })
            }
            value={productData.description}
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
            value={productData.category}
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
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
              value={productData.price}
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              onChange={(e) =>
                setProductData({ ...productData, offerPrice: e.target.value })
              }
              value={productData.offerPrice}
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>
        <button className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer hover:bg-primary-dull">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
