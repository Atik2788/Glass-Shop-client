import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Form as form } from 'react-router-dom';

const ResAddUser = ({ refetch, setEditUserData }) => {


    const { register, handleSubmit, formState: { errors } } = useForm();

    const imgHostKey = process.env.REACT_APP_imgbb_key;


    const handleEditUser = (data) => {

        const img = data.img[0]


        // post img in imgbb and get url

        const formData = new FormData()
        formData.append('image', img)

        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // console.log(imgData.data.url)
                const imageData = imgData.data.url;

                // after getting url, send below data in backend  ***********
                if (imgData) {
                    const userData = {
                        name: data.name,
                        userName: data.userName,
                        email: data.email,
                        img: imgData.data.url,
                        role: data.role,
                        plan: data.plan,
                        status: data.status,
                    }

                    fetch('https://glass-shop-server.vercel.app/user', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data)

                            if (data.acknowledged) {
                                toast('Add User Successfully')
                                refetch()
                                setEditUserData(null)
                            }
                            else {
                                toast(data.message)
                            }
                        })
                }
            })
    }


    return (
        <>
            <input type="checkbox" id="add-user-modal-res" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="add-user-modal-res" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div>
                        <p className='text-xl font-bold'>Add User Res</p>

                        <div className='mt-5'>
                            <form onSubmit={handleSubmit(handleEditUser)}>

                                <div className="form-control w-full ">
                                    <label className="label"><span className="label-text">Name</span></label>
                                    <input type="text" {...register("name", { required: "Name is required" })} className='input input-bordered w-full ' />
                                    {errors.name && <p className='text-red-600 text-left' role="alert">{errors.name?.message}</p>}

                                </div>

                                <div className="form-control w-full ">
                                    <label className="label"><span className="label-text">User Name</span></label>
                                    <input type="text"  {...register("userName", { required: "User name is required" })} className='input input-bordered w-full ' />
                                    {errors.userName && <p className='text-red-600 text-left' role="alert">{errors.userName?.message}</p>}

                                </div>


                                <div className="form-control w-full ">
                                    <label className="label"><span className="label-text">Email</span></label>
                                    <input type="email"  {...register("email", { required: "Email is required" })} className='input input-bordered w-full ' />
                                    {errors.email && <p className='text-red-600 text-left' role="alert">{errors.email?.message}</p>}

                                </div>

                                <div>
                                    <label className="label"><span className="label-text">Please Select Image</span></label>
                                    <input {...register("img", { required: "Image is required" })} type="file" placeholder="Image" className="input input-bordered pt-2 w-full" />
                                    {errors.img && <p className='text-red-600 text-left' role="alert">{errors.img?.message}</p>}

                                </div>

                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Please Select a Role</span></label>
                                    <select className=' input input-bordered w-full' {...register("role", { required: true })}>
                                        <option value="Author">Author</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Editor">Editor</option>
                                    </select>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Please Select a Plan</span></label>
                                    <select className=' input input-bordered w-full' {...register("plan", { required: true })}>
                                        <option value="Enterprise">Enterprise</option>
                                        <option value="Team">Team</option>
                                        <option value="Company">Company</option>
                                    </select>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Please Select Status</span></label>
                                    <select className=' input input-bordered w-full' {...register("status", { required: true })}>
                                        <option value="Active">Active</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>

                                <input className='btn btn-accent w-full btnCss mt-3' value='Add User' type="submit" />
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResAddUser;
