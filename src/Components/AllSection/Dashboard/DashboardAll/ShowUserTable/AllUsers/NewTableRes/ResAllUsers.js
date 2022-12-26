import React, { useRef, useState } from 'react';
import { BsRecordCircle, BsCircle, BsCircleFill } from "react-icons/bs";
import { ImCheckboxUnchecked } from "react-icons/im";
import { MdIosShare } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import jsPDF from 'jspdf'
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-hot-toast';
import Typewriter from 'typewriter-effect';

import ResExcl from './ResExcl/ResExcl';
import ResAllUserRow from './ResAllUserRow';
import ResEditModal from './ResEditAndAdd/ResEditModal';
import ResAddUser from './ResEditAndAdd/ResAddUser';


// install npm*****************
// npm i typewriter-effect
// npm i @tanstack/react-query
// npm install react-icons --save
//npm i xlsx
// install npm*****************


const ResAllUsers = () => {

    const [pdfShow, setPdfShow] = useState(false)
    const [pdfShowImg, setPdfShowImg] = useState(false)

    const [actionShow, setActionShow] = useState(true)



    const [editUserData, setEditUserData] = useState(null)
    // console.log(editUserData);

    const [toggleAll, setToggleAll] = useState(true)
    const [toggleUser, setToggleUser] = useState(true)
    const [toggleEmail, setToggleEmail] = useState(true)
    const [toggleRole, setToggleRole] = useState(true)
    const [togglePlan, setTogglePlan] = useState(true)
    const [toggleStatus, setToggleStatus] = useState(true)
    const [toggleAction, setToggleAction] = useState(true)

    // console.log(toggleAction)



    const [employerData, setEmployerData] = useState('')
    // console.log(employerData)

    const [order, setOrder] = useState("ASC")

    const sorting = (col) => {
        // console.log('clicked');

        if (order === "ASC") {
            const sorted = [...employerData].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setEmployerData(sorted)
            setOrder("DEC")
        }
        if (order === "DEC") {
            const sorted = [...employerData].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setEmployerData(sorted)
            setOrder("ASC")
        }
    }


    const nameSorting = (col) => {

        if (order === "ASC") {
            const sorted = [...employerData].sort((a, b) =>
                a[col].name.toLowerCase() > b[col].name.toLowerCase() ? 1 : -1
            );
            setEmployerData(sorted)
            setOrder("DEC")
        }
        if (order === "DEC") {
            const sorted = [...employerData].sort((a, b) =>
                a[col].name.toLowerCase() < b[col].name.toLowerCase() ? 1 : -1
            );
            setEmployerData(sorted)
            setOrder("ASC")
        }

    }


    const { data: userDatas = [], refetch } = useQuery({
        queryKey: ['glasses'],
        queryFn: async () => {
            const res = await fetch('https://glass-shop-server.vercel.app/user')
            const data = await res.json()
            return data;
        }
    })

    // console.log(userDatas);




    // for pdf button
    const handlePDF = () => {
        const doc = new jsPDF("l", "pt", "a3")
        doc.html(document.querySelector("#pdfFull"), {
            callback: function (pdf) {
                pdf.save("UserData.pdf");
                setPdfShow(false)
                setPdfShowImg(false)
                setActionShow(true)
            }
        });

    }
    // for pdf button
    const handlePdfShow = () => {
        setActionShow(false)
        setPdfShowImg(true)
        setPdfShow(true)
        handlePDF()
        toast('Download PDF Successfully!!')
    }




    // print page
    const [titlePrint, setTitlePrint] = useState(true)

    const handlePrintUser = (data) => {
        setTitlePrint(false)
        setActionShow(false)
        // handlePrint()
        handleClick()
    }

    const handleClick = () => {
        // setTime out for time delay,
        setTimeout(() => {
            handlePrint()
            setTitlePrint(true)
            setActionShow(true)
        }, 1000)
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'TableData',
        // onafterprint: () => setPdfShow(false),
        onafterprint: () => toast('Print Successfully!!')
    })





    return (
        <div id='total-page'>
            <div className='mt-10 mb-20 mx-[20px]'>



                <div className='mb-7 text-left text-4xl titleColor print-container'>
                    <Typewriter
                        options={{
                            autoStart: true,
                            loop: true,
                            delay: 120,
                            strings: [
                                'All Users',
                            ]
                        }}
                    />
                </div>

                <div className='bg-white'>

                    <div className='lg:flex justify-between pt-7'>

                        <div className=' text-left lg:flex grid grid-cols-1 gap-3 md:grid-cols-2'>
                            <button onClick={handlePdfShow} className='ml-5 pdfBorder hover:text-[#9155FD] hover:bg-[#F4F5FA] text-sm py-2 textColor px-5'><span className='flex justify-center items-center'> <span className='mr-3'><MdIosShare /></span> <span>PDF</span></span></button>
                            <button className='ml-5 pdfBorder hover:bg-[#F4F5FA] text-sm py-2 textColor px-5 hover:text-[#9155FD]'><ResExcl userDatas={userDatas}></ResExcl></button>

                            <button onClick={() => handlePrintUser('')} className='ml-5 pdfBorder hover:text-[#9155FD] hover:bg-[#F4F5FA] text-sm py-2 textColor px-5'><span className='flex justify-center items-center'> <span className='mr-3'><MdIosShare /></span> <span>PRINT</span></span></button>

                            <button className=''>
                                <div className="ml-5 pdfBorder hover:bg-[#F4F5FA] text-sm py-2 textColor px-5 hover:text-[#9155FD]">

                                    <span className='dropdownContainer-2 z-10'>
                                        <span className=''><span>SHOW/HIDE COLUMN</span></span>

                                        <div className="w-36 lg:ml-[140px] lg:mt-[-30px] md:ml-[70px] md:mt-[0px] ml-[30px] mt-[px] dropdownContent-2">

                                            <li>
                                                {
                                                    toggleAll ?
                                                        <span onClick={() => setToggleAll(!toggleAll)} className='textColor text-left'><span className='flex items-center justify-between'><span className='mr-3'>All Column</span> <BsCircleFill /></span></span>
                                                        :
                                                        <span onClick={() => setToggleAll(!toggleAll)} className='textColor text-left'><span className="flex items-center justify-between"><span className='mr-3'>All Column</span><BsCircle /></span></span>
                                                }
                                            </li>

                                            <li>
                                                {
                                                    toggleUser ?
                                                        <span onClick={() => setToggleUser(!toggleUser)} className='textColor text-left'><span className="flex items-center justify-between"><span className="mr-3">User</span><BsCircleFill /></span></span>
                                                        :
                                                        <span onClick={() => setToggleUser(!toggleUser)} className='textColor text-left'><span className="flex items-center justify-between"><span className="mr-3">User</span><BsCircle /></span></span>
                                                }
                                            </li>

                                            <li>
                                                {
                                                    toggleEmail ?
                                                        <span onClick={() => setToggleEmail(!toggleEmail)} className='textColor text-left'><span className="flex items-center justify-between"><span className="mr-3">Email</span><BsCircleFill /></span></span>
                                                        :
                                                        <span onClick={() => setToggleEmail(!toggleEmail)} className='textColor text-left'><span className="flex items-center justify-between"><span className="mr-3">Email</span><BsCircle /></span></span>
                                                }
                                            </li>

                                            <li>
                                                {
                                                    toggleRole ?
                                                        <span onClick={() => setToggleRole(!toggleRole)} className='textColor text-left'><span className="flex items-center justify-between"><span className="mr-3">Role</span><BsCircleFill /></span></span>
                                                        :
                                                        <span onClick={() => setToggleRole(!toggleRole)} className='textColor text-left'><span className="flex items-center justify-between"><span className="mr-3">Role</span><BsCircle /></span></span>
                                                }
                                            </li>

                                            <li>
                                                {
                                                    togglePlan ?
                                                        <span onClick={() => setTogglePlan(!togglePlan)} className='textColor text-left'><span className="flex items-center justify-between"><span className="mr-3">PLAN</span><BsCircleFill /></span></span>
                                                        :
                                                        <span onClick={() => setTogglePlan(!togglePlan)} className='textColor text-left'><span className="flex items-center justify-between"><span className="mr-3">PLAN</span><BsCircle /></span></span>
                                                }
                                            </li>

                                            <li>
                                                {
                                                    toggleStatus ?
                                                        <span onClick={() => setToggleStatus(!toggleStatus)} className='textColor text-left'><span className="flex items-center justify-between"><span className="mr-3">STATUS</span><BsCircleFill /></span></span>
                                                        :
                                                        <span onClick={() => setToggleStatus(!toggleStatus)} className='textColor text-left'><span className="flex items-center justify-between"><span className="mr-3">STATUS</span><BsCircle /></span></span>
                                                }
                                            </li>

                                            <li>
                                                {
                                                    toggleAction ?
                                                        <span onClick={() => setToggleAction(!toggleAction)} className='textColor text-left'><span className="flex items-center justify-between"><span className="mr-3">ACTION</span><BsCircleFill /></span></span>
                                                        :
                                                        <span onClick={() => setToggleAction(!toggleAction)} className='textColor text-left'><span className="flex items-center justify-between"><span className="mr-3">ACTION</span><BsCircle /></span></span>
                                                }
                                            </li>

                                        </div>
                                    </span>
                                </div>

                            </button>
                        </div>

                        <div className='lg:flex grid grid-cols-1 gap-3 mt-4 lg:mt-0 text-right'>
                            <input className='ml-5 pdfBorder text-sm py-2 textColor pl-5' type="text" placeholder='Search Invoice' />
                            <button className='ml-5 mr-5 pdfBorder text-sm py-2 px-5  btnCss'>
                                <label htmlFor="add-user-modal-res" onClick={() => setEditUserData('Added')}>ADD USER</label>
                            </button>

                        </div>
                    </div>


                    <div id='pdfFull' ref={componentRef} className='PRINT-PAGE' >
                        {pdfShow &&
                            <h2 className='text-center titleColor text-4xl mb-10 mt-10'>All Users Page Res</h2>
                        }

                        {!titlePrint &&
                            <h2 className='text-center titleColor text-4xl mb-10 mt-10'>All Users Page Res</h2>
                        }
                        <table className="mt-7 w-full" >

                            <thead className=''>
                                {toggleAll ?
                                    <tr className=''>

                                        {toggleUser &&

                                            <th className=' text-sm pl-5  hover:bg-slate-300' onClick={() => nameSorting("person")}>
                                                {!pdfShowImg ?
                                                    <ImCheckboxUnchecked />
                                                    :
                                                    <div className='pt-[8px]'><p className='ticBeforeUaserImg '></p></div>
                                                }
                                            </th>
                                        }

                                        {toggleUser &&
                                            <th className=' text-sm py-2 hover:bg-slate-300' onClick={() => nameSorting("person")}><span className='flex justify-between text-xs textColor '><span className='text-right ml-2 textTable'>USER</span><span className='tableBracker'></span></span></th>
                                        }

                                        {toggleEmail &&
                                            <th className=' text-sm py-2 hover:bg-slate-300' onClick={() => sorting("city")}><span className='flex justify-between px-4 textColor text-xs '><span className='textTable'>EMAIL</span><span className='tableBracker'></span></span></th>
                                        }

                                        {toggleRole &&
                                            <th className=' text-sm py-2 hover:bg-slate-300' onClick={() => sorting("email")}><span className='flex justify-between px-4 textColor text-xs'><span className=' textTable'>ROLE</span><span className='tableBracker'></span></span></th>
                                        }

                                        {togglePlan &&
                                            <th className=' text-sm py-2 hover:bg-slate-300' onClick={() => sorting("joiningDate")}><span className='flex justify-between px-4 textColor text-xs '><span className=' textTable'>PLAN</span><span className='tableBracker'></span></span></th>
                                        }

                                        {toggleStatus &&
                                            <th className=' text-sm py-2 hover:bg-slate-300' onClick={() => sorting("role")}><span className='flex justify-between px-4 textColor text-xs '><span className=' textTable'>STATUS</span> <span className='tableBracker'></span></span></th>
                                        }

                                        {actionShow &&
                                            <span>
                                                {toggleAction &&
                                                    <th className=' text-sm py-2 hover:bg-slate-300' onClick={() => sorting("role")}><span className='flex px-4 text-xs textColor justify-between textTable'><span className='mr-5'>ACTION</span><span className='tableBracker'></span></span></th>
                                                }
                                            </span>
                                        }





                                    </tr>
                                    :
                                    <></>
                                }
                            </thead>


                            {toggleAll ?
                                <tbody className='' >
                                    {
                                        userDatas.map(userData =>
                                            <ResAllUserRow key={userData._id} userData={userData}
                                                toggleAll={toggleAll}
                                                toggleUser={toggleUser}
                                                toggleEmail={toggleEmail}
                                                toggleRole={toggleRole}
                                                togglePlan={togglePlan}
                                                toggleStatus={toggleStatus}
                                                toggleAction={toggleAction}
                                                refetch={refetch}
                                                editUserData={editUserData}
                                                setEditUserData={setEditUserData}
                                                pdfShowImg={pdfShowImg}
                                                actionShow={actionShow}
                                            ></ResAllUserRow>
                                        )
                                    }

                                </tbody>
                                :

                                <></>
                            }

                        </table>
                    </div>


                </div>

                {editUserData &&
                    <ResEditModal
                        editUserData={editUserData}
                        refetch={refetch}
                        setEditUserData={setEditUserData}
                    ></ResEditModal>
                }

                {editUserData &&
                    <ResAddUser
                        refetch={refetch}
                        setEditUserData={setEditUserData}
                    ></ResAddUser>}

            </div>
        </div>
    );
};

export default ResAllUsers;