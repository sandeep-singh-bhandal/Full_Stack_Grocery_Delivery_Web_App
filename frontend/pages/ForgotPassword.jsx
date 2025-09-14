import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useRef } from "react";
import { IoLockClosed } from "react-icons/io5";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showEmailForm, setShowEmailForm] = useState(true);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showConfirmPasswordForm, setShowConfirmPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(Number(searchParams.get("step")) || 0);
  const [signUpError, setSignUpError] = useState("");
  const [formData, setFormData] = useState({
    email: sessionStorage.getItem("email") || "",
    code: sessionStorage.getItem("code") || "",
    newPassword: sessionStorage.getItem("newPassword") || "",
    confirmNewPassword: sessionStorage.getItem("confirmNewPassword") || "",
  });
  const { setShowUserLogin, axios, navigate } = useAppContext();
  const inputRefs = useRef([]);

  // Handler Functions
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (inputRefs.current.length === 6 && name === "code") {
      const code = inputRefs.current.map((val) => val.value).join("");
      setFormData({
        ...formData,
        code: code,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/user/request-code", {
      email: formData.email,
    });
    data.success
      ? (setLoading(true),
        toast.success(data.message),
        setStep(1),
        setSearchParams({ step: "1" }),
        setLoading(false))
      : setSignUpError(data.message ? data.message : data.errors);
  };
  const handleCodeSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/user/verify-code", {
      email: formData.email,
      code: formData.code,
    });
    data.success
      ? (setLoading(true),
        toast.success(data.message),
        setStep(2),
        setSearchParams({ step: "2" }),
        setLoading(false))
      : toast.error(data.message);
  };
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/user/reset-password", {
      email: formData.email,
      newPassword: formData.newPassword,
      confirmNewPassword: formData.confirmNewPassword,
    });
    data.success
      ? (setLoading(true),
        toast.success(data.message),
        setStep(0),
        sessionStorage.clear(),
        setSearchParams({}),
        navigate("/"),
        setLoading(false))
      : setSignUpError(data.message ? data.message : data.errors);
  };

  useEffect(() => {
    step === 1
      ? (setShowEmailForm(false), setShowOtpForm(true))
      : step === 2
      ? (setShowOtpForm(false), setShowConfirmPasswordForm(true))
      : null;
  }, [step]);

  // Storing form data locally
  useEffect(() => {
    sessionStorage.setItem("email", formData.email);
  }, [formData.email]);
  useEffect(() => {
    sessionStorage.setItem("code", formData.code);
  }, [formData.code]);
  useEffect(() => {
    sessionStorage.setItem("newPassword", formData.newPassword);
  }, [formData.newPassword]);
  useEffect(() => {
    sessionStorage.setItem("confirmNewPassword", formData.confirmNewPassword);
  }, [formData.confirmNewPassword]);

  return (
    <div className="fixed inset-0 z-2 flex justify-center items-center bg-black/30">
      {showEmailForm && step === 0 && (
        <form
          onSubmit={handleEmailSubmit}
          className="space-y-2 text-gray-500 bg-white w-96 mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Forgot Password?
          </h2>

          {typeof signUpError === "string" &&
          signUpError.toLowerCase().includes("email") ? (
            <span className="text-red-500">{signUpError}</span>
          ) : Array.isArray(signUpError) &&
            signUpError[0].path.includes("email") ? (
            <span className="text-red-500">{signUpError[0].message}</span>
          ) : (
            <label htmlFor="email">Email</label>
          )}
          <input
            name="email"
            className="w-full border-2 mt-1 border-gray-500/30 focus:border-primary outline-none rounded py-2.5 px-4"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => {
              handleChange(e);
              setSignUpError("");
            }}
          />
          <button
            type="submit"
            disabled={loading ? true : false}
            className={` ${
              loading ? "bg-gray-300" : "bg-primary hover:bg-primary-dull"
            } flex justify-center items-center gap-1 w-full my-3  cursor-pointer active:scale-95 transition py-2.5 rounded text-white`}
          >
            {loading ? "Sending Code" : "Send Code"}
            {loading && (
              <div
                class="animate-spin inline-block size-4 border-3 border-current border-t-transparent text-white rounded-full dark:text-white"
                role="status"
                aria-label="loading"
              ></div>
            )}
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
      {showOtpForm && step === 1 && (
        <form
          onSubmit={handleCodeSubmit}
          className="bg-white text-gray-500 max-w-96 mx-4 md:py-10 md:px-6 px-4 py-8 text-left text-sm rounded-lg transition-all shadow-[0px_0px_10px_0px] shadow-black/10"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Two-factor Authentication
          </h2>
          <p>Please enter the authentication code</p>
          <p className="text-gray-500/60 mb-4">
            The authentication code has been sent to your email:
          </p>
          <div
            className="flex items-center justify-between mb-6"
            onPaste={handlePaste}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  autoFocus={index === 0 ? true : false}
                  autoComplete="off"
                  name="code"
                  className="otp-input w-10 h-10 border-2 border-gray-300 outline-none rounded text-center text-lg focus:border-primary transition duration-300"
                  type="text"
                  maxLength="1"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onChange={handleChange}
                />
              ))}
          </div>
          <button
            type="submit"
            disabled={loading ? true : false}
            className={`${
              loading ? "bg-gray-300" : "bg-primary hover:bg-primary-dull"
            }  flex justify-center items-center gap-1 w-full my-1 cursor-pointer py-2.5 rounded text-white active:scale-95 transition`}
          >
            {loading ? "Verifying" : "Verify"}
            {loading && (
              <div
                class="animate-spin inline-block size-4 border-3 border-current border-t-transparent text-white rounded-full dark:text-white"
                role="status"
                aria-label="loading"
              ></div>
            )}
          </button>
        </form>
      )}
      {showConfirmPasswordForm && step === 2 && (
        <form
          onSubmit={handlePasswordReset}
          className="max-w-96 space-y-2 w-full border border-gray-300/60 rounded-2xl px-8 bg-white"
        >
          <h1 className="text-gray-900 text-center text-2xl mt-10 font-medium">
            Create a new password
          </h1>

          {typeof signUpError === "string" &&
          signUpError.toLowerCase().includes("new password") ? (
            <span className="text-red-500 float-left mt-4">{signUpError}</span>
          ) : Array.isArray(signUpError) &&
            signUpError[0].path.includes("newPassword") ? (
            <span className="text-red-500 float-left mt-4">
              {signUpError[0].message}
            </span>
          ) : typeof signUpError === "string" &&
            signUpError.toLowerCase().includes("incorrect") ? (
            <span className="float-left mt-4">New Password</span>
          ) : (
            <span className="float-left mt-4">New Password</span>
          )}
          <div className="relative flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 overflow-hidden pl-2 rounded-lg gap-2">
            <IoLockClosed className="h-5 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Password"
              autoComplete="off"
              className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-3 my-auto scale-125"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          {Array.isArray(signUpError) &&
          signUpError[0].path.includes("confirmNewPassword") ? (
            <span className="text-red-500 float-left mt-4">
              {signUpError[0].message}
            </span>
          ) : typeof signUpError === "string" &&
            signUpError.toLowerCase().includes("incorrect") ? (
            <span className="float-left mt-4">New Password</span>
          ) : (
            <span className="float-left mt-4">New Password</span>
          )}
          <div className="relative flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 overflow-hidden pl-2 rounded-lg gap-2">
            <IoLockClosed className="h-5 w-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              autoComplete="off"
              className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
              name="confirmNewPassword"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="cursor-pointer absolute right-3 my-auto scale-125"
            >
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading ? true : false}
            className={`${
              loading ? "bg-gray-300" : "bg-primary hover:bg-primary-dull"
            }  flex justify-center items-center gap-1 mt-5 mb-11 w-full h-11 rounded-full text-white  cursor-pointer transition-opacity`}
          >
            {loading ? "Please wait" : "Continue"}
            {loading && (
              <div
                class="animate-spin inline-block size-4 border-3 border-current border-t-transparent text-white rounded-full dark:text-white"
                role="status"
                aria-label="loading"
              ></div>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
