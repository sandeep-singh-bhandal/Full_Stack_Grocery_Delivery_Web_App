import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useRef } from "react";
const ForgotPassword = () => {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(true);
  const { setShowUserLogin } = useAppContext();
  const inputRefs = useRef([]);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };
  return (
    <div className="fixed inset-0 z-2 flex justify-center items-center bg-black/20">
      {showEmailForm && (
        <form className="space-y-2 text-gray-500 bg-white max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Forget Password?
          </h2>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="w-full border-2 mt-1 border-gray-500/30 focus:border-primary outline-none rounded py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
          />
          <button
            onClick={() => {
              setShowOtpForm(true);
              setShowEmailForm(false);
            }}
            type="button"
            className="w-full my-3 bg-primary hover:bg-primary-dull cursor-pointer active:scale-95 transition py-2.5 rounded text-white"
          >
            Send Code
          </button>
          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <Link
              to={"/"}
              onClick={() => setShowUserLogin(true)}
              className="text-primary underline"
            >
              Signup Now
            </Link>
          </p>
        </form>
      )}
      {showOtpForm && (
        <form class="bg-white text-gray-500 max-w-96 mx-4 md:py-10 md:px-6 px-4 py-8 text-left text-sm rounded-lg transition-all shadow-[0px_0px_10px_0px] shadow-black/10">
          <h2 class="text-2xl font-semibold mb-4 text-center text-gray-800">
            Two-factor Authentication
          </h2>
          <p>Please enter the authentication code</p>
          <p class="text-gray-500/60 mb-4">
            The authentication code has been sent to your email:
          </p>
          <div class="flex items-center justify-between mb-6" onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input
                class="otp-input w-10 h-10 border-2 border-gray-300 outline-none rounded text-center text-lg focus:border-primary transition duration-300"
                type="text"
                maxlength="1"
                required
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button
            type="submit"
            class="w-full my-1 bg-primary hover:bg-primary-dull cursor-pointer py-2.5 rounded text-white active:scale-95 transition"
          >
            Verify
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
