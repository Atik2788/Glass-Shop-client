import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from './context/AuthProvider';

const Signup = () => {
    // const [data, setData] = useState("");
    const { createUser, updateUser } = useContext(AuthContext)
    const [signUpError, setSignUpError] = useState('')

    const [createdUserEmail, setCreatedUserEmail] = useState('')

 
    const { register, handleSubmit, formState: { errors } } = useForm();
    // console.log(errors);

    const navigate = useNavigate()
    const location = useLocation();

    const from = location.state?.from?.pathname || '/'


    const handleSignup = (data) => {
        setSignUpError('')

        createUser(data.email, data.password)

            .then(result => {
                const user = result.user;
                // console.log(user)
                toast('User Created Successfully')

                const userInfo = {
                    displayName: data.name,
                    email: data.email,
                    role: data.role,
                }

                updateUser(userInfo)
                    .then(() => {
                        // saveUser(data.name, data.email, data.role)
                        navigate(from, {replace: true}) 
                    })
                    .catch(error => console.error(error))

            })

            .catch(err => {
                setSignUpError(err.message)
                console.error(err)
            })
    }


    // const saveUser = (displayName, email, role) => {
    //     const user = { displayName, email, role }
    //     fetch('', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log(data)

    //             setCreatedUserEmail(email)
    //             navigate(from, {replace: true}) 
    //         })
    // }


    return (
        <div className='lg:w-2/4 mx-auto lg:my-10 px-3 lg:px-0 bg-[#2a2453] rounded-xl md:px-6 my-10 text-center lg:flex justify-center'>
            <div className=' lg:w-[500px]  lg:p-6 p-3 '>
                <p className='text-5xl mb-5 text-white'>Sing Up</p>

                <form className='grid grid-cols-1 gap-3' onSubmit={handleSubmit(handleSignup)}>

                    <div>
                        <label className="label"><span className="label-text text-white">Name</span></label>
                        <input {...register("name", { required: "Name is required" })} type="text" placeholder="Name" className="input input-bordered w-full" />
                        {errors.name && <p className='text-red-600 text-left' role="alert">{errors.name?.message}</p>}
                    </div>

                    <div>
                        <label className="label"><span className="label-text text-white">Email</span></label>
                        <input {...register("email", { required: "Email address is required" })} type="email" placeholder="Email" className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-600 text-left' role="alert">{errors.email?.message}</p>}
                    </div>

                    <div>
                        <label className="label"><span className="label-text text-white">Password</span></label>
                        <input placeholder="Password" type="password"  {...register("password", {
                            required: "Password is required", 
                            minLength: { value: 6, message: 'Password must be 6 characters long' },
                        })} className='input input-bordered w-full ' />

                        <label className="label"><span className="label-text">Forget Password?</span></label>
                        {errors.password && <p className='text-red-600 text-left' role="alert">{errors.password?.message}</p>}
                    </div>

                      {signUpError && <p className='text-red-600 text-left'>{signUpError}</p>}

                    <input className='btn bg-[#301bb5] w-full mt-3' type="submit" />

                </form>
                <p className='mt-4 text-md font-semibold text-left mb-6 text-white'>Already have an account? <Link className='text-blue-700' to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;