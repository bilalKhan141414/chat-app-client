import React from 'react';
import moment from 'moment';
import * as Yup from 'yup';
import useYupValidation from '../../../shared/custom-hooks/useYupValidation';
import { Link } from 'react-router-dom';

export default function Login() {
    const {
        formState, 
        errors, 
        handleChange, 
        isFormInValid, 
        resetErrors
    } = useYupValidation({
        email:'',
        password:''
    },
    {
		email: Yup.string().min(1,"Please Enter User Name"),
		password: Yup.string().min(1,"Please Enter Password"),
	});//end yup validation

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("isFormInValid()",isFormInValid())
        if(isFormInValid()){
            return;
        }
        resetErrors();
        //submit form
    }
    return (
        <div className="flex justify-center">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 my-32" onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline ${errors.email.trim().length > 0 ? "error":""}`} id="email" name="email" type="text" placeholder="Email" onChange={handleChange}/>
                        <p className={`text-red-500 text-xs italic ${errors.email.trim().length > 0 ? "block":"hidden"}`}>{errors.email}</p>
                    </div>
                    <div className="mb-6">
                        <label className="block text-grey-darker text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password.trim().length > 0 ? "error":""}`} id="password" name="password" type="password" placeholder="******************"  onChange={handleChange}/>
                        <p className={`text-red-500 text-xs italic ${errors.password.trim().length > 0 ? "block":"hidden"}`}>{errors.password}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue hover:bg-blue-dark text-black bg-gray-100 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                        <Link className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" to="/">
                            Or Sign Up
                        </Link>
                    </div>
                </form>
                <p className="text-center text-grey text-xs">
                    ©{moment().format("Y")} Bilal. All rights reserved.
                </p>
            </div>
            </div>
    )
}
