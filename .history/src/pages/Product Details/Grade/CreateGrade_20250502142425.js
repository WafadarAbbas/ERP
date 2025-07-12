import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import ApiCall from '../../../Apicall/ApiCall';


const CreateGrade = (props) => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    productGradeName: Yup.string()
      .required('Product Grade Name is required')
      .min(2, 'Grade name must be at least 3 characters'),
  });

  const formik = useFormik({
    initialValues: {
      productGradeName: '',
      
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Prepare form data with static values
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
      };
  
      try {
       
        const response = await ApiCall({
          url: 'http://localhost:5022/api/v1/ProductGrade/SaveProductGrade',
          method: 'POST',
          data: formData,
        });
  
       
        if (response?.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: 'Grade saved successfully.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          formik.resetForm();  
          if (props.close && props.close.current) {
            props.close.current.click();
          }
          if (typeof props.onclick === "function" ) {
            props.onclick();
          }
        } else {
          throw new Error('Failed to save the Grade');
        }
      } catch (error) {
        console.error('Error during Grade save:', error);
        Swal.fire({
          title: 'Error',
          text: error.message || 'An error occurred while saving the Grade',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Close',
        });
      }
    },
  });

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateGradeModal"
        ref={props.open}
      >
        Create Grade
      </button>

      <div
        className="modal fade"
        id="CreateGradeModal"
        tabIndex="-1"
        aria-labelledby="CreateGradeModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateGradeModalLabel">
                Create Grade
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={props.close}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {/* Formik Form */}
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-5 mt-3">
                  <label htmlFor="productGradeName" className="form-label">
                    Product Grade Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productGradeName"
                    name="productGradeName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productGradeName}
                  />
                  {formik.touched.productGradeName && formik.errors.productGradeName && (
                    <div className="text-danger">{formik.errors.productGradeName}</div>
                  )}
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
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

export default CreateGrade;
