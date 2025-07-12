import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import ApiCall from '../../Apicall/ApiCall';

const Testing = () => {
  const formik = useFormik({
    initialValues: {
      poQuantity: 0,
      grnQuantity: 0,
      poBalanceQuantity: 0,
      grnBatchId: 0,
      grnStoreId: 0,
      measuringUnitsId: '',
      productVariantMainId: '',
      purchaseOrderMainId: '',
    },
    onSubmit: (values) => {
      console.log('Submitted values:', values);
    },
  });

  const handleEdit = async () => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchseOrderDetails/GetByPurchaseOrderMainId?id=3018&organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response?.data && Array.isArray(response.data)) {
        const data = response.data[0];
        if (data) {
          formik.setValues({
            poQuantity: data.poQuantity || 0,
            grnQuantity: data.grnQuantity || 0,
            poBalanceQuantity: data.poBalanceQuantity || 0,
            grnBatchId: data.grnBatchId || 0,
            grnStoreId: data.grnStoreId || 0,
            measuringUnitsId: data.measuringUnitsId || '',
            productVariantMainId: data.productVariantMainId || '',
            purchaseOrderMainId: data.purchaseOrderMainId || '',
          });
        } else {
          Swal.fire({ icon: 'error', title: 'Oops...', text: 'No detail found!' });
        }
      } else {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Invalid response format!' });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch data!' });
    }
  };

  useEffect(() => {
    handleEdit(); // auto-load data on mount
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Purchase Order Detail</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label>PO Quantity</label>
          <input
            type="number"
            name="poQuantity"
            className="form-control"
            value={formik.values.poQuantity}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>GRN Quantity</label>
          <input
            type="number"
            name="grnQuantity"
            className="form-control"
            value={formik.values.grnQuantity}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>PO Balance Quantity</label>
          <input
            type="number"
            name="poBalanceQuantity"
            className="form-control"
            value={formik.values.poBalanceQuantity}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>GRN Batch ID</label>
          <input
            type="number"
            name="grnBatchId"
            className="form-control"
            value={formik.values.grnBatchId}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>GRN Store ID</label>
          <input
            type="number"
            name="grnStoreId"
            className="form-control"
            value={formik.values.grnStoreId}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Measuring Units ID</label>
          <input
            type="text"
            name="measuringUnitsId"
            className="form-control"
            value={formik.values.measuringUnitsId}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Product Variant Main ID</label>
          <input
            type="text"
            name="productVariantMainId"
            className="form-control"
            value={formik.values.productVariantMainId}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Purchase Order Main ID</label>
          <input
            type="text"
            name="purchaseOrderMainId"
            className="form-control"
            value={formik.values.purchaseOrderMainId}
            onChange={formik.handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Testing;
