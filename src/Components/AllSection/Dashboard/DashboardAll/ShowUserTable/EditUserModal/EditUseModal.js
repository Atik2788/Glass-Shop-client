import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Form as form } from 'react-router-dom';

const EditUseModal = ({ editUserData, setEditUserData, refetch }) => {


    const { register, handleSubmit, formState: { errors } } = useForm();

    const imgHostKey = process.env.REACT_APP_imgbb_key;



    if (!editUserData) {
        return
    }
    // console.log(data['2'])


    const handleEditUser = (data) => {
        // console.log(data.img[0])

        const img = data.img[0]
        // console.log(img)


        if (img) {

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

                        fetch(`https://glass-shop-server.vercel.app/user/${editUserData?._id}`, {
                            method: 'PUT',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(userData)
                        })
                            .then(res => res.json())
                            .then(data => {
                                // console.log(data)

                                if (data.acknowledged) {
                                    setEditUserData(null)
                                    toast('Edit User Successfully')
                                    refetch()
                                }
                                else {
                                    toast(data.message)
                                }
                            })
                    }
                })
        }

        else {
            const userData = {
                name: data.name,
                userName: data.userName,
                email: data.email,
                img: editUserData.img,
                role: data.role,
                plan: data.plan,
                status: data.status,
            }

            fetch(`https://glass-shop-server.vercel.app/user/${editUserData?._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)

                    if (data.acknowledged) {
                        setEditUserData(null)
                        toast('Edit User Successfully')
                        refetch()
                    }
                    else {
                        toast(data.message)
                    }
                })
        }
    }

    return (
        <>
            <input type="checkbox" id="edit-user-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={() => setEditUserData(null)} htmlFor="edit-user-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div>
                        <p className='text-xl font-bold'>Edit User</p>

                        <div className='mt-5'>




                            <form onSubmit={handleSubmit(handleEditUser)}>

                                <div className="form-control w-full ">
                                    <label className="label"><span className="label-text">Name</span></label>
                                    <input type="text" {...register("name", { value: `${editUserData.name}` })} className='input input-bordered w-full ' />
                                </div>

                                <div className="form-control w-full ">
                                    <label className="label"><span className="label-text">User Name</span></label>
                                    <input type="text"  {...register("userName", { value: `${editUserData.userName}` })} className='input input-bordered w-full ' />
                                </div>


                                <div className="form-control w-full ">
                                    <label className="label"><span className="label-text">Email</span></label>
                                    <input type="email"  {...register("email", { value: `${editUserData.email}` })} className='input input-bordered w-full ' />
                                </div>

                                <div>
                                    <label className="label"><span className="label-text">Please Select Image</span></label>
                                    <input {...register("img", { /* required: "Image is required", */ /* value: `${editUserData.img}` */ })} type="file" placeholder="Image" className="input input-bordered pt-2 w-full" />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Please Select a Role</span></label>
                                    <select className=' input input-bordered w-full' {...register("role")}>
                                        <option value={editUserData.role}>{editUserData.role}</option>
                                        <option value="Author">Author</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Editor">Editor</option>
                                    </select>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Please Select a Plan</span></label>
                                    <select className=' input input-bordered w-full' {...register("plan")}>
                                        <option value={editUserData.plan}>{editUserData.plan}</option>
                                        <option value="Enterprise">Enterprise</option>
                                        <option value="Team">Team</option>
                                        <option value="Company">Company</option>
                                    </select>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text">Please Select Status</span></label>
                                    <select className=' input input-bordered w-full' {...register("status")}>
                                        <option value={editUserData.status}>{editUserData.status}</option>
                                        <option value="Active">Active</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>

                                <input className='btn btn-accent w-full btnCss mt-3' value='Edit User' type="submit" />
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditUseModal;