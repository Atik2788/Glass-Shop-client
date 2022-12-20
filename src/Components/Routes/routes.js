import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../AllSection/Dashboard/AddProducts/AddProducts";
import AllProducts from "../AllSection/Dashboard/AllProducts/AllProducts";
import DashboardHome from "../AllSection/Dashboard/DashboardAll/DashboardHome";
import DashboardLayout from "../AllSection/Dashboard/DashboardAll/DashboardLayout";
import Home from "../AllSection/HomeSection/Home";
import Table from "../AllSection/HomeSection/Table/Table";
import Main from "../AllSection/Main";

import Login from "../Login";
import Signup from "../Signup";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/table',
                element: <Table></Table>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },

        ]
    },
    {
        path: '/dashboardlayout',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboardlayout',
                element: <DashboardHome></DashboardHome>
            },
            {
                path: '/dashboardlayout/allProducts',
                element: <AllProducts></AllProducts>
            },
            {
                path: '/dashboardlayout/addProducts',
                element: <AddProducts></AddProducts>
            }
        ]
    }
])

