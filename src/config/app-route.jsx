import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import App from './../app.jsx';
import ProtectedRoute from './ProtectedRoute.js'

import DashboardV1 from './../pages/dashboard/dashboard-v1.js';
import DashboardV2 from './../pages/dashboard/dashboard-v2.js';
import DashboardV3 from './../pages/dashboard/dashboard-v3.js';
import ExtraError from './../pages/extra/extra-error.js';
import LoginV3 from './../pages/user/login-v3.js';
import HelperCSS from './../pages/helper/helper-css.js';
import Users from '../pages/users/users.jsx';
import Testing from '../pages/Testing/Testing.jsx';
import Product from '../pages/Inventory/Product/Product.jsx';
import ManageStocks from '../pages/Stocks/ManageStocks.jsx';
import Invoice from '../pages/Sales/invoice/invoice.jsx';
import CreateProduct from '../pages/Inventory/Product/CreateProduct.jsx';
import Layout from '../pages/Layout/Layout.jsx';
import ExpireProducts from '../pages/Inventory/Product/ExpireProducts.jsx';
import Testing2 from '../pages/Testing/Testing2.jsx';
import Category from '../pages/Inventory/Category/Category.jsx';
import SubCategory from '../pages/Inventory/SubCategory/SubCategory.jsx';
import ProductBrand from '../pages/Inventory/Brand/ProductBrand.jsx';
import Color from '../pages/Product Details/Color/Color.jsx';




const AppRoute = [
	{
		path: '*',
		element: <App />,
		children: [
			{
				path: '',
				element: <Navigate to='/dashboard/v3' />
			},

			{
				path: 'dashboard/*',
				element: <ProtectedRoute />,
				children: [
					{ path: 'v1', element: <DashboardV1 /> },
					{ path: 'v2', element: <DashboardV2 /> },
					{ path: 'v3', element: <DashboardV3 /> },
					{ path: '*', element: <ExtraError /> }
				]
			},

			{
				path: 'admin/*',
				element: <ProtectedRoute />,
				children: [
					{ path: 'user', element: <Users /> },
				]
			},



			{
				path: 'Testing',
				element: <Outlet/>,
				children: [
					{ path: 'Testing', element: <Testing /> },
					{ path: 'Testing2', element: <Testing2 /> },
					{ path: 'Layout', element: <Layout /> },
				]
			},
			 

			{
				path: 'Product',
				element: <Product/>,
			},

			{
				path: 'Category',
				element: <Category/>,
			},
			{
				path: 'SubCategory',
				element: <SubCategory/>,
			},
			{
				path: 'ProductBrand',
				element: <ProductBrand/>,
			},



			{
				path: 'CreateProduct',
				element: <CreateProduct/>,
			},

			{
				path: 'ExpireProducts',
				element: <ExpireProducts/>,
			},



			// Product Details

			{
				path: 'Color',
				element: <Color/>,
			},


			{
				path: 'ManageStocks',
				element: <ManageStocks/>,
			},
 

			{
				path: 'invoice',
				element: <Invoice/>,
			},


			{
				path: 'helper/css',
				element: <HelperCSS />
			},
			{ path: '*', element: <ExtraError /> }
		]
	}
];


export default AppRoute;

