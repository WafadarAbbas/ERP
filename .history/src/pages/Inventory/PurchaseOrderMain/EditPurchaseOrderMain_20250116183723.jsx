import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Buton from '../../../Compo/Buton';
function EditPurchaseOrderMain() {


  const location = useLocation();
  const POMain = location.state?.id;
  const navigate = useNavigate();




  console.log(POMain);

  const [purchseOrderDetails, setpurchseOrderDetails] = useState([]);
  const validationSchema = Yup.object({

  });
  const formik = useFormik({
    initialValues: {
    
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const finalData = {
        ...values,
        purchseOrderDetails,

        organizationId: 1,
        companyId: 1,
        
        id: POMain,
      };
      console.log("Final Data Submitted:", finalData);
 
    },
  });

  const addpurchseOrderDetails = (detail) => {
    setpurchseOrderDetails([...purchseOrderDetails, detail]);
  };

  const removepurchseOrderDetails = (index) => {
    setpurchseOrderDetails(purchseOrderDetails.filter((_, i) => i !== index));
  };

  const PurchaseOrderFormik = useFormik({
    initialValues: {
      poQuantity: 0,
      grnQuantity: 0,
      poBalanceQuantity: 0,
      grnBatchId: 0,
      grnStoreId: 0,
   
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
 
      const purchseOrderDetails = {
        ...values,
        id: POMain,
        organizationId: 1,
        companyId: 1,

      };
      addpurchseOrderDetails(purchseOrderDetails);
      resetForm();
    },
  });
 


  const fetchpurchaseOrderDetails = async (POMain) => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchseOrderDetails/GetByPurchaseOrderMainId?id=${POMain}&organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response?.data) {

        const modifiedData = response.data.map(
          ({
            measuringUnitsMeasuringUnitsName,
            productVariantMainsProductName,
            purchaseOrderMainsPoNumber,

            ...rest
          }) => ({
            ...rest,
            measuringUnitsName: measuringUnitsMeasuringUnitsName ?? "", 
            productName: productVariantMainsProductName ?? "", 
            poNumber: purchaseOrderMainsPoNumber ?? "", 
          })
        );

        setpurchseOrderDetails(modifiedData);
      } else {
        setpurchseOrderDetails([]);
      }
    } catch (error) {
      console.error("Error fetching GRN details:", error);
    }
  };


  useEffect(() => {
    if (POMain) {
      fetchpurchaseOrderDetails(POMain);
    }
  }, [POMain]);





  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row mb-3'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Create Purchase Order Main</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Purchase Order Main creation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate("/PurchaseOrderMain/PurchaseOrderMain")}>Move to Purchase Order Main</Buton>
        </div>
      </div>


      <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>
        <h5 className="mt-1 ">Add Purchase Order Details :</h5>
        <form onSubmit={PurchaseOrderFormik.handleSubmit}>
          <div className="row border p-2">
           
            <div className="col-md-4 mb-3">
              <label htmlFor="poQuantity" className="form-label">
                PO Quantity
              </label>
              <input
                type="number"
                id="poQuantity"
                name="poQuantity"
                className={`form-control ${PurchaseOrderFormik.touched.poQuantity && PurchaseOrderFormik.errors.poQuantity
                  ? "is-invalid"
                  : ""
                  }`}
                value={PurchaseOrderFormik.values.poQuantity}
                onChange={PurchaseOrderFormik.handleChange}
                onBlur={PurchaseOrderFormik.handleBlur}
              />
              {PurchaseOrderFormik.touched.poQuantity && PurchaseOrderFormik.errors.poQuantity && (
                <div className="invalid-feedback">{PurchaseOrderFormik.errors.poQuantity}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="grnQuantity" className="form-label">
                GRN Quantity
              </label>
              <input
                type="number"
                id="grnQuantity"
                name="grnQuantity"
                className={`form-control ${PurchaseOrderFormik.touched.grnQuantity && PurchaseOrderFormik.errors.grnQuantity
                  ? "is-invalid"
                  : ""
                  }`}
                value={PurchaseOrderFormik.values.grnQuantity}
                onChange={PurchaseOrderFormik.handleChange}
                onBlur={PurchaseOrderFormik.handleBlur}
              />
              {PurchaseOrderFormik.touched.grnQuantity && PurchaseOrderFormik.errors.grnQuantity && (
                <div className="invalid-feedback">{PurchaseOrderFormik.errors.grnQuantity}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="poBalanceQuantity" className="form-label">
                PO Balance Quantity
              </label>
              <input
                type="number"
                id="poBalanceQuantity"
                name="poBalanceQuantity"
                className={`form-control ${PurchaseOrderFormik.touched.poBalanceQuantity && PurchaseOrderFormik.errors.poBalanceQuantity
                  ? "is-invalid"
                  : ""
                  }`}
                value={PurchaseOrderFormik.values.poBalanceQuantity}
                onChange={PurchaseOrderFormik.handleChange}
                onBlur={PurchaseOrderFormik.handleBlur}
              />
              {PurchaseOrderFormik.touched.poBalanceQuantity && PurchaseOrderFormik.errors.poBalanceQuantity && (
                <div className="invalid-feedback">{PurchaseOrderFormik.errors.poBalanceQuantity}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="grnBatchId" className="form-label">
                GRN Batch ID
              </label>
              <input
                type="number"
                id="grnBatchId"
                name="grnBatchId"
                className={`form-control ${PurchaseOrderFormik.touched.grnBatchId && PurchaseOrderFormik.errors.grnBatchId
                  ? "is-invalid"
                  : ""
                  }`}
                value={PurchaseOrderFormik.values.grnBatchId}
                onChange={PurchaseOrderFormik.handleChange}
                onBlur={PurchaseOrderFormik.handleBlur}
              />
              {PurchaseOrderFormik.touched.grnBatchId && PurchaseOrderFormik.errors.grnBatchId && (
                <div className="invalid-feedback">{PurchaseOrderFormik.errors.grnBatchId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="grnStoreId" className="form-label">
                GRN Store ID
              </label>
              <input
                type="number"
                id="grnStoreId"
                name="grnStoreId"
                className={`form-control ${PurchaseOrderFormik.touched.grnStoreId && PurchaseOrderFormik.errors.grnStoreId
                  ? "is-invalid"
                  : ""
                  }`}
                value={PurchaseOrderFormik.values.grnStoreId}
                onChange={PurchaseOrderFormik.handleChange}
                onBlur={PurchaseOrderFormik.handleBlur}
              />
              {PurchaseOrderFormik.touched.grnStoreId && PurchaseOrderFormik.errors.grnStoreId && (
                <div className="invalid-feedback">{PurchaseOrderFormik.errors.grnStoreId}</div>
              )}
            </div>
      

            <div>
              <button type="submit" className="btn btn-success mt-3 col-2">
                Add Detail
              </button>
            </div>
          </div>

          
        
        </form>

        {/* --------------------------------------- */}
        <br />
        <br />

        
 <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="poNumber" className="form-label">
                PO Number
              </label>
              <input
                type="text"
                id="poNumber"
                name="poNumber"
                className={`form-control ${formik.touched.poNumber && formik.errors.poNumber
                  ? 'is-invalid'
                  : ''
                  }`}
                value={formik.values.poNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.poNumber && formik.errors.poNumber && (
                <div className="invalid-feedback">{formik.errors.poNumber}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="poDate" className="form-label">
                PO Date
              </label>
              <input
                type="date"
                id="poDate"
                name="poDate"
                className={`form-control ${formik.touched.poDate && formik.errors.poDate ? 'is-invalid' : ''
                  }`}
                value={formik.values.poDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.poDate && formik.errors.poDate && (
                <div className="invalid-feedback">{formik.errors.poDate}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="poIssueDate" className="form-label">
                PO Issue Date
              </label>
              <input
                type="date"
                id="poIssueDate"
                name="poIssueDate"
                className={`form-control ${formik.touched.poIssueDate && formik.errors.poIssueDate
                  ? 'is-invalid'
                  : ''
                  }`}
                value={formik.values.poIssueDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.poIssueDate && formik.errors.poIssueDate && (
                <div className="invalid-feedback">{formik.errors.poIssueDate}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="poExpectedDeliveryDate" className="form-label">
                PO Expected Delivery Date
              </label>
              <input
                type="date"
                id="poExpectedDeliveryDate"
                name="poExpectedDeliveryDate"
                className={`form-control ${formik.touched.poExpectedDeliveryDate &&
                  formik.errors.poExpectedDeliveryDate
                  ? 'is-invalid'
                  : ''
                  }`}
                value={formik.values.poExpectedDeliveryDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.poExpectedDeliveryDate &&
                formik.errors.poExpectedDeliveryDate && (
                  <div className="invalid-feedback">
                    {formik.errors.poExpectedDeliveryDate}
                  </div>
                )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="poReferenceNumber" className="form-label">
                PO Reference Number
              </label>
              <input
                type="text"
                id="poReferenceNumber"
                name="poReferenceNumber"
                className={`form-control ${formik.touched.poReferenceNumber && formik.errors.poReferenceNumber
                  ? 'is-invalid'
                  : ''
                  }`}
                value={formik.values.poReferenceNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.poReferenceNumber && formik.errors.poReferenceNumber && (
                <div className="invalid-feedback">{formik.errors.poReferenceNumber}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="poDays" className="form-label">
                PO Days
              </label>
              <input
                type="text"
                id="poDays"
                name="poDays"
                className={`form-control ${formik.touched.poDays && formik.errors.poDays ? 'is-invalid' : ''
                  }`}
                value={formik.values.poDays}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.poDays && formik.errors.poDays && (
                <div className="invalid-feedback">{formik.errors.poDays}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="poDueDate" className="form-label">
                PO Due Date
              </label>
              <input
                type="date"
                id="poDueDate"
                name="poDueDate"
                className={`form-control ${formik.touched.poDueDate && formik.errors.poDueDate
                  ? 'is-invalid'
                  : ''
                  }`}
                value={formik.values.poDueDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.poDueDate && formik.errors.poDueDate && (
                <div className="invalid-feedback">{formik.errors.poDueDate}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="poNumberOfItems" className="form-label">
                PO Number of Items
              </label>
              <input
                type="number"
                id="poNumberOfItems"
                name="poNumberOfItems"
                className={`form-control ${formik.touched.poNumberOfItems && formik.errors.poNumberOfItems
                  ? 'is-invalid'
                  : ''
                  }`}
                value={formik.values.poNumberOfItems}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.poNumberOfItems && formik.errors.poNumberOfItems && (
                <div className="invalid-feedback">{formik.errors.poNumberOfItems}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="cashierName" className="form-label">
                Cashier Name
              </label>
              <input
                type="text"
                id="cashierName"
                name="cashierName"
                className={`form-control ${formik.touched.cashierName && formik.errors.cashierName
                  ? 'is-invalid'
                  : ''
                  }`}
                value={formik.values.cashierName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.cashierName && formik.errors.cashierName && (
                <div className="invalid-feedback">{formik.errors.cashierName}</div>
              )}
            </div>


            <div className="col-md-4 mb-3">
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

            <div className="col-md-4 mb-3">
              <label
                htmlFor="purchaseOrderStatusId"
                className="form-label"
              >
                Purchase Order Status
              </label>
              <select
                id="purchaseOrderStatusId"
                name="purchaseOrderStatusId"
                className={`form-select ${formik.touched.purchaseOrderStatusId &&
                  formik.errors.purchaseOrderStatusId
                  ? "is-invalid"
                  : ""
                  }`}
                value={formik.values.purchaseOrderStatusId}
                onChange={(e) =>
                  formik.setFieldValue(
                    "purchaseOrderStatusId",
                    Number(e.target.value)
                  )
                }
                onBlur={formik.handleBlur}
              >
                <option value="">Select Purchase Order Status</option>
                {purchaseOrderStatuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
              {formik.touched.purchaseOrderStatusId &&
                formik.errors.purchaseOrderStatusId && (
                  <div className="invalid-feedback">
                    {formik.errors.purchaseOrderStatusId}
                  </div>
                )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="purchseOrderTermsId" className="form-label">
                Purchase Order Terms
              </label>
              <select
                id="purchseOrderTermsId"
                name="purchseOrderTermsId"
                className={`form-select ${formik.touched.purchseOrderTermsId && formik.errors.purchseOrderTermsId
                  ? "is-invalid"
                  : ""
                  }`}
                value={formik.values.purchseOrderTermsId}
                onChange={(e) =>
                  formik.setFieldValue(
                    "purchseOrderTermsId",
                    Number(e.target.value)
                  )
                }
                onBlur={formik.handleBlur}
              >
                <option value="">Select Purchase Order Terms</option>
                {purchaseOrderTerms.map((term) => (
                  <option key={term.id} value={term.id}>
                    {term.name}
                  </option>
                ))}
              </select>
              {formik.touched.purchseOrderTermsId && formik.errors.purchseOrderTermsId && (
                <div className="invalid-feedback">{formik.errors.purchseOrderTermsId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Is Cancel</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="isCancelYes"
                    name="isCancel"
                    value="true"
                    checked={formik.values.isCancel === true}
                    onChange={() =>
                      formik.setFieldValue("isCancel", true)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="isCancelYes"
                  >
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="isCancelNo"
                    name="isCancel"
                    value="false"
                    checked={formik.values.isCancel === false}
                    onChange={() =>
                      formik.setFieldValue("isCancel", false)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="isCancelNo"
                  >
                    No
                  </label>
                </div>
              </div>
              {formik.touched.isCancel && formik.errors.isCancel && (
                <div className="text-danger">
                  {formik.errors.isCancel}
                </div>
              )}
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

export default EditPurchaseOrderMain;