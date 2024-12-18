import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";
 


const EditSupplier = (props) => {

  const { selectedSupplierId } = props;
 
  const validationSchema = Yup.object({
    // supplerName: Yup.string().required("Supplier Name is required"),
    // companyName: Yup.string().required("Company Name is required"),
    // country: Yup.string().required("Country is required"),
    // state: Yup.string().required("State is required"),
    // city: Yup.string().required("City is required"),
    // address: Yup.string().required("Address is required"),
    // contactNumber: Yup.string().required("Contact Number is required"),
    // email: Yup.string()
    //   .email("Invalid email address")
    //   .required("Email is required"),
    // website: Yup.string().url("Invalid website URL"),
    // vatntn: Yup.string().required("VAT/NTN is required"),
    // otherID: Yup.string(),
    // registrationDate: Yup.date().required("Registration Date is required"),
    // creditLimit: Yup.string().required("Credit Limit is required"),
    // bankName: Yup.string().required("Bank Name is required"),
    // bankAccount: Yup.string().required("Bank Account is required"),
    // accountNumber: Yup.string().required("Account Number is required"),
    // iban: Yup.string().required("IBAN is required"),
    // swiftCode: Yup.string().required("SWIFT Code is required"),
    // supplierNotes: Yup.string(),
    // supplerStatus: Yup.string().required("Supplier Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      supplerName: "",
      companyName: "",
      country: "",
      state: "",
      city: "",
      address: "",
      contactNumber: "",
      email: "",
      website: "",
      vatntn: "",
      otherID: "",
      registrationDate: "",
      creditLimit: "",
      bankName: "",
      bankAccount: "",
      accountNumber: "",
      iban: "",
      swiftCode: "",
      supplierNotes: "",
      supplerStatus: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        branchId: 1,
        id:selectedSupplierId,
      };
      console.log(formData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/Supplier/UpdateSupplier",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire({
            title: "Success!",
            text: "Product Price saved successfully.",
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
          throw new Error("Failed to save the product Price");
        }
      } catch (error) {
        console.error("Error during product Price save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the product Price",
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
  const fetchSupplier = async () => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/Supplier/GetSupplierByIdQuery/GetISupplierById?id=${selectedSupplierId}&organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response && response.data && response.data.length > 0) {
        const Supplier = response.data[0];
        
        
        formik.setValues({
          
          supplerName: Supplier.supplerName || "",
          companyName: Supplier.companyName || "",
          country: Supplier.country || "",
          state: Supplier.state || "",
          city: Supplier.city || "",
          address: Supplier.address || "",
          contactNumber: Supplier.contactNumber || "",
          email: Supplier.email || "",
          website: Supplier.website || "",
          vatntn: Supplier.vatntn || "",
          otherID: Supplier.otherID || "",
          registrationDate: Supplier.registrationDate || "",
          creditLimit: Supplier.creditLimit || "",
          bankName: Supplier.bankName || "",
          bankAccount: Supplier.bankAccount || "",
          accountNumber: Supplier.accountNumber || "",
          iban: Supplier.iban || "",
          swiftCode: Supplier.swiftCode || "",
          supplierNotes: Supplier.supplierNotes || "",
          supplerStatus: Supplier.supplerStatus || "",
           
     
          
     
        });
      } else {
        console.error("Failed to load Product Price data.");
      }
    } catch (error) {
      console.error("Error fetching Product Price:", error.message);
    }
  };

  if (selectedSupplierId) {
    fetchSupplier();
  }
}, [selectedSupplierId]);


 

    return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditSupplierModal"
        ref={props.open}
      >
        Edit Supplier
      </button>

      <div
        className="modal fade"
        id="EditSupplierModal"
        tabIndex="-1"
        aria-labelledby="EditSupplierModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditSupplierModalLabel">
                Edit Supplier
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
                <div className="row">
                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="supplerName"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Supplier Name
                    </label>
                    <input
                      type="text"
                      id="supplerName"
                      name="supplerName"
                      className={`form-control ${
                        formik.touched.supplerName &&
                        formik.errors.supplerName
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.supplerName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.supplerName &&
                      formik.errors.supplerName && (
                        <div className="invalid-feedback">
                          {formik.errors.supplerName}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="companyName"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      className={`form-control ${
                        formik.touched.companyName && formik.errors.companyName
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.companyName &&
                      formik.errors.companyName && (
                        <div className="invalid-feedback">
                          {formik.errors.companyName}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="country"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      className={`form-control ${
                        formik.touched.country && formik.errors.country
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.country && formik.errors.country && (
                      <div className="invalid-feedback">
                        {formik.errors.country}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="state"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className={`form-control ${
                        formik.touched.state && formik.errors.state
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.state && formik.errors.state && (
                      <div className="invalid-feedback">
                        {formik.errors.state}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="city"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className={`form-control ${
                        formik.touched.city && formik.errors.city
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <div className="invalid-feedback">
                        {formik.errors.city}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="address"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className={`form-control ${
                        formik.touched.address && formik.errors.address
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <div className="invalid-feedback">
                        {formik.errors.address}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="contactNumber"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      className={`form-control ${
                        formik.touched.contactNumber &&
                        formik.errors.contactNumber
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.contactNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.contactNumber &&
                      formik.errors.contactNumber && (
                        <div className="invalid-feedback">
                          {formik.errors.contactNumber}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="email"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="website"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Website
                    </label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      className={`form-control ${
                        formik.touched.website && formik.errors.website
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.website}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.website && formik.errors.website && (
                      <div className="invalid-feedback">
                        {formik.errors.website}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="vatntn"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      VAT/NTN
                    </label>
                    <input
                      type="text"
                      id="vatntn"
                      name="vatntn"
                      className={`form-control ${
                        formik.touched.vatntn && formik.errors.vatntn
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.vatntn}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.vatntn && formik.errors.vatntn && (
                      <div className="invalid-feedback">
                        {formik.errors.vatntn}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="otherID"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Other ID
                    </label>
                    <input
                      type="text"
                      id="otherID"
                      name="otherID"
                      className={`form-control ${
                        formik.touched.otherID && formik.errors.otherID
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.otherID}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.otherID && formik.errors.otherID && (
                      <div className="invalid-feedback">
                        {formik.errors.otherID}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="registrationDate"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Registration Date
                    </label>
                    <input
                      type="date"
                      id="registrationDate"
                      name="registrationDate"
                      className={`form-control ${
                        formik.touched.registrationDate &&
                        formik.errors.registrationDate
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.registrationDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.registrationDate &&
                      formik.errors.registrationDate && (
                        <div className="invalid-feedback">
                          {formik.errors.registrationDate}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="creditLimit"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Credit Limit
                    </label>
                    <input
                      type="text"
                      id="creditLimit"
                      name="creditLimit"
                      className={`form-control ${
                        formik.touched.creditLimit && formik.errors.creditLimit
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.creditLimit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.creditLimit &&
                      formik.errors.creditLimit && (
                        <div className="invalid-feedback">
                          {formik.errors.creditLimit}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="bankName"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      className={`form-control ${
                        formik.touched.bankName && formik.errors.bankName
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.bankName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.bankName && formik.errors.bankName && (
                      <div className="invalid-feedback">
                        {formik.errors.bankName}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="bankAccount"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Bank Account
                    </label>
                    <input
                      type="text"
                      id="bankAccount"
                      name="bankAccount"
                      className={`form-control ${
                        formik.touched.bankAccount && formik.errors.bankAccount
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.bankAccount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.bankAccount &&
                      formik.errors.bankAccount && (
                        <div className="invalid-feedback">
                          {formik.errors.bankAccount}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="accountNumber"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      className={`form-control ${
                        formik.touched.accountNumber &&
                        formik.errors.accountNumber
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.accountNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.accountNumber &&
                      formik.errors.accountNumber && (
                        <div className="invalid-feedback">
                          {formik.errors.accountNumber}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="iban"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      IBAN
                    </label>
                    <input
                      type="text"
                      id="iban"
                      name="iban"
                      className={`form-control ${
                        formik.touched.iban && formik.errors.iban
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.iban}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.iban && formik.errors.iban && (
                      <div className="invalid-feedback">
                        {formik.errors.iban}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="swiftCode"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      SWIFT Code
                    </label>
                    <input
                      type="text"
                      id="swiftCode"
                      name="swiftCode"
                      className={`form-control ${
                        formik.touched.swiftCode && formik.errors.swiftCode
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.swiftCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.swiftCode && formik.errors.swiftCode && (
                      <div className="invalid-feedback">
                        {formik.errors.swiftCode}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="supplierNotes"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Supplier Notes
                    </label>
                    <textarea
                      id="supplierNotes"
                      name="supplierNotes"
                      className={`form-control ${
                        formik.touched.supplierNotes &&
                        formik.errors.supplierNotes
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.supplierNotes}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      rows="3"
                    ></textarea>
                    {formik.touched.supplierNotes &&
                      formik.errors.supplierNotes && (
                        <div className="invalid-feedback">
                          {formik.errors.supplierNotes}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mt-3">
                    <label
                      htmlFor="supplerStatus"
                      className="form-label"
                      style={{ fontSize: 16 }}
                    >
                      Supplier Status
                    </label>
                    <input
                      type="text"
                      id="supplerStatus"
                      name="supplerStatus"
                      className={`form-control ${
                        formik.touched.supplerStatus &&
                        formik.errors.supplerStatus
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.supplerStatus}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.supplerStatus &&
                      formik.errors.supplerStatus && (
                        <div className="invalid-feedback">
                          {formik.errors.supplerStatus}
                        </div>
                      )}
                  </div>
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

export default EditSupplier;