import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import ProductCard from './ProductCard';

const ProductsSec = () => {

    const { data: glassDatas = [], refetch } = useQuery({
        queryKey: ['glasses'],
        queryFn: async () => {
            const res = await fetch('https://glass-shop-server.vercel.app/productsGlass')
            const data = await res.json()
            return data;
        }
    })

    return (
        <div className='mt-20 lg:px-10 px-5 mb-20'>

            <div className='lg:grid lg:grid-cols-3 gap-5' >
                {
                    glassDatas?.map(glassData =>
                        <ProductCard key={glassData._id} glassData={glassData} refetch={refetch}></ProductCard>
                    )
                }
            </div>
        </div>
    );
};

export default ProductsSec;