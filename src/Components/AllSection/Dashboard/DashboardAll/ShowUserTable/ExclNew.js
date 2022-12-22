import React from 'react';
import * as XLSX from "xlsx";
const XlsxPopulate = 'xlsx-populate';
// import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
const ExclNew = ({ userDatas }) => {

    const createDownLoadData = () => {
        handleExport().then(url =>{
            console.log(url);
        });
    };

    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);

        const view = new Uint8Array(buf);

        for(let i = 0; i !== s.length; ++i){
            view[i] = s.charCodeAt(i)
        }

        return buf;
    }


    const workBook2blob = (workbook) =>{
        const wopts = {
            bookType: 'xlsx',
            type: 'binary'
        }


        const wbout = XLSX.write(workbook, wopts)

        const blob = new Blob([s2ab(wbout)], {
            type: 'application/octet-stream'
        })

          return blob;

    }

    const handleExport = () => {
        const title = [{ A: 'Users Data' }];

        let table1 = [
            {
                A: 'ID',
                B: 'USER',
                C: 'EMAIL',
                D: 'ROLE',
                E: 'PLAN',
                F: 'STATUS',
                G: 'STATUS',
                H: 'Image',
            }
        ];

        userDatas.forEach(row => {
            const userInformation = row;
            // console.log(userData);

            table1.push({
                A: userInformation._id,
                B: userInformation.name,
                C: userInformation.userName,
                D: userInformation.email,
                E: userInformation.role,
                F: userInformation.plan,
                G: userInformation.status,
                H: userInformation.img,
            })

        })

        table1 = [{ A: 'User Information' }].concat(table1)


        //    console.log(table1)


        const finalData = [...title, ...table1]


        // create a workbook
        const wb = XLSX.utils.book_new();


        // create a sheet
        const sheet = XLSX.utils.json_to_sheet(finalData, {
            skipHeader: true,
        });


        XLSX.utils.book_append_sheet(wb, sheet, 'User_Info_Glass_Shop')


        const workbookBlob = workBook2blob(wb)

        return addStyles(workbookBlob)
    }


    const addStyles = (workbookBlob) =>{
        return XlsxPopulate.fromDataAsync(workbookBlob).then( (workbook) =>{
            workbook.sheet().forEach(sheet =>{
                // sheet.usedRange.style({
                //     fontFamily: 'Arial',
                //     verticalAlignment: 'center'
                // }) ;
            })

             return workbook.outputAsync()
             .then(workbookBlob => URL.createObjectURL(workbookBlob))
        })
    }



    return (
        <button onClick={() => createDownLoadData()}>Excel</button>
    );
};

export default ExclNew;