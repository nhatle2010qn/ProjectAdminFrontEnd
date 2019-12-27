import Dashboard from "./components/Admin/Dashboard/dashboard";
import ProductList from "./components/Admin/Product/ProductList/ProductList";
import ProductAddUpdate from './components/Admin/Product/ProductAddUpdate/ProductAddUpdate';
import CategoryManager from "./components/Admin/Categories/CategoryManager";
import CategoryList from "./components/Admin/Categories/CategoryList";
import CategoryAddUpdate from "./components/Admin/Categories/CategoryAddUpdate";
import React from 'react';
import BrandManager from "./components/Admin/Brand/BrandManager";
import BrandAddUpdate from "./components/Admin/Brand/BrandAddUpdate";
import BrandList from './components/Admin/Brand/BrandList';
import OrderList from "./components/Admin/Order/OrderList";
import OrderManager from "./components/Admin/Order/OrderManager";
import OrderUpdate from "./components/Admin/Order/OrderUpdate";
import OrderInfo from "./components/Admin/Order/OrderInfo/OrderInfo";
import UserManager from "./components/Admin/Users/UserManager";
import UserList from "./components/Admin/Users/UserList";



const routes = [
    {
        path : '/',
        exact: true,
        main : () => <Dashboard />
    },
    {
        path: '/admin/product/productList',
        exact: true,
        main : () => <ProductList />
    },
    {
        path: '/admin/product/productAddUpdate',
        exact: false,
        main : () => <ProductAddUpdate />
    },
    {
        path : '/admin/category/categoryList',
        exact: false,
        main: () => <CategoryManager><CategoryList /></CategoryManager>
    },
    {
        path: '/admin/category/categoryAddUpdate',
        exact: false,
        main : () => <CategoryManager><CategoryAddUpdate /></CategoryManager>
    },
    {
        path: '/admin/brand/brandAddUpdate',
        exact: false,
        main: () => <BrandManager><BrandAddUpdate /></BrandManager>
    },
    {
        path: '/admin/brand/brandList',
        exact: true,
        main: () => <BrandManager><BrandList /></BrandManager>
    },
    {
        path: '/admin/order/orderList',
        exact: false,
        main: () => <OrderManager><OrderList /></OrderManager>
    },
    {
        path: '/admin/order/orderUpdate',
        exact: false,
        main: () => <OrderManager><OrderUpdate /></OrderManager>
    },
    {
        path: '/admin/order/orderInfo',
        exact: false,
        main: () => <OrderManager><OrderInfo /></OrderManager>
    },
    {
        path: '/admin/user/userList',
        exact: false,
        main: () => <UserManager><UserList /></UserManager>
    }
]

export default routes;