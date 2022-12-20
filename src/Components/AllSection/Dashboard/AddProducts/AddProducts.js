import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const AddProducts = () => {

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    // console.log(imageHostKey)

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();


    const [quantity, setQuantity] = useState(1)

    const handleAddProducts = (data) => {
        console.log(data.img[0])

        // set img into imgbb and get url
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData)
                if (imgData.success) {
                    // console.log(imgData.data.url)

                    const productsInfo = {
                        name: data.name,
                        description: data.description,
                        img: imgData.data.url,
                        price: data.price,
                        quantity: quantity

                    }

                    fetch('https://glass-shop-server.vercel.app/productsGlass', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(productsInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)

                            if (data.acknowledged) {
                                setQuantity(1)
                                toast('Products Add Successfully')
                                navigate('/dashboardlayout/allProducts')
                            }
                            else {
                                toast(data.message)
                            }
                        })
                }
            })

        // console.log(productsInfo);
    }

    return (
        <div className='w-8/12 mx-auto '>
            <p className='text-5xl mb-5 text-white mt-5 font-bold text-center'>Add Products</p>


            <form className='' onSubmit={handleSubmit(handleAddProducts)}>

                <div className=''>

                    <div>
                        <label className="label"><span className="label-text text-xl text-white mt-5">Sun Glass Name</span></label>
                        <input {...register("name", { required: "Sun Glass Name is required" })} type="text" placeholder="Sun Glass Name" className="input input-bordered w-full" />
                        {errors.name && <p className='text-red-600 text-left' role="alert">{errors.name?.message}</p>}
                    </div>

                    <div>
                        <label className="label"><span className="label-text text-xl text-white mt-5">Select Image</span></label>
                        <input {...register("img", { required: "Image is required" })} type="file" placeholder="Image" className="input input-bordered pt-2 w-full" />
                        {errors.img && <p className='text-red-600 text-left' role="alert">{errors.img?.message}</p>}
                    </div>


                    <div>
                        <label className="label"><span className="label-text text-xl text-white mt-5">Description</span></label>
                        <input type="text"  {...register("description", { required: "Description is required" })}
                            className='input input-bordered w-full ' placeholder='Description' />
                        {errors.description && <p className='text-red-600 text-left' role="alert">{errors.description?.message}</p>}
                    </div>

                    <div>
                        <label className="label"><span className="label-text text-xl text-white mt-5">Price</span></label>
                        <input type="text"  {...register("price", { required: "Price is required" })}
                            className='input input-bordered w-full' placeholder='Price' />
                        {errors.price && <p className='text-red-600 text-left' role="alert">{errors.price?.message}</p>}
                    </div>

                    <div className='flex mt-8  mb-1'>
                        <label className="label"><span className="label-text text-xl text-white mr-3">Quantity</span></label>
                        <p className='pt-[6px]'>
                            {
                                quantity === 1 ?
                                    <span className="btn bg-[#301bb5] hover:bg-[#1b1bee] text-xl">-</span>
                                    :
                                    <span className="btn bg-[#301bb5] hover:bg-[#1b1bee] text-xl" onClick={() => setQuantity(quantity - 1)}>-</span>
                            }
                            <span className="mx-5 text-white mt-5 text-xl">{quantity}</span>
                            <span className="btn bg-[#301bb5] hover:bg-[#1b1bee] text-xl" onClick={() => setQuantity(quantity + 1)}>+</span>
                        </p>
                    </div>

                </div>

                <input className='btn bg-[#301bb5] lg:w-1/4 w-full mx-auto mt-10 mb-20' type="submit" />

            </form>
        </div>
    );
};

export default AddProducts;