import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiCall from '../../Apicall/ApiCall';

const Testing = () => {
  const [poBalanceQuantity, setPoBalanceQuantity] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectedPurchaseOrder = 3020;
  const selectedProductVariantId = 17;

  const fetchPoBalanceQuantity = async () => {
    setLoading(true);
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchseOrderDetails/GetPoBalanceQuantityAndPoQuantity?purchaseOrderMainId=${selectedPurchaseOrder}&productVariantMainId=${selectedProductVariantId}`,
        method: 'GET',
      });

      if (response?.data && response.data.length > 0) {
        const data = response.data[0];
        setPoBalanceQuantity(Number(data.poBalanceQuantity));
      } else {
        setPoBalanceQuantity(null);
      }
    } catch (error) {
      console.error(error);
      setPoBalanceQuantity(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoBalanceQuantity();
  }, []);

  const formik = useFormik({
    initialValues: {
      quantity: '',
    },
    enableReinitialize: true, // so max validation updates when poBalanceQuantity changes
    validationSchema: Yup.object({
      quantity: Yup.number()
        .required('Quantity is required')
        .min(1, 'Quantity must be at least 1')
        .max(poBalanceQuantity || Infinity, `Quantity must be less than or equal to ${poBalanceQuantity}`),
    }),
    onSubmit: (values) => {
      alert(`Quantity submitted: ${values.quantity}`);
    },
  });

  return (
    <div>
      <h3>PO Balance Quantity: {loading ? 'Loading...' : poBalanceQuantity ?? 'No data'}</h3>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.quantity}
          min={1}
          max={poBalanceQuantity || undefined}
        />
        {formik.touched.quantity && formik.errors.quantity ? (
          <div style={{ color: 'red' }}>{formik.errors.quantity}</div>
        ) : null}
        <button type="submit" disabled={loading || poBalanceQuantity === null}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Testing;
