import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import ApiCall from '../../../Apicall/ApiCall';


const CreateCategory = (props) => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    productCategoryName: Yup.string()
      .required('Product Category Name is required')
      .min(3, 'Category name must be at least 3 characters'),
  });

  const formik = useFormik({
    initialValues: {
      productCategoryName: '',
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
          url: 'http://localhost:5022/api/v1/ProductCategory/SaveProductCategory',
          method: 'POST',
          data: formData,
        });
  
       
        if (response?.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: 'Category saved successfully.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          formik.resetForm();  
          if (typeof props.onclick === "function") {
            props.onclick(); 
          }
        } else {
          throw new Error('Failed to save the category');
        }
      } catch (error) {
        console.error('Error during category save:', error);
        Swal.fire({
          title: 'Error',
          text: error.message || 'An error occurred while saving the category',
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
        data-bs-target="#CreateCategoryModal"
        ref={props.open}
      >
        Create Category
      </button>

      <div
        className="modal fade"
        id="CreateCategoryModal"
        tabIndex="-1"
        aria-labelledby="CreateCategoryModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateCategoryModalLabel">
                Create Category
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
                  <label htmlFor="productCategoryName" className="form-label">
                    Product Category Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productCategoryName"
                    name="productCategoryName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productCategoryName}
                  />
                  {formik.touched.productCategoryName && formik.errors.productCategoryName && (
                    <div className="text-danger">{formik.errors.productCategoryName}</div>
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

export default CreateCategory;
