import React, { useState } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import ApiCall from '../../Apicall/ApiCall';

const Testing = () => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = async (id) => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/GRNDetail/GetyId?id=${id}&organizationId=1&companyId=1`,
        method: 'GET',
      });

      const data = response?.data;
      if (data) {
        setEditingId(id);

        GRNFormik.setValues({
          id: data.id || '',
          productDefinitionId: data.productDefinitionId || '',
          product3rdSchedule: data.product3rdSchedule || false,
          itemCode: data.itemCode || '',
          itemName: data.itemName || '',
          batchId: data.batchId || '',
          storeId: data.storeId || '',
          fbrMuId: data.fbrMuId || '',
          muCode: data.muCode || '',
          quantity: data.quantity || ,
          productPrice: data.productPrice || '',
          amount: data.amount || '',
          fbrTaxRateId: data.fbrTaxRateId || '',
          taxRate: data.taxRate || '',
          taxAmount: data.taxAmount || '',
          furtherTax: data.furtherTax || '',
          furtherTaxAmount: data.furtherTaxAmount || '',
          valueExclGRNTax: data.valueExclGRNTax || '',
          discount: data.discount || '',
          discountAmount: data.discountAmount || '',
          taxCharged: data.taxCharged || '',
          valueIncGRNTax: data.valueIncGRNTax || '',
          productVariantMainId: data.productVariantMainId || '',
          productName: data.productVariantMainProductName || '',
          measuringUnitsId: data.measuringUnitsId || '',
          measuringUnitsName: data.measuringUnitsMeasuringUnitsName || '',
          grnMainId: data.grnMainId || '',
          grnInvoiceNo: data.grnMainsGRNInvoiceNo || '',
          organizationId: data.organizationId || '',
          companyId: data.companyId || '',
        });
      } else {
        Swal.fire('Error', 'No data found for this ID', 'error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'Failed to fetch data', 'error');
    }
  };

  const GRNFormik = useFormik({
    initialValues: {
      id: '',
      productDefinitionId: '',
      product3rdSchedule: false,
      itemCode: '',
      itemName: '',
      batchId: '',
      storeId: '',
      fbrMuId: '',
      muCode: '',
      quantity: '',
      productPrice: '',
      amount: '',
      fbrTaxRateId: '',
      taxRate: '',
      taxAmount: '',
      furtherTax: '',
      furtherTaxAmount: '',
      valueExclGRNTax: '',
      discount: '',
      discountAmount: '',
      taxCharged: '',
      valueIncGRNTax: '',
      productVariantMainId: '',
      productName: '',
      measuringUnitsId: '',
      measuringUnitsName: '',
      grnMainId: '',
      grnInvoiceNo: '',
      organizationId: '',
      companyId: '',
    },
    onSubmit: (values) => {
      console.log('Submitted values:', values);
      // Add update API call logic here if needed
    },
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit GRN Detail</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => handleEdit(1052)}
      >
        Load GRN Detail (ID: 1052)
      </button>

      {editingId && (
        <form onSubmit={GRNFormik.handleSubmit} className="border p-3">
          <h4>Editing GRN Detail</h4>
          <div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              name="itemName"
              id="itemName"
              className="form-control"
              value={GRNFormik.values.itemName}
              onChange={GRNFormik.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="form-control"
              value={GRNFormik.values.quantity}
              onChange={GRNFormik.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default Testing;
