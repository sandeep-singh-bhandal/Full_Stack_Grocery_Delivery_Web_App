import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

export default function DeleteProductModal({ id, imagesData }) {
  const { setShowProductDeleteModal, axios, fetchProducts } = useAppContext();

  const deleteProduct = async (id) => {
    try {
      const loadingToast = toast.loading("Deleting Product...");
      const { data } = await axios.post(`/api/product/delete/${id}`, {
        imagesData,
      });
      toast.dismiss(loadingToast);
      await fetchProducts();
      if (data.success) {
        toast.success(data.message);
        setShowProductDeleteModal(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-full bg-black/40 absolute z-1 flex justify-center items-center backdrop-blur-sm">
      <div className="flex flex-col items-center  bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
        <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75"
              stroke="#DC2626"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-gray-900 font-semibold mt-4 text-xl">
          Are you sure?
        </h2>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Do you really want to delete this product?
        </p>
        <div className="flex items-center justify-center gap-4 mt-5 w-full">
          <button
            onClick={() => setShowProductDeleteModal(false)}
            type="button"
            className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteProduct(id)}
            type="button"
            className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
