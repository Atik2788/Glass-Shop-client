import React, { useState } from 'react';
import * as XLSX from 'xlsx'
import { MdIosShare } from "react-icons/md";

const Excl = ({ userDatas }) => {
    const datas = (userDatas)


    let xlDatas = []

    const handleExportExcl = (userDatas) => {
        // console.log(tableData.row)

        userDatas.map(xlData => {
            xlDatas.push(xlData)
        })
        // console.log(xlDatas)        

        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(xlDatas)
        XLSX.utils.book_append_sheet(wb, ws, "MySheet");
        XLSX.writeFile(wb, "MyExcel.xlsx")
    }

    return (

        <span onClick={() => handleExportExcl(userDatas)} ><span className='flex justify-center items-center'> <span className='mr-3'><MdIosShare /></span>EXCEL </span> </span>

    );
};

export default Excl;