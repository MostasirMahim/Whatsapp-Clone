import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserCheck } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { SiGooglemessages } from "react-icons/si";
import { BiFemale, BiMale } from "react-icons/bi";

function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({
    fullname: "",
    username: "",
    password: "",
    gender: "",
  });
  const [errorMessage, setErrorMessge] = useState("");
  const [form, setForm] = useState("login");
  const queryClient = useQueryClient();

  const { mutate: loginUser } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }
      console.log(result.error);
      return result;
    },
    onSuccess: () => {
      toast.success("logged in Succcesfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      setErrorMessge(error.message);
    },
  });

  const {
    mutate: signupUser,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }
      console.log(result.error);
      return result;
    },
    onSuccess: () => {
      setSignupData({
        username: "",
        password: "",
        fullname: "",
        gender: "",
      });
      toast.success("Sign Up Succcesfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const onSubmitLogin = () => {
    if (!((formData.username && formData.password) === "")) {
      loginUser();
    } else {
      toast.error("Please Profide All Fileds");
    }
  };
  const onSubmitSignup = () => {
    if (
      !(
        (signupData.username &&
          signupData.password &&
          signupData.gender &&
          signupData.gender) === ""
      )
    ) {
      signupUser();
    } else {
      toast.error("Please Profide All Fileds");
    }
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const selectGender = (gender) => {
    setSignupData((prevState) => ({ ...prevState, gender }));
  };
  console.log(signupData);
  console.log(error);
  return (
    <div className="bg-gradient-to-r from-[#23f6f2] to-blue-500 max-h-screen h-screen text-black ">
      <div className=" flex justify-center items-center h-full ">
        <div className=" flex flex-col justify-end items-end sm:pb-4 sm:pr-4 sm:h-3/4 sm:w-[90%] md:w-[72%] lg:w-[60%] xl:w-1/2  sm:bg-[url('https://res.cloudinary.com/dzdszuszh/image/upload/v1728292828/mtmeyt8t99kpn3vknnjp.svg')] bg-cover bg-no-repeat rounded-2xl sm:shadow-2xl">
          <p className="text-2xl pb-4 pr-8 xs:hidden  font-kaushan text-black">
            Let&lsquo;s Crack The World!
          </p>

          {form === "login" && (
            <div className="bg-gray-100 sm:h-2/3 sm:w-1/2 xs:h-[450px] xs:w-auto xs:px-10  flex flex-col xs:justify-center xs:gap-5 sm:justify-evenly items-center rounded-2xl shadow-2xl">
              <SiGooglemessages className="w-20 h-20 sm:hidden" />
              <p className="sm:hidden text-xl  font-semibold font-kaushan text-black">
                Let&lsquo;s Crack The World!
              </p>
              <div className="flex flex-col justify-center items-center font-spartan">
                <div className="flex border border-gray-800 w-[250px] h-[40px] font-spartan pl-2 items-center rounded-md focus-within:border-sky-500">
                  <FaUserCheck className="w-6 h-6 text-black" />
                  <input
                    type="text"
                    name="username"
                    onChange={handleInputChange}
                    value={formData.username}
                    id="loginemail"
                    placeholder="Username"
                    className="w-[300px] h-[40px] bg-transparent pl-6 outline-none "
                  />
                </div>
                <div className="mt-4 flex border border-gray-800 w-[250px] h-[40px] rounded-md pl-2 items-center focus-within:border-sky-500 ">
                  <MdOutlinePassword className="w-6 h-6 text-black" />
                  <input
                    type="password"
                    name="password"
                    id="loginpassword"
                    placeholder="Password"
                    onChange={handleInputChange}
                    value={formData.password}
                    className="w-[300px] h-[40px] bg-transparent pl-6 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  onClick={(e) => {
                    onSubmitLogin(e);
                  }}
                  className="flex justify-center mt-6  rounded-xl text-white h-10 font-bold font-quicksand w-[200px] items-center space-x-3 text-lg bg-green-500 hover:bg-green-600 duration-300 hover:translate-y-1 hover:scale-105"
                >
                  Log In
                </button>
              </div>

              {errorMessage && (
                <p className="text-red-600 mt-2">{errorMessage}</p>
              )}
              <p className="text-black text-sm">
                haven&lsquo;t any account{" "}
                <span
                  onClick={() => setForm("signin")}
                  className="text-green-500 cursor-pointer underline hover:text-green-600"
                >
                  Signup
                </span>
              </p>
            </div>
          )}

          {form === "signin" && (
            <div className="bg-gray-100 sm:h-4/5 sm:w-1/2 xs:h-[500px] xs:w-auto xs:px-10 flex flex-col xs:justify-center xs:gap-5 sm:justify-evenly items-center rounded-2xl shadow-2xl">
              <SiGooglemessages className="w-20 h-20 sm:hidden" />
              <p className="sm:hidden text-xl  font-semibold font-kaushan text-black ">
                Let&lsquo;s Crack The World!
              </p>
              <div className="flex flex-col justify-center items-center font-spartan">
                <div className="flex border border-gray-800 w-[250px] h-[40px]  pl-2 items-center rounded-md focus-within:border-sky-500">
                  <MdOutlineDriveFileRenameOutline className="w-6 h-6 text-black" />
                  <input
                    type="text"
                    name="fullname"
                    onChange={handleFormChange}
                    value={signupData.fullname}
                    placeholder="Full Name"
                    className="w-[300px] h-[40px] bg-transparent pl-6 outline-none"
                  />
                </div>
                <div className="mt-4 flex border border-gray-800 w-[250px] h-[40px]  pl-2 items-center rounded-md focus-within:border-sky-500">
                  <FaUserCheck className="w-6 h-6 text-black" />
                  <input
                    type="text"
                    name="username"
                    onChange={handleFormChange}
                    value={signupData.username}
                    placeholder="Username"
                    className="w-[300px] h-[40px] bg-transparent pl-6 outline-none"
                  />
                </div>
                <div className="mt-4 flex border border-gray-800 w-[250px] h-[40px] rounded-md  pl-2 items-center focus-within:border-sky-500 ">
                  <MdOutlinePassword className="w-6 h-6 text-black" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleFormChange}
                    value={signupData.password}
                    className="w-[300px] h-[40px] bg-transparent pl-6 outline-none"
                  />
                </div>

                <div className="flex justify-evenly items-center mt-4 w-full">
                  <div
                    onClick={() => selectGender("male")}
                    onDoubleClick={() => selectGender("")}
                    className={`h-8 w-auto p-2  text-center hover:border-[2px] rounded-lg flex justify-center items-center border-green-400  cursor-pointer hover:scale-105 duration-200 ${
                      signupData.gender == "male"
                        ? " bg-green-400 text-white"
                        : "bg-transparent"
                    }`}
                  >
                    <BiMale className="w-6 h-6" />
                    <p className="font-amaranth text-sm "> Male</p>
                  </div>
                  <div
                    onClick={() => selectGender("female")}
                    onDoubleClick={() => selectGender("")}
                    className={`h-8 w-auto p-2  text-center hover:border-[2px] rounded-lg flex justify-center items-center border-green-400  cursor-pointer hover:scale-105 duration-200 ${
                      signupData.gender == "female"
                        ? " bg-green-400 text-white"
                        : "bg-transparent"
                    }`}
                  >
                    <BiFemale className="w-6 h-6" />
                    <p className="font-amaranth text-sm "> Female</p>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={(e) => {
                    onSubmitSignup(e);
                  }}
                  className="flex justify-center mt-6 rounded-xl text-white h-10 font-quicksand font-bold  w-[200px] items-center space-x-3 duration-300 hover:translate-y-1 hover:scale-105 text-lg bg-green-500 hover:bg-green-600"
                >
                  Sign Up
                </button>
              </div>
              {isError && (
                <p className="text-red-600 mt-2 text-sm">{error.message}</p>
              )}
              <p className="text-black text-md font-spartan">
                have a account{" "}
                <span
                  onClick={() => setForm("login")}
                  className="text-green-500 cursor-pointer underline hover:text-green-600"
                >
                  Login
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
