import React, { useState } from 'react';
import * as XLSX from 'xlsx'



const ExportXl = ({ tableData }) => {
    const datas = (tableData.row)


    let xlDatas = []

    const handleExportExcl = (tableData) => {
        // console.log(tableData.row)

        tableData.map(xlData =>{            
            xlDatas.push(xlData.row[0])
        })
        // console.log(xlDatas)
        

        var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(xlDatas)
        XLSX.utils.book_append_sheet(wb, ws, "MySheet");
        XLSX.writeFile(wb, "MyExcel.xlsx")
    }

    return (
        <div className='px-3'>

            <button onClick={() => handleExportExcl(tableData)} className='text-white btn btn-sm px-5 rounded-md bg-[#1e2585e7] hover:bg-[#5f69d6f1]'>Excel</button>
        </div>
    );
};

export default ExportXl;