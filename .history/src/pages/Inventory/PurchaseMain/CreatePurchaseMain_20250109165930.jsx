import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import CreateSupplier from "../Supplier/CreateSupplier";
import Buton from '../../../Compo/Buton';

function CreatePurchaseMain() {

      const createRef = useRef(null);
      const refClose = useRef(null);
      const createEditRef = useRef(null);
      const refEditClose = useRef(null);

      const buttonStyle = {
        backgroundColor: "transparent",  
        borderWidth: "2px",            
        borderStyle: "solid",           
        borderColor: "#ccc",             
          
        borderRadius:10,                
        fontSize: "10px",                
        width: "40px",                   
        height: "30px",                  
        display: "flex",                
        alignItems: "center",            
        justifyContent: "center",        
        cursor: "pointer",               
        transition: "all 0.3s ease",     
      };
  const navigate = useNavigate();

  const [purchseDetails, setpurchseDetails] = useState([]);

  const validationSchema = Yup.object({

  });
  const formik = useFormik({
    initialValues: {
      purchaseMainInvoiceDate: '',
      branchId: 0,
      branchName: '',
      purchaseMainDocNo: '',
      totalPurchaseMainVest: 0,
      totalPurchaseMainValue: 0,
      taxAmount: 0,
      furtherTax: 0,
      totalTaxCharged: 0,
      discount: 0,
      totalPurchaseMainAmount: 0,
      rvMainId: 0,
      term: '',
      narration: '',
      supplierNTNNo: '',
      supplierSTRNo: '',
      taxChargePlusAmount: 0,
      fillerStatus: false,
      tax236Amount: 0,
      tax236Rate: 0,
      tax236Status: true,
      totalAmountWith236: 0,
      grnMainId: 0,
      supplierId: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const finalData = {
        ...values,
        purchaseMainInvoiceNo: "string",
        organizationId: 1,
        companyId: 1,
        purchseDetails,
      };
      console.log("Final Data Submitted:", finalData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/PurchaseMain/SavePurchaseMain",
          method: "POST",
          data: finalData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Purchase Main saved successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
          formik.resetForm();

        } else {
          throw new Error("Failed to save the Purchase Main");
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text:
            error.message || "An error occurred while saving the Purchase Main",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Close",
        });
      }
    },
  });

  const addpurchseDetails = (detail) => {
    setpurchseDetails([...purchseDetails, detail]);
  };

  const removepurchseDetails = (index) => {
    setpurchseDetails(purchseDetails.filter((_, i) => i !== index));
  };

  const PurchaseFormik = useFormik({
    initialValues: {
      productDefinitionId: 0,
      product3rdSchedule: false,
      itemCode: '',
      itemName: '',
      fbrProductDesctiptionId: 0,
      fbrProductDesctiptionCode: '',
      batchId: 0,
      storeId: 0,
      fbrMuId: 0,
      muCode: '',
      quantity: 0,
      productPrice: 0,
      amount: 0,
      fbrTaxRateId: 0,
      taxRate: 0,
      taxAmount: 0,
      furtherTax: 0,
      furtherTaxAmount: 0,
      valueExclPurchaseMainTax: 0,
      discount: 0,
      discountAmount: 0,
      taxCharged: 0,
      valueIncPurchaseMainTax: 0,
      measuringUnitsId:0,
      productVariantMainId:0,
      purchaseMainId:0
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const selectedmeasuringUnitsName = measuringUnits.find(
        (unit) => unit.id === values.measuringUnitsId
      );
      const selectedProductVariantMain = productVariantMains.find(
        (variant) => variant.id === values.productVariantMainId
      );

      const selectedPurchaseMain = PurchaseMain.find(
        (PurchaseMain) => PurchaseMain.id === values.purchaseMainId
      );
      const purchseDetails = {
        ...values,
        measuringUnitsName: selectedmeasuringUnitsName?.name || null,
        productName: selectedProductVariantMain?.name || null,
        purchaseMainInvoiceNo: selectedPurchaseMain?.name || null,
        organizationId: 1,
        companyId: 1,

      };
      addpurchseDetails(purchseDetails);
      resetForm();
    },
  });
 

  const [suppliers, setSuppliers] = useState([]);
  const [GRNMain, setGRNMain] = useState([]);
  const fetchGRNMain = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/GRNMain/GetGRNMainBoxItems?organizationId=1&companyId=1",
        method: "GET",
      });
      setGRNMain(response.data);
    } catch (error) {
      console.error("Error fetching GRN main:", error);
    }
  };

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

  useEffect(() => {
    fetchSuppliers();
    fetchGRNMain();

  }, []);

  
  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [productVariantMains, setProductVariantMains] = useState([]);
  const [PurchaseMain, setPurchaseMain] = useState([]);

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
  const fetchProductVariantMains = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/ProductVariantMain/GetProductVariantMainBoxItems/combobox?organizationId=1&companyId=1",
        method: "GET",
      });
      setProductVariantMains(response.data);
    } catch (error) {
      console.error("Error fetching Purchase main:", error);
    }
  };
  const fetchPurchaseMain = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/PurchaseMain/GetPurchaseMainBoxItems?organizationId=1&companyId=1",
        method: "GET",
      });
      setPurchaseMain(response.data);
    } catch (error) {
      console.error("Error fetching Purchase main:", error);
    }
  };


  useEffect(() => {
    fetchPurchaseMain();
    fetchMeasuringUnits();
    fetchProductVariantMains();

  }, []);

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row mb-3'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Create Purchase Main</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Purchase Main creation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate("/PurchaseMain/PurchaseMain")}>Move to Purchase Main</Buton>
        </div>
      </div>


      <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>
        <h5 className="mt-1 ">Add Purchase Details :</h5>
        <form onSubmit={PurchaseFormik.handleSubmit}>
          <div className="row border p-2">
            <div className="col-md-4 mt-3">
              <label htmlFor="productDefinitionId" className="form-label">
                Product Definition ID
              </label>
              <input
                type="number"
                id="productDefinitionId"
                name="productDefinitionId"
                className={`form-control ${PurchaseFormik.touched.productDefinitionId && PurchaseFormik.errors.productDefinitionId ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.productDefinitionId}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.productDefinitionId && PurchaseFormik.errors.productDefinitionId && (
                <div className="invalid-feedback">{PurchaseFormik.errors.productDefinitionId}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label className="form-label">Product 3rd Schedule</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="product3rdScheduleTrue"
                  name="product3rdSchedule"
                  value={true}
                  className="form-check-input"
                  checked={PurchaseFormik.values.product3rdSchedule === true}
                  onChange={() => PurchaseFormik.setFieldValue('product3rdSchedule', true)}
                />
                <label htmlFor="product3rdScheduleTrue" className="form-check-label">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="product3rdScheduleFalse"
                  name="product3rdSchedule"
                  value={false}
                  className="form-check-input"
                  checked={PurchaseFormik.values.product3rdSchedule === false}
                  onChange={() => PurchaseFormik.setFieldValue('product3rdSchedule', false)}
                />
                <label htmlFor="product3rdScheduleFalse" className="form-check-label">
                  No
                </label>
              </div>
              {PurchaseFormik.touched.product3rdSchedule && PurchaseFormik.errors.product3rdSchedule && (
                <div className="text-danger mt-1">{PurchaseFormik.errors.product3rdSchedule}</div>
              )}
            </div>


            <div className="col-md-4 mt-3">
              <label htmlFor="itemCode" className="form-label">
                Item Code
              </label>
              <input
                type="text"
                id="itemCode"
                name="itemCode"
                className={`form-control ${PurchaseFormik.touched.itemCode && PurchaseFormik.errors.itemCode ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.itemCode}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.itemCode && PurchaseFormik.errors.itemCode && (
                <div className="invalid-feedback">{PurchaseFormik.errors.itemCode}</div>
              )}
            </div>


            <div className="col-md-4 mt-3">
              <label htmlFor="itemName" className="form-label">
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                className={`form-control ${PurchaseFormik.touched.itemName && PurchaseFormik.errors.itemName ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.itemName}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.itemName && PurchaseFormik.errors.itemName && (
                <div className="invalid-feedback">{PurchaseFormik.errors.itemName}</div>
              )}
            </div>


            <div className="col-md-4 mt-3">
              <label htmlFor="fbrProductDesctiptionId" className="form-label">
                FBR Product Description ID
              </label>
              <input
                type="number"
                id="fbrProductDesctiptionId"
                name="fbrProductDesctiptionId"
                className={`form-control ${PurchaseFormik.touched.fbrProductDesctiptionId && PurchaseFormik.errors.fbrProductDesctiptionId ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.fbrProductDesctiptionId}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.fbrProductDesctiptionId && PurchaseFormik.errors.fbrProductDesctiptionId && (
                <div className="invalid-feedback">{PurchaseFormik.errors.fbrProductDesctiptionId}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="fbrProductDesctiptionCode" className="form-label">
                FBR Product Description Code
              </label>
              <input
                type="text"
                id="fbrProductDesctiptionCode"
                name="fbrProductDesctiptionCode"
                className={`form-control ${PurchaseFormik.touched.fbrProductDesctiptionCode && PurchaseFormik.errors.fbrProductDesctiptionCode ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.fbrProductDesctiptionCode}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.fbrProductDesctiptionCode && PurchaseFormik.errors.fbrProductDesctiptionCode && (
                <div className="invalid-feedback">{PurchaseFormik.errors.fbrProductDesctiptionCode}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="batchId" className="form-label">Batch ID</label>
              <input
                type="number"
                id="batchId"
                name="batchId"
                className={`form-control ${PurchaseFormik.touched.batchId && PurchaseFormik.errors.batchId ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.batchId}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.batchId && PurchaseFormik.errors.batchId && (
                <div className="invalid-feedback">{PurchaseFormik.errors.batchId}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="storeId" className="form-label">Store ID</label>
              <input
                type="number"
                id="storeId"
                name="storeId"
                className={`form-control ${PurchaseFormik.touched.storeId && PurchaseFormik.errors.storeId ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.storeId}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.storeId && PurchaseFormik.errors.storeId && (
                <div className="invalid-feedback">{PurchaseFormik.errors.storeId}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="fbrMuId" className="form-label">FBR MU ID</label>
              <input
                type="number"
                id="fbrMuId"
                name="fbrMuId"
                className={`form-control ${PurchaseFormik.touched.fbrMuId && PurchaseFormik.errors.fbrMuId ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.fbrMuId}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.fbrMuId && PurchaseFormik.errors.fbrMuId && (
                <div className="invalid-feedback">{PurchaseFormik.errors.fbrMuId}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="muCode" className="form-label">MU Code</label>
              <input
                type="text"
                id="muCode"
                name="muCode"
                className={`form-control ${PurchaseFormik.touched.muCode && PurchaseFormik.errors.muCode ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.muCode}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.muCode && PurchaseFormik.errors.muCode && (
                <div className="invalid-feedback">{PurchaseFormik.errors.muCode}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className={`form-control ${PurchaseFormik.touched.quantity && PurchaseFormik.errors.quantity ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.quantity}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.quantity && PurchaseFormik.errors.quantity && (
                <div className="invalid-feedback">{PurchaseFormik.errors.quantity}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="productPrice" className="form-label">Product Price</label>
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                className={`form-control ${PurchaseFormik.touched.productPrice && PurchaseFormik.errors.productPrice ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.productPrice}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.productPrice && PurchaseFormik.errors.productPrice && (
                <div className="invalid-feedback">{PurchaseFormik.errors.productPrice}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                className={`form-control ${PurchaseFormik.touched.amount && PurchaseFormik.errors.amount ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.amount}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.amount && PurchaseFormik.errors.amount && (
                <div className="invalid-feedback">{PurchaseFormik.errors.amount}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="fbrTaxRateId" className="form-label">FBR Tax Rate ID</label>
              <input
                type="number"
                id="fbrTaxRateId"
                name="fbrTaxRateId"
                className={`form-control ${PurchaseFormik.touched.fbrTaxRateId && PurchaseFormik.errors.fbrTaxRateId ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.fbrTaxRateId}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.fbrTaxRateId && PurchaseFormik.errors.fbrTaxRateId && (
                <div className="invalid-feedback">{PurchaseFormik.errors.fbrTaxRateId}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="taxRate" className="form-label">Tax Rate</label>
              <input
                type="number"
                id="taxRate"
                name="taxRate"
                className={`form-control ${PurchaseFormik.touched.taxRate && PurchaseFormik.errors.taxRate ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.taxRate}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.taxRate && PurchaseFormik.errors.taxRate && (
                <div className="invalid-feedback">{PurchaseFormik.errors.taxRate}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="taxRate" className="form-label">Tax Rate</label>
              <input
                type="number"
                id="taxRate"
                name="taxRate"
                className={`form-control ${PurchaseFormik.touched.taxRate && PurchaseFormik.errors.taxRate ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.taxRate}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.taxRate && PurchaseFormik.errors.taxRate && (
                <div className="invalid-feedback">{PurchaseFormik.errors.taxRate}</div>
              )}
            </div>



            <div className="col-md-4 mt-3">
              <label htmlFor="taxAmount" className="form-label">Tax Amount</label>
              <input
                type="number"
                id="taxAmount"
                name="taxAmount"
                className={`form-control ${PurchaseFormik.touched.taxAmount && PurchaseFormik.errors.taxAmount ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.taxAmount}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.taxAmount && PurchaseFormik.errors.taxAmount && (
                <div className="invalid-feedback">{PurchaseFormik.errors.taxAmount}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="furtherTax" className="form-label">Further Tax</label>
              <input
                type="number"
                id="furtherTax"
                name="furtherTax"
                className={`form-control ${PurchaseFormik.touched.furtherTax && PurchaseFormik.errors.furtherTax ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.furtherTax}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.furtherTax && PurchaseFormik.errors.furtherTax && (
                <div className="invalid-feedback">{PurchaseFormik.errors.furtherTax}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="furtherTaxAmount" className="form-label">Further Tax Amount</label>
              <input
                type="number"
                id="furtherTaxAmount"
                name="furtherTaxAmount"
                className={`form-control ${PurchaseFormik.touched.furtherTaxAmount && PurchaseFormik.errors.furtherTaxAmount ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.furtherTaxAmount}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.furtherTaxAmount && PurchaseFormik.errors.furtherTaxAmount && (
                <div className="invalid-feedback">{PurchaseFormik.errors.furtherTaxAmount}</div>
              )}
            </div>


            <div className="col-md-4 mt-3">
              <label htmlFor="valueExclPurchaseMainTax" className="form-label">Value Excl. Purchase Main Tax</label>
              <input
                type="number"
                id="valueExclPurchaseMainTax"
                name="valueExclPurchaseMainTax"
                className={`form-control ${PurchaseFormik.touched.valueExclPurchaseMainTax && PurchaseFormik.errors.valueExclPurchaseMainTax ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.valueExclPurchaseMainTax}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.valueExclPurchaseMainTax && PurchaseFormik.errors.valueExclPurchaseMainTax && (
                <div className="invalid-feedback">{PurchaseFormik.errors.valueExclPurchaseMainTax}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="discount" className="form-label">Discount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                className={`form-control ${PurchaseFormik.touched.discount && PurchaseFormik.errors.discount ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.discount}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.discount && PurchaseFormik.errors.discount && (
                <div className="invalid-feedback">{PurchaseFormik.errors.discount}</div>
              )}
            </div>


            <div className="col-md-4 mt-3">
              <label htmlFor="discountAmount" className="form-label">Discount Amount</label>
              <input
                type="number"
                id="discountAmount"
                name="discountAmount"
                className={`form-control ${PurchaseFormik.touched.discountAmount && PurchaseFormik.errors.discountAmount ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.discountAmount}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.discountAmount && PurchaseFormik.errors.discountAmount && (
                <div className="invalid-feedback">{PurchaseFormik.errors.discountAmount}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="taxCharged" className="form-label">Tax Charged</label>
              <input
                type="number"
                id="taxCharged"
                name="taxCharged"
                className={`form-control ${PurchaseFormik.touched.taxCharged && PurchaseFormik.errors.taxCharged ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.taxCharged}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.taxCharged && PurchaseFormik.errors.taxCharged && (
                <div className="invalid-feedback">{PurchaseFormik.errors.taxCharged}</div>
              )}
            </div>

            <div className="col-md-4 mt-3">
              <label htmlFor="valueIncPurchaseMainTax" className="form-label">Value Including Purchase Main Tax</label>
              <input
                type="number"
                id="valueIncPurchaseMainTax"
                name="valueIncPurchaseMainTax"
                className={`form-control ${PurchaseFormik.touched.valueIncPurchaseMainTax && PurchaseFormik.errors.valueIncPurchaseMainTax ? 'is-invalid' : ''
                  }`}
                value={PurchaseFormik.values.valueIncPurchaseMainTax}
                onChange={PurchaseFormik.handleChange}
                onBlur={PurchaseFormik.handleBlur}
              />
              {PurchaseFormik.touched.valueIncPurchaseMainTax && PurchaseFormik.errors.valueIncPurchaseMainTax && (
                <div className="invalid-feedback">{PurchaseFormik.errors.valueIncPurchaseMainTax}</div>
              )}
            </div>

            <div className="col-md-4 mt-2">
              <label htmlFor="measuringUnitsId" className="form-label">
                Measuring Unit
              </label>
              <select
                id="measuringUnitsId"
                name="measuringUnitsId"
                className="form-control"
                value={PurchaseFormik.values.measuringUnitsId}
                onChange={(e) => {
                  PurchaseFormik.setFieldValue(
                    "measuringUnitsId",
                    Number(e.target.value)
                  );
                }}
                onBlur={PurchaseFormik.handleBlur}
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
              {PurchaseFormik.touched.measuringUnitsId &&
                PurchaseFormik.errors.measuringUnitsId && (
                  <div className="text-danger">
                    {PurchaseFormik.errors.measuringUnitsId}
                  </div>
                )}
            </div>
            <div className="col-md-4 mt-2">
              <label
                htmlFor="productVariantMainId"
                className="form-label"
              >
                Product Variant Main Id
              </label>
              <select
                name="productVariantMainId"
                className="form-control"
                value={PurchaseFormik.values.productVariantMainId}
                onChange={(e) => {
                  PurchaseFormik.setFieldValue(
                    "productVariantMainId",
                    Number(e.target.value)
                  );
                }}
                onBlur={PurchaseFormik.handleBlur}
              >
                <option value="">Select Product Main</option>
                {Array.isArray(productVariantMains) &&
                  productVariantMains.length > 0 ? (
                  productVariantMains.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.name}
                    </option>
                  ))
                ) : (
                  <option value="">
                    No Product Mains Available
                  </option>
                )}
              </select>
              {PurchaseFormik.touched.productVariantMainId &&
                PurchaseFormik.errors.productVariantMainId ? (
                <div className="text-danger">
                  {PurchaseFormik.errors.productVariantMainId}
                </div>
              ) : null}
            </div>

            <div className="col-md-4 mt-2">
              <label
                htmlFor="purchaseMainId"
                className="form-label"
              >
                Purchase Main
              </label>
              <select
                name="purchaseMainId"
                className="form-control"
                value={PurchaseFormik.values.purchaseMainId}
                onChange={(e) => {
                  PurchaseFormik.setFieldValue(
                    "purchaseMainId",
                    Number(e.target.value)
                  );
                }}
                onBlur={PurchaseFormik.handleBlur}
              >
                <option value="">Select Purchase Main Id</option>
                {Array.isArray(PurchaseMain) &&
                  PurchaseMain.length > 0 ? (
                  PurchaseMain.map((PurchaseMain) => (
                    <option key={PurchaseMain.id} value={PurchaseMain.id}>
                      {PurchaseMain.name}
                    </option>
                  ))
                ) : (
                  <option value="">
                    No Purchase Main Id Available
                  </option>
                )}
              </select>
              {PurchaseFormik.touched.grnMainId &&
                PurchaseFormik.errors.grnMainId ? (
                <div className="text-danger">
                  {PurchaseFormik.errors.grnMainId}
                </div>
              ) : null}
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

          {purchseDetails.length > 0 && (
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th>Mu Code</th>
                    <th>Product Def Id</th>
                    <th>Purchase</th>
                    <th>Measuring Unit</th>
                    <th>Product Variant</th>
                    <th>Tax</th>
                    <th>Further Tax</th>
                    <th>Discount</th>
                    <th>Action</th>
                  </tr>

                </thead>
                <tbody>
                  {purchseDetails.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.muCode}</td>
                      <td>{detail.productDefinitionId}</td>
                      <td>{detail.purchaseMainId}</td>
                      <td>{detail.measuringUnitsId}</td>
                      <td>{detail.productVariantMainId}</td>
                      <td>{detail.taxAmount}</td>
                      <td>{detail.furtherTax}</td>
                      <td>{detail.discount}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removepurchseDetails(index)}
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
          <div className="row">

            <div className="col-md-4">
              <label htmlFor="purchaseMainInvoiceDate" className="form-label">
                Invoice Date
              </label>
              <input
                type="datetime-local"
                id="purchaseMainInvoiceDate"
                name="purchaseMainInvoiceDate"
                className={`form-control ${formik.touched.purchaseMainInvoiceDate && formik.errors.purchaseMainInvoiceDate ? 'is-invalid' : ''
                  }`}
                value={formik.values.purchaseMainInvoiceDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.purchaseMainInvoiceDate && formik.errors.purchaseMainInvoiceDate && (
                <div className="invalid-feedback">{formik.errors.purchaseMainInvoiceDate}</div>
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
              <label htmlFor="purchaseMainDocNo" className="form-label">
                Document Number
              </label>
              <input
                type="text"
                id="purchaseMainDocNo"
                name="purchaseMainDocNo"
                className={`form-control ${formik.touched.purchaseMainDocNo && formik.errors.purchaseMainDocNo ? 'is-invalid' : ''
                  }`}
                value={formik.values.purchaseMainDocNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.purchaseMainDocNo && formik.errors.purchaseMainDocNo && (
                <div className="invalid-feedback">{formik.errors.purchaseMainDocNo}</div>
              )}
            </div>

            {/* Total Purchase Main Vest */}
            <div className="col-md-4 mt-3">
              <label htmlFor="totalPurchaseMainVest" className="form-label">
                Total Vest
              </label>
              <input
                type="number"
                id="totalPurchaseMainVest"
                name="totalPurchaseMainVest"
                className={`form-control ${formik.touched.totalPurchaseMainVest && formik.errors.totalPurchaseMainVest ? 'is-invalid' : ''
                  }`}
                value={formik.values.totalPurchaseMainVest}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalPurchaseMainVest && formik.errors.totalPurchaseMainVest && (
                <div className="invalid-feedback">{formik.errors.totalPurchaseMainVest}</div>
              )}
            </div>

            {/* Total Purchase Main Value */}
            <div className="col-md-4 mt-3">
              <label htmlFor="totalPurchaseMainValue" className="form-label">
                Total Value
              </label>
              <input
                type="number"
                id="totalPurchaseMainValue"
                name="totalPurchaseMainValue"
                className={`form-control ${formik.touched.totalPurchaseMainValue && formik.errors.totalPurchaseMainValue ? 'is-invalid' : ''
                  }`}
                value={formik.values.totalPurchaseMainValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalPurchaseMainValue && formik.errors.totalPurchaseMainValue && (
                <div className="invalid-feedback">{formik.errors.totalPurchaseMainValue}</div>
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
              <label htmlFor="totalPurchaseMainAmount" className="form-label">
                Total Amount
              </label>
              <input
                type="number"
                id="totalPurchaseMainAmount"
                name="totalPurchaseMainAmount"
                className={`form-control ${formik.touched.totalPurchaseMainAmount && formik.errors.totalPurchaseMainAmount ? 'is-invalid' : ''
                  }`}
                value={formik.values.totalPurchaseMainAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalPurchaseMainAmount && formik.errors.totalPurchaseMainAmount && (
                <div className="invalid-feedback">{formik.errors.totalPurchaseMainAmount}</div>
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

<div style={{ display: "flex", alignItems: "center",justifyContent: "center",     }}>
        <button style={buttonStyle} onClick={() => createRef.current.click()}>+ </button>
    </div>
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
      <CreateSupplier open={createRef} close={refClose}  />
    </div>
  );
}

export default CreatePurchaseMain;
