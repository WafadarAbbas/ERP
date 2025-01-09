import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiCall from "../../../Apicall/ApiCall";
import Swal from "sweetalert2";

const EditGrade = (props) => {
  const { selectedGradeId } = props;
  const [initialValues, setInitialValues] = useState({
    productGradeName: "",
  });

  const validationSchema = Yup.object({
    productGradeName: Yup.string()
      .required("Product Grade Name is required")
      .min(3, "Grade name must be at least 3 characters"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        id: selectedGradeId,
      };

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductGrade/UpdateProductGrade",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire(
            "Updated",
            "The Grade has been updated successfully.",
            "success"
          );

          formik.resetForm();

          if (typeof props.onclick === "function") {
            props.onclick();
          }
          if (typeof props.onIdReset === "function") {
            props.onIdReset();
          }
          if (props.close && props.close.current) {
            props.close.current.click(); // Close the modal by triggering the close button
          }
        } else {
          Swal.fire("Error", "Failed to update Grade", "error");
        }
      } catch (error) {
        console.error("Error during update:", error);
        Swal.fire(
          "Error",
          "An error occurred while updating the Grade",
          "error"
        );
      }
    },
  });

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/ProductGrade/GetProductGradeByIdQuery/GetById/${selectedGradeId}?organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
         
          setInitialValues({
            productGradeName: response.data[0].productGradeName || "",
          });
        } else {
          console.error("Failed to load Grade data.");
        }
      } catch (error) {
        console.error("Error fetching Grade:", error.message);
      }
    };

    if (selectedGradeId) {
      fetchGrade();
    }
  }, [selectedGradeId]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditGradeModal"
        ref={props.open}
      >
        Edit Grade
      </button>

      <div
        className="modal fade"
        id="EditGradeModal"
        tabIndex="-1"
        aria-labelledby="EditGradeModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditGradeModalLabel">
                Edit Grade
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
                  {formik.touched.productGradeName &&
                    formik.errors.productGradeName && (
                      <div className="text-danger">
                        {formik.errors.productGradeName}
                      </div>
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

export default EditGrade;
