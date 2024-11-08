import React, { useState } from 'react';
import { useFormik } from 'formik';
import Button from '../../../Compo/Buton'; // Adjust the import as per your file structure

function CreateProduct() {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      productName: '',
      slug: '',
      store: '',
      warehouse: '',
      sku: '',// Added SKU field to Formik initial values
      category: '',      // Added category field to Formik initial values
      subcategory: '',   // Added subcategory field to Formik initial values
      subsubcategory: '',
      age: '',
      number: ''

    },
    onSubmit: values => {
      console.log(values); // Handle the form submission logic
    }
  });



  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Set the preview image
    }
  };
  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between'>
        <div>
          <h4 style={{ color: '#092c4c' }}>Create Product</h4>
          <h6 style={{ fontWeight: 400, color: '#092c4c' }}>Create new product details</h6>
        </div>
        <Button>Back to Product</Button>
      </div>

      <div className="p-4 mt-4" style={{ backgroundColor: 'white', borderRadius: 5, border: '1px solid #d9d9d9' }}>
        <form onSubmit={formik.handleSubmit}>
          <div className="accordion" id="accordionPanelsStayOpenExample">

            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                  style={{ backgroundColor: 'white', fontSize: 17, }}
                >
                  Product Information
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne"
                style={{ backgroundColor: 'white' }}
              >
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="productName" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Product Name</label>
                      <input
                        type="text"
                        id="productName"
                        name="productName"
                        className="form-control"
                        placeholder="Enter product name"
                        onChange={formik.handleChange}
                        value={formik.values.productName}
                        style={{ padding: '.6rem .95rem' }}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label htmlFor="slug" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Slug</label>
                      <input
                        type="text"
                        id="slug"
                        name="slug"
                        className="form-control"
                        placeholder="Enter slug"
                        onChange={formik.handleChange}
                        value={formik.values.slug}
                        style={{ padding: '.6rem .95rem' }}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label htmlFor="sku" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>SKU (Stock Keeping Unit)</label>
                      <input
                        type="text"
                        id="sku"
                        name="sku"
                        className="form-control"
                        placeholder="Enter SKU"
                        onChange={formik.handleChange}
                        value={formik.values.sku}
                        style={{ padding: '.6rem .95rem' }}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label htmlFor="store" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Store</label>
                      <select
                        id="store"
                        name="store"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.store}
                        style={{ padding: '.6rem .95rem', color: 'grey' }}
                      >
                        <option value="">Select Store</option>
                        <option value="store1">Store 1</option>
                        <option value="store2">Store 2</option>
                        <option value="store3">Store 3</option>
                      </select>
                    </div>


                    <div className="col-md-4 mb-3">
                      <label htmlFor="warehouse" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Warehouse</label>
                      <select
                        id="warehouse"
                        name="warehouse"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.warehouse}
                        style={{ padding: '.6rem .95rem', color: 'grey' }}
                      >
                        <option value="">Select Warehouse</option>
                        <option value="warehouse1">Warehouse 1</option>
                        <option value="warehouse2">Warehouse 2</option>
                        <option value="warehouse3">Warehouse 3</option>
                      </select>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label htmlFor="category" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Category</label>
                        <select
                          id="category"
                          name="category"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.category}
                          style={{ padding: '.6rem .95rem', color: 'grey' }}
                        >
                          <option value="">Select Category</option>
                          <option value="electronics">Electronics</option>
                          <option value="furniture">Furniture</option>
                          <option value="clothing">Clothing</option>
                        </select>
                      </div>

                      <div className="col-md-4 mb-3">
                        <label htmlFor="subcategory" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Subcategory</label>
                        <select
                          id="subcategory"
                          name="subcategory"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.subcategory}
                          style={{ padding: '.6rem .95rem', color: 'grey' }}
                        >
                          <option value="">Select Subcategory</option>
                          <option value="smartphones">Smartphones</option>
                          <option value="sofas">Sofas</option>
                          <option value="t-shirts">T-shirts</option>
                        </select>
                      </div>

                      <div className="col-md-4 mb-3">
                        <label htmlFor="subsubcategory" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Subsubcategory</label>
                        <select
                          id="subsubcategory"
                          name="subsubcategory"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.subsubcategory}
                          style={{ padding: '.6rem .95rem', color: 'grey' }}
                        >
                          <option value="">Select Subsubcategory</option>
                          <option value="android">Android</option>
                          <option value="sectionals">Sectionals</option>
                          <option value="graphic-tees">Graphic Tees</option>
                        </select>
                      </div>
                    </div>



                    <div className="row">
                      {/* Brand Field */}
                      <div className="col-md-4 mb-3">
                        <label htmlFor="brand" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Brand</label>
                        <select
                          id="brand"
                          name="brand"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.brand}
                          style={{ padding: '.6rem .95rem', color: 'grey' }}
                        >
                          <option value="">Select Brand</option>
                          <option value="brand1">Brand 1</option>
                          <option value="brand2">Brand 2</option>
                          <option value="brand3">Brand 3</option>
                        </select>
                      </div>

                      {/* Unit Field */}
                      <div className="col-md-4 mb-3">
                        <label htmlFor="unit" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Unit</label>
                        <select
                          id="unit"
                          name="unit"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.unit}
                          style={{ padding: '.6rem .95rem', color: 'grey' }}
                        >
                          <option value="">Select Unit</option>
                          <option value="kg">Kg</option>
                          <option value="g">g</option>
                          <option value="l">L</option>
                          <option value="m">m</option>
                        </select>
                      </div>

                      {/* Selling Type Field */}
                      <div className="col-md-4 mb-3">
                        <label htmlFor="sellingType" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Selling Type</label>
                        <select
                          id="sellingType"
                          name="sellingType"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.sellingType}
                          style={{ padding: '.6rem .95rem', color: 'grey' }}
                        >
                          <option value="">Select Selling Type</option>
                          <option value="wholesale">Wholesale</option>
                          <option value="retail">Retail</option>
                          <option value="both">Both</option>
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      {/* Barcode Symbology Field */}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="barcodeSymbology" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Barcode Symbology</label>
                        <select
                          id="barcodeSymbology"
                          name="barcodeSymbology"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.barcodeSymbology}
                          style={{ padding: '.6rem .95rem', color: 'grey' }}
                        >
                          <option value="">Select Barcode Symbology</option>
                          <option value="ean13">EAN-13</option>
                          <option value="upca">UPC-A</option>
                          <option value="code128">Code 128</option>
                          <option value="qr">QR Code</option>
                        </select>
                      </div>

                      {/* Item Code Field */}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="itemCode" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Item Code</label>
                        <input
                          type="text"
                          id="itemCode"
                          name="itemCode"
                          className="form-control"
                          placeholder="Enter Item Code"
                          onChange={formik.handleChange}
                          value={formik.values.itemCode}
                          style={{ padding: '.6rem .95rem' }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      {/* Description Field */}
                      <div className="col-md-12 mb-3">
                        <label htmlFor="description" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Description</label>
                        <textarea
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Enter product description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          style={{ padding: '.6rem .95rem', height: '100px' }}
                        />
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Stock Accordion */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                  style={{ backgroundColor: 'white', fontSize: 17 }}
                >
                  Pricing & Stock
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingTwo"
                style={{ backgroundColor: 'white' }}
              >
                <div className="accordion-body">
                  <div className="row">
                    {/* Quantity Field */}
                    <div className="col-md-4 mb-3">
                      <label htmlFor="quantity" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Quantity</label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        className="form-control"
                        placeholder="Enter quantity"
                        onChange={formik.handleChange}
                        value={formik.values.quantity}
                        style={{ padding: '.6rem .95rem' }}
                      />
                    </div>

                    {/* Price Field */}
                    <div className="col-md-4 mb-3">
                      <label htmlFor="price" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Price</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        className="form-control"
                        placeholder="Enter price"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                        style={{ padding: '.6rem .95rem' }}
                      />
                    </div>


                    <div className="col-md-4 mb-3">
                      <label htmlFor="taxType" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Tax Type</label>
                      <select
                        id="taxType"
                        name="taxType"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.taxType}
                        style={{ padding: '.6rem .95rem', color: 'grey' }}
                      >
                        <option value="">Select Tax Type</option>
                        <option value="GST">GST</option>
                        <option value="VAT">VAT</option>
                        <option value="SalesTax">Sales Tax</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mt-3">
                    {/* Discount Type Field */}
                    <div className="col-md-4 mb-3">
                      <label htmlFor="discountType" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Discount Type</label>
                      <select
                        id="discountType"
                        name="discountType"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.discountType}
                        style={{ padding: '.6rem .95rem', color: 'grey' }}
                      >
                        <option value="">Select Discount Type</option>
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                      </select>
                    </div>


                    <div className="col-md-4 mb-3">
                      <label htmlFor="discountValue" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Discount Value</label>
                      <input
                        type="number"
                        id="discountValue"
                        name="discountValue"
                        className="form-control"
                        placeholder="Enter discount value"
                        onChange={formik.handleChange}
                        value={formik.values.discountValue}
                        style={{ padding: '.6rem .95rem' }}
                      />
                    </div>

                    {/* Quantity Alert Field */}
                    <div className="col-md-4 mb-3">
                      <label htmlFor="quantityAlert" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Quantity Alert</label>
                      <input
                        type="number"
                        id="quantityAlert"
                        name="quantityAlert"
                        className="form-control"
                        placeholder="Enter quantity alert level"
                        onChange={formik.handleChange}
                        value={formik.values.quantityAlert}
                        style={{ padding: '.6rem .95rem' }}
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    {/* Image Upload Field */}
                    <div className="col-md-4 mb-3">
                      <label htmlFor="productImage" style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>Product Image</label>

                      <input
                        type="file"
                        id="productImage"
                        name="productImage"
                        className="form-control"
                        onChange={handleImageChange}
                        style={{ padding: '.6rem .95rem' }}
                      />

                      {/* Image Preview */}
                      {imagePreview ? (
                        <div className="mt-2">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ maxWidth: '20%', height: 'auto', borderRadius: '8px' }}
                          />
                        </div>
                      ) : (
                        <div className="mt-2" style={{ color: 'gray' }}>
                          <small>Choose an image file (JPG, PNG, etc.)</small>
                        </div>
                      )}
                    </div>
                  </div>


                </div>
              </div>
            </div>



            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                  style={{ backgroundColor: 'white', fontSize: 17, }}
                >
                  Custom Feilds
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingThree"
                style={{ backgroundColor: 'white' }}
              >
                <div className="accordion-body">
                  {/* Number Field */}
                  <div className="mb-3">
                    <label htmlFor="number" style={{ fontWeight: '500', fontSize: 16 }}>
                      Number
                    </label>
                    <input
                      type="text"
                      id="number"
                      name="number"
                      className="form-control"
                      placeholder="Enter number"
                      onChange={formik.handleChange}
                      value={formik.values.number}
                      style={{ padding: '.6rem .95rem' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-end mt-4">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: '#ff9f43',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none'
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
