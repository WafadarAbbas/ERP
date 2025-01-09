import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiCall from "../../Apicall/ApiCall"; // Adjust the path to your ApiCall utility

const Testing = () => {
  const [suppliers, setSuppliers] = useState([]);

  // Fetch suppliers from the API
  const fetchSuppliers = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/Supplier/GetSupplierBoxItems/combobox?organizationId=1&companyId=1",
        method: "GET",
      });
      if (response?.data) {
        setSuppliers(response.data);
      } else {
        throw new Error("Failed to fetch suppliers.");
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  // Fetch suppliers on component mount
  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      supplierId: "",
    },
    validationSchema: Yup.object({
      supplierId: Yup.number().required("Supplier is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
      // Handle form submission here
    },
  });

  return (
    <div className="container mt-5">
      <form onSubmit={formik.handleSubmit}>
        <div className="col-md-4 mb-3">
          <label htmlFor="supplierId" className="form-label">
            Supplier
          </label>
          <select
            id="supplierId"
            name="supplierId"
            className={`form-select ${
              formik.touched.supplierId && formik.errors.supplierId ? "is-invalid" : ""
            }`}
            value={formik.values.supplierId}
            onChange={(e) => formik.setFieldValue("supplierId", Number(e.target.value))}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Supplier</option>
            {Array.isArray(suppliers) && suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))
            ) : (
              <option value="">No Suppliers Available</option>
            )}
          </select>
          {formik.touched.supplierId && formik.errors.supplierId && (
            <div className="invalid-feedback">{formik.errors.supplierId}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Testing;

