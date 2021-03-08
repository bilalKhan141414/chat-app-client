import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import useYupValidation from '../../../shared/custom-hooks/useYupValidation';

export default function Signup() {

    const {formState, errors, handleChange, isFormInValid, resetErrors} = useYupValidation({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
    },
    {
		firstName: Yup.string().min(1,"Please enter user name"),
		lastName: Yup.string().min(1,"Please enter last name"),
		email: Yup.string().min(1,"Please enter email").email("Enter valid email"),
		password: Yup.string().min(8,"Password must be of 8 characters"),
		confirmPassword: Yup.string().min(8,"Confirm password must be of 8 characters"),
	});//end yup validation

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(isFormInValid()){
            return;
        }
        resetErrors();
        //submit form

    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center h-screen px-6">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                        style={{backgroundImage: "url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')"}}
                    ></div>
                    
                    <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleFormSubmit} noValidate>
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                        First Name
                                    </label>
                                    <input
                                        className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${errors.firstName.trim().length > 0 ? "error":""}`}
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        onChange={handleChange}
                                    />
                                    <p className={`text-red-500 text-xs italic ${errors.firstName.trim().length > 0 ? "block":"hidden"}`}>{errors.firstName}</p>
                                </div>
                                <div className="md:ml-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" for="lastName">
                                        Last Name
                                    </label>
                                    <input
                                        className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${errors.lastName.trim().length > 0 ? "error":""}`}
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={handleChange}
                                    />
                                    <p className={`text-red-500 text-xs italic ${errors.lastName.trim().length > 0 ? "block":"hidden"}`}>{errors.lastName}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" for="email">
                                    Email
                                </label>
                                <input
                                    className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${errors.email.trim().length > 0 ? "error":""}`}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                                <p className={`text-red-500 text-xs italic ${errors.email.trim().length > 0 ? "block":"hidden"}`}>{errors.email}</p>
                            </div>
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" for="password">
                                        Password
                                    </label>
                                    <input
                                        className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${errors.password.trim().length > 0 ? "error":""}`}
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="******************"
                                        onChange={handleChange}
                                    />
                                    <p className={`text-red-500 text-xs italic ${errors.password.trim().length > 0 ? "block":"hidden"}`}>{errors.password}</p>
                                </div>
                                <div className="md:ml-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                                        Confirm Password
                                    </label>
                                    <input
                                        className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline  ${errors.confirmPassword.trim().length > 0 ? "error":""}`}
                                        id="c_password"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="******************"
                                        onChange={handleChange}
                                    />
                                    <p className={`text-red-500 text-xs italic ${errors.confirmPassword.trim().length > 0 ? "block":"hidden"}`}>{errors.confirmPassword}</p>
                                </div>
                            </div>
                            <div className="mb-6 text-center">
                                <button
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Register Account
                                </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            {/* <div className="text-center">
                                <a
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    href="#"
                                >
                                    Forgot Password?
                                </a>
                            </div> */}
                            <div className="text-center">
                                <Link
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    to="/login"
                                >
                                    Already have an account? Login!
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
