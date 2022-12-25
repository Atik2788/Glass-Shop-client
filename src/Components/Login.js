import React, { useContext, useState } from 'react';
import { AuthContext } from './context/AuthProvider';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, googleLogIn, updateUser } = useContext(AuthContext)

    const [loginError, setLoginError] = useState()
    const { register, handleSubmit } = useForm();


    const navigate = useNavigate()
    const location = useLocation();

    const from = location.state?.from?.pathname || '/'


    const handleLogin = (data) => {
        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                toast('User Login Successfully')
                navigate(from, {replace: true}) 
            })
            .catch(err => {
                console.error(err.message)
                setLoginError(err.message)
            })
    }



        // google log in
        const handleGoogleLogIn = () => {
            googleLogIn()
                .then(result => {
                    const user = result.user;
                    // console.log(user)
                    toast('Google Login Successfully')
                    const userInfo = {
                        displayName: user.displayName,
                        email: user.email,
                        role: 'buyer',
                    }
                    // console.log(userInfo);
    
                    updateUser(userInfo)
                        .then(() => {
                            // saveUser(user.displayName, user.email, 'buyer')
                            navigate(from, {replace: true}) 
                        })
                        .catch(error => console.error(error))
                })
    
                .catch(err => console.error(err))
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
        //             navigate(from, {replace: true}) 
    
        //         })
        // }


    return (
        <div className='lg:w-2/4 mx-auto lg:my-20 my-5 px-3 lg:px-0 md:px-6 text-center lg:flex justify-center'>
            <div className='shadow-xl lg:w-[500px] bg-[#bdd0fd] rounded-xl lg:p-6 p-3'>
                <p className='text-5xl mb-5 titleColor'>Login</p>

                <form className='grid grid-cols-1 gap-3' onSubmit={handleSubmit(handleLogin)}>

                    <div>
                        <label className="label"><span className="label-text titleColor">Email</span></label>
                        <input {...register("email", { required: true })} type="email" placeholder="Email" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label"><span className="label-text titleColor">Password</span></label>
                        <input {...register("password", { required: true })} type="password" placeholder="Password" className="input input-bordered w-full" />
                        <label className="label"><span className="label-text titleColor">Forget Password?</span></label>
                    </div>

                    <p className='text-red-600 text-left'>{loginError}</p>
                    <input className='btn btnCss w-full mt-3 ' type="submit" value="Login"/>
                </form>

                <p className='mt-3 text-md font-semibold text-left mb-6 text-black'>New to Glass Shop? <Link className='titleColor' to='/signup'> Create an account.</Link></p>
                <div className="divider titleColor">OR</div>
                <button onClick={handleGoogleLogIn} className='w-full p-3 btn-outline btnCss rounded-lg border-2 text-white border-slate-500'>CONTINUE WITH GOOGLE</button>

            </div>
        </div>
    );
};

export default Login;