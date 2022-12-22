import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditModal from './EditModal';
import ExportXl from './ExportXl';
import Table2 from './Table2';

import jsPDF from 'jspdf'
import { useReactToPrint } from 'react-to-print';

import './Table.css'




const Table = () => {

    // const []

    const [rowsData, setRowsData] = useState(null)
    // console.log(rowsData)



    // column visibility
    const [clmnVisi, SetClmnVisi] = useState()


    const { data: tableData = [], refetch } = useQuery({
        queryKey: ['glasses'],
        queryFn: async () => {
            const res = await fetch('https://glass-shop-server.vercel.app/tableData')
            const data = await res.json()
            return data;
        }
    })

    // console.log(tableData)

    const handleDeleteProducts = (id) => {

        fetch(`https://glass-shop-server.vercel.app/tableData/${id}`, {
            method: 'DELETE',
            headers: {}
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    console.log('delete done');
                    toast('Row Delete successfully!!')
                    refetch();
                }
                else {
                    toast.error(data.message)
                }
            })
    }


    const handlePDF = () => {
        const doc = new jsPDF("l", "pt", "a2")
        doc.html(document.querySelector("#pdfFull"), {
            callback: function (pdf) {
                pdf.save("ExcelData.pdf");
            }
        });

    }




    // print page
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'TableData',
        onafterprint: () => toast('Print Successfully!!')
    })



    return (
        <div className='' id='pdfFull' ref={componentRef}>
            <div className='mt-5'>
                <div className="overflow-x-auto w-full" >
                    <p className='text-5xl mb-10 text-[#5cc9ff] font-bold text-center'>Table Data</p>

                    <div className='flex justify-end mr-20 mb-5'>
                        {/* <ExportXl
                            tableData={tableData}
                        ></ExportXl> */}

                        <div className='px-3'>
                            <button onClick={handlePDF} className='text-white btn btn-sm px-5 rounded-md bg-[#1e2585e7] hover:bg-[#5f69d6f1]'>PDF</button>
                        </div>

                        <div className='px-3'>
                            <button onClick={handlePrint} className='text-white btn btn-sm px-5 rounded-md bg-[#1e2585e7] hover:bg-[#5f69d6f1]'>Print</button>
                        </div>

                    </div>


                    <table className="table relative mx-auto mb-20  ">
                        <thead className='sticky top-20 '>
                            <tr className=' '>
                                <th className='hover:bg-orange-300  bg-orange-200'>Sl</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-1</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-2</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-3</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-4</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-5</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-6</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-7</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-8</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-9</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-10</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-11</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-12</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-13</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-14</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Name-15</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Edit</th>
                                <th className='hover:bg-orange-300  bg-orange-200'>Delete</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                tableData.map((dataRow, i) =>

                                    <Table2 key={dataRow._id} i={i}
                                        dataRow={dataRow}
                                        handleDeleteProducts={handleDeleteProducts}
                                        setRowsData={setRowsData}
                                    ></Table2>
                                )
                            }

                        </tbody>

                    </table>

                </div>

                {rowsData &&
                    <EditModal
                        rowsData={rowsData}
                        refetch={refetch}
                        setRowsData={setRowsData}
                    ></EditModal>
                }
            </div>
        </div>
    );
};

export default Table;