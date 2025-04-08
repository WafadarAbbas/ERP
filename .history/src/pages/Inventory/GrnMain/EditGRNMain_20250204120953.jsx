import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Footer from '../../../Compo/Footer';
import Buton from '../../../Compo/Buton';

function EditGRNMain() {
  const navigate = useNavigate();

  // Dummy data for GRN details
  const [grnDetails, setGrnDetails] = useState([
    { id: 1, itemCode: 'ITM001', itemName: 'Product A' },
    { id: 2, itemCode: 'ITM002', itemName: 'Product B' },
    { id: 3, itemCode: 'ITM003', itemName: 'Product C' },
  ]);

  const [editingDetail, setEditingDetail] = useState(null);

  const formik = useFormik({
    initialValues: {
      id: '',
      itemCode: '',
      itemName: '',
    },
    validationSchema: Yup.object({
      itemCode: Yup.string().required('Item Code is required'),
      itemName: Yup.string().required('Item Name is required'),
    }),
    onSubmit: (values) => {
      setGrnDetails((prevDetails) =>
        prevDetails.map((detail) => (detail.id === values.id ? values : detail))
      );
      setEditingDetail(null);
    },
  });

  const grnFormik = useFormik({
    initialValues: {
      grnInvoiceDate: "",
      branchId: 0,
      branchName: "",
      grnDocNo: "",
      totalGRNVest: 0,
      totalGRNValue: 0,
      totalTaxCharged: 0,
      totalGRNAmount: 0,
      rvMainId: 0,
      term: "",
      narration: "",
      supplierNTNNo: "",
      supplierSTRNo: "",
      taxChargePlusAmount: 0,
      fillerStatus: false,
      tax236Amount: 0,
      tax236Rate: 0,
      tax236Status: false,
      totalAmountWith236: 0,
      purchaseOrderMainId: 0,
      supplierId: 0,
    },
    validationSchema: Yup.object({
      branchName: Yup.string().required('Branch Name is required'),
      grnDocNo: Yup.string().required('GRN Document Number is required'),
    }),
    onSubmit: (values) => {
      console.log({ ...values, grnDetails });
    },
  });

  const handleEdit = (id) => {
    const detailToEdit = grnDetails.find((detail) => detail.id === id);
    if (detailToEdit) {
      formik.setValues(detailToEdit);
      setEditingDetail(detailToEdit);
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row mb-3'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Edit GRNMain</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your GRNMain Updation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate("/GRNMain/GRNMain")}>Move to GRN Main</Buton>
        </div>
      </div>

      <form onSubmit={grnFormik.handleSubmit} style={{ backgroundColor: 'white', padding: 20, border: "1px solid #d6d4d4", marginBottom: 20 }}>
        <h4>GRN Main Form</h4>
        
        <div className="col-md-4 mb-3">
              <label htmlFor="grnInvoiceDate" className="form-label">
                Invoice Date
              </label>
              <input
                type="datetime-local"
                id="grnInvoiceDate"
                name="grnInvoiceDate"
                className={`form-control ${formik.touched.grnInvoiceDate && formik.errors.grnInvoiceDate
                  ? "is-invalid"
                  : ""
                  }`}
                value={formik.values.grnInvoiceDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.grnInvoiceDate && formik.errors.grnInvoiceDate && (
                <div className="invalid-feedback">{formik.errors.grnInvoiceDate}</div>
              )}
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="branchId" className="form-label">Branch ID</label>
              <input
                type="number"
                id="branchId"
                name="branchId"
                className={`form-control ${formik.touched.branchId && formik.errors.branchId ? "is-invalid" : ""}`}
                value={formik.values.branchId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.branchId && formik.errors.branchId && (
                <div className="invalid-feedback">{formik.errors.branchId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="branchName" className="form-label">Branch Name</label>
              <input
                type="text"
                id="branchName"
                name="branchName"
                className={`form-control ${formik.touched.branchName && formik.errors.branchName ? "is-invalid" : ""}`}
                value={formik.values.branchName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.branchName && formik.errors.branchName && (
                <div className="invalid-feedback">{formik.errors.branchName}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="grnDocNo" className="form-label">GRN Document No</label>
              <input
                type="text"
                id="grnDocNo"
                name="grnDocNo"
                className={`form-control ${formik.touched.grnDocNo && formik.errors.grnDocNo ? "is-invalid" : ""}`}
                value={formik.values.grnDocNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.grnDocNo && formik.errors.grnDocNo && (
                <div className="invalid-feedback">{formik.errors.grnDocNo}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="totalGRNVest" className="form-label">Total GRN Vest</label>
              <input
                type="number"
                id="totalGRNVest"
                name="totalGRNVest"
                className={`form-control ${formik.touched.totalGRNVest && formik.errors.totalGRNVest ? "is-invalid" : ""}`}
                value={formik.values.totalGRNVest}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalGRNVest && formik.errors.totalGRNVest && (
                <div className="invalid-feedback">{formik.errors.totalGRNVest}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="totalGRNValue" className="form-label">Total GRN Value</label>
              <input
                type="number"
                id="totalGRNValue"
                name="totalGRNValue"
                className={`form-control ${formik.touched.totalGRNValue && formik.errors.totalGRNValue ? "is-invalid" : ""}`}
                value={formik.values.totalGRNValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalGRNValue && formik.errors.totalGRNValue && (
                <div className="invalid-feedback">{formik.errors.totalGRNValue}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="taxAmount" className="form-label">Tax Amount</label>
              <input
                type="number"
                id="taxAmount"
                name="taxAmount"
                className={`form-control ${formik.touched.taxAmount && formik.errors.taxAmount ? "is-invalid" : ""}`}
                value={formik.values.taxAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.taxAmount && formik.errors.taxAmount && (
                <div className="invalid-feedback">{formik.errors.taxAmount}</div>
              )}
            </div>

        <button type='submit' className='btn btn-success'>Submit</button>
      </form>

      <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {grnDetails.map((detail, index) => (
              <tr key={index}>
                <td>{detail.id}</td>
                <td>{detail.itemCode}</td>
                <td>{detail.itemName}</td>
                <td>
                  <button className='btn btn-primary' onClick={() => handleEdit(detail.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingDetail && (
        <div style={{ backgroundColor: 'white', padding: 20, marginTop: 20, border: "1px solid #d6d4d4" }}>
          <h4>Edit GRN Detail</h4>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Item Code</label>
              <input
                type='text'
                className='form-control'
                name='itemCode'
                onChange={formik.handleChange}
                value={formik.values.itemCode}
              />
              {formik.errors.itemCode && <div className='text-danger'>{formik.errors.itemCode}</div>}
            </div>

            <div className='mb-3'>
              <label className='form-label'>Item Name</label>
              <input
                type='text'
                className='form-control'
                name='itemName'
                onChange={formik.handleChange}
                value={formik.values.itemName}
              />
              {formik.errors.itemName && <div className='text-danger'>{formik.errors.itemName}</div>}
            </div>

            <button type='submit' className='btn btn-success'>Update</button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default EditGRNMain;

