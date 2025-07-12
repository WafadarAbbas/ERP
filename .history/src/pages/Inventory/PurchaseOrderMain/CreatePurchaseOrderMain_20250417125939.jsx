import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import CreateSupplier from "../Supplier/CreateSupplier";
import Buton from '../../../Compo/Buton';

function CreatePurchaseOrderMain() {


    const createRef = useRef(null);
    const refClose = useRef(null);
  
    const buttonStyle = {
      backgroundColor: "#e3e1e1",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "#ccc",
      borderRadius: 10,
      fontWeight:'bold',
      fontSize: "11px",
      width: "70px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
    };
  const navigate = useNavigate();

  const [purchseOrderDetails, setpurchseOrderDetails] = useState([]);
  const validationSchema = Yup.object({

  });
  const formik = useFormik({
    initialValues: {
      poNumber: '',
      poDate: '',
      poIssueDate: '',
      poExpectedDeliveryDate: '',
      poReferenceNumber: '',
      poDays: '',
      poDueDate: '',
      poNumberOfItems: 0,
      cashierName: '',
      isCancel: false,
      supplierId: 0,
      purchaseOrderStatusId: 0,
      purchseOrderTermsId: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const finalData = {
        ...values,
        purchseOrderDetails,
        organizationId: 1,
        companyId: 1,

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
      productVariantMainId: 0,
      measuringUnitsId: 0,
      purchaseOrderMainId: 0,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const selectedmeasuringUnitsName = measuringUnits.find(
        (unit) => unit.id === values.measuringUnitsId
      );
      const selectedProductVariantMain = productVariantMainId.find(
        (variant) => variant.id === values.productVariantMainId
      );

      const selectedPurchaseMain = purchaseOrderMains.find(
        (PurchaseMain) => PurchaseMain.id === values.purchaseOrderMainId
      );
      const purchseOrderDetails = {
        ...values,
        measuringUnitsName: selectedmeasuringUnitsName?.name || null,
        productName: selectedProductVariantMain?.name || null,
        poNumber: selectedPurchaseMain?.name || null,
        organizationId: 1,
        companyId: 1,

      };
      addpurchseOrderDetails(purchseOrderDetails);
      resetForm();
    },
  });

  const [suppliers, setSuppliers] = useState([]);
  const [purchaseOrderStatuses, setPurchaseOrderStatuses] = useState([]);
  const [purchaseOrderTerms, setPurchaseOrderTerms] = useState([]);

 
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
    const fetchPurchaseOrderStatuses = async () => {
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/PurchaseOrderStatus/GetcomboBoxItems/combobox?organizationId=1&companyId=1",
          method: "GET",
        });
        if (response?.data) {
          setPurchaseOrderStatuses(response.data);
        } else {
          throw new Error("Failed to fetch purchase order statuses.");
        }
      } catch (error) {
        console.error("Error fetching purchase order statuses:", error);
      }
    };

    const fetchPurchaseOrderTerms = async () => {
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/PurchseOrderTerms/GetcomboBoxItems/combobox?organizationId=1&companyId=1",
          method: "GET",
        });
        if (response?.data) {
          setPurchaseOrderTerms(response.data);
        } else {
          throw new Error("Failed to fetch purchase order terms.");
        }
      } catch (error) {
        console.error("Error fetching purchase order terms:", error);
      }
    };
    useEffect(() => {

    fetchSuppliers();
    fetchPurchaseOrderStatuses();
    fetchPurchaseOrderTerms();
  }, []);

  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [productVariantMainId, setproductVariantMainId] = useState([]);
  const [purchaseOrderMains, setPurchaseOrderMains] = useState([]);
  const fetchMeasuringUnits = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/MeasuringUnits/GetMeasuringUnitsBoxItems/combobox?organizationId=1&companyId=1",
        method: "GET",
      });
      setMeasuringUnits(response.data);
    } catch (error) {
      console.error("Error fetching measuring units:", error);
    }
  };
  const fetchproductVariantMainId = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/ProductVariantMain/GetProductVariantMainBoxItems/combobox?organizationId=1&companyId=1",
        method: "GET",
      });
      setproductVariantMainId(response.data);
    } catch (error) {
      console.error("Error fetching Purchase variant mains:", error);
    }
  };
  const fetchPurchaseOrderMains = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/PurchaseOrderMain/GetPurchaseOrderMainBoxItems?organizationId=1&companyId=1",
        method: "GET",
      });
      setPurchaseOrderMains(response.data);
    } catch (error) {
      console.error("Error fetching purchase order mains:", error);
    }
  };

  useEffect(() => {
    fetchMeasuringUnits();
    fetchproductVariantMainId();
    fetchPurchaseOrderMains();
  }, []);





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
        {/* --------------------------------------- */}
    
        <h4 className="mt-1 mb-4">Add Purchase Order Main :</h4>
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


            <div className=" col-md-4 d-flex">
              <div className="col-10  ">
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
<hr




        {/* ------------------------------------------------ */}

        <h4 className="mt-1 ">Add Purchase Order Details :</h4>
        <form onSubmit={PurchaseOrderFormik.handleSubmit}>
          <div className="row border p-2">
            {/* Add form inputs for the new fields */}
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
            <div className="col-md-4 mt-3">
              <label htmlFor="measuringUnitsId" className="form-label">
                Measuring Unit
              </label>
              <select
                id="measuringUnitsId"
                name="measuringUnitsId"
                className="form-control"
                value={PurchaseOrderFormik.values.measuringUnitsId}
                onChange={(e) => {
                  PurchaseOrderFormik.setFieldValue(
                    "measuringUnitsId",
                    Number(e.target.value)
                  );
                }}
                onBlur={PurchaseOrderFormik.handleBlur}
              >
                <option value="">Select Measuring Unit</option>
                {Array.isArray(measuringUnits) && measuringUnits.length > 0 ? (
                  measuringUnits.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))
                ) : (
                  <option value="">
                    No Measuring Units Available
                  </option>
                )}
              </select>
              {PurchaseOrderFormik.touched.measuringUnitsId &&
                PurchaseOrderFormik.errors.measuringUnitsId && (
                  <div className="text-danger">
                    {PurchaseOrderFormik.errors.measuringUnitsId}
                  </div>
                )}
            </div>
            <div className="col-md-4 mt-3">
              <label
                htmlFor="productVariantMainId"
                className="form-label"
              >
                Product Variant Main
              </label>
              <select
                name="productVariantMainId"
                className="form-control"
                value={PurchaseOrderFormik.values.productVariantMainId}
                onChange={(e) => {
                  PurchaseOrderFormik.setFieldValue(
                    "productVariantMainId",
                    Number(e.target.value)
                  );
                }}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Product Variant Main</option>
                {Array.isArray(productVariantMainId) &&
                  productVariantMainId.length > 0 ? (
                  productVariantMainId.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.name}
                    </option>
                  ))
                ) : (
                  <option value="">
                    No Product Variant Mains Available
                  </option>
                )}
              </select>
              {PurchaseOrderFormik.touched.productVariantMainId &&
                PurchaseOrderFormik.errors.productVariantMainId ? (
                <div className="text-danger">
                  {PurchaseOrderFormik.errors.productVariantMainId}
                </div>
              ) : null}
            </div>
            <div className="col-md-4 mt-3">
              <label htmlFor="purchaseOrderMainId" className="form-label">
                Purchase Order Main
              </label>
              <select
                id="purchaseOrderMainId"
                name="purchaseOrderMainId"
                className="form-control"
                value={PurchaseOrderFormik.values.purchaseOrderMainId}
                onChange={(e) =>
                  PurchaseOrderFormik.setFieldValue(
                    "purchaseOrderMainId",
                    Number(e.target.value)
                  )
                }
                onBlur={PurchaseOrderFormik.handleBlur}
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
              {PurchaseOrderFormik.touched.purchaseOrderMainId &&
                PurchaseOrderFormik.errors.purchaseOrderMainId && (
                  <div className="text-danger">
                    {PurchaseOrderFormik.errors.purchaseOrderMainId}
                  </div>
                )}
            </div>

            <div>
              <button type="submit" className="btn btn-success mt-3 col-2">
                Add Detail
              </button>
            </div>
          </div>

          {/* Display table if there are purchase order details */}
          {purchseOrderDetails.length > 0 && (
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>Po Quantity</th>
                    <th>grnQuantity</th>
                    <th>grnBatchId</th>
                    <th>grnStoreIdt</th>
                    <th>purchaseOrderMainId</th>
                    <th>measuringUnitsId</th>
                    <th>productVariantMainId</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {purchseOrderDetails.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.poQuantity}</td>
                      <td>{detail.grnQuantity}</td>
                      <td>{detail.grnBatchId}</td>
                      <td>{detail.grnStoreId}</td>
                      <td>{detail.purchaseOrderMainId}</td>
                      <td>{detail.measuringUnitsId}</td>
                      <td>{detail.productVariantMainId}</td>


                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removepurchseOrderDetails(index)}
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





      </div>

      <Footer />
      <CreateSupplier open={createRef} onclick={fetchSuppliers} />
    </div>
  );
}

export default CreatePurchaseOrderMain;

