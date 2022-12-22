import React from 'react';
import { toast } from 'react-hot-toast';
import { Form as form } from 'react-router-dom';

const EditModal = ({ rowsData, setRowsData, refetch }) => {

    console.log(rowsData);


    if (!rowsData) {
        return
    }
    // console.log(data['2'])

    let datas = [];

    for (const key in rowsData.row) {
        if (Object.hasOwnProperty.call(rowsData.row, key)) {
            const element = rowsData.row[key];
            datas.push(element)
        }
    }

    // console.log(datas);



    const handleEditTable = event => {
        event.preventDefault();

        const form = event.target;
        const name1 = form.name1.value;
        const name2 = form.name2.value;
        const name3 = form.name3.value;
        const name4 = form.name4.value;
        const name5 = form.name5.value;
        const name6 = form.name6.value;
        const name7 = form.name7.value;
        const name8 = form.name8.value;
        const name9 = form.name9.value;
        const name10 = form.name10.value
        const name11 = form.name11.value
        const name12 = form.name12.value
        const name13 = form.name13.value
        const name14 = form.name14.value
        const name15 = form.name15.value


        const tableInfo = [{
            name1,
            name2,
            name3,
            name4,
            name5,
            name6,
            name7,
            name8,
            name9,
            name10,
            name11,
            name12,
            name13,
            name14,
            name15
        }]
        // setRowsData(null)
        // console.log(tableInfo);


        fetch(`https://glass-shop-server.vercel.app/tableData/${rowsData?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(tableInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)

                if (data.acknowledged) {
                    setRowsData(null)
                    toast('Edit Successfully')
                    refetch()
                    // refetch()
                }
                else {
                    toast(data.message)
                }
            })


    }



    return (
        <>
            <input type="checkbox" id="edit-row-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={() => setRowsData(null)} htmlFor="edit-row-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div>
                        <p className='text-xl font-bold'>Edit Name</p>
                        <div className='mt-5'>
                            {
                                datas?.map((rowData, i) => <div key={i} className='mt-5'>
                                    <form onSubmit={handleEditTable} className='grid grid-cols-1 gap-3'>
                                        <input type="text" name='name1' defaultValue={rowData.name1} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name2' defaultValue={rowData.name2} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name3' defaultValue={rowData.name3} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name4' defaultValue={rowData.name4} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name5' defaultValue={rowData.name5} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name6' defaultValue={rowData.name6} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name7' defaultValue={rowData.name7} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name8' defaultValue={rowData.name8} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name9' defaultValue={rowData.name9} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name10' defaultValue={rowData.name10} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name11' defaultValue={rowData.name11} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name12' defaultValue={rowData.name12} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name13' defaultValue={rowData.name13} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name14' defaultValue={rowData.name14} className="input input-bordered input-primary w-full" />
                                        <input type="text" name='name15' defaultValue={rowData.name15} className="input input-bordered input-primary w-full" />

                                        <input className='w-full btn-primary py-2 rounded-md' type="submit" value="submit" />
                                    </form>
                                </div>)
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditModal;