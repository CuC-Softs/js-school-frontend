import { Label, Checkbox } from 'flowbite-react';
import React from 'react'
import { Link } from 'react-router-dom';
import * as yup from "yup";
import MySwal from "../services/swal";
import { Formik, Form, Field } from "formik";
import loginImg from '../public/img/Login-Image.jpg';

const SignUp:React.FC = () => {

    type signUpData = {
        name: string,
        email: string;
        password: string;
        password_confirmation: string,
    };

    const signUpSchema = yup.object().shape({
        name: yup.string()
            .required()
            .min(2)
            .max(50),
        email: yup.string()
            .email("Email is required")
            .required(),
        password: yup.string()
            .required("password is a required field")
            .min(8, "A Senha precisa ter no mínimo 8 caracteres"),
        password_confirmation: yup.string()
            .required("password doesn't match")
            .oneOf([yup.ref("password"), null], "password doesn't match")
    });

    const handleSignUp = async (values: signUpData) => {
        try {
          await signUpSchema.validate(values);
          MySwal.fire({
            title: <p>Success!</p>,
            html: <p>You already register your account!</p>,
            icon: "success",
          });
        } catch (error) {
          MySwal.fire({
            title: <p>Error</p>,
            html: (
              <p>
                Please verify that your name, email and password is properly
                inserted!
              </p>
            ),
            icon: "error",
          });
        }
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
            <div className="hidden sm:block">
                <img 
                className="w-full h-full object-cover" 
                src={loginImg} alt=""
                />
            </div>
            <div className="bg-gray-800 flex flex-col justify-center">
                <Formik
                initialValues={{
                    name: "",
                    email:"",
                    password:"",
                    password_confirmation:"",
                }}
                validationSchema={signUpSchema}
                onSubmit={handleSignUp}
                >
                    {({ errors, touched }) => (
                        <Form 
                            className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
                        >
                            <h1 className="text-4xl dark:text-white font-bold text-center">
                                Sign Up
                            </h1>
                            <div className="flex flex-col text-gray-400 py-2">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="name1"
                                        value="Name"
                                    />
                                </div>
                                <Field 
                                    className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" 
                                    type="text" 
                                    name="name" 
                                    id="name"
                                    placeholder="Name"
                                />
                                {errors.name && touched.name ? (
                                <div className="text-red-500 mt-1">{errors.name}</div>
                                ) : null}
                            </div>
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
                            <div className="flex flex-col text-gray-400 py-2">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="password_confirmation1"
                                        value="Password confirmation"
                                    />
                                </div>
                                <Field 
                                    className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" 
                                    type="password" 
                                    name="password_confirmation" 
                                    id="password_confirmation"
                                    placeholder="Password confirmation"
                                />
                                {errors.password_confirmation && touched.password_confirmation ? (
                                <div className="text-red-500 mt-1">{errors.password_confirmation}</div>
                                ) : null}
                            </div>
                            <div className="text-gray-400 py-2 flex">
                                <p className='mr-3'>
                                <Checkbox required id="agree" />
                                </p>
                                <p>
                                <Label htmlFor="agree">
                                    I agree with the{" "}
                                    <a
                                    href="/forms"
                                    className="text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                    terms and conditions
                                    </a>
                                </Label>
                                </p>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/25 hover:shadow-cyan-500/50 text-gray-300 font-sans text-xl font-semibold rounded-lg"
                            >
                                REGISTER
                            </button>
                            <div className="mt-2 flex justify-center text-white py-1">                   
                            <p>
                                Do you have an account? sign in{" "} 
                                <Link className="text-blue-500" to="/sign-in">
                                    here
                                </Link>{" "} 
                            </p>   
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SignUp;