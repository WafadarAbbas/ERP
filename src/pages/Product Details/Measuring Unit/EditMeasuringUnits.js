import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const EditMeasuringUnits = (props) => {
  const { selectedMeasuringUnitsId } = props;

  console.log(selectedMeasuringUnitsId);

  const validationSchema = Yup.object({
    measuringUnitsName: Yup.string()
    .required("Measuring Units Name is required")
    .min(2, "Name must be at least 2 characters"),
  });


  const formik = useFormik({
    initialValues: {
      measuringUnitsName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        id: selectedMeasuringUnitsId,
      };
      console.log(formData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/MeasuringUnits/UpdateMeasuringUnits",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire({
            title: "Success!",
            text: "Product MeasuringUnits saved successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });

          formik.resetForm();
          if (props.close && props.close.current) {
            props.close.current.click();
          }
          if (typeof props.onclick === "function") {
            props.onclick();
          }
        } else {
          throw new Error("Failed to save the product MeasuringUnits");
        }
      } catch (error) {
        console.error("Error during product MeasuringUnits save:", error);
        Swal.fire({
          title: "Error",
          text:
            error.message ||
            "An error occurred while saving the product MeasuringUnits",
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
    const fetchMeasuringUnits = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/MeasuringUnits/GetMeasuringUnitsByIdQuery/GetById/${selectedMeasuringUnitsId}?organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const MeasuringUnits = response.data[0];

          formik.setValues({
 
            measuringUnitsName: MeasuringUnits.measuringUnitsName || "",
    
          });
        } else {
          console.error("Failed to load Product MeasuringUnits data.");
        }
      } catch (error) {
        console.error("Error fetching Product MeasuringUnits:", error.message);
      }
    };

    if (selectedMeasuringUnitsId) {
      fetchMeasuringUnits();
    }
  }, [selectedMeasuringUnitsId]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditMeasuringUnitsModal"
        ref={props.open}
      >
        Edit MeasuringUnits
      </button>

      <div
        className="modal fade"
        id="EditMeasuringUnitsModal"
        tabIndex="-1"
        aria-labelledby="EditMeasuringUnitsModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditMeasuringUnitsModalLabel">
                Edit Product MeasuringUnits
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
              
 {/* Measuring Units Name Field */}
 <div className="mb-3">
  <label htmlFor="measuringUnitsName" className="form-label">
    Measuring Units Name
  </label>
  <input
    type="text"
    className={`form-control ${formik.touched.measuringUnitsName && formik.errors.measuringUnitsName ? "is-invalid" : ""}`}
    id="measuringUnitsName"
    name="measuringUnitsName"
    value={formik.values.measuringUnitsName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.measuringUnitsName && formik.errors.measuringUnitsName && (
    <div className="invalid-feedback">{formik.errors.measuringUnitsName}</div>
  )}
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

export default EditMeasuringUnits;
