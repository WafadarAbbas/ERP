import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiCall from "../../../Apicall/ApiCall";
import Swal from "sweetalert2";

const EditGander = (props) => {
  const { selectedGanderId } = props;
  const [initialValues, setInitialValues] = useState({
    productGanderName: "",
  });

  const validationSchema = Yup.object({
    productGanderName: Yup.string()
      .required("Product Gander Name is required")
      .min(3, "Gander name must be at least 3 characters"),
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
        id: selectedGanderId,
      };

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductGander/UpdateProductGander",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire(
            "Updated",
            "The Gander has been updated successfully.",
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
          Swal.fire("Error", "Failed to update Gander", "error");
        }
      } catch (error) {
        console.error("Error during update:", error);
        Swal.fire(
          "Error",
          "An error occurred while updating the Gander",
          "error"
        );
      }
    },
  });

  useEffect(() => {
    const fetchGander = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/ProductGander/GetProductGanderByIdQuery/GetById/${selectedGanderId}?organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
         
          setInitialValues({
            productGanderName: response.data[0].productGanderName || "",
          });
        } else {
          console.error("Failed to load Gander data.");
        }
      } catch (error) {
        console.error("Error fetching Gander:", error.message);
      }
    };

    if (selectedGanderId) {
      fetchGander();
    }
  }, [selectedGanderId]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditGanderModal"
        ref={props.open}
      >
        Edit Gander
      </button>

      <div
        className="modal fade"
        id="EditGanderModal"
        tabIndex="-1"
        aria-labelledby="EditGanderModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditGanderModalLabel">
                Edit Gander
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
                  {formik.touched.productGanderName &&
                    formik.errors.productGanderName && (
                      <div className="text-danger">
                        {formik.errors.productGanderName}
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

export default EditGander;
