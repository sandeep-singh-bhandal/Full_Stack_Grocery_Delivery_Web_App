import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [signUpError, setSignUpError] = React.useState("");
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `/api/user/${state}`,
        state === "login"
          ? { email, password }
          : { email, name, password, confirmPassword }
      );
      if (data.success) {
        navigate("/");
        setUser(data.user);
        toast.success(data.message);
        setShowUserLogin(false);
      } else {
        setSignUpError(data.message ? data.message : data.errors);
        setShowUserLogin(true);
      }
    } catch (error) {
      toast.error(error.message);
      setShowUserLogin(true);
    }
  };
  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center text-sm text-gray-600 bg-black/50 backdrop-blur-sm"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            {typeof signUpError === "string" &&
            signUpError.toLowerCase().includes("name") ? (
              <span className="text-red-500">{signUpError}</span>
            ) : Array.isArray(signUpError) &&
              signUpError[0].path.includes("name") ? (
              <span className="text-red-500">{signUpError[0].message}</span>
            ) : (
              <p>Name</p>
            )}
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              className={`${
                (typeof signUpError === "string" &&
                  signUpError.toLowerCase().includes("name")) ||
                (Array.isArray(signUpError) &&
                  signUpError[0].path.includes("name"))
                  ? "border-red-500 outline-red-500"
                  : "border-gray-200 outline-primary"
              } " border-2 border-gray-200 rounded w-full p-2 mt-1 "`}
              type="text"
            />
          </div>
        )}
        <div className="w-full ">
          {typeof signUpError === "string" &&
          signUpError.toLowerCase().includes("email") ? (
            <span className="text-red-500">{signUpError}</span>
          ) : Array.isArray(signUpError) &&
            signUpError[0].path.includes("email") ? (
            <span className="text-red-500">{signUpError[0].message}</span>
          ) : (
            <p>Email</p>
          )}
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              setSignUpError("");
            }}
            value={email}
            placeholder="Enter your email"
            className={`${
              (typeof signUpError === "string" &&
                signUpError.toLowerCase().includes("email")) ||
              (Array.isArray(signUpError) &&
                signUpError[0].path.includes("email"))
                ? "border-red-500 outline-red-500"
                : "border-gray-200 outline-primary"
            } " border-2 border-gray-200 rounded w-full p-2 mt-1 "`}
          />
        </div>
        <div className="w-full mb-1">
          {typeof signUpError === "string" &&
          signUpError.toLowerCase().includes("password is required") ? (
            <span className="text-red-500">{signUpError}</span>
          ) : Array.isArray(signUpError) &&
            signUpError[0].path.includes("password") ? (
            <span className="text-red-500">{signUpError[0].message}</span>
          ) : typeof signUpError === "string" &&
            signUpError.toLowerCase().includes("incorrect") ? (
            <p>Password</p>
          ) : (
            <p>Password</p>
          )}
          <div className="relative">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                setSignUpError("");
              }}
              value={password}
              placeholder="Enter your password"
              className={`${
                (typeof signUpError === "string" &&
                  signUpError.toLowerCase().includes("password is required")) ||
                (Array.isArray(signUpError) &&
                  signUpError[0].path.includes("password"))
                  ? "border-red-500 outline-red-500"
                  : "border-gray-200 outline-primary"
              } " border-2 border-gray-200 rounded w-full p-2 "`}
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-3 top-1/3 scale-125"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>
        {state === "register" && (
          <div className="w-full ">
            {typeof signUpError === "string" &&
            signUpError.toLowerCase().includes("confirmPassword") ? (
              <span className="text-red-500">{signUpError}</span>
            ) : Array.isArray(signUpError) &&
              signUpError[0].path.includes("confirmPassword") ? (
              <span className="text-red-500">{signUpError[0].message}</span>
            ) : (
              <p>Confirm Password</p>
            )}
            <div className="relative">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="Enter your password"
                className={`${
                  Array.isArray(signUpError) &&
                  signUpError[0].path.includes("confirmPassword")
                    ? "border-red-500 outline-red-500"
                    : "border-gray-200 outline-primary"
                } " border-2 border-gray-200 rounded w-full p-2 "`}
                type={showConfirmPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="cursor-pointer absolute right-3 top-1/3 scale-125"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>
        )}
        {state === "login" && (
          <div className="text-left text-primary">
            <Link
              to="/forgot-password"
              onClick={() => setShowUserLogin(false)}
              className="text-sm"
              href="#"
            >
              Forgot password?
            </Link>
          </div>
        )}
        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
        {state === "register" ? (
          <p className="text-center w-full">
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              Log in
            </span>
          </p>
        ) : (
          <p className="text-center w-full">
            Don’t have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              Sign up
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
