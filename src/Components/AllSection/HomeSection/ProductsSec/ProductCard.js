import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const ProductCard = ({ glassData, refetch }) => {
    const { img, name, description, price, _id } = glassData
    const { user, logOut } = useContext(AuthContext)
    // console.log(user)

    const [quantity, setQuantity] = useState(1)


    const handleDeleteProducts = (_id) => {

        fetch(`https://glass-shop-server.vercel.app/productsGlass/${_id}`, {
            method: 'DELETE',
            headers: {}
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    console.log('delete done');
                    toast(`Delete ${name} successfully!!`)
                    refetch();
                }
                else {
                    toast.error(data.message)
                }
            })
    }


    const handleOrder = () => {
        // console.log(glassData)

        const orderInfo = {
            buyerName: user.displayName,
            buyerEmail: user.email,
            productName: name,
            productId: _id,
            quantity: quantity,
            totalPrice: parseInt(price) * quantity
        }
        // console.log(orderInfo);


        fetch('https://glass-shop-server.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.acknowledged) {
                    setQuantity(0)
                    toast('Booking Confirm!!')
                }
                else {
                    toast(data.message)
                }
            })
    }

    return (
        <div>
            <div className="card  bg-[#d6e0f9] shadow-xl px-2 mb-5 pt-2 text-black">
                <figure><img className='h-80 w-[440px] rounded-t-xl' src={img} alt="Album" /></figure>
                <div className="my-5">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className=''>{description}</p>
                    <div className='my-3 '>
                        <p className='mr-10'>Price: ${price}</p>

                        <div className='flex justify-center content-center mt-3'>
                            <p className='pt-1'>Quantity: </p>
                            {
                                quantity === 1 ?
                                    <span className='mx-3 px-[14px] pt-1 pb-[8px] rounded-[5px]  btnCss'><button>-</button></span>
                                    :
                                    <span onClick={() => setQuantity(quantity - 1)} className='mx-3 px-[14px] pt-1 pb-[8px] rounded-[5px] btnCss'><button>-</button></span>
                            }
                            <span className='pt-1'>{quantity}</span>
                            <span onClick={() => setQuantity(quantity + 1)} className='mx-3 px-3 pt-1 pb-[8px] rounded-[5px] btnCss'><button>+</button></span>
                        </div>
                    </div>

                    <div className=" mt-10">
                        {user?.email ?
                            <div>
                                {
                                    user?.email === "admin@gmail.com" ?
                                        <button className="btn btnCss" onClick={() => handleDeleteProducts(_id)}>Delete</button>
                                        :
                                        <button onClick={() => handleOrder()} className="btn bg-btnCss">Add To Cart</button>
                                }
                            </div>
                            :
                            <Link to='/login'><button className="btn btnCss">Please Log in to add product</button></Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;