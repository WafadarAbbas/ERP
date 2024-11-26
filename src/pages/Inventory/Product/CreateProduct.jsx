import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';


function CreateProduct() {
  // Formik initialization with useFormik
  const formik = useFormik({
    initialValues: {
      productName: '',
      productCode: '',
      productVendorCode: '',
      productTechnicalDetails: '',
      productCreationDate: '',
      productStatus: false,  
      isRawMaterial: false,  
      isSingleBranch: false,  
      productMinimumQuantity: 0,
      brandId: '',  
      categoryId: '', 
      colorId: '',  
    
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
    onSubmit: async (values, { resetForm }) => {
 console.log(values);
 
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

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await ApiCall({
          url: 'http://localhost:5022/api/v1/ProductBrand/GetProductBrandBoxItems/combobox?organizationId=1&companyId=1',
          method: 'GET',
        });
        setBrands(response.data);  
      } catch (error) {
        console.error('Error fetching brands:', error);
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
      }
    };
    const fetchProductTypes = async () => {
      try {
        const response = await ApiCall({
          url: 'http://localhost:5022/api/v1/ProductType/GetProductTypeBoxItems/combobox?organizationId=1&companyId=1',
          method: 'GET',
        });
        setProductTypes(response.data); // Assuming the response contains an array of product types
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };


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
        <div className='d-flex flex-column col-sm-7'>
          <h3>Create Product</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your product creation</h5>
        </div>
      </div>

      
      <div style={{backgroundColor:'white', padding:10 ,border:"1px solid #d6d4d4"}}>
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

  {/* New fields */}
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
  <div className='form-group mt-3'>
          <label>Brand</label>
          <select
            name='brandId'
            className='form-control'
            value={formik.values.brandId}
            onChange={(e) => formik.setFieldValue('brandId', Number(e.target.value))} // Ensure it's a number
            onBlur={formik.handleBlur}
          >
            <option value=''>Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name} {/* Display name */}
              </option>
            ))}
          </select>
          {formik.touched.brandId && formik.errors.brandId ? (
            <div className='text-danger'>{formik.errors.brandId}</div>
          ) : null}
        </div>

        {/* Product Category Select Field */}
        <div className='form-group mt-3'>
          <label>Category</label>
          <select
            name='categoryId'
            className='form-control'
            value={formik.values.categoryId}
            onChange={(e) => formik.setFieldValue('categoryId', Number(e.target.value))} // Ensure it's a number
            onBlur={formik.handleBlur}
          >
            <option value=''>Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} {/* Display category name */}
              </option>
            ))}
          </select>
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <div className='text-danger'>{formik.errors.categoryId}</div>
          ) : null}
        </div>

        <div className='form-group mt-3'>
          <label>Color</label>
          <select
            name='colorId'
            className='form-control'
            value={formik.values.colorId}
            onChange={(e) => formik.setFieldValue('colorId', Number(e.target.value))} // Ensure it's a number
            onBlur={formik.handleBlur}
          >
            <option value=''>Select Color</option>
            {colors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name} {/* Display color name */}
              </option>
            ))}
          </select>
          {formik.touched.colorId && formik.errors.colorId ? (
            <div className='text-danger'>{formik.errors.colorId}</div>
          ) : null}
        </div>

        <div className='form-group mt-3'>
          <label>Gender</label>
          <select
            name='genderId'
            className='form-control'
            value={formik.values.genderId}
            onChange={(e) => formik.setFieldValue('genderId', Number(e.target.value))} // Ensure it's a number
            onBlur={formik.handleBlur}
          >
            <option value=''>Select Gender</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.name} {/* Display gender name */}
              </option>
            ))}
          </select>
          {formik.touched.genderId && formik.errors.genderId ? (
            <div className='text-danger'>{formik.errors.genderId}</div>
          ) : null}
        </div>

        {/* Product Grade Select Field */}
        <div className='form-group mt-3'>
          <label>Grade</label>
          <select
            name='gradeId'
            className='form-control'
            value={formik.values.gradeId}
            onChange={(e) => formik.setFieldValue('gradeId', Number(e.target.value))} // Ensure it's a number
            onBlur={formik.handleBlur}
          >
            <option value=''>Select Grade</option>
            {grades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name} {/* Display grade name */}
              </option>
            ))}
          </select>
          {formik.touched.gradeId && formik.errors.gradeId ? (
            <div className='text-danger'>{formik.errors.gradeId}</div>
          ) : null}
        </div>

        {/* Product Size Select Field */}
        <div className='form-group mt-3'>
          <label>Size</label>
          <select
            name='sizeId'
            className='form-control'
            value={formik.values.sizeId}
            onChange={(e) => formik.setFieldValue('sizeId', Number(e.target.value))} // Ensure it's a number
            onBlur={formik.handleBlur}
          >
            <option value=''>Select Size</option>
            {sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name} {/* Display size name */}
              </option>
            ))}
          </select>
          {formik.touched.sizeId && formik.errors.sizeId ? (
            <div className='text-danger'>{formik.errors.sizeId}</div>
          ) : null}
        </div>

        <div className='form-group mt-3'>
          <label>SubCategory</label>
          <select
            name='subCategoryId'
            className='form-control'
            value={formik.values.subCategoryId}
            onChange={(e) => formik.setFieldValue('subCategoryId', Number(e.target.value))} // Ensure it's a number
            onBlur={formik.handleBlur}
          >
            <option value=''>Select SubCategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name} {/* Display subcategory name */}
              </option>
            ))}
          </select>
          {formik.touched.subCategoryId && formik.errors.subCategoryId ? (
            <div className='text-danger'>{formik.errors.subCategoryId}</div>
          ) : null}
        </div>

        <div className='form-group mt-3'>
          <label>Product Type</label>
          <select
            name='productTypeId'
            className='form-control'
            value={formik.values.productTypeId}
            onChange={(e) => formik.setFieldValue('productTypeId', Number(e.target.value))} // Ensure it's a number
            onBlur={formik.handleBlur}
          >
            <option value=''>Select Product Type</option>
            {productTypes.map((productType) => (
              <option key={productType.id} value={productType.id}>
                {productType.name}  
              </option>
            ))}
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

export default CreateProduct;
