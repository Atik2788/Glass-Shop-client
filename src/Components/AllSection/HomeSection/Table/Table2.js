import React from 'react';

const Table2 = ({ i, setRowsData, handleDeleteProducts, dataRow }) => {
    // console.log(dataRow.row)
    // const data = dataRow.row;
    // console.log(dataRow);


    if(!dataRow){
        return
    }
    // console.log(data['2'])

    let datas = [];

    for (const key in dataRow.row) {
        if (Object.hasOwnProperty.call(dataRow.row, key)) {
            const element = dataRow.row[key];
            datas.push(element)
        }
    }

    // console.log(datas)




    return (
        // <div></div>

        <tr >
            <th className='hover:bg-slate-200'>{i + 1}</th>
            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name1}</p>)
            }
            </th>
            
            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name2}</p>)
            }
            </th>

            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name3}</p>)
            }
            </th>

            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name4}</p>)
            }
            </th>

            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name5}</p>)
            }
            </th>
            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name6}</p>)
            }
            </th>

            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name7}</p>)
            }
            </th>

            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name8}</p>)
            }
            </th>

            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name9}</p>)
            }
            </th>

            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name10}</p>)
            }
            </th>

            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name11}</p>)
            }
            </th>

            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name12}</p>)
            }
            </th>

            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name13}</p>)
            }
            </th>

            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name14}</p>)
            }
            </th>

            <th className='hover:bg-slate-200'>
            {
                datas.map((data, i) => <p key={i}>{data.name15}</p>)
            }
            </th>

            <th className=''>
                <button className="px-2 py-1 text-white bg-[#1e2585e7] hover:bg-[#5f69d6f1] rounded-md text-whit text-xs ">
                    <label htmlFor="edit-row-modal" onClick={() => setRowsData(dataRow)}>Edit</label>
                </button>
            </th>

            <th className=''><button onClick={() => handleDeleteProducts(dataRow?._id)} className="btn bg-red-700 px-4 outline-none btn-xs">X</button></th>
        </tr>

    );
};

export default Table2;