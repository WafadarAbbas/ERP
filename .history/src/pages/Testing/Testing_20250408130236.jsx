import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiCall from "../../Apicall/ApiCall";
import "bootstrap/dist/css/bootstrap.min.css";
const Testing = () => {

   

    const selectedProductVariantId = 8;
    const selectedPurchaseOrder = 1033;
    const [poBalanceQuantity, setPoBalanceQuantity] = useState(null);
    const [poQuantity, setPoQuantity] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const fetchPoBalanceQuantity = async () => {
      setLoading(true);
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/PurchseOrderDetails/GetPoBalanceQuantityAndPoQuantity?purchaseOrderMainId=${selectedPurchaseOrder}&productVariantMainId=${selectedProductVariantId}`,
          method: "GET",
        });
  
        if (response?.data && response.data.length > 0) {
          const data = response.data[0];
          setPoBalanceQuantity(data.poBalanceQuantity);
          setPoQuantity(data.poQuantity);
          console.log("API Response:", response.data);
        } else {
          throw new Error("Failed to fetch PO balance quantity.");
        }
      } catch (error) {
        console.error("Error fetching PO balance quantity:", error);
        setPoBalanceQuantity(null);
        setPoQuantity(null);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchPoBalanceQuantity();
    }, [selectedProductVariantId]);
  
    const formik = useFormik({
      initialValues: {
        quantity: '',
      },
      validationSchema: validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      context: { poQuantity, poBalanceQuantity },
      onSubmit: (values) => {
        console.log('Form data:', values);
        // Handle form submission, e.g., send data to an API
      },
    });
  
    return (
      <div className="p-4 bg-gray-100">
        <h2 className="text-lg font-bold mb-3">Purchase Order Details</h2>
  
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            {poBalanceQuantity !== null ? (
              <div>
                <p>PO Balance Quantity: {poBalanceQuantity}</p>
                <p>PO Quantity: {poQuantity}</p>
  
             
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      className={`form-control ${formik.errors.quantity ? 'is-invalid' : ''}`}
                      placeholder="Enter quantity"
                      onChange={formik.handleChange}
                      value={formik.values.quantity}
                    />
                    {formik.errors.quantity && (
                      <div className="text-danger">{formik.errors.quantity}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
                 
              </div>
            ) : (
              <p className="text-danger">Failed to load PO Balance Quantity.</p>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default Testing;
  