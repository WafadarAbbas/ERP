import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import CreateSupplier from "../Supplier/CreateSupplier";
import Buton from '../../../Compo/Buton';
import Select from "react-select";
function CreatePurchaseOrderMain() {


  const createRef = useRef(null);
  const refClose = useRef(null);

  const buttonStyle = {
    backgroundColor: "#ff9f33",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#ff9f33",
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize: "15px",
    color: "white",
    width: "40px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };
  const navigate = useNavigate();

  const [purchseOrderDetails, setpurchseOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object({
    poDate: Yup.date()
      .required("PO Date is required"),
  
    poIssueDate: Yup.date()
      .required("PO Issue Date is required")
      .test(
        "poIssueDate-after-poDate",
        "PO Issue Date cannot be before PO Date",
        function (value) {
          const { poDate } = this.parent;
          return !value || !poDate || new Date(value) >= new Date(poDate);
        }
      ),
  
    poExpectedDeliveryDate: Yup.date()
      .required("PO Expected Delivery Date is required")
      .test(
        "poExpectedDeliveryDate-after-poDate",
        "Expected Delivery Date cannot be before PO Date",
        function (value) {
          const { poDate } = this.parent;
          return !value || !poDate || new Date(value) >= new Date(poDate);
        }
      ),
  
    poDueDate: Yup.date()
      .required("PO Due Date is required")
      .test(
        "poDueDate-after-poDate",
        "Due Date cannot be before PO Date",
        function (value) {
          const { poDate } = this.parent;
          return !value || !poDate || new Date(value) >= new Date(poDate);
        }
      ),
    supplierId: Yup.number().min(1, "Supplier is required"),
    purchaseOrderStatusId: Yup.number().required("Purchase Order Status is required"),
    purchseOrderTermsId: Yup.number().required("Purchse Order Terms is required"),
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
      setIsLoading(true);  
  
      const finalData = {
        ...values,
        purchseOrderDetails,
        organizationId: 1,
        companyId: 1,
      };
  
      // try {
      //   const response = await ApiCall({
      //     url: "http://localhost:5022/api/v1/PurchaseOrderMain/SavePurchaseOrderMain",
      //     method: "POST",
      //     data: finalData,
      //   });
  
      //   if (response?.status === 200) {
      //     Swal.fire({
      //       title: "Success!",
      //       text: "Purchase Order saved successfully.",
      //       icon: "success",
      //       confirmButtonColor: "#3085d6",
      //       confirmButtonText: "OK",
      //     });
      //     formik.resetForm();
      //     setpurchseOrderDetails([]);  
      //   } else {
      //     throw new Error("Failed to save the Purchase Order");
      //   }
      // } catch (error) {
      //   console.error("Error during Purchase Order save:", error);
      //   Swal.fire({
      //     title: "Error",
      //     text: error.message || "An error occurred while saving the Purchase Order",
      //     icon: "error",
      //     confirmButtonColor: "#d33",
      //     confirmButtonText: "Close",
      //   });
      // } finally {
      //   setIsLoading(false);
      // }
    },
  });
  

  const addpurchseOrderDetails = (detail) => {
    setpurchseOrderDetails([...purchseOrderDetails, detail]);
  };

  const removepurchseOrderDetails = (index) => {
    setpurchseOrderDetails(purchseOrderDetails.filter((_, i) => i !== index));
  };
  const PurchasevalidationSchema = Yup.object({
    poQuantity: Yup.number()
      .required('PO Quantity is required')
      .moreThan(0, 'PO Quantity must be greater than 0'),
    measuringUnitsId: Yup.number()
      .required('Measuring Unit is required')
      .moreThan(0, 'Please select a Measuring Unit'),
    productVariantMainId: Yup.number()
      .required('Product Variant Main is required')
      .moreThan(0, 'Please select a Product Variant Main'),
  });
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

    validationSchema: PurchasevalidationSchema,
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
    
      const purchseOrderDetailsData = {
        ...values,
        measuringUnitsName: selectedmeasuringUnitsName?.name || null,
        productName: selectedProductVariantMain?.name || null,
        poNumber: selectedPurchaseMain?.name || null,
        organizationId: 1,
        companyId: 1,
      };
    
       
      const updatedDetails = [...purchseOrderDetails, purchseOrderDetailsData];
      addpurchseOrderDetails(purchseOrderDetailsData);
    
       
      formik.setFieldValue("poNumberOfItems", updatedDetails.length);
    
    
      resetForm();
    }
    
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
      <div className='d-flex justify-content-between row mb-4'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Create Purchase Order Main</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Purchase Order Main creation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate("/PurchaseOrderMain/PurchaseOrderMain")}>Move to Purchase Order Main</Buton>
        </div>
      </div>


      <div style={{ backgroundColor: 'white', padding: 10,marginBottom:10, boxShadow: "0 0 4px 4px rgba(206, 204, 204, 0.4)" }}>
        {/* --------------------------------------- */}

        <h4 className="mt-1 mb-4">Add Purchase Order Main :</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-1 mb-4">
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
                  readOnly
                value={formik.values.poNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.poNumber && formik.errors.poNumber && (
                <div className="invalid-feedback">{formik.errors.poNumber}</div>
              )}
            </div>

            <div className="col-md-1 mb-4">
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

            <div className="col-md-1 mb-4">
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

            <div className="col-md-2 mb-4">
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
            <div className="col-md-1 mb-4">
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

            <div className="col-md-2 mb-4">
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

            <div className="col-md-1 mb-4">
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

            <div className="col-md-2 mb-4">
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
                  readOnly
                value={formik.values.poNumberOfItems}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.poNumberOfItems && formik.errors.poNumberOfItems && (
                <div className="invalid-feedback">{formik.errors.poNumberOfItems}</div>
              )}
            </div>
            <div className="col-md-2 mb-4">
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
            <div className="col-md-3 d-flex">
              <div className="col-10">
                <label htmlFor="supplierId" className="form-label">
                  Supplier
                </label>
                <Select
                  id="supplierId"
                  name="supplierId"
                  options={suppliers.map((supplier) => ({
                    value: supplier.id,
                    label: supplier.name,
                  }))}
                  value={
                    suppliers
                      .map((supplier) => ({
                        value: supplier.id,
                        label: supplier.name,
                      }))
                      .find((option) => option.value === formik.values.supplierId) || null
                  }
                  onChange={(selectedOption) =>
                    formik.setFieldValue(
                      "supplierId",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  onBlur={() => formik.setFieldTouched("supplierId", true)}
                  isClearable
                  className={formik.touched.supplierId && formik.errors.supplierId ? "is-invalid" : ""}
                />
                {formik.touched.supplierId && formik.errors.supplierId && (
                  <div className="text-danger">{formik.errors.supplierId}</div>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", marginTop: 5, marginLeft: 5, }}>
                <button style={buttonStyle} type="button" onClick={() => createRef.current.click()} >+</button>
                
              </div>
            </div>
            <div className="col-md-2 mb-4">
              <label htmlFor="purchaseOrderStatusId" className="form-label">
                Purchase Order Status
              </label>
              <Select
                id="purchaseOrderStatusId"
                name="purchaseOrderStatusId"
                options={purchaseOrderStatuses.map((status) => ({
                  value: status.id,
                  label: status.name,
                }))}
                value={purchaseOrderStatuses
                  .map((status) => ({
                    value: status.id,
                    label: status.name,
                  }))
                  .find(
                    (option) => option.value === formik.values.purchaseOrderStatusId
                  ) || null}
                onChange={(selectedOption) =>
                  formik.setFieldValue(
                    "purchaseOrderStatusId",
                    selectedOption ? selectedOption.value : ""
                  )
                }
                onBlur={() => formik.setFieldTouched("purchaseOrderStatusId", true)}
                isClearable
                className={
                  formik.touched.purchaseOrderStatusId &&
                    formik.errors.purchaseOrderStatusId
                    ? "is-invalid"
                    : ""
                }
              />
              {formik.touched.purchaseOrderStatusId &&
                formik.errors.purchaseOrderStatusId && (
                  <div className="text-danger">
                    {formik.errors.purchaseOrderStatusId}
                  </div>
                )}
            </div>
            <div className="col-md-2 mb-4">
              <label htmlFor="purchseOrderTermsId" className="form-label">
                Purchase Order Terms
              </label>
              <Select
                id="purchseOrderTermsId"
                name="purchseOrderTermsId"
                options={purchaseOrderTerms.map((term) => ({
                  value: term.id,
                  label: term.name,
                }))}
                value={purchaseOrderTerms
                  .map((term) => ({
                    value: term.id,
                    label: term.name,
                  }))
                  .find(
                    (option) => option.value === formik.values.purchseOrderTermsId
                  ) || null}
                onChange={(selectedOption) =>
                  formik.setFieldValue(
                    "purchseOrderTermsId",
                    selectedOption ? selectedOption.value : ""
                  )
                }
                onBlur={() => formik.setFieldTouched("purchseOrderTermsId", true)}
                isClearable
                className={
                  formik.touched.purchseOrderTermsId &&
                    formik.errors.purchseOrderTermsId
                    ? "is-invalid"
                    : ""
                }
              />
              {formik.touched.purchseOrderTermsId &&
                formik.errors.purchseOrderTermsId && (
                  <div className="text-danger">
                    {formik.errors.purchseOrderTermsId}
                  </div>
                )}
            </div>
            <div className="col-md-2 mb-4">
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
        </form>





        {/* ------------------------------------------------ */}

        <h4 className="mt-1 ">Add Purchase Order Details :</h4>
        <hr></hr>
        <form onSubmit={PurchaseOrderFormik.handleSubmit}>

          <div className="row  p-2">


            <div className="col-md-2">
              <label htmlFor="productVariantMainId" className="form-label">
                Product Variant Main
              </label>
              <Select
                name="productVariantMainId"
                options={productVariantMainId.map((variant) => ({
                  value: variant.id,
                  label: variant.name,
                }))}
                value={
                  productVariantMainId
                    .map((variant) => ({
                      value: variant.id,
                      label: variant.name,
                    }))
                    .find(
                      (option) =>
                        option.value === PurchaseOrderFormik.values.productVariantMainId
                    ) || null
                }
                onChange={(selectedOption) => {
                  PurchaseOrderFormik.setFieldValue(
                    "productVariantMainId",
                    selectedOption ? selectedOption.value : ""
                  );
                }}
                onBlur={PurchaseOrderFormik.handleBlur}
                isClearable
              />
              {PurchaseOrderFormik.touched.productVariantMainId &&
                PurchaseOrderFormik.errors.productVariantMainId ? (
                <div className="text-danger">
                  {PurchaseOrderFormik.errors.productVariantMainId}
                </div>
              ) : null}
            </div>

            <div className="col-md-2">
              <label htmlFor="measuringUnitsId" className="form-label">
                Measuring Unit
              </label>
              <Select
                name="measuringUnitsId"
                options={measuringUnits.map((unit) => ({
                  value: unit.id,
                  label: unit.name,
                }))}
                value={
                  measuringUnits
                    .map((unit) => ({
                      value: unit.id,
                      label: unit.name,
                    }))
                    .find(
                      (option) =>
                        option.value === PurchaseOrderFormik.values.measuringUnitsId
                    ) || null
                }
                onChange={(selectedOption) => {
                  PurchaseOrderFormik.setFieldValue(
                    "measuringUnitsId",
                    selectedOption ? selectedOption.value : ""
                  );
                }}
                onBlur={PurchaseOrderFormik.handleBlur}
                isClearable
              />
              {PurchaseOrderFormik.touched.measuringUnitsId &&
                PurchaseOrderFormik.errors.measuringUnitsId && (
                  <div className="text-danger">
                    {PurchaseOrderFormik.errors.measuringUnitsId}
                  </div>
                )}
            </div>

            <div className="col-md-1 mb-4">
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
            <div>
              <button type="submit" className="btn btn-success mt-3 mb-2 col-2">
                Add Detail
              </button>
            </div>
            <hr></hr>
          </div>



          {purchseOrderDetails.length > 0 && (
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-hover table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Product Variant Main </th>
                    <th>measuringUnitsId</th>
                    <th>Po Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {purchseOrderDetails.map((detail, index) => (
                    <tr key={index}>
                    
                    <td>
                        {
                          productVariantMainId.find(
                            (variant) => variant.id === detail.productVariantMainId
                          )?.name || detail.productVariantMainId
                        }
                      </td>
                      <td>
                        {
                          measuringUnits.find(
                            (variant) => variant.id === detail.measuringUnitsId
                          )?.name || detail.measuringUnitsId
                        }
                      </td>
                  
                      <td>{detail.poQuantity}</td>
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
                   <tr className=" ">
    <td colSpan="2" className="text-end">Total PO Quantity</td>
    <td className='fw-bold fs-6'>
      {purchseOrderDetails.reduce(
        (sum, detail) => sum + Number(detail.poQuantity || 0),
        0
      )}
    </td>
    <td></td>
  </tr>
                </tbody>
              </table>
            </div>
          )}
        </form>



        <div className="text-end  pt-5 pb-3 mb-1 bg-white">
          <button
            type="submit"
            className="btn btn-lg"
            style={{ backgroundColor: '#ff9f33', color: 'white' }}
            onClick={formik.handleSubmit}
          >
            Save Changes
          </button>
        </div>

      </div>

      

      <Footer />
      <CreateSupplier open={createRef} onclick={fetchSuppliers} />
    </div>
  );
}

export default CreatePurchaseOrderMain;

