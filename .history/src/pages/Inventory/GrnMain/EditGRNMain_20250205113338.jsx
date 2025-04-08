import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import Buton from '../../../Compo/Buton';

function EditGRNMain() {
  const navigate = useNavigate();

    const [grnDetails, setGrnDetails] = useState([]);
    const addGrnDetail = (detail) => {
       setGrnDetails([...grnDetails, detail]);
     };
   
     const removeGrnDetail = (index) => {
       setGrnDetails(grnDetails.filter((_, i) => i !== index));
     };
   
     const grnFormik = useFormik({
       initialValues: {
         itemCode: "",
         itemName: "",
       },
       validationSchema,
       onSubmit: (values, { resetForm }) => {
     
         const grnDetail = {
           ...values,
           organizationId: 1,
           companyId: 1,
         };
         addGrnDetail(grnDetail);
         resetForm();
       },
     });
   

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

      <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>
        <h5 className="mt-1 ">Add GRN Details :</h5>
        <form onSubmit={grnFormik.handleSubmit}>
          <div className="row border p-2">


         


            <div className="col-md-4 mb-3">
              <label htmlFor="itemCode" className="form-label">Item Code</label>
              <input
                type="text"
                id="itemCode"
                name="itemCode"
                className={`form-control ${grnFormik.touched.itemCode && grnFormik.errors.itemCode ? "is-invalid" : ""}`}
                value={grnFormik.values.itemCode}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.itemCode && grnFormik.errors.itemCode && (
                <div className="invalid-feedback">{grnFormik.errors.itemCode}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="itemName" className="form-label">Item Name</label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                className={`form-control ${grnFormik.touched.itemName && grnFormik.errors.itemName ? "is-invalid" : ""}`}
                value={grnFormik.values.itemName}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.itemName && grnFormik.errors.itemName && (
                <div className="invalid-feedback">{grnFormik.errors.itemName}</div>
              )}
            </div>
 
           
         




            <div>
              <button
                type="submit"
                className="btn btn-success mt-3 col-2 "

              >
                Add Detail
              </button>
            </div>
          </div>

          {grnDetails.length > 0 && (
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th>Mu Code</th>
                    <th>Product Def Id</th>
                    <th>Grn</th>
                    <th>Measuring Unit</th>
                    <th>Product Variant</th>
                    <th>Tax</th>
                    <th>Further Tax</th>
                    <th>Discount</th>
                    <th>Action</th>
                  </tr>

                </thead>
                <tbody>
                  {grnDetails.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.muCode}</td>
                      <td>{detail.productDefinitionId}</td>
                      <td>{detail.grnMainId}</td>
                      <td>{detail.measuringUnitsId}</td>
                      <td>{detail.productVariantMainId}</td>
                      <td>{detail.taxAmount}</td>
                      <td>{detail.furtherTax}</td>
                      <td>{detail.discount}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removeGrnDetail(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </form>


        {/* --------------------------------------- */}
        <br />
        <br />
        <form onSubmit={formik.handleSubmit}>

          <div className="row ">
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

            <div className="col-md-4 mb-3">
              <label htmlFor="furtherTax" className="form-label">Further Tax</label>
              <input
                type="number"
                id="furtherTax"
                name="furtherTax"
                className={`form-control ${formik.touched.furtherTax && formik.errors.furtherTax ? "is-invalid" : ""}`}
                value={formik.values.furtherTax}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.furtherTax && formik.errors.furtherTax && (
                <div className="invalid-feedback">{formik.errors.furtherTax}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="totalTaxCharged" className="form-label">Total Tax Charged</label>
              <input
                type="number"
                id="totalTaxCharged"
                name="totalTaxCharged"
                className={`form-control ${formik.touched.totalTaxCharged && formik.errors.totalTaxCharged ? "is-invalid" : ""}`}
                value={formik.values.totalTaxCharged}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalTaxCharged && formik.errors.totalTaxCharged && (
                <div className="invalid-feedback">{formik.errors.totalTaxCharged}</div>
              )}
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="discount" className="form-label">Discount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                className={`form-control ${formik.touched.discount && formik.errors.discount ? "is-invalid" : ""}`}
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.discount && formik.errors.discount && (
                <div className="invalid-feedback">{formik.errors.discount}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="totalGRNAmount" className="form-label">Total GRN Amount</label>
              <input
                type="number"
                id="totalGRNAmount"
                name="totalGRNAmount"
                className={`form-control ${formik.touched.totalGRNAmount && formik.errors.totalGRNAmount ? "is-invalid" : ""}`}
                value={formik.values.totalGRNAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalGRNAmount && formik.errors.totalGRNAmount && (
                <div className="invalid-feedback">{formik.errors.totalGRNAmount}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="rvMainId" className="form-label">RV Main ID</label>
              <input
                type="number"
                id="rvMainId"
                name="rvMainId"
                className={`form-control ${formik.touched.rvMainId && formik.errors.rvMainId ? "is-invalid" : ""}`}
                value={formik.values.rvMainId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.rvMainId && formik.errors.rvMainId && (
                <div className="invalid-feedback">{formik.errors.rvMainId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="term" className="form-label">Term</label>
              <input
                type="text"
                id="term"
                name="term"
                className={`form-control ${formik.touched.term && formik.errors.term ? "is-invalid" : ""}`}
                value={formik.values.term}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.term && formik.errors.term && (
                <div className="invalid-feedback">{formik.errors.term}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="narration" className="form-label">Narration</label>
              <input
                type="text"
                id="narration"
                name="narration"
                className={`form-control ${formik.touched.narration && formik.errors.narration ? "is-invalid" : ""}`}
                value={formik.values.narration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.narration && formik.errors.narration && (
                <div className="invalid-feedback">{formik.errors.narration}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="supplierNTNNo" className="form-label">Supplier NTN No</label>
              <input
                type="text"
                id="supplierNTNNo"
                name="supplierNTNNo"
                className={`form-control ${formik.touched.supplierNTNNo && formik.errors.supplierNTNNo ? "is-invalid" : ""}`}
                value={formik.values.supplierNTNNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.supplierNTNNo && formik.errors.supplierNTNNo && (
                <div className="invalid-feedback">{formik.errors.supplierNTNNo}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="supplierSTRNo" className="form-label">Supplier STR No</label>
              <input
                type="text"
                id="supplierSTRNo"
                name="supplierSTRNo"
                className={`form-control ${formik.touched.supplierSTRNo && formik.errors.supplierSTRNo ? "is-invalid" : ""}`}
                value={formik.values.supplierSTRNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.supplierSTRNo && formik.errors.supplierSTRNo && (
                <div className="invalid-feedback">{formik.errors.supplierSTRNo}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="taxChargePlusAmount" className="form-label">Tax Charge Plus Amount</label>
              <input
                type="number"
                id="taxChargePlusAmount"
                name="taxChargePlusAmount"
                className={`form-control ${formik.touched.taxChargePlusAmount && formik.errors.taxChargePlusAmount ? "is-invalid" : ""}`}
                value={formik.values.taxChargePlusAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.taxChargePlusAmount && formik.errors.taxChargePlusAmount && (
                <div className="invalid-feedback">{formik.errors.taxChargePlusAmount}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="fillerStatus" className="form-label">Filler Status</label>
              <input
                type="checkbox"
                id="fillerStatus"
                name="fillerStatus"
                className={`form-check-input ${formik.touched.fillerStatus && formik.errors.fillerStatus ? "is-invalid" : ""}`}
                checked={formik.values.fillerStatus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fillerStatus && formik.errors.fillerStatus && (
                <div className="invalid-feedback">{formik.errors.fillerStatus}</div>
              )}
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="tax236Amount" className="form-label">Tax 236 Amount</label>
              <input
                type="number"
                id="tax236Amount"
                name="tax236Amount"
                className={`form-control ${formik.touched.tax236Amount && formik.errors.tax236Amount ? "is-invalid" : ""}`}
                value={formik.values.tax236Amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.tax236Amount && formik.errors.tax236Amount && (
                <div className="invalid-feedback">{formik.errors.tax236Amount}</div>
              )}
            </div>

            

            <div className="col-md-4 mb-3">
              <label htmlFor="tax236Rate" className="form-label">Tax 236 Rate</label>
              <input
                type="number"
                id="tax236Rate"
                name="tax236Rate"
                className={`form-control ${formik.touched.tax236Rate && formik.errors.tax236Rate ? "is-invalid" : ""}`}
                value={formik.values.tax236Rate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.tax236Rate && formik.errors.tax236Rate && (
                <div className="invalid-feedback">{formik.errors.tax236Rate}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="tax236Status" className="form-label">Tax 236 Status</label>
              <input
                type="checkbox"
                id="tax236Status"
                name="tax236Status"
                className={`form-check-input ${formik.touched.tax236Status && formik.errors.tax236Status ? "is-invalid" : ""}`}
                checked={formik.values.tax236Status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.tax236Status && formik.errors.tax236Status && (
                <div className="invalid-feedback">{formik.errors.tax236Status}</div>
              )}
            </div>
            <div className=" col-md-4 d-flex">
              <div className="col-10 mb-3 ">
                <label htmlFor="supplierId" className="form-label">
                  Supplier
                </label>
                <select
                  id="supplierId"
                  name="supplierId"
                  className={`form-select ${formik.touched.supplierId && formik.errors.supplierId
                    ? "is-invalid"
                    : ""
                    }`}
                  value={formik.values.supplierId}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "supplierId",
                      Number(e.target.value)
                    )
                  }
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
                    <option value="">
                      No Suppliers Available
                    </option>
                  )}
                </select>
                {formik.touched.supplierId && formik.errors.supplierId && (
                  <div className="invalid-feedback">
                    {formik.errors.supplierId}
                  </div>
                )}
              </div>
              <div className='' style={{ display: "flex", alignItems: "center", marginTop: 5, marginLeft: 5 }} >

                <button style={buttonStyle} type='button' onClick={() => createRef.current.click()}>+Supplier</button>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="totalAmountWith236" className="form-label">Total Amount With 236</label>
              <input
                type="number"
                id="totalAmountWith236"
                name="totalAmountWith236"
                className={`form-control ${formik.touched.totalAmountWith236 && formik.errors.totalAmountWith236 ? "is-invalid" : ""}`}
                value={formik.values.totalAmountWith236}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalAmountWith236 && formik.errors.totalAmountWith236 && (
                <div className="invalid-feedback">{formik.errors.totalAmountWith236}</div>
              )}
            </div>
            <div className="col-md-4 mt-2">
              <label htmlFor="purchaseOrderMainId" className="form-label">
                Purchase Order Main
              </label>
              <select
                id="purchaseOrderMainId"
                name="purchaseOrderMainId"
                className="form-control"
                value={formik.values.purchaseOrderMainId}
                onChange={(e) =>
                  formik.setFieldValue(
                    "purchaseOrderMainId",
                    Number(e.target.value)
                  )
                }
                onBlur={formik.handleBlur}
              >
                <option value="">Select Purchase Order</option>
                {Array.isArray(purchaseOrderMains) &&
                  purchaseOrderMains.length > 0 ? (
                  purchaseOrderMains.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.name}
                    </option>
                  ))
                ) : (
                  <option value="">No Purchase Orders Available</option>
                )}
              </select>
              {formik.touched.purchaseOrderMainId &&
                formik.errors.purchaseOrderMainId && (
                  <div className="text-danger">
                    {formik.errors.purchaseOrderMainId}
                  </div>
                )}
            </div>
            





          </div>


          <div className="d-flex justify-content-end modal-footer mt-3">


            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#ff9f33", color: "white" }}
            >
              Save changes
            </button>
          </div>
        </form>






      </div>


      <Footer />
    </div>
  );
}

export default EditGRNMain;

