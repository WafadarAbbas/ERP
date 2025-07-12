import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import ApiCall from '../../../Apicall/ApiCall';


const CreateGander = (props) => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    productGanderName: Yup.string()
      .required('Product Gander Name is required')
      .min(2, 'Gander name must be at least 3 characters'),
  });

  const formik = useFormik({
    initialValues: {
      productGanderName: '',
      
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
          url: 'http://localhost:5022/api/v1/ProductGander/SaveProductGander',
          method: 'POST',
          data: formData,
        });
  
       
        if (response?.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: 'Gander saved successfully.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          formik.resetForm();  
          if (typeof props.onclick === "function") {
            props.onclick(); 
          }
        } else {
          throw new Error('Failed to save the Gander');
        }
      } catch (error) {
        console.error('Error during Gander save:', error);
        Swal.fire({
          title: 'Error',
          text: error.message || 'An error occurred while saving the Gander',
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
        data-bs-target="#CreateGanderModal"
        ref={props.open}
      >
        Create Gander
      </button>

      <div
        className="modal fade"
        id="CreateGanderModal"
        tabIndex="-1"
        aria-labelledby="CreateGanderModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateGanderModalLabel">
                Create Gander
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
                  <label htmlFor="productGanderName" className="form-label">
                    Product Gander Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productGanderName"
                    name="productGanderName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productGanderName}
                  />
                  {formik.touched.productGanderName && formik.errors.productGanderName && (
                    <div className="text-danger">{formik.errors.productGanderName}</div>
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

export default CreateGander;
