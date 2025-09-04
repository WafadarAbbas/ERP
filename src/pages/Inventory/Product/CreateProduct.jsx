import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';

function CreateProduct() { 
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
      productBarCodeImage: '',
      productBrandId: 0,  
      productCategoryId: 0, 
      productColorId: 0,  
      productGanderId: 0,
      productGradeId: 0,
      productSizeId: 0,
      productSubCategoryId: 0,
      productTypeId:0,
    },
    
 
    validationSchema: Yup.object({
 
    }),
 
onSubmit: async (values) => {
  const formData = {
    ...values,
    organizationId: 1,
    companyId: 1,
  };
try {
    const response = await ApiCall({
      url: 'http://localhost:5022/api/v1/Product/SaveProduct',
      method: 'POST',
      data: formData,
    });

    console.log('Product saved successfully:', response.data);

    Swal.fire({
      title: 'Success!',
      text: 'Product saved successfully.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });

    formik.resetForm(); // optional: reset the form after success
  } catch (error) {
    console.error('Error saving product:', error);

    Swal.fire({
      title: 'Error!',
      text: 'Failed to save product.',
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK',
    });
  }
}
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
        setBrands([]);
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


    fetchProductTypes();
     
    fetchBrands();
     
    fetchColors();
    fetchGenders();
    fetchGrades();
    fetchSizes();
  }, []);


  useEffect(() => {
    // Fetch Categories
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
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch SubCategories when a Category is selected
    if (formik.values.productCategoryId) {
      const fetchSubCategories = async () => {
        try {
          const response = await ApiCall({
            url: `http://localhost:5022/api/v1/ProductSubCategory/GetProductSubCategoryByProductCategoryIdQuery/GetProductSubCategoryByProductCategoryId?id=${formik.values.productCategoryId}&organizationId=1&companyId=1`,
            method: 'GET',
          });
          setSubCategories(response.data);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
          setSubCategories([]);
        }
      };
      fetchSubCategories();
    } else {
      setSubCategories([]); // Reset SubCategories if no category is selected
    }
  }, [formik.values.productCategoryId]);


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
            onChange={(e) => {
              formik.setFieldValue('productCategoryId', Number(e.target.value));
              formik.setFieldValue('productSubCategoryId', 0); // Reset SubCategory when Category changes
            }}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {formik.touched.productCategoryId && formik.errors.productCategoryId ? (
            <div className="text-danger">{formik.errors.productCategoryId}</div>
          ) : null}
        </div>

        <div className="form-group mt-3">
          <label>SubCategory</label>
          <select
            name="productSubCategoryId"
            className="form-control"
            value={formik.values.productSubCategoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select SubCategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.productSubCategoryName}
              </option>
            ))}
          </select>
          {formik.touched.productSubCategoryId && formik.errors.productSubCategoryId ? (
            <div className="text-danger">{formik.errors.productSubCategoryId}</div>
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

   <div className='form-group mt-3'>
  <label>Product Barcode Image</label>
  <input
    type='text'
    name='productBarCodeImage'
    className='form-control'
    value={formik.values.productBarCodeImage}
    onChange={formik.handleChange}   // ✅ now it will update
    onBlur={formik.handleBlur}       // optional: for validation/touched
  />
  {formik.touched.productBarCodeImage && formik.errors.productBarCodeImage ? (
    <div className='text-danger'>{formik.errors.productBarCodeImage}</div>
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
