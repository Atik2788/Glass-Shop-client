import React, { useState } from 'react';
import { ImCheckboxUnchecked } from "react-icons/im";
import { toast } from 'react-hot-toast';
import pc from '../../../../../../../images/pc.png'
import settings from '../../../../../../../images/settings.png'
import pen from '../../../../../../../images/pen.png'



const ResAllUserRow = ({ pdfShowImg, setEditUserData, refetch, userData, toggleAll, toggleUser, toggleEmail, toggleRole, togglePlan, toggleStatus, toggleAction }) => {
    const { name, _id, email, userName, img, plan, role, status } = userData;
    // console.log(status)


    const handleDeleteProducts = (id) => {

        fetch(`https://glass-shop-server.vercel.app/user/${id}`, {
            method: 'DELETE',
            headers: {}
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    console.log('delete done');
                    toast('User Delete successfully!!')
                    refetch();
                }
                else {
                    toast.error(data.message)
                }
            })
    }

    return (
        <>
            {toggleAll &&
                <tr className='border-y-2 text-left  bg-[#F9FAFC]     '>

                    {toggleUser &&
                        <td className='pl-5 hover:bg-slate-300'> <p>
                            {!pdfShowImg ?
                                <ImCheckboxUnchecked />
                                :
                                <div className='pt-2'><p className='ticBeforeUaserImg '></p></div>
                            }
                        </p></td>
                    }

                    {toggleUser ?
                        <td className='flex gap-3 ml-2 hover:bg-slate-300'>

                            <img className='w-12 h-12 rounded-full my-2' src={img} alt="" />

                            <div className='flex items-center'>
                                <div>
                                    <p className=' text-sm'>{name}</p>
                                    <p className='text-xs'>{userName}</p>
                                </div>
                            </div>
                        </td>
                        :
                        <></>
                    }

                    {toggleEmail &&
                        <td className='pl-5 text-sm hover:bg-slate-300'>{email}</td>
                    }

                    {/* {toggleRole &&
                        <td className='pl-5 text-sm hover:bg-slate-300'>{role}</td>
                    } */}

                     {toggleRole &&
                        <td className='pl-5 text-sm hover:bg-slate-300'>
                            {role === 'Admin' &&
                            <p className='text-black flex items-center'><img className='w-5 mr-3' src={pc} alt="" />{role}</p>}

                            {role === 'Editor' &&
                            <p className='text-black flex items-center'><img className='w-5 mr-3' src={pen} alt="" />{role}</p>}

                            {role === 'Author' &&
                            <p className='text-black flex items-center'><img className='w-5 mr-3' src={settings} alt="" />{role}</p>}
                        </td>
                    }

                    {togglePlan &&
                        <td className='pl-5 text-sm hover:bg-slate-300'>{plan}</td>
                    }

                    {toggleStatus &&

                        <td className='pl-5 text-sm hover:bg-slate-300'>
                            {status === 'Active' &&

                                <p className='activeBtn text-center'>{status}</p>
                            }
                            {status === 'Pending' &&
                                <p className='pendingBtn text-center'>{status}</p>
                            }
                            {status === 'Inactive' &&
                                <p className='inactiveBtn text-center'>{status}</p>
                            }
                        </td>
                    }

                    {toggleAction &&
                        <td className='pl-10 font-bold'>
                            <div className="menu">
                                <li tabIndex={0}>
                                    <span className='font-bold hover:bg-slate-300'>:</span>
                                    <ul className=" text-black bg-slate-300 w-40 ml-[-219px] mt-[0px]">
                                        <label htmlFor="edit-user-modal-res" className='bg-bg-slate-200 hover:bg-slate-400  p-2' onClick={() => setEditUserData(userData)}>Edit</label>
                                        {/* <li htmlFor="edit-user-modal" className='bg-bg-slate-200 hover:bg-slate-400  p-2' onClick={() => setEditUserData(userData)}>Edit</li> */}
                                        <li className='bg-bg-slate-200 hover:bg-slate-400 p-2' onClick={() => handleDeleteProducts(_id)}>Delete</li>
                                    </ul>
                                </li>
                            </div>
                        </td>
                    }


                </tr>

            }

        </>
    );
};

export default ResAllUserRow;


