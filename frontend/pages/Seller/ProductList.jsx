import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { MdEdit, MdDelete } from "react-icons/md";
import DeleteProductModal from "../../components/seller/DeleteProductModal";
import EditProductModal from "../../components/seller/EditProductModal";
import { useState } from "react";

const ProductList = () => {
  const [clickedProduct, setClickedProduct] = useState("");
  const icons = [
    {
      name: "Edit",
      icon: <MdEdit />,
    },
    {
      name: "Delete",
      icon: <MdDelete />,
    },
  ];
  const {
    products,
    currency,
    axios,
    fetchProducts,
    showProductDeleteModal,
    showEditProductModal,
    setShowProductDeleteModal,
    setShowEditProductModal,
  } = useAppContext();
  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  return (
    <div className="no-scrollbar flex-1 overflow-y-scroll flex flex-col justify-between relative">
      {showProductDeleteModal && <DeleteProductModal id={clickedProduct._id} imagesData={clickedProduct.imagesData} />}
      {showEditProductModal && <EditProductModal product={clickedProduct} />}
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                <th className="px-4 py-3 font-semibold truncate">Edit</th>
                <th className="px-4 py-3 font-semibold truncate">Delete</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded overflow-hidden">
                      <img
                        src={product.imagesData[0].url}
                        alt="Product"
                        className="w-16"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {currency}
                    {product.offerPrice}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        onClick={() =>
                          toggleStock(product._id, !product.inStock)
                        }
                        checked={product.inStock}
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-primary-dull transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                  {icons.map((icon, i) => (
                    <td className="px-4 py-3" key={i}>
                      <button
                        onClick={() => {
                          if (icon.name === "Delete") {
                            setShowProductDeleteModal(true);
                          } else {
                            setShowEditProductModal(true);
                          }
                          setClickedProduct(product);
                        }}
                        type="button"
                        className={`${
                          icon.name === "Delete"
                            ? " bg-red-500 hover:bg-red-600 "
                            : "bg-blue-500 hover:bg-blue-600"
                        }
                        } flex items-center gap-2 px-5 text-white py-2 active:scale-95 transition rounded text-sm font-medium cursor-pointer`}
                      >
                        {icon.icon} {icon.name}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
