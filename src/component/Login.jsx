import React from 'react';
import logo from "../assets/logo.png";
import wave from "../assets/wave.svg";
import person from "../assets/loginpageasset.png";
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = yup.object({
        email: yup.string().email('Invalid email address').required('Required'),
        password: yup.string().required('Required').min(5, "Password must be greater than 5 characters")
    });

    const onSubmitHandler = async (values, { resetForm }) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            toast.success("Login successful");
            navigate("/");
            resetForm();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center gap-4 h-[10vh] bg-slate-50">
                <div className="logo">
                    <img src={logo} className="w-16 ml-3 mt-2" alt="logo" />
                </div>
                <div className="logo-name font-serif font-bold text-2xl">
                    Task Manager
                </div>
            </div>
            <div className="flex gap-1 justify-center bg-slate-50">
                <div className="w-[45vw] h-[69.5vh]">
                    <div className="rounded-lg p-10 bg-white w-full h-[58vh] mt-8">
                        <div className="text-3xl font-serif font-medium flex justify-center p-4">Login</div>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
                            {({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-5">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="email" className="font-serif text-xl">Email:</label>
                                        <Field
                                            id="email"
                                            name="email"
                                            className="rounded-lg bg-slate-200 border-gray-500 py-5 px-2 outline-none h-8 w-[26vw]"
                                            placeholder="Enter Email Address"
                                            aria-describedby="emailError"
                                        />
                                        <ErrorMessage component={'p'} id="emailError" className="text-red-500 text-sm" name="email" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="password" className="font-serif text-xl">Password:</label>
                                        <Field
                                            id="password"
                                            name="password"
                                            className="rounded-lg bg-slate-200 border-gray-500 py-5 px-2 outline-none h-8 w-[26vw]"
                                            type="password"
                                            placeholder="Enter Password"
                                            aria-describedby="passwordError"
                                        />
                                        <ErrorMessage component={'p'} id="passwordError" className="text-red-500 text-sm" name="password" />
                                    </div>
                                    <button
                                        disabled={loading}
                                        className={`justify-center w-28 font-serif text-xl bg-green-600 rounded-lg p-1 border ${loading && 'opacity-50'}`}
                                        type="submit"
                                    >
                                        {loading ? "Loading..." : "Submit"}
                                    </button>
                                    <div className="flex">
                                        <p className="font-serif">Don't have an Account?</p>
                                        <Link to="/register" className="font-semibold text-blue-600 ml-2">Register</Link>
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

export default Login;
