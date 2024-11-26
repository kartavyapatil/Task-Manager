import React from 'react';
import logo from "../assets/logo.png";
import wave from "../assets/wave.svg";
import person from "../assets/loginpageasset.png";
import * as yup from "yup";
import { Formik, ErrorMessage, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../contexts/authContext";

const Register = () => {
  const navigate = useNavigate();
  const { loading } = useAuth(); 

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string()
      .required("Required")
      .min(5, "Password must be greater than 5 characters"),
  });

  const onSubmitHandler = async (values, { resetForm }) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Registered successfully!");
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 h-[10vh] bg-slate-50">
        <div className="logo">
          <img src={logo} className="w-16 ml-3 mt-2" alt="logo" />
        </div>
        <div className="logo-name font-serif font-bold text-2xl">
          Task Management
        </div>
      </div>
      <div className="flex gap-1 justify-center bg-slate-50">
        <div className="w-[45vw] h-[69.5vh]">
          <div className="rounded-lg p-1 bg-white w-full h-[58vh] mt-8">
            <div className="text-3xl font-serif font-medium flex justify-center p-4">
              Register
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmitHandler}
            >
              {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="font-serif text-xl">Name:</label>
                    <Field
                      id="name"
                      name="name"
                      className="rounded-lg bg-slate-200 border-gray-500 py-5 px-2 outline-none h-8 w-[26vw]"
                      placeholder="Enter name"
                    />
                    <ErrorMessage component="p" className="text-red-500 text-sm" name="name" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-serif text-xl">Email:</label>
                    <Field
                      id="email"
                      name="email"
                      className="rounded-lg bg-slate-200 border-gray-500 py-5 px-2 outline-none h-8 w-[26vw]"
                      placeholder="Enter Email Address"
                    />
                    <ErrorMessage component="p" className="text-red-500 text-sm" name="email" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-serif text-xl">Password:</label>
                    <Field
                      id="password"
                      name="password"
                      className="rounded-lg bg-slate-200 border-gray-500 py-5 px-2 outline-none h-8 w-[26vw]"
                      type="password"
                      placeholder="Enter password"
                    />
                    <ErrorMessage component="p" className="text-red-500 text-sm" name="password" />
                  </div>
                  <button
                    disabled={loading || isSubmitting}
                    className={`justify-center w-28 font-serif text-xl bg-green-600 rounded-lg p-1 border ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    type="submit"
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                  <div className="flex">
                    <p className="font-serif">Already have an Account?</p>
                    <Link to="/login" className="font-semibold text-blue-600 ml-2">Login</Link>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="w-[45vw] h-[69vh]">
          <img className="absolute h-[80vh] w-[38vw] z-10" src={person} alt="person" />
        </div>
      </div>
      <div className="absolute bottom-0">
        <img className="bg-slate-50 w-[100vw]" src={wave} alt="wave" />
      </div>
    </>
  );
};

export default Register;
