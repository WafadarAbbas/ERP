import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import App from './../app.jsx';
import ProtectedRoute from './ProtectedRoute.js'

import DashboardV1 from './../pages/dashboard/dashboard-v1.js';
import DashboardV2 from './../pages/dashboard/dashboard-v2.js';
import DashboardV3 from './../pages/dashboard/dashboard-v3.js';
 
import LoginV3 from './../pages/user/login-v3.js';
// import HelperCSS from './../pages/helper/helper-css.js';
import Users from '../pages/users/users.jsx';
import Testing from '../pages/Testing/Testing.jsx';
import Product from '../pages/Inventory/Product/Product.jsx';
import ManageStocks from '../pages/Stocks/ManageStocks.jsx';
import Invoice from '../pages/Sales/invoice/invoice.jsx';
import CreateProduct from '../pages/Inventory/Product/CreateProduct.jsx';
import Layout from '../pages/Layout/Layout.jsx';
import Testing2 from '../pages/Testing/Testing2.jsx';
import Category from '../pages/Inventory/Category/Category.jsx';
import SubCategory from '../pages/Inventory/SubCategory/SubCategory.jsx';
import ProductBrand from '../pages/Inventory/Brand/ProductBrand.jsx';
import Color from '../pages/Product Details/Color/Color.jsx';
import Grade from '../pages/Product Details/Grade/Grade.jsx';
import Gander from '../pages/Product Details/Gender/Gander.jsx';
import Manufacturer from '../pages/Product Details/Manufacturer/Manufacturer.jsx';
import ProductSize from '../pages/Product Details/Size/ProductSize.jsx';
import ProductType from '../pages/Product Details/Type/ProductType.jsx';
import ProductBatch from '../pages/Product Details/Batch/ProductBatch.jsx';
import ProductOpening from '../pages/Product Details/Opening/ProductOpening.jsx';
import ProductPrice from '../pages/Product Details/Price/ProductPrice.jsx';
import HSCode from '../pages/Product Details/Hs Code/HSCode.jsx';
import MeasuringUnits from '../pages/Product Details/Measuring Unit/MeasuringUnits.jsx';
import VariantDetail from '../pages/Inventory/Variant Detail/VariantDetail.jsx';
import ProductVariantMain from '../pages/Inventory/Product Variant/ProductVariantMain.jsx';
import ProductVariantDetails from '../pages/Inventory/Product Variant Details/ProductVariantDetails.jsx';
import ProductPackageDetail from '../pages/Product Details/ProductPackageDetail/ProductPackageDetail.jsx';
import ProductPackagePolicy from '../pages/Product Details/Product Package Policy/ProductPackagePolicy.jsx';
import ProductPackageMain from '../pages/Product Details/ProductPackageMain/ProductPackageMain.jsx';
import Supplier from '../pages/Inventory/Supplier/Supplier.jsx';
import SupplierType from '../pages/Inventory/SupplierType/SupplierType.jsx';
import SupplierCategory from '../pages/Inventory/SupplierCategory/SupplierCategory.jsx';
import ProductPricePolicy from '../pages/Product Details/PricePolicy/ProductPricePolicy.jsx';
import PaymentTerms from '../pages/Product Details/Payment Term/PaymentTerms.jsx';
import EditProduct from '../pages/Inventory/Product/EditProduct.jsx';
import PurchseOrderTerms from '../pages/Inventory/PurchseOrderTerms/PurchseOrderTerms.jsx';
import PurchaseOrderStatus from '../pages/Inventory/PurchaseOrderStatus/PurchaseOrderStatus.jsx';
import PurchaseOrderMain from '../pages/Inventory/PurchaseOrderMain/PurchaseOrderMain.jsx';
import PurchaseOrderDetails from '../pages/Inventory/PurchaseOrderDetails/PurchaseOrderDetails.jsx';
import EditPurchaseOrderMain from '../pages/Inventory/PurchaseOrderMain/EditPurchaseOrderMain.jsx';
import CreatePurchaseOrderMain from '../pages/Inventory/PurchaseOrderMain/CreatePurchaseOrderMain.jsx';
import GRNMain from '../pages/Inventory/GrnMain/GRNMain.jsx';
import CreateGRNMain from '../pages/Inventory/GrnMain/CreateGRNMain.jsx';
import EditGRNMain from '../pages/Inventory/GrnMain/EditGRNMain.jsx';
import GRNDetails from '../pages/Inventory/GRNDetails/GRNDetails.jsx';
import PurchaseMain from '../pages/Inventory/PurchaseMain/PurchaseMain.jsx';
import CreatePurchaseMain from '../pages/Inventory/PurchaseMain/CreatePurchaseMain.jsx';
import EditPurchaseMain from '../pages/Inventory/PurchaseMain/EditPurchaseMain.jsx';
import PurchaseDetail from '../pages/Inventory/PurchaseDetails/PurchaseDetail.jsx';
import PurchaseReturnMain from '../pages/Inventory/PurchaseReturnMain/PurchaseReturnMain.jsx';
import EditPurchaseReturnMain from '../pages/Inventory/PurchaseReturnMain/EditPurchaseReturnMain.jsx';
import CreatePurchaseReturnMain from '../pages/Inventory/PurchaseReturnMain/CreatePurchaseReturnMain.jsx';
// import PurchaseReturnMain from '../pages/Inventory/PurchaseMain/PurchaseReturnMain.jsx';
// import EditPurchaseReturnMain from '../pages/Inventory/PurchaseMain/EditPurchaseMain.jsx';
// import CreatePurchaseReturnMain from '../pages/Inventory/PurchaseMain/CreatePurchaseReturnMain.js';
 


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
				element: <Outlet />,
				children: [
					{ path: 'v1', element: <DashboardV1 /> },
					{ path: 'v2', element: <DashboardV2 /> },
					{ path: 'v3', element: <DashboardV3 /> },
				 
				]
			},

			{
				path: 'admin/*',
				// element: <ProtectedRoute />,
					element: <Outlet />,
				children: [
					{ path: 'user', element: <Users /> },
				]
			},



			{
				path: 'Testing',
				element: <Outlet />,
				children: [
					{ path: 'Testing', element: <Testing /> },
					{ path: 'Testing2/:id', element: <Testing2 /> },
					{ path: 'Layout', element: <Layout /> },
				]
			},


			// Product Inventory
			{
				path: 'Product',
				element: <Product />,
			},

			{
				path: 'Category',
				element: <Category />,
			},
			{
				path: 'SubCategory',
				element: <SubCategory />,
			},
			{
				path: 'ProductBrand',
				element: <ProductBrand />,
			},

			{
				path: 'CreateProduct',
				element: <CreateProduct />,
			},

			{
				path: 'EditProduct',
				element: <EditProduct/>,
			},

			{
				path: 'VariantDetail',
				element: <VariantDetail/>,
			},
			{
				path: 'ProductVariantMain',
				element: <ProductVariantMain/>,
			},

			{
				path: 'ProductVariantDetails',
				element: <ProductVariantDetails/>,
			},

			{
				path: 'PurchseOrderTerms',
				element: <PurchseOrderTerms/>,
			},

			{
				path: 'PurchaseOrderStatus',
				element: <PurchaseOrderStatus/>,
			},
		 

		 
			 

			{
				path: 'PurchaseOrderMain',
				element: <Outlet />,
				children: [
					{ path: 'PurchaseOrderMain', element: <PurchaseOrderMain/> },
					{ path: 'EditPurchaseOrderMain', element: <EditPurchaseOrderMain/> },
					{ path: 'CreatePurchaseOrderMain', element: <CreatePurchaseOrderMain/> },	 
					{ path: 'PurchaseOrderDetails', element: <PurchaseOrderDetails/> },	
				]
			},
			

		  
			// {
			// 	path: 'GRNDetails',
			// 	element: <GRNDetails/>,
			// },

			


			{
				path: 'GRNMain',
				element: <Outlet />,
				children: [
					{ path: 'GRNMain', element: <GRNMain/> },
					{ path: 'EditGRNMain', element: <EditGRNMain/> },
					{ path: 'CreateGRNMain', element: <CreateGRNMain/> },
					{ path: 'GRNDetails', element: <GRNDetails/> },		 
				]
			},


			

			{
				path: 'PurchaseMain',
				element: <Outlet />,
				children: [
					{ path: 'PurchaseMain', element: < PurchaseMain/> },
					{ path: 'EditPurchaseMain', element: <EditPurchaseMain/> },
					{ path: 'CreatePurchaseMain', element: <CreatePurchaseMain/> },	
					 { path: 'PurchaseDetail', element: <PurchaseDetail/> },	
				]
			},

			// {
			// 	path: 'PurchaseMain',
			// 	element: <Outlet />,
			// 	children: [
			// 		{ path: 'PurchaseMain', element: < PurchaseMain/> },
			// 		{ path: 'EditPurchaseMain', element: <EditPurchaseMain/> },
			// 		{ path: 'CreatePurchaseMain', element: <CreatePurchaseMain/> },	 
			// 	]
			// },

			{
				path: 'PurchaseReturnMain',
				element: <Outlet />,
				children: [
					{ path: 'PurchaseReturnMain', element: <PurchaseReturnMain/> },
					{ path: 'EditPurchaseReturnMain', element: <EditPurchaseReturnMain/> },
					{ path: 'CreatePurchaseReturnMain', element: <CreatePurchaseReturnMain/> },	 
				]
			},
			
			// {
			// 	path: 'PurchaseDetail',
			// 	element: <PurchaseDetail/>,
			// },
			

	

			// End Here



			// Product Details

			{
				path: 'Color',
				element: <Color />,
			},

			{
				path: 'Grade',
				element: <Grade />,
			},
			{
				path: 'Gander',
				element: <Gander />,
			},
			{
				path: 'Manufacturer',
				element: <Manufacturer/>,
			},
			{
				path: 'Size',
				element: <ProductSize/>,
			},
			{
				path: 'Type',
				element: <ProductType/>,
			},
			{
				path: 'Batch',
				element: <ProductBatch/>,
			},
			{
				path: 'Opening',
				element: <ProductOpening/>,
			},
			{
				path: 'Price',
				element: <ProductPrice/>,
			},
			{
				path: 'ProductPricePolicy',
				element: <ProductPricePolicy/>,
			},
			{
				path: 'HSCode',
				element: <HSCode/>,
			},
			{
				path: 'MeasuringUnits',
				element: <MeasuringUnits/>,
			},

			{
				path: 'ProductPackageDetail',
				element: <ProductPackageDetail/>,
			},
			{
				path: 'ProductPackageMain',
				element: <ProductPackageMain/>,
			},
			{
				path: 'ProductPackagePolicy',
				element: <ProductPackagePolicy/>,
			},
			{
				path: 'Supplier',
				element: <Supplier/>,
			},

			{
				path: 'SupplierType',
				element: <SupplierType/>,
			},
			{
				path: 'SupplierCategory',
				element: <SupplierCategory/>,
			},
			{
				path: 'PaymentTerms',
				element: <PaymentTerms/>,
			},


			// End here

			// {
			// 	path: 'ManageStocks',
			// 	element: <ManageStocks />,
			// },


			// {
			// 	path: 'invoice',
			// 	element: <Invoice />,
			// },
// {
// 		path: 'user/login-v3',
// 				element: <LoginV3 />,
	
// },

			// {
			// 	path: 'helper/css',
			// 	element: <HelperCSS />
			// },
			 
		]
	}
];


export default AppRoute;

