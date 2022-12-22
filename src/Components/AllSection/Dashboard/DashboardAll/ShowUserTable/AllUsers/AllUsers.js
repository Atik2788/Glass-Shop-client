import React, { useRef, useState } from 'react';
import { AiFillCaretDown } from "react-icons/ai";
import { BsRecordCircle, BsCircle, BsCircleFill } from "react-icons/bs";
import { ImCheckboxUnchecked } from "react-icons/im";
import { MdIosShare } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import UserTable2 from './AllUsers2';
import EditUseModal from '../EditUserModal/EditUseModal';
import AddUserModal from '../AddUserModal/AddUserModal';
import jsPDF from 'jspdf'
import Excl from '../Excl';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-hot-toast';
import ExclNew from '../ExclNew';

const AllUsers = () => {

    const [pdfShow, setPdfShow] = useState(false)
    const [pdfShowImg, setPdfShowImg] = useState(false)



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
            }
        });

    }
    // for pdf button
    const handlePdfShow = () => {
        setPdfShowImg(true)
        setPdfShow(true)
        handlePDF()
        toast('Download PDF Successfully!!')
    }




    // print page
    const [titlePrint, setTitlePrint] = useState(true)

    const handlePrintUser = (data) => {
        setTitlePrint(false)
        // handlePrint()
        handleClick2()
    }

    const handleClick2 = () => {
        if (!titlePrint) {
            handleClick()
        }
        // handleClick()
    }

    const handleClick = () => {
        handlePrint()
        setTitlePrint(true)
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

                <h2 className='mb-7 text-left text-4xl titleColor print-container' id=''>All Users</h2>
                {/* <ExclNew userDatas={userDatas}>aaaa</ExclNew> */}
                <div className='bg-white'>

                    <div className='flex justify-between pt-7'>
                        <div className=' text-left'>
                            <button onClick={handlePdfShow} className='ml-5  pdfBorder hover:bg-[#F4F5FA] text-sm py-2 textColor w-[128px]'><span className='flex justify-center items-center'> <span className='mr-3'><MdIosShare /></span> <span>PDF</span></span></button>
                            <button className='ml-5 pdfBorder hover:bg-[#F4F5FA] text-sm py-2 textColor w-[128px]'><Excl userDatas={userDatas}></Excl></button>

                            <button onClick={() => handlePrintUser('')} className='ml-5 pdfBorder hover:bg-[#F4F5FA] text-sm py-2 textColor w-[128px]'><span className='flex justify-center items-center'> <span className='mr-3'><MdIosShare /></span> <span>PRINT</span></span></button>

                            <button className=''>


                                <div className="ml-5 pdfBorder hover:bg-[#F4F5FA] text-sm h-[38px] textColor w-[191px]">
                                    <ul className="menu">
                                        <li tabIndex={0}>
                                            <span className='text-sm'>SHOW/HIDE COLUMN<span></span></span>

                                            <ul className="bg-white">

                                                <li tabIndex={0}>
                                                    {
                                                        toggleAll ?
                                                            <span onClick={() => setToggleAll(!toggleAll)} className='textColor'><span className="w-[100px] text-left">All Column</span><span className=""><BsCircleFill /></span></span>
                                                            :
                                                            <span onClick={() => setToggleAll(!toggleAll)} className='textColor'><span className="w-[100px] text-left">All Column</span><span><BsCircle /></span></span>
                                                    }
                                                </li>

                                                <li tabIndex={0}>
                                                    {
                                                        toggleUser ?
                                                            <span onClick={() => setToggleUser(!toggleUser)} className='textColor'><span className="w-[100px] text-left">User</span><span className=""><BsCircleFill /></span></span>
                                                            :
                                                            <span onClick={() => setToggleUser(!toggleUser)} className='textColor'><span className="w-[100px] text-left">User</span><span><BsCircle /></span></span>
                                                    }
                                                </li>

                                                <li tabIndex={0}>
                                                    {
                                                        toggleEmail ?
                                                            <span onClick={() => setToggleEmail(!toggleEmail)} className='textColor'><span className="w-[100px] text-left">Email</span><span className=""><BsCircleFill /></span></span>
                                                            :
                                                            <span onClick={() => setToggleEmail(!toggleEmail)} className='textColor'><span className="w-[100px] text-left">Email</span><span><BsCircle /></span></span>
                                                    }
                                                </li>

                                                <li tabIndex={0}>
                                                    {
                                                        toggleRole ?
                                                            <span onClick={() => setToggleRole(!toggleRole)} className='textColor'><span className="w-[100px] text-left">Role</span><span className=""><BsCircleFill /></span></span>
                                                            :
                                                            <span onClick={() => setToggleRole(!toggleRole)} className='textColor'><span className="w-[100px] text-left">Role</span><span><BsCircle /></span></span>
                                                    }
                                                </li>

                                                <li tabIndex={0}>
                                                    {
                                                        togglePlan ?
                                                            <span onClick={() => setTogglePlan(!togglePlan)} className='textColor'><span className="w-[100px] text-left">PLAN</span><span className=""><BsCircleFill /></span></span>
                                                            :
                                                            <span onClick={() => setTogglePlan(!togglePlan)} className='textColor'><span className="w-[100px] text-left">PLAN</span><span><BsCircle /></span></span>
                                                    }
                                                </li>

                                                <li tabIndex={0}>
                                                    {
                                                        toggleStatus ?
                                                            <span onClick={() => setToggleStatus(!toggleStatus)} className='textColor'><span className="w-[100px] text-left">STATUS</span><span className=""><BsCircleFill /></span></span>
                                                            :
                                                            <span onClick={() => setToggleStatus(!toggleStatus)} className='textColor'><span className="w-[100px] text-left">STATUS</span><span><BsCircle /></span></span>
                                                    }
                                                </li>

                                                <li tabIndex={0}>
                                                    {
                                                        toggleAction ?
                                                            <span onClick={() => setToggleAction(!toggleAction)} className='textColor'><span className="w-[100px] text-left">ACTION</span><span className=""><BsCircleFill /></span></span>
                                                            :
                                                            <span onClick={() => setToggleAction(!toggleAction)} className='textColor'><span className="w-[100px] text-left">ACTION</span><span><BsCircle /></span></span>
                                                    }
                                                </li>

                                            </ul>
                                        </li>
                                    </ul>
                                </div>

                            </button>


                        </div>

                        <div className='flex text-right'>
                            <input className='ml-5 pdfBorder text-sm py-2 textColor w-[238px] pl-5' type="text" placeholder='Search Invoice' />
                            <button className='ml-5 mr-5 pdfBorder text-sm py-2  w-[128px] btnCss'>
                                <label htmlFor="add-user-modal" onClick={() => setEditUserData('Added')}>ADD USER</label>
                            </button>

                        </div>
                    </div>


                    <div id='pdfFull' ref={componentRef} className='PRINT-PAGE' >
                        {pdfShow &&
                            <h2 className='text-center titleColor text-4xl mb-10 mt-10'>All Users Page</h2>
                        }

                        {!titlePrint &&
                            <h2 className='text-center titleColor text-4xl mb-10 mt-10'>All Users Page</h2>
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
                                            <th className=' text-sm py-2 hover:bg-slate-300' onClick={() => nameSorting("person")}><span className='flex justify-between text-xs textColor w-[230px]'><span className='text-right ml-2 textTable'>USER</span><span className='tableBracker'></span></span></th>
                                        }

                                        {toggleEmail &&
                                            <th className=' text-sm py-2 hover:bg-slate-300' onClick={() => sorting("city")}><span className='flex justify-between px-4 textColor text-xs w-[274px]'><span className='textTable'>EMAIL</span><span className='tableBracker'></span></span></th>
                                        }

                                        {toggleRole &&
                                            <th className=' text-sm py-2 hover:bg-slate-300' onClick={() => sorting("email")}><span className='flex justify-between px-4 textColor text-xs w-[180px]'><span className=' textTable'>ROLE</span><span className='tableBracker'></span></span></th>
                                        }

                                        {togglePlan &&
                                            <th className=' text-sm py-2 hover:bg-slate-300' onClick={() => sorting("joiningDate")}><span className='flex justify-between px-4 textColor text-xs w-[180px]'><span className=' textTable'>PLAN</span><span className='tableBracker'></span></span></th>
                                        }

                                        {toggleStatus &&
                                            <th className=' text-sm py-2 hover:bg-slate-300' onClick={() => sorting("role")}><span className='flex justify-between px-4 textColor text-xs w-[100px]'><span className=' textTable'>STATUS</span> <span className='tableBracker'></span></span></th>
                                        }

                                        {toggleAction &&
                                            <th className=' text-sm py-2 hover:bg-slate-300' onClick={() => sorting("role")}><span className='flex px-4 text-xs textColor justify-between w-[100px] textTable'>ACTION<span className='tableBracker'></span></span></th>
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
                                            <UserTable2 key={userData._id} userData={userData}
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
                                            ></UserTable2>
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
                    <EditUseModal
                        editUserData={editUserData}
                        refetch={refetch}
                        setEditUserData={setEditUserData}
                    ></EditUseModal>
                }

                {editUserData &&
                    <AddUserModal
                        refetch={refetch}
                        setEditUserData={setEditUserData}
                    ></AddUserModal>}

            </div>
        </div>
    );
};

export default AllUsers;