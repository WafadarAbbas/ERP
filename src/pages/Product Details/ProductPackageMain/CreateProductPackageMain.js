import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall"; // Keep this commented

const CreateProductPackageMain = (props) => {

  const [productPackageOptions, setProductPackageOptions] = useState([]);

  const validationSchema = Yup.object({
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref('startDate'), "End date can't be before start date"),
      price: Yup.number()
      .required("Price is required")
      .min(0, "Price can't be negative"),
      productPackageMainId: Yup.string().required("Product package is required"),
      
  });

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      price: 0,
      isCurrentPrice: false,
      productPackageMainId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        branchId: 1,
      };
      console.log("Form Data Submitted:", formData);

      // Commented API call
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductPackageMain/SaveProductPackageMain",
          method: "POST",
          data: formData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Product Package Main saved successfully.",
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
          throw new Error("Failed to save the product package Main");
        }
      } catch (error) {
        console.error("Error during product package Main save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the product package Main",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Close",
        });
      }
    },
  });

  const handleModalClose = () => {
    formik.resetForm();
  };

  useEffect(() => {
    const fetchProductPackageOptions = async () => {
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductPackageMain/GetProductPackageMainBoxItems/combobox?organizationId=1&companyId=1",
          method: "GET",
        });
        if (response?.status === 200 && Array.isArray(response.data)) {
          setProductPackageOptions(response.data);
        } else {
          throw new Error("Failed to fetch product package options.");
        }
      } catch (error) {
        console.error("Error fetching product packages:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "Failed to load product packages.",
          icon: "error",
        });
      }
    };

    fetchProductPackageOptions();
  }, []);


  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateProductPackageMainModal"
        ref={props.open}
      >
        Create Product Package
      </button>

      <div
        className="modal fade"
        id="CreateProductPackageMainModal"
        tabIndex="-1"
        aria-labelledby="CreateProductPackageMainModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateProductPackageMainModalLabel">
                Create Product Package Main
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

export default CreateProductPackageMain;

