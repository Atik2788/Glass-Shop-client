import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../AllSection/Dashboard/AddProducts/AddProducts";
import AllProducts from "../AllSection/Dashboard/AllProducts/AllProducts";
import DashboardHome from "../AllSection/Dashboard/DashboardAll/DashboardHome";
import DashboardLayout from "../AllSection/Dashboard/DashboardAll/DashboardLayout";
import UserTableNew from "../AllSection/Dashboard/DashboardAll/ShowUserTable/AllUsers/AllUsers";
import DatabaseTable from "../AllSection/Dashboard/DashboardAll/ShowUserTable/AllUsers/NewTableRes/DatabasaeTable/DatabaseTable";
import ResAllUsers from "../AllSection/Dashboard/DashboardAll/ShowUserTable/AllUsers/NewTableRes/ResAllUsers";
import Home from "../AllSection/HomeSection/Home";
import Table from "../AllSection/HomeSection/Table/Table";
import Main from "../AllSection/Main";
import NotFound from "../AllSection/NotFound";

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
            },
            {
                path: '/dashboardlayout/allUsers',
                element: <UserTableNew></UserTableNew>
            },
            {
                path: '/dashboardlayout/resAllUsers',
                element: <ResAllUsers></ResAllUsers>
            },
            {
                path: '/dashboardlayout/newUserTable',
                element: <DatabaseTable></DatabaseTable>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
])

