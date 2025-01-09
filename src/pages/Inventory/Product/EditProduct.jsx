import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Buton from '../../../Compo/Buton';

function EditProduct() { 

   
const location = useLocation();
const productId = location.state?.id;
const navigate = useNavigate(); 


useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/Product/GetProductByIdQuery/${productId}?organizationId=1&companyId=1`,
        method: "GET",
      });
 
      if (response && response.data && response.data.length > 0) {
        const product = response.data[0];
        formik.setValues({
          productName: product.productName || "",
          productCode: product.productCode || "",
          productVendorCode: product.productVendorCode || "",
          productTechnicalDetails: product.productTechnicalDetails || "",
          productCreationDate: product.productCreationDate || "",
          productStatus: product.productStatus || "",
          productMinimumQuantity: product.productMinimumQuantity || "",
          isRawMaterial: product.isRawMaterial || "",
          isSingleBranch: product.isSingleBranch || "",
          productBrandId: product.productBrandId || "",
          productCategoryId: product.productCategoryId || "",
          productColorId: product.productColorId || "",
          productGanderId: product.productGanderId || "",
          productSizeId: product.productSizeId || "",
          productSubCategoryId: product.productSubCategoryId || "",
          productTypeId: product.productTypeId || "",
          productGradeId: product.productGradeId || "",
        });
      } else {
        console.error("Failed to load po Status data.");
      }
    } catch (error) {
      console.error("Error fetching poStatus:", error.message);
    }
  };

  if (productId) {
    fetchProduct();
  }
}, [productId]);

  const formik = useFormik({
    initialValues: {
      productName: '',
      productCode: '',
      productVendorCode: '',
      productTechnicalDetails: '',
      productCreationDate: '',
      productStatus: false,  
      productMinimumQuantity: 0,
      isRawMaterial: false,  
      isSingleBranch: false,  
      productBrandId: 0,  
      productCategoryId: 0, 
      productColorId: 0,  
      productGanderId: 0,
      productGradeId: 0,
      productSizeId: 0,
      productSubCategoryId: 0,
      productTypeId:0,
    },
    
    // Updated validationSchema
    validationSchema: Yup.object({
      // productName: Yup.string().required('Product name is required'),
      // productCode: Yup.string().required('Product code is required'),
      // productVendorCode: Yup.string().required('Vendor code is required'),
      // productTechnicalDetails: Yup.string().required('Technical details are required'),
      // productCreationDate: Yup.string().required('Creation date is required'),
      // productStatus: Yup.boolean().required('Product status is required'),
      // productMinimumQuantity: Yup.number()
      //   .min(0, 'Minimum quantity cannot be negative')
      //   .required('Minimum quantity is required'),
      // isRawMaterial: Yup.boolean().required('Raw material status is required'),
      // isSingleBranch: Yup.boolean().required('Branch status is required'), // New validation
    }),


 
onSubmit: async (values) => {
  const formData = {
    ...values,
    organizationId: 1,
    companyId: 1,
  };
  console.log(formData);
    },
  });

  const [brands, setBrands] = useState([]);  
  const [categories, setCategories] = useState([]);  
  const [colors, setColors] = useState([]);
  const [genders, setGenders] = useState([]);  
  const [grades, setGrades] = useState([]);  
  const [sizes, setSizes] = useState([]);  
  const [subCategories, setSubCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]); 

 
    const fetchBrands = async () => {
      try {
        const response = await ApiCall({
          url: 'http://localhost:5022/api/v1/ProductBrand/GetProductBrandBoxItems/combobox?organizationId=1&companyId=1',
          method: 'GET',
        });
        setBrands(response.data);  
      } catch (error) {
        console.error('Error fetching brands:', error);
        setBrands([]);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await ApiCall({
          url: 'http://localhost:5022/api/v1/ProductCategory/GetProductCategoryBoxItems/combobox?organizationId=1&companyId=1',
          method: 'GET',
        });
        setCategories(response.data);  
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };


    const fetchColors = async () => {
      try {
        const response = await ApiCall({
          url: 'http://localhost:5022/api/v1/ProductColor/GetProductColorBoxItems/combobox?organizationId=1&companyId=1',
          method: 'GET',
        });
        setColors(response.data);  
      } catch (error) {
        console.error('Error fetching colors:', error);
        setColors([]);
      }
    };

    
    const fetchGenders = async () => {
      try {
        const response = await ApiCall({
          url: 'http://localhost:5022/api/v1/ProductGander/GetProductGanderBoxItems/combobox?organizationId=1&companyId=1',
          method: 'GET',
        });
        setGenders(response.data);  
      } catch (error) {
        console.error('Error fetching genders:', error);
        setGenders([]);
      }
    };

    const fetchGrades = async () => {
      try {
        const response = await ApiCall({
          url: 'http://localhost:5022/api/v1/ProductGrade/GetProductGradeBoxItems/combobox?organizationId=1&companyId=1',
          method: 'GET',
        });
        setGrades(response.data); 
      } catch (error) {
        console.error('Error fetching grades:', error);
        setGrades([]);
      }
    };

    const fetchSizes = async () => {
      try {
        const response = await ApiCall({
          url: 'http://localhost:5022/api/v1/ProductSize/GetProductSizeBoxItems/combobox?organizationId=1&companyId=1',
          method: 'GET',
        });
        setSizes(response.data);  
      } catch (error) {
        console.error('Error fetching sizes:', error);
        setSizes([]);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await ApiCall({
          url: 'http://localhost:5022/api/v1/ProductSubCategory/GetProductSubCategoryBoxItems/combobox?organizationId=1&companyId=1',
          method: 'GET',
        });
        setSubCategories(response.data); // Assuming the response contains an array of subcategories
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setSubCategories([]);
        
      }
    };
    const fetchProductTypes = async () => {
      try {
        const response = await ApiCall({
          url: 'http://localhost:5022/api/v1/ProductType/GetProductTypeBoxItems/combobox?organizationId=1&companyId=1',
          method: 'GET',
        });
        setProductTypes(response.data);  
      } catch (error) {
        console.error('Error fetching product types:', error);
        setProductTypes([]);
      }
    };

    useEffect(() => {
    fetchProductTypes();
    fetchSubCategories();
    fetchBrands();
    fetchCategories();
    fetchColors();
    fetchGenders();
    fetchGrades();
    fetchSizes();
  }, []);


  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row'>
        <div className='d-flex flex-column col-sm-8'>
          <h3>Edit Product</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your product Updation</h5>
          
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <i className="fa fa-print text-primary fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Print button clicked!')} ></i>
          <i className="fa-solid fa-file-pdf text-danger fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer " onClick={() => alert('PDF button clicked!')} ></i>
          <i className="fa fa-file-excel-o fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Excel button clicked!')} style={{ color: 'green' }}></i>
          <Buton  onClick={() => navigate("/Product")}>Move to Product</Buton>
        </div>
        
      </div>

      
      <div style={{backgroundColor:'white',marginTop:15, padding:10 ,border:"1px solid #d6d4d4"}}>
      <form onSubmit={formik.handleSubmit}>
 
  <div className='form-group mt-3'>
    <label>Product Name</label>
    <input
      type='text'
      name='productName'
      className='form-control'
      value={formik.values.productName}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.productName && formik.errors.productName ? (
      <div className='text-danger'>{formik.errors.productName}</div>
    ) : null}
  </div>

  <div className='form-group mt-3'>
    <label>Product Code</label>
    <input
      type='text'
      name='productCode'
      className='form-control'
      value={formik.values.productCode}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.productCode && formik.errors.productCode ? (
      <div className='text-danger'>{formik.errors.productCode}</div>
    ) : null}
  </div>

  <div className='form-group mt-3'>
    <label>Vendor Code</label>
    <input
      type='text'
      name='productVendorCode'
      className='form-control'
      value={formik.values.productVendorCode}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.productVendorCode && formik.errors.productVendorCode ? (
      <div className='text-danger'>{formik.errors.productVendorCode}</div>
    ) : null}
  </div>


  <div className='form-group mt-3'>
    <label>Technical Details</label>
    <input
      type='text'
      name='productTechnicalDetails'
      className='form-control'
      value={formik.values.productTechnicalDetails}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.productTechnicalDetails && formik.errors.productTechnicalDetails ? (
      <div className='text-danger'>{formik.errors.productTechnicalDetails}</div>
    ) : null}
  </div>
  <div className='form-group mt-3'>
    <label>Creation Date</label>
    <input
      type='date'
      name='productCreationDate'
      className='form-control'
      value={formik.values.productCreationDate}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.productCreationDate && formik.errors.productCreationDate ? (
      <div className='text-danger'>{formik.errors.productCreationDate}</div>
    ) : null}
  </div>
  <div className='form-group form-check mt-3
  '>
    <input
      type='checkbox'
      name='productStatus'
      className='form-check-input'
      checked={formik.values.productStatus}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    <label className='form-check-label'>Product Status (Active)</label>
  </div>

  
  <div className='form-group form-check mt-3'>
    <input
      type='checkbox'
      name='isRawMaterial'
      className='form-check-input'
      checked={formik.values.isRawMaterial}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    <label className='form-check-label'>Is Raw Material?</label>
  </div>

 
  <div className='form-group mt-3'>
    <label>Minimum Quantity</label>
    <input
      type='number'
      name='productMinimumQuantity'
      className='form-control'
      value={formik.values.productMinimumQuantity}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.productMinimumQuantity && formik.errors.productMinimumQuantity ? (
      <div className='text-danger'>{formik.errors.productMinimumQuantity}</div>
    ) : null}
  </div>
  <div className='form-group form-check  mt-3'>
    <input
      type='checkbox'
      name='isSingleBranch'
      className='form-check-input'
      checked={formik.values.isSingleBranch}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    <label className='form-check-label'>Single Branch?</label>
    {formik.touched.isSingleBranch && formik.errors.isSingleBranch ? (
      <div className='text-danger'>{formik.errors.isSingleBranch}</div>
    ) : null}
  </div>
  <div className="form-group mt-3">
        <label>Brand</label>
        <select
          name="productBrandId"
          className="form-control"
          value={formik.values.productBrandId}
          onChange={(e) => formik.setFieldValue('productBrandId', Number(e.target.value))}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Brand</option>
          {Array.isArray(brands) && brands.length > 0 ? (
            brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))
          ) : (
            <option disabled>Loading brands...</option>
          )}
        </select>
        {formik.touched.productBrandId && formik.errors.productBrandId ? (
          <div className="text-danger">{formik.errors.productBrandId}</div>
        ) : null}
      </div>

 
      <div className="form-group mt-3">
        <label>Category</label>
        <select
          name="productCategoryId"
          className="form-control"
          value={formik.values.productCategoryId}
          onChange={(e) => formik.setFieldValue('productCategoryId', Number(e.target.value))}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Category</option>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          ) : (
            <option disabled>Loading categories...</option>
          )}
        </select>
        {formik.touched.productCategoryId && formik.errors.productCategoryId ? (
          <div className="text-danger">{formik.errors.productCategoryId}</div>
        ) : null}
      </div>

        <div className='form-group mt-3'>
          <label>Color</label>
          <select
            name='productColorId'
            className='form-control'
            value={formik.values.productColorId}
            onChange={(e) => formik.setFieldValue('productColorId', Number(e.target.value))}  
            onBlur={formik.handleBlur}
          >
            <option value=''>Select Color</option>
            {Array.isArray(colors) && colors.length > 0 ? (
            colors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}  
              </option>
            ))
          ):( <option disabled>Loading Colors...</option>)

          
          }
          </select>
          {formik.touched.productColorId && formik.errors.productColorId ? (
            <div className='text-danger'>{formik.errors.productColorId}</div>
          ) : null}
        </div>

        <div className='form-group mt-3'>
          <label>Gender</label>
          <select
            name='productGanderId'
            className='form-control'
            value={formik.values.productGanderId}
            onChange={(e) => formik.setFieldValue('productGanderId', Number(e.target.value))}  
            onBlur={formik.handleBlur}
          >
            <option value=''>Select Gender</option>
            {Array.isArray(genders) && genders.length > 0 ? (

            genders.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}  
              </option>
            ))
            ):( <option disabled>Loading Genders...</option>)
          }
          </select>
          {formik.touched.productGanderId && formik.errors.productGanderId ? (
            <div className='text-danger'>{formik.errors.productGanderId}</div>
          ) : null}
        </div>

 
        <div className='form-group mt-3'>
          <label>Grade</label>
          <select
            name='productGradeId'
            className='form-control'
            value={formik.values.productGradeId}
            onChange={(e) => formik.setFieldValue('productGradeId', Number(e.target.value))}  
            onBlur={formik.handleBlur}
          >
            <option value=''>Select Grade</option>
            {Array.isArray(grades) && grades.length > 0 ? (
            grades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name}  
              </option>
            ))
          ):(
            <option disabled>Loading Grades...</option>
          )
          }
          </select>
          {formik.touched.productGradeId && formik.errors.productGradeId ? (
            <div className='text-danger'>{formik.errors.productGradeId}</div>
          ) : null}
        </div>
 
        <div className='form-group mt-3'>
          <label>Size</label>
          <select
    
           name='productSizeId'
            className='form-control'
            value={formik.values.productSizeId}
            onChange={(e) => formik.setFieldValue('productSizeId', Number(e.target.value))} 
            onBlur={formik.handleBlur}
          >
            <option value=''>Select Size</option>
            {Array.isArray(sizes) && sizes.length > 0 ? (
            sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name} 
              </option>
            ))
            ):(
              <option disabled>Loading Sizes...</option>
              )
          }
          </select>
          {formik.touched.productSizeId && formik.errors.productSizeId ? (
            <div className='text-danger'>{formik.errors.productSizeId}</div>
          ) : null}
        </div>

        <div className='form-group mt-3'>
          <label>SubCategory</label>
          <select
            name='productSubCategoryId'
            className='form-control'
            value={formik.values.productSubCategoryId}
            onChange={(e) => formik.setFieldValue('productSubCategoryId', Number(e.target.value))}  
            onBlur={formik.handleBlur}
          >
            <option value=''>Select SubCategory</option>
            {Array.isArray(subCategories) && subCategories.length > 0 ? (
            subCategories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name}  
              </option>
            ))
            ):(
              <option disabled>Loading SubCategories...</option>
              )
          }
          </select>
          {formik.touched.productSubCategoryId && formik.errors.productSubCategoryId ? (
            <div className='text-danger'>{formik.errors.productSubCategoryId}</div>
          ) : null}
        </div>

        <div className='form-group mt-3'>
          <label>Product Type</label>
          <select
            name='productTypeId'
            className='form-control'
            value={formik.values.productTypeId}
            onChange={(e) => formik.setFieldValue('productTypeId', Number(e.target.value))} 
            onBlur={formik.handleBlur}
          >
            <option value=''>Select Product Type</option>

            {Array.isArray(productTypes) && productTypes.length > 0 ? (


            productTypes.map((productType) => (
              <option key={productType.id} value={productType.id}>
                {productType.name}  
              </option>
            ))
            ):(
              <option disabled>Loading Product Types...</option>
              )
          }
          </select>
          {formik.touched.productTypeId && formik.errors.productTypeId ? (
            <div className='text-danger'>{formik.errors.productTypeId}</div>
          ) : null}
        </div>


  <button type='submit' className='btn btn-primary mt-3'>Create Product</button>
</form>


      </div>

      <Footer />
    </div>
  );
}

export default EditProduct;