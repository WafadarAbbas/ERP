import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import ApiCall from '../../../Apicall/ApiCall';

const CreateManufacturer = (props) => {
 
  const validationSchema = Yup.object({
    manfacturerName: Yup.string()
      .required('Manufacturer Name is required')
      .min(2, 'Name must be at least 2 characters'),
    manfacturerAddress: Yup.string()
      .required('Address is required')
      .min(5, 'Address must be at least 5 characters'),
    manfacturerCity: Yup.string()
      .required('City is required')
      .min(2, 'City must be at least 2 characters'),
    manfacturerCountry: Yup.string()
      .required('Country is required')
      .min(2, 'Country must be at least 2 characters'),
    manfacturerNtnVatNo: Yup.string()
      .required('NTN/VAT Number is required')
      .matches(/^[0-9a-zA-Z]+$/, 'Only alphanumeric characters are allowed'),
  });

  const formik = useFormik({
    initialValues: {
      manfacturerName: '',
      manfacturerAddress: '',
      manfacturerCity: '',
      manfacturerCountry: '',
      manfacturerNtnVatNo: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
      };
    
      try {
        const response = await ApiCall({
          url: 'http://localhost:5022/api/v1/ProductManufacturer/SaveProductManufacturer',
          method: 'POST',
          data: formData,
        });
    
        if (response?.status === 200) {
                 Swal.fire({
                   title: "Success!",
                   text: "Manufacturer saved successfully.",
                   icon: "success",
                   confirmButtonColor: "#3085d6",
                   confirmButtonText: "OK",
                 });
       
                 formik.resetForm();
                 if (props.close && props.close.current) {
                   props.close.current.click();
                 }
                 if (typeof props.onclick === "function" ) {
                   props.onclick();
                 }
               } else {
                 throw new Error("Failed to save the Manufacturer");
               }
             } catch (error) {
               console.error("Error during Manufacturer save:", error);
               Swal.fire({
                 title: "Error",
                 text: error.message || "An error occurred while saving the Manufacturer",
                 icon: "error",
                 confirmButtonColor: "#d33",
                 confirmButtonText: "Close",
               });
             }
           },
         });

  
  const handleModalClose = () => {
    formik.resetForm();
    if (typeof props.close === "function") {
      props.close();
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateManufacturerModal"
        ref={props.open}
      >
        Create Manufacturer
      </button>

      <div
        className="modal fade"
        id="CreateManufacturerModal"
        tabIndex="-1"
        aria-labelledby="CreateManufacturerModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateManufacturerModalLabel">
                Create Manufacturer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={props.close}
                onClick={handleModalClose}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
          
              <form onSubmit={formik.handleSubmit}>
              <div className="row">
 
  <div className="col-md-12 mb-3 d-flex align-items-center">
    <label htmlFor="manfacturerName" className="form-label me-3" style={{ fontSize: 14, width: '30%' }}>
      Manufacturer Name
    </label>
    <input
      type="text"
      className="form-control"
      id="manfacturerName"
      name="manfacturerName"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.manfacturerName}
    />
    {formik.touched.manfacturerName && formik.errors.manfacturerName && (
      <div className="text-danger mt-1">{formik.errors.manfacturerName}</div>
    )}
  </div>

 
  <div className="col-md-12 mb-3 d-flex align-items-center">
    <label htmlFor="manfacturerAddress" className="form-label me-3" style={{ fontSize: 14, width: '30%' }}>
      Manufacturer Address
    </label>
    <input
      type="text"
      className="form-control"
      id="manfacturerAddress"
      name="manfacturerAddress"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.manfacturerAddress}
    />
    {formik.touched.manfacturerAddress && formik.errors.manfacturerAddress && (
      <div className="text-danger mt-1">{formik.errors.manfacturerAddress}</div>
    )}
  </div>

 
  <div className="col-md-12 mb-3 d-flex align-items-center">
    <label htmlFor="manfacturerCity" className="form-label me-3" style={{ fontSize: 14, width: '30%' }}>
      Manufacturer City
    </label>
    <input
      type="text"
      className="form-control"
      id="manfacturerCity"
      name="manfacturerCity"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.manfacturerCity}
    />
    {formik.touched.manfacturerCity && formik.errors.manfacturerCity && (
      <div className="text-danger mt-1">{formik.errors.manfacturerCity}</div>
    )}
  </div>

   
  <div className="col-md-12 mb-3 d-flex align-items-center">
    <label htmlFor="manfacturerCountry" className="form-label me-3" style={{ fontSize: 14, width: '30%' }}>
      Manufacturer Country
    </label>
    <input
      type="text"
      className="form-control"
      id="manfacturerCountry"
      name="manfacturerCountry"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.manfacturerCountry}
    />
    {formik.touched.manfacturerCountry && formik.errors.manfacturerCountry && (
      <div className="text-danger mt-1">{formik.errors.manfacturerCountry}</div>
    )}
  </div>

   
  <div className="col-md-12 mb-3 d-flex align-items-center">
    <label htmlFor="manfacturerNtnVatNo" className="form-label me-3" style={{ fontSize: 14, width: '30%' }}>
      NTN/VAT Number
    </label>
    <input
      type="text"
      className="form-control"
      id="manfacturerNtnVatNo"
      name="manfacturerNtnVatNo"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.manfacturerNtnVatNo}
    />
    {formik.touched.manfacturerNtnVatNo && formik.errors.manfacturerNtnVatNo && (
      <div className="text-danger mt-1">{formik.errors.manfacturerNtnVatNo}</div>
    )}
  </div>
</div>


                <div className="d-flex justify-content-between modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleModalClose}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: '#ff9f43', color: 'white' }}
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateManufacturer;

