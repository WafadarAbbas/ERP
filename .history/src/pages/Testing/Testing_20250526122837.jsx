import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiCall from '../../Apicall/ApiCall';

const Testing = () => {
  const [poBalanceQuantity, setPoBalanceQuantity] = useState(null);
  const [loading2, setLoading2] = useState(false);

  const selectedPurchaseOrder = 3020;
  const selectedProductVariantId = 16;

  const fetchPoBalanceQuantity = async () => {
    setLoading2(true);
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchseOrderDetails/GetPoBalanceQuantityAndPoQuantity?purchaseOrderMainId=${selectedPurchaseOrder}&productVariantMainId=${selectedProductVariantId}`,
        method: 'GET',
      });

      if (response?.data && response.data.length > 0) {
        const data = response.data[0];
        setPoBalanceQuantity(Number(data.poBalanceQuantity));
      } else {
        throw new Error('Failed to fetch PO balance quantity.');
      }
    } catch (error) {
      console.error('Error fetching PO balance quantity:', error);
      setPoBalanceQuantity(null);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    fetchPoBalanceQuantity();
  }, []);

  const formik = useFormik({
    initialValues: {
      quantity: '',
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .required('Quantity is required')
        .min(1, 'Quantity must be at least 1')
        .max(
          poBalanceQuantity || Infinity,
          `Quantity cannot be more than PO Balance Quantity (${poBalanceQuantity})`
        ),
    }),
    enableReinitialize: true, // important so max updates when poBalanceQuantity updates
    onSubmit: (values) => {
      alert(`Quantity submitted: ${values.quantity}`);
    },
  });

  return (
    <div className="container mt-4">
      <h2>PO Balance Quantity</h2>
      {loading2 ? (
        <p>Loading...</p>
      ) : poBalanceQuantity !== null ? (
        <p>{poBalanceQuantity}</p>
      ) : (
        <p>No PO balance quantity data available.</p>
      )}

      <form onSubmit={formik.handleSubmit} style={{ maxWidth: 300, marginTop: 20 }}>
        <div className="form-group mb-3">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            className={`form-control ${
              formik.touched.quantity && formik.errors.quantity ? 'is-invalid' : ''
            }`}
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            min={1}
            max={poBalanceQuantity || undefined}
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="invalid-feedback">{formik.errors.quantity}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading2 || poBalanceQuantity === null}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Testing;
