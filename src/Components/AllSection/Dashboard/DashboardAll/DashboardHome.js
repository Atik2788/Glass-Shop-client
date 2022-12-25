import React from 'react';
import AllProducts from '../AllProducts/AllProducts';
import AllUsers from './ShowUserTable/AllUsers/AllUsers';
import ResAllUsers from './ShowUserTable/AllUsers/NewTableRes/ResAllUsers';


const DashboardHome = () => {
    return (
        <div>
           <ResAllUsers></ResAllUsers>
        </div>
    );
};

export default DashboardHome;