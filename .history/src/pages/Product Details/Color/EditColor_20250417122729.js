import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiCall from "../../../Apicall/ApiCall";
import Swal from "sweetalert2";

const EditColor = (props) => {
  const { selectedColorId } = props;
  const [initialValues, setInitialValues] = useState({
    productColorName: "",
  });

  const validationSchema = Yup.object({
    productColorName: Yup.string()
      .required("Product Color Name is required")
      .min(3, "Color name must be at least 3 characters"),
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
        id: selectedColorId,
      };

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductColor/UpdateProductColor",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire(
            "Updated",
            "The Color has been updated successfully.",
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
            props.close.current.click();  
          }
        } else {
          Swal.fire("Error", "Failed to update Color", "error");
        }
      } catch (error) {
        console.error("Error during update:", error);
        Swal.fire(
          "Error",
          "An error occurred while updating the Color",
          "error"
        );
      }
    },
  });

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/ProductColor/GetProductColorByIdQuery/GetById/${selectedColorId}?organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
         
          setInitialValues({
            productColorName: response.data[0].productColorName || "",
          });
        } else {
          console.error("Failed to load Color data.");
        }
      } catch (error) {
        console.error("Error fetching Color:", error.message);
      }
    };

    if (selectedColorId) {
      fetchColor();
    }
  }, [selectedColorId]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditColorModal"
        ref={props.open}
      >
        Edit Color
      </button>

      <div
        className="modal fade"
        id="EditColorModal"
        tabIndex="-1"
        aria-labelledby="EditColorModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditColorModalLabel">
                Edit Color
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
                  <label htmlFor="productColorName" className="form-label">
                    Product Color Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productColorName"
                    name="productColorName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productColorName}
                  />
                  {formik.touched.productColorName &&
                    formik.errors.productColorName && (
                      <div className="text-danger">
                        {formik.errors.productColorName}
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

export default EditColor;
