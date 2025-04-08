

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Buton from '../../../Compo/Buton';
function EditGRNMain() {

  const location = useLocation();
  const GRNMainId = location.state?.id;
  const navigate = useNavigate();

  const [grnDetails, setGrnDetails] = useState([]);
  console.log(GRNMainId);


  const validationSchema = Yup.object({

  });

  const fetchGRNDetails = async (grnMainId) => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/GRNDetail/GetByGRNMainId?id=${grnMainId}&organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response?.data) {
        
        const modifiedData = response.data.map(
          ({
            measuringUnitsMeasuringUnitsName,
            productVariantMainProductName,
            grnMainsGRNInvoiceNo,
            ...rest
          }) => ({
            ...rest,
            measuringUnitsName: measuringUnitsMeasuringUnitsName ?? "",  
            productName: productVariantMainProductName ?? "",  
            grnInvoiceNo: grnMainsGRNInvoiceNo ?? "", 
          })
        );

        setGrnDetails(modifiedData); // Set the modified data
      } else {
        setGrnDetails([]); // If no data is returned, set an empty array
      }
    } catch (error) {
      console.error("Error fetching GRN details:", error);
    }
  };


  useEffect(() => {
    if (GRNMainId) {
      fetchGRNDetails(GRNMainId);
    }
  }, [GRNMainId]);

  const formik = useFormik({
    initialValues: {  
      branchName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      const finalData = {
        id: GRNMainId,
      
        branchName: values.branchName,
        
      };
      console.log("Final Data Submitted:", finalData);
 


    },
  });


  const addGrnDetail = (detail) => {
    setGrnDetails([...grnDetails, detail]);
  };

  const removeGrnDetail = (index) => {
    setGrnDetails(grnDetails.filter((_, i) => i !== index));
  };

  const grnFormik = useFormik({
    initialValues: {
      taxAmount: 0,
  
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
   
      const grnDetail = {

        ...values,
        id: GRNMainId,
        organizationId: 1,
        companyId: 1,
      };
      addGrnDetail(grnDetail);
      resetForm();
    },
  });


  const [purchaseOrderMains, setPurchaseOrderMains] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

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
    fetchSuppliers();
    fetchPurchaseOrderMains();
  }, []);
  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [productVariantMains, setProductVariantMains] = useState([]);
  const [GRNMain, setGRNMain] = useState([]);

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
      console.error("Error fetching GRN main:", error);
    }
  };
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


  useEffect(() => {
    fetchGRNMain();
    fetchMeasuringUnits();
    fetchProductVariantMains();

  }, []);

  useEffect(() => {
    const fetchGRN = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/GRNMain/GetyId?id=${GRNMainId}&organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const GRN = response.data[0];
          formik.setValues({
            grnInvoiceDate: GRN.grnInvoiceDate || "",
            branchId: GRN.branchId || "",
            branchName: GRN.branchName || "",
            grnDocNo: GRN.grnDocNo || "",
            totalGRNVest: GRN.totalGRNVest || "",
            totalGRNValue: GRN.totalGRNValue || "",
            taxAmount: GRN.taxAmount || "",
            furtherTax: GRN.furtherTax || "",
            totalTaxCharged: GRN.totalTaxCharged || "",
            discount: GRN.discount || "",
            totalGRNAmount: GRN.totalGRNAmount || "",
            rvMainId: GRN.rvMainId || "",
            term: GRN.term || "",
            narration: GRN.narration || "",
            supplierNTNNo: GRN.supplierNTNNo || "",
            supplierSTRNo: GRN.supplierSTRNo || "",
            taxChargePlusAmount: GRN.taxChargePlusAmount || "",
            fillerStatus: GRN.fillerStatus || false,
            tax236Amount: GRN.tax236Amount || "",
            tax236Rate: GRN.tax236Rate || "",
            tax236Status: GRN.tax236Status || false,
            totalAmountWith236: GRN.totalAmountWith236 || "",
            purchaseOrderMainId: GRN.purchaseOrderMainId || 0,
            supplierId: GRN.supplierId || 0,

          });
        } else {
          console.error("Failed to load po Main data.");
        }
      } catch (error) {
        console.error("Error fetching po Main:", error.message);
      }
    };

    if (GRNMainId) {
      fetchGRN();
    }
  }, [GRNMainId]);

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
              <label htmlFor="productDefinitionId" className="form-label">Product Definition ID</label>
              <input
                type="number"
                id="productDefinitionId"
                name="productDefinitionId"
                className={`form-control ${grnFormik.touched.productDefinitionId && grnFormik.errors.productDefinitionId ? "is-invalid" : ""}`}
                value={grnFormik.values.productDefinitionId}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.productDefinitionId && grnFormik.errors.productDefinitionId && (
                <div className="invalid-feedback">{grnFormik.errors.productDefinitionId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="product3rdSchedule" className="form-label">Product 3rd Schedule</label>
              <input
                type="checkbox"
                id="product3rdSchedule"
                name="product3rdSchedule"
                className={`form-check-input ${grnFormik.touched.product3rdSchedule && grnFormik.errors.product3rdSchedule ? "is-invalid" : ""}`}
                checked={grnFormik.values.product3rdSchedule}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.product3rdSchedule && grnFormik.errors.product3rdSchedule && (
                <div className="invalid-feedback">{grnFormik.errors.product3rdSchedule}</div>
              )}
            </div>


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

            <div className="col-md-4 mb-3">
              <label htmlFor="fbrProductDesctiptionId" className="form-label">FBR Product Description ID</label>
              <input
                type="number"
                id="fbrProductDesctiptionId"
                name="fbrProductDesctiptionId"
                className={`form-control ${grnFormik.touched.fbrProductDesctiptionId && grnFormik.errors.fbrProductDesctiptionId ? "is-invalid" : ""}`}
                value={grnFormik.values.fbrProductDesctiptionId}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.fbrProductDesctiptionId && grnFormik.errors.fbrProductDesctiptionId && (
                <div className="invalid-feedback">{grnFormik.errors.fbrProductDesctiptionId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="fbrProductDesctiptionCode" className="form-label">FBR Product Description Code</label>
              <input
                type="text"
                id="fbrProductDesctiptionCode"
                name="fbrProductDesctiptionCode"
                className={`form-control ${grnFormik.touched.fbrProductDesctiptionCode && grnFormik.errors.fbrProductDesctiptionCode ? "is-invalid" : ""}`}
                value={grnFormik.values.fbrProductDesctiptionCode}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.fbrProductDesctiptionCode && grnFormik.errors.fbrProductDesctiptionCode && (
                <div className="invalid-feedback">{grnFormik.errors.fbrProductDesctiptionCode}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="batchId" className="form-label">Batch ID</label>
              <input
                type="number"
                id="batchId"
                name="batchId"
                className={`form-control ${grnFormik.touched.batchId && grnFormik.errors.batchId ? "is-invalid" : ""}`}
                value={grnFormik.values.batchId}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.batchId && grnFormik.errors.batchId && (
                <div className="invalid-feedback">{grnFormik.errors.batchId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="storeId" className="form-label">Store ID</label>
              <input
                type="number"
                id="storeId"
                name="storeId"
                className={`form-control ${grnFormik.touched.storeId && grnFormik.errors.storeId ? "is-invalid" : ""}`}
                value={grnFormik.values.storeId}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.storeId && grnFormik.errors.storeId && (
                <div className="invalid-feedback">{grnFormik.errors.storeId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="fbrMuId" className="form-label">FBR MU ID</label>
              <input
                type="number"
                id="fbrMuId"
                name="fbrMuId"
                className={`form-control ${grnFormik.touched.fbrMuId && grnFormik.errors.fbrMuId ? "is-invalid" : ""}`}
                value={grnFormik.values.fbrMuId}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.fbrMuId && grnFormik.errors.fbrMuId && (
                <div className="invalid-feedback">{grnFormik.errors.fbrMuId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="muCode" className="form-label">MU Code</label>
              <input
                type="text"
                id="muCode"
                name="muCode"
                className={`form-control ${grnFormik.touched.muCode && grnFormik.errors.muCode ? "is-invalid" : ""}`}
                value={grnFormik.values.muCode}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.muCode && grnFormik.errors.muCode && (
                <div className="invalid-feedback">{grnFormik.errors.muCode}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className={`form-control ${grnFormik.touched.quantity && grnFormik.errors.quantity ? "is-invalid" : ""}`}
                value={grnFormik.values.quantity}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.quantity && grnFormik.errors.quantity && (
                <div className="invalid-feedback">{grnFormik.errors.quantity}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="productPrice" className="form-label">Product Price</label>
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                className={`form-control ${grnFormik.touched.productPrice && grnFormik.errors.productPrice ? "is-invalid" : ""}`}
                value={grnFormik.values.productPrice}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.productPrice && grnFormik.errors.productPrice && (
                <div className="invalid-feedback">{grnFormik.errors.productPrice}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                className={`form-control ${grnFormik.touched.amount && grnFormik.errors.amount ? "is-invalid" : ""}`}
                value={grnFormik.values.amount}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.amount && grnFormik.errors.amount && (
                <div className="invalid-feedback">{grnFormik.errors.amount}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="fbrTaxRateId" className="form-label">FBR Tax Rate ID</label>
              <input
                type="number"
                id="fbrTaxRateId"
                name="fbrTaxRateId"
                className={`form-control ${grnFormik.touched.fbrTaxRateId && grnFormik.errors.fbrTaxRateId ? "is-invalid" : ""}`}
                value={grnFormik.values.fbrTaxRateId}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.fbrTaxRateId && grnFormik.errors.fbrTaxRateId && (
                <div className="invalid-feedback">{grnFormik.errors.fbrTaxRateId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="taxRate" className="form-label">Tax Rate</label>
              <input
                type="number"
                id="taxRate"
                name="taxRate"
                className={`form-control ${grnFormik.touched.taxRate && grnFormik.errors.taxRate ? "is-invalid" : ""}`}
                value={grnFormik.values.taxRate}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.taxRate && grnFormik.errors.taxRate && (
                <div className="invalid-feedback">{grnFormik.errors.taxRate}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="taxAmount" className="form-label">Tax Amount</label>
              <input
                type="number"
                id="taxAmount"
                name="taxAmount"
                className={`form-control ${grnFormik.touched.taxAmount && grnFormik.errors.taxAmount ? "is-invalid" : ""}`}
                value={grnFormik.values.taxAmount}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.taxAmount && grnFormik.errors.taxAmount && (
                <div className="invalid-feedback">{grnFormik.errors.taxAmount}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="furtherTax" className="form-label">Further Tax</label>
              <input
                type="number"
                id="furtherTax"
                name="furtherTax"
                className={`form-control ${grnFormik.touched.furtherTax && grnFormik.errors.furtherTax ? "is-invalid" : ""}`}
                value={grnFormik.values.furtherTax}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.furtherTax && grnFormik.errors.furtherTax && (
                <div className="invalid-feedback">{grnFormik.errors.furtherTax}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="furtherTaxAmount" className="form-label">Further Tax Amount</label>
              <input
                type="number"
                id="furtherTaxAmount"
                name="furtherTaxAmount"
                className={`form-control ${grnFormik.touched.furtherTaxAmount && grnFormik.errors.furtherTaxAmount ? "is-invalid" : ""}`}
                value={grnFormik.values.furtherTaxAmount}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.furtherTaxAmount && grnFormik.errors.furtherTaxAmount && (
                <div className="invalid-feedback">{grnFormik.errors.furtherTaxAmount}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="valueExclGRNTax" className="form-label">Value Excl. GRN Tax</label>
              <input
                type="number"
                id="valueExclGRNTax"
                name="valueExclGRNTax"
                className={`form-control ${grnFormik.touched.valueExclGRNTax && grnFormik.errors.valueExclGRNTax ? "is-invalid" : ""}`}
                value={grnFormik.values.valueExclGRNTax}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.valueExclGRNTax && grnFormik.errors.valueExclGRNTax && (
                <div className="invalid-feedback">{grnFormik.errors.valueExclGRNTax}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="discount" className="form-label">Discount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                className={`form-control ${grnFormik.touched.discount && grnFormik.errors.discount ? "is-invalid" : ""}`}
                value={grnFormik.values.discount}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.discount && grnFormik.errors.discount && (
                <div className="invalid-feedback">{grnFormik.errors.discount}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="discountAmount" className="form-label">Discount Amount</label>
              <input
                type="number"
                id="discountAmount"
                name="discountAmount"
                className={`form-control ${grnFormik.touched.discountAmount && grnFormik.errors.discountAmount ? "is-invalid" : ""}`}
                value={grnFormik.values.discountAmount}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.discountAmount && grnFormik.errors.discountAmount && (
                <div className="invalid-feedback">{grnFormik.errors.discountAmount}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="taxCharged" className="form-label">Tax Charged</label>
              <input
                type="number"
                id="taxCharged"
                name="taxCharged"
                className={`form-control ${grnFormik.touched.taxCharged && grnFormik.errors.taxCharged ? "is-invalid" : ""}`}
                value={grnFormik.values.taxCharged}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.taxCharged && grnFormik.errors.taxCharged && (
                <div className="invalid-feedback">{grnFormik.errors.taxCharged}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="valueIncGRNTax" className="form-label">Value Inc. GRN Tax</label>
              <input
                type="number"
                id="valueIncGRNTax"
                name="valueIncGRNTax"
                className={`form-control ${grnFormik.touched.valueIncGRNTax && grnFormik.errors.valueIncGRNTax ? "is-invalid" : ""}`}
                value={grnFormik.values.valueIncGRNTax}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.valueIncGRNTax && grnFormik.errors.valueIncGRNTax && (
                <div className="invalid-feedback">{grnFormik.errors.valueIncGRNTax}</div>
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
                value={grnFormik.values.measuringUnitsId}
                onChange={(e) => {
                  grnFormik.setFieldValue(
                    "measuringUnitsId",
                    Number(e.target.value)
                  );
                }}
                onBlur={grnFormik.handleBlur}
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
              {grnFormik.touched.measuringUnitsId &&
                grnFormik.errors.measuringUnitsId && (
                  <div className="text-danger">
                    {grnFormik.errors.measuringUnitsId}
                  </div>
                )}
            </div>
            <div className="col-md-4 mt-2">
              <label
                htmlFor="productVariantMainId"
                className="form-label"
              >
                grnMainId Main
              </label>
              <select
                name="productVariantMainId"
                className="form-control"
                value={grnFormik.values.productVariantMainId}
                onChange={(e) => {
                  grnFormik.setFieldValue(
                    "productVariantMainId",
                    Number(e.target.value)
                  );
                }}
                onBlur={grnFormik.handleBlur}
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
              {grnFormik.touched.productVariantMainId &&
                grnFormik.errors.productVariantMainId ? (
                <div className="text-danger">
                  {grnFormik.errors.productVariantMainId}
                </div>
              ) : null}
            </div>

            <div className="col-md-4 mt-2">
              <label
                htmlFor="grnMainId"
                className="form-label"
              >
                GRN Main
              </label>
              <select
                name="grnMainId"
                className="form-control"
                value={grnFormik.values.grnMainId}
                onChange={(e) => {
                  grnFormik.setFieldValue(
                    "grnMainId",
                    Number(e.target.value)
                  );
                }}
                onBlur={grnFormik.handleBlur}
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
              {grnFormik.touched.grnMainId &&
                grnFormik.errors.grnMainId ? (
                <div className="text-danger">
                  {grnFormik.errors.grnMainId}
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