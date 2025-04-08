

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Buton from '../../../Compo/Buton';
function EditPurchaseReturnMain() {

  const location = useLocation();
  const PurchaseReturnMainId = location.state?.id;
  const navigate = useNavigate();


  console.log(PurchaseReturnMainId);



  const fetchpurchaseDetails = async (PurchaseReturnMainId) => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchaseDetail/GetByPurchaseReturnMainId?id=${PurchaseReturnMainId}&organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response?.data) {

        const modifiedData = response.data.map(
          ({
            measuringUnitsMeasuringUnitsName,
            productVariantMainProductName,
            ...rest
          }) => ({
            ...rest,
            measuringUnitsName: measuringUnitsMeasuringUnitsName ?? "",
            productName: productVariantMainProductName ?? "",
          })
        );

        setpurchseDetails(modifiedData);
      } else {
        setpurchseDetails([]);
      }
    } catch (error) {
      console.error("Error fetching GRN details:", error);
    }
  };


  useEffect(() => {
    if (PurchaseReturnMainId) {
      fetchpurchaseDetails(PurchaseReturnMainId);
    }
  }, [PurchaseReturnMainId]);

  useEffect(() => {
    const fetchPurchaseReturnMain = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/PurchaseReturnMain/GetyId?id=${PurchaseReturnMainId}&organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const purchase = response.data[0];
          formik.setValues({
            PurchaseReturnMainInvoiceDate: purchase.PurchaseReturnMainInvoiceDate || "",
            branchId: purchase.branchId || "",
            branchName: purchase.branchName || "",
            PurchaseReturnMainDocNo: purchase.PurchaseReturnMainDocNo || "",
            totalPurchaseReturnMainVest: purchase.totalPurchaseReturnMainVest || 0,
            totalPurchaseReturnMainValue: purchase.totalPurchaseReturnMainValue || 0,
            taxAmount: purchase.taxAmount || 0,
            furtherTax: purchase.furtherTax || 0,
            totalTaxCharged: purchase.totalTaxCharged || 0,
            discount: purchase.discount || 0,
            totalPurchaseReturnMainAmount: purchase.totalPurchaseReturnMainAmount || 0,
            rvMainId: purchase.rvMainId || 0,
            term: purchase.term || "",
            narration: purchase.narration || "",
            supplierNTNNo: purchase.supplierNTNNo || "",
            supplierSTRNo: purchase.supplierSTRNo || "",
            taxChargePlusAmount: purchase.taxChargePlusAmount || 0,
            fillerStatus: purchase.fillerStatus !== undefined ? purchase.fillerStatus : false,
            tax236Amount: purchase.tax236Amount || 0,
            tax236Rate: purchase.tax236Rate || 0,
            tax236Status: purchase.tax236Status !== undefined ? purchase.tax236Status : true,
            totalAmountWith236: purchase.totalAmountWith236 || 0,
            grnMainId: purchase.grnMainId || 0,
            supplierId: purchase.supplierId || 0,



          });
        } else {
          console.error("Failed to load po Main data.");
        }
      } catch (error) {
        console.error("Error fetching po Main:", error.message);
      }
    };

    if (PurchaseReturnMainId) {
      fetchPurchaseReturnMain();
    }
  }, [PurchaseReturnMainId]);

  const [purchseDetails, setpurchseDetails] = useState([]);

  const validationSchema = Yup.object({

  });


  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row mb-3'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Create Purchase Main</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Purchase Main creation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate("/PurchaseReturnMain/PurchaseReturnMain")}>Move to Purchase Main</Buton>
        </div>
      </div>


      <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>
        <h5 className="mt-1 ">Add Purchase Details :</h5>
        


        {/* --------------------------------------- */}
        <br />
        <br />
        <form onSubmit={formik.handleSubmit}>
          <div className="row">

            <div className="col-md-4">
              <label htmlFor="PurchaseReturnMainInvoiceDate" className="form-label">
                Invoice Date
              </label>
              <input
                type="datetime-local"
                id="PurchaseReturnMainInvoiceDate"
                name="PurchaseReturnMainInvoiceDate"
                className={`form-control ${formik.touched.PurchaseReturnMainInvoiceDate && formik.errors.PurchaseReturnMainInvoiceDate ? 'is-invalid' : ''
                  }`}
                value={formik.values.PurchaseReturnMainInvoiceDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.PurchaseReturnMainInvoiceDate && formik.errors.PurchaseReturnMainInvoiceDate && (
                <div className="invalid-feedback">{formik.errors.PurchaseReturnMainInvoiceDate}</div>
              )}
            </div>

            {/* Branch ID */}
            <div className="col-md-4">
              <label htmlFor="branchId" className="form-label">
                Branch ID
              </label>
              <input
                type="number"
                id="branchId"
                name="branchId"
                className={`form-control ${formik.touched.branchId && formik.errors.branchId ? 'is-invalid' : ''
                  }`}
                value={formik.values.branchId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.branchId && formik.errors.branchId && (
                <div className="invalid-feedback">{formik.errors.branchId}</div>
              )}
            </div>

            {/* Branch Name */}
            <div className="col-md-4 mt-3">
              <label htmlFor="branchName" className="form-label">
                Branch Name
              </label>
              <input
                type="text"
                id="branchName"
                name="branchName"
                className={`form-control ${formik.touched.branchName && formik.errors.branchName ? 'is-invalid' : ''
                  }`}
                value={formik.values.branchName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.branchName && formik.errors.branchName && (
                <div className="invalid-feedback">{formik.errors.branchName}</div>
              )}
            </div>

            {/* Purchase Main Document Number */}
            <div className="col-md-4 mt-3">
              <label htmlFor="PurchaseReturnMainDocNo" className="form-label">
                Document Number
              </label>
              <input
                type="text"
                id="PurchaseReturnMainDocNo"
                name="PurchaseReturnMainDocNo"
                className={`form-control ${formik.touched.PurchaseReturnMainDocNo && formik.errors.PurchaseReturnMainDocNo ? 'is-invalid' : ''
                  }`}
                value={formik.values.PurchaseReturnMainDocNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.PurchaseReturnMainDocNo && formik.errors.PurchaseReturnMainDocNo && (
                <div className="invalid-feedback">{formik.errors.PurchaseReturnMainDocNo}</div>
              )}
            </div>

            {/* Total Purchase Main Vest */}
            <div className="col-md-4 mt-3">
              <label htmlFor="totalPurchaseReturnMainVest" className="form-label">
                Total Vest
              </label>
              <input
                type="number"
                id="totalPurchaseReturnMainVest"
                name="totalPurchaseReturnMainVest"
                className={`form-control ${formik.touched.totalPurchaseReturnMainVest && formik.errors.totalPurchaseReturnMainVest ? 'is-invalid' : ''
                  }`}
                value={formik.values.totalPurchaseReturnMainVest}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalPurchaseReturnMainVest && formik.errors.totalPurchaseReturnMainVest && (
                <div className="invalid-feedback">{formik.errors.totalPurchaseReturnMainVest}</div>
              )}
            </div>

            {/* Total Purchase Main Value */}
            <div className="col-md-4 mt-3">
              <label htmlFor="totalPurchaseReturnMainValue" className="form-label">
                Total Value
              </label>
              <input
                type="number"
                id="totalPurchaseReturnMainValue"
                name="totalPurchaseReturnMainValue"
                className={`form-control ${formik.touched.totalPurchaseReturnMainValue && formik.errors.totalPurchaseReturnMainValue ? 'is-invalid' : ''
                  }`}
                value={formik.values.totalPurchaseReturnMainValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalPurchaseReturnMainValue && formik.errors.totalPurchaseReturnMainValue && (
                <div className="invalid-feedback">{formik.errors.totalPurchaseReturnMainValue}</div>
              )}
            </div>

            {/* Tax Amount */}
            <div className="col-md-4 mt-3">
              <label htmlFor="taxAmount" className="form-label">
                Tax Amount
              </label>
              <input
                type="number"
                id="taxAmount"
                name="taxAmount"
                className={`form-control ${formik.touched.taxAmount && formik.errors.taxAmount ? 'is-invalid' : ''
                  }`}
                value={formik.values.taxAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.taxAmount && formik.errors.taxAmount && (
                <div className="invalid-feedback">{formik.errors.taxAmount}</div>
              )}
            </div>

            {/* Further Tax */}
            <div className="col-md-4 mt-3">
              <label htmlFor="furtherTax" className="form-label">
                Further Tax
              </label>
              <input
                type="number"
                id="furtherTax"
                name="furtherTax"
                className={`form-control ${formik.touched.furtherTax && formik.errors.furtherTax ? 'is-invalid' : ''
                  }`}
                value={formik.values.furtherTax}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.furtherTax && formik.errors.furtherTax && (
                <div className="invalid-feedback">{formik.errors.furtherTax}</div>
              )}
            </div>

            {/* Total Tax Charged */}
            <div className="col-md-4 mt-3">
              <label htmlFor="totalTaxCharged" className="form-label">
                Total Tax Charged
              </label>
              <input
                type="number"
                id="totalTaxCharged"
                name="totalTaxCharged"
                className={`form-control ${formik.touched.totalTaxCharged && formik.errors.totalTaxCharged ? 'is-invalid' : ''
                  }`}
                value={formik.values.totalTaxCharged}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalTaxCharged && formik.errors.totalTaxCharged && (
                <div className="invalid-feedback">{formik.errors.totalTaxCharged}</div>
              )}
            </div>

            {/* Discount */}
            <div className="col-md-4 mt-3">
              <label htmlFor="discount" className="form-label">
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                className={`form-control ${formik.touched.discount && formik.errors.discount ? 'is-invalid' : ''
                  }`}
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.discount && formik.errors.discount && (
                <div className="invalid-feedback">{formik.errors.discount}</div>
              )}
            </div>

            {/* Total Purchase Main Amount */}
            <div className="col-md-4 mt-3">
              <label htmlFor="totalPurchaseReturnMainAmount" className="form-label">
                Total Amount
              </label>
              <input
                type="number"
                id="totalPurchaseReturnMainAmount"
                name="totalPurchaseReturnMainAmount"
                className={`form-control ${formik.touched.totalPurchaseReturnMainAmount && formik.errors.totalPurchaseReturnMainAmount ? 'is-invalid' : ''
                  }`}
                value={formik.values.totalPurchaseReturnMainAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalPurchaseReturnMainAmount && formik.errors.totalPurchaseReturnMainAmount && (
                <div className="invalid-feedback">{formik.errors.totalPurchaseReturnMainAmount}</div>
              )}
            </div>

            {/* RV Main ID */}
            <div className="col-md-4 mt-3">
              <label htmlFor="rvMainId" className="form-label">
                RV Main ID
              </label>
              <input
                type="number"
                id="rvMainId"
                name="rvMainId"
                className={`form-control ${formik.touched.rvMainId && formik.errors.rvMainId ? 'is-invalid' : ''
                  }`}
                value={formik.values.rvMainId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.rvMainId && formik.errors.rvMainId && (
                <div className="invalid-feedback">{formik.errors.rvMainId}</div>
              )}
            </div>

            {/* Term */}
            <div className="col-md-4 mt-3">
              <label htmlFor="term" className="form-label">
                Term
              </label>
              <input
                type="text"
                id="term"
                name="term"
                className={`form-control ${formik.touched.term && formik.errors.term ? 'is-invalid' : ''
                  }`}
                value={formik.values.term}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.term && formik.errors.term && (
                <div className="invalid-feedback">{formik.errors.term}</div>
              )}
            </div>

            {/* Narration */}
            <div className="col-md-4 mt-3">
              <label htmlFor="narration" className="form-label">
                Narration
              </label>
              <input
                type="text"
                id="narration"
                name="narration"
                className={`form-control ${formik.touched.narration && formik.errors.narration ? 'is-invalid' : ''
                  }`}
                value={formik.values.narration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.narration && formik.errors.narration && (
                <div className="invalid-feedback">{formik.errors.narration}</div>
              )}
            </div>

            {/* Supplier NTN No */}
            <div className="col-md-4 mt-3">
              <label htmlFor="supplierNTNNo" className="form-label">
                Supplier NTN No
              </label>
              <input
                type="text"
                id="supplierNTNNo"
                name="supplierNTNNo"
                className={`form-control ${formik.touched.supplierNTNNo && formik.errors.supplierNTNNo ? 'is-invalid' : ''
                  }`}
                value={formik.values.supplierNTNNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.supplierNTNNo && formik.errors.supplierNTNNo && (
                <div className="invalid-feedback">{formik.errors.supplierNTNNo}</div>
              )}
            </div>

            {/* Supplier STR No */}
            <div className="col-md-4 mt-3">
              <label htmlFor="supplierSTRNo" className="form-label">
                Supplier STR No
              </label>
              <input
                type="text"
                id="supplierSTRNo"
                name="supplierSTRNo"
                className={`form-control ${formik.touched.supplierSTRNo && formik.errors.supplierSTRNo ? 'is-invalid' : ''
                  }`}
                value={formik.values.supplierSTRNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.supplierSTRNo && formik.errors.supplierSTRNo && (
                <div className="invalid-feedback">{formik.errors.supplierSTRNo}</div>
              )}
            </div>

            {/* Tax Charge Plus Amount */}
            <div className="col-md-4 mt-3">
              <label htmlFor="taxChargePlusAmount" className="form-label">
                Tax Charge Plus Amount
              </label>
              <input
                type="number"
                id="taxChargePlusAmount"
                name="taxChargePlusAmount"
                className={`form-control ${formik.touched.taxChargePlusAmount && formik.errors.taxChargePlusAmount ? 'is-invalid' : ''
                  }`}
                value={formik.values.taxChargePlusAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.taxChargePlusAmount && formik.errors.taxChargePlusAmount && (
                <div className="invalid-feedback">{formik.errors.taxChargePlusAmount}</div>
              )}
            </div>

            {/* Filler Status */}
            {/* Filler Status */}
            <div className="col-md-4 mt-3">
              <label className="form-label">Filler Status</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="fillerStatusTrue"
                  name="fillerStatus"
                  value={true}
                  className="form-check-input"
                  checked={formik.values.fillerStatus === true}
                  onChange={() => formik.setFieldValue('fillerStatus', true)}
                />
                <label htmlFor="fillerStatusTrue" className="form-check-label">
                  Filler
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="fillerStatusFalse"
                  name="fillerStatus"
                  value={false}
                  className="form-check-input"
                  checked={formik.values.fillerStatus === false}
                  onChange={() => formik.setFieldValue('fillerStatus', false)}
                />
                <label htmlFor="fillerStatusFalse" className="form-check-label">
                  Not Filler
                </label>
              </div>
              {formik.touched.fillerStatus && formik.errors.fillerStatus && (
                <div className="text-danger mt-1">{formik.errors.fillerStatus}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="tax236Amount" className="form-label">
                Tax 236 Amount
              </label>
              <input
                type="number"
                id="tax236Amount"
                name="tax236Amount"
                className={`form-control ${formik.touched.tax236Amount && formik.errors.tax236Amount ? 'is-invalid' : ''
                  }`}
                value={formik.values.tax236Amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.tax236Amount && formik.errors.tax236Amount && (
                <div className="invalid-feedback">{formik.errors.tax236Amount}</div>
              )}
            </div>
            <div className="col-md-4 mt-3">
              <label htmlFor="tax236Rate" className="form-label">
                Tax 236 Rate
              </label>
              <input
                type="number"
                id="tax236Rate"
                name="tax236Rate"
                className={`form-control ${formik.touched.tax236Rate && formik.errors.tax236Rate ? 'is-invalid' : ''
                  }`}
                value={formik.values.tax236Rate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.tax236Rate && formik.errors.tax236Rate && (
                <div className="invalid-feedback">{formik.errors.tax236Rate}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label className="form-label">Tax 236 Status</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="tax236StatusTrue"
                  name="tax236Status"
                  value={true}
                  className="form-check-input"
                  checked={formik.values.tax236Status === true}
                  onChange={() => formik.setFieldValue('tax236Status', true)}
                />
                <label htmlFor="tax236StatusTrue" className="form-check-label">
                  Active
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="tax236StatusFalse"
                  name="tax236Status"
                  value={false}
                  className="form-check-input"
                  checked={formik.values.tax236Status === false}
                  onChange={() => formik.setFieldValue('tax236Status', false)}
                />
                <label htmlFor="tax236StatusFalse" className="form-check-label">
                  Not Active
                </label>
              </div>
              {formik.touched.tax236Status && formik.errors.tax236Status && (
                <div className="text-danger mt-1">{formik.errors.tax236Status}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="totalAmountWith236" className="form-label">
                Total Amount with 236
              </label>
              <input
                type="number"
                id="totalAmountWith236"
                name="totalAmountWith236"
                className={`form-control ${formik.touched.totalAmountWith236 && formik.errors.totalAmountWith236 ? 'is-invalid' : ''
                  }`}
                value={formik.values.totalAmountWith236}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalAmountWith236 && formik.errors.totalAmountWith236 && (
                <div className="invalid-feedback">{formik.errors.totalAmountWith236}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
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

            <div className="col-md-4 mt-3">
              <label
                htmlFor="grnMainId"
                className="form-label"
              >
                GRN Main
              </label>
              <select
                name="grnMainId"
                className="form-control"
                value={formik.values.grnMainId}
                onChange={(e) => {
                  formik.setFieldValue(
                    "grnMainId",
                    Number(e.target.value)
                  );
                }}
                onBlur={formik.handleBlur}
              >
                <option value="">Select GRN Main</option>
                {Array.isArray(GRNMain) &&
                  GRNMain.length > 0 ? (
                  GRNMain.map((grn) => (
                    <option key={grn.id} value={grn.id}>
                      {grn.name}
                    </option>
                  ))
                ) : (
                  <option value="">
                    No GRN Main Id Available
                  </option>
                )}
              </select>
              {formik.touched.grnMainId &&
                formik.errors.grnMainId ? (
                <div className="text-danger">
                  {formik.errors.grnMainId}
                </div>
              ) : null}
            </div>





          </div>

          <div className="d-flex justify-content-end modal-footer mt-3">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: '#ff9f33', color: 'white' }}
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

export default EditPurchaseReturnMain;
