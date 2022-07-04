import { Label, Checkbox } from 'flowbite-react';
import React from 'react'
import { Link } from 'react-router-dom';
import * as yup from "yup";
import MySwal from "../services/swal";
import { Formik, Form, Field } from "formik";
import loginImg from '../public/img/Login-Image.jpg';

const SignIn:React.FC = () => {

    type signInData = {
        email: string;
        password: string;
    };

    const signInSchema = yup.object().shape({
        email: yup.string()
            .email("Email is required")
            .required(),
        password: yup.string()
            .required("password is a required field")
            .min(8),
    });

    const handleSignIn = async (values: signInData) => {
        try {
          await signInSchema.validate(values);
          MySwal.fire({
            title: <p>Success!</p>,
            html: <p>You have logged in your account!</p>,
            icon: "success",
          });
        } catch (error) {
          MySwal.fire({
            title: <p>Error</p>,
            html: (
              <p>
                Please verify that your email and password is properly
                inserted!
              </p>
            ),
            icon: "error",
          });
        }
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
            
            <div className="bg-gray-800 flex flex-col justify-center">
                <Formik
                initialValues={{
                    email:"",
                    password:"",
                }}
                validationSchema={signInSchema}
                onSubmit={handleSignIn}
                >
                    {({ errors, touched }) => (
                        <Form 
                            className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
                        >
                            <h1 className="text-4xl dark:text-white font-bold text-center">
                                Sign In
                            </h1>
                            <div className="flex flex-col text-gray-400 py-2">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email1"
                                        value="E-mail"
                                    />
                                </div>
                                <Field 
                                    className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" 
                                    type="email" 
                                    name="email" 
                                    id="email"
                                    placeholder="E-mail"
                                />
                                {errors.email && touched.email ? (
                                <div className="text-red-500 mt-1">{errors.email}</div>
                                ) : null}
                            </div>
                            <div className="flex flex-col text-gray-400 py-2">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="password1"
                                        value="Password"
                                    />
                                </div>
                                <Field
                                    className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    placeholder="Password"
                                />
                                {errors.password && touched.password ? (
                                <div className="text-red-500 mt-1">{errors.password}</div>
                                ) : null}
                            </div>
                            <div className="text-gray-400 py-2 flex">
                                <p className='mr-3'>
                                <Checkbox required id="agree" />
                                </p>
                                <p>
                                <Label htmlFor="agree">                           
                                    Remember me                                    
                                </Label>
                                </p>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 text-gray-300 font-sans text-xl font-semibold rounded-lg"
                            >
                                LOGIN
                            </button>
                            <div className="mt-2 flex justify-center text-white py-1">                   
                            <p>
                                Don't have and account? create{" "} 
                                <Link className="text-blue-500" to="/sign-up">
                                    here
                                </Link>{" "} 
                            </p>   
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="hidden sm:block">
                <img 
                className="w-full h-full object-cover" 
                src={loginImg} alt=""
                />
            </div>
        </div>
    );
};

export default SignIn;