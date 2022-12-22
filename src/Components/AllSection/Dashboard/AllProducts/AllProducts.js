import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf'

const AllProducts = () => {

    const { data: glassDatas = [], refetch } = useQuery({
        queryKey: ['glasses'],
        queryFn: async () => {
            const res = await fetch('https://glass-shop-server.vercel.app/productsGlass')
            const data = await res.json()
            // setLoading(false)

            // setBikes(true)
            return data;
        }
    })

    const handleDeleteProducts = (glass) => {
        // console.log(_id)
        // alert('delete alert')
        // toast(`Delete successfully!!`)

        fetch(`https://glass-shop-server.vercel.app/productsGlass/${glass._id}`, {
            method: 'DELETE',
            headers: {}
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    console.log('delete done');
                    toast(`Delete ${glass.name} successfully!!`)
                    refetch();
                }
                else {
                    toast.error(data.message)
                }
            })
    }




    const handlePDF = () => {
        const doc = new jsPDF("l", "pt", "a3")
        doc.html(document.querySelector("#pdfFull"), {
            callback: function (pdf) {
                pdf.save("ExcelData.pdf");
            }
        });

    }


    return (
        <div className='mt-5' id='pdfFull'>
            <div className="overflow-x-auto w-full mb-20">
                {/* <button className='btn' onClick={handlePDF}>pdf</button> */}
                <p className='text-5xl mb-10 titleColor font-bold text-center'>My Products</p>

                <table className="table lg:w-[1000px] mx-auto">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Glass Image</th>
                            <th>Glass Name</th>
                            <th>Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            glassDatas?.map((glass, i) =>
                                <tr key={glass._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={glass.img} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <th>{glass.name}</th>
                                    <th>$ {glass.price}</th>
                                    <th><button onClick={() => handleDeleteProducts(glass)} className="btn bg-red-700 px-4 outline-none btn-xs">X</button></th>

                                </tr>

                            )
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllProducts;