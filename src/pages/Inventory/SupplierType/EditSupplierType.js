import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";
 


const EditSupplierType = (props) => {

  const { selectedSupplierTypeId } = props;
 
  const validationSchema = Yup.object({
    typeName: Yup.string()
    .required("Type Name is required")
    .min(2, "Type Name must be at least 2 characters")
    .max(50, "Type Name can't exceed 50 characters"),
  });

  const formik = useFormik({
    initialValues: {
      typeName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        id:selectedSupplierTypeId,
      };
      console.log(formData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/SupplierType/UpdateSupplierType",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire({
            title: "Success!",
            text: "Supplier Type saved successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
    

          formik.resetForm();
          if (props.close && props.close.current) {
            props.close.current.click();  
          }
          if (typeof props.onIdReset === "function") {
            props.onIdReset();
          }
          if (typeof props.onclick === "function" ) {
            props.onclick();
          }
        } else {
          throw new Error("Failed to save the Supplier Type");
        }
      } catch (error) {
        console.error("Error during Supplier Type save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the Supplier Type",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Close",
        });
      }
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [props.open]);

  const handleModalClose = () => {
    formik.resetForm();
  };

useEffect(() => {
  const fetchSupplierType = async () => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/SupplierType/GetSupplierTypeByIdQuery/GetISupplierTypeById?id=${selectedSupplierTypeId}&organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response && response.data && response.data.length > 0) {
        const SupplierType = response.data[0];
        
        
        formik.setValues({ 
          typeName: SupplierType.typeName || "",
        });
      } else {
        console.error("Failed to load Supplier Type data.");
      }
    } catch (error) {
      console.error("Error fetching Supplier Type:", error.message);
    }
  };

  if (selectedSupplierTypeId) {
    fetchSupplierType();
  }
}, [selectedSupplierTypeId]);


 

    return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditSupplierTypeModal"
        ref={props.open}
      >
        Edit SupplierType
      </button>

      <div
        className="modal fade"
        id="EditSupplierTypeModal"
        tabIndex="-1"
        aria-labelledby="EditSupplierTypeModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditSupplierTypeModalLabel">
                Edit Main
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleModalClose}
                ref={props.close}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
              
                <div className="mb-3">
                  <label htmlFor="typeName" className="form-label">
                    Type Name
                  </label>
                  <input
                    type="text"
                    id="typeName"
                    name="typeName"
                    className={`form-control ${
                      formik.touched.typeName && formik.errors.typeName ? "is-invalid" : ""
                    }`}
                    value={formik.values.typeName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.typeName && formik.errors.typeName ? (
                    <div className="invalid-feedback">{formik.errors.typeName}</div>
                  ) : null}
                </div>

                <div className="d-flex justify-content-between modal-footer mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleModalClose}
                    ref={props.close}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#ff9f43", color: "white" }}
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

export default EditSupplierType;