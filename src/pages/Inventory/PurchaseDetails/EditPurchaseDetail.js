import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const EditPurchaseDetail = (props) => {
  const { selectedPurchaseDetailId } = props;


  const validationSchema = Yup.object({
      });
      const formik = useFormik({
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
        onSubmit: async (values, { resetForm }) => {
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
            id:selectedPurchaseDetailId,
          };
          console.log(purchseDetails);
          try {
            const response = await ApiCall({
              url: "http://localhost:5022/api/v1/PurchaseDetail/UpdatePurchaseDetail",
              method: "PUT",
              data: purchseDetails,
            });
    
            if (response?.status === 200) {
              Swal.fire({
                title: "Success!",
                text: "Purchase Detail Updated successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
              });
    
              formik.resetForm();
              if (props.close && props.close.current) {
                props.close.current.click();
              }
              if (typeof props.onclick === "function") {
                props.onclick();
              }
            } else {
              throw new Error("Failed to Update the PurchaseDetail");
            }
          } catch (error) {
            console.error("Error during PurchaseDetail Update:", error);
            Swal.fire({
              title: "Error",
              text:
                error.message ||
                "An error occurred while Updating the PurchaseDetail",
              icon: "error",
              confirmButtonColor: "#d33",
              confirmButtonText: "Close",
            });
          }
    
          resetForm();
        },
      });

  useEffect(() => {
    formik.resetForm();
  }, [props.open]);

  const handleModalClose = () => {
    formik.resetForm();
  };

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

  useEffect(() => {
    const fetchPurchaseDetail = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/PurchaseDetail/GetyId?id=${selectedPurchaseDetailId}&organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const PurchaseDetail = response.data[0];

          formik.setValues({
            productDefinitionId: PurchaseDetail.productDefinitionId || "",
            product3rdSchedule: PurchaseDetail.product3rdSchedule || false,
            itemCode: PurchaseDetail.itemCode || "",
            itemName: PurchaseDetail.itemName || "",
            fbrProductDesctiptionId: PurchaseDetail.fbrProductDesctiptionId || 0,
            fbrProductDesctiptionCode: PurchaseDetail.fbrProductDesctiptionCode || "",
            batchId: PurchaseDetail.batchId || 0,
            storeId: PurchaseDetail.storeId || 0,
            fbrMuId: PurchaseDetail.fbrMuId || 0,
            muCode: PurchaseDetail.muCode || "",
            quantity: PurchaseDetail.quantity || 0,
            productPrice: PurchaseDetail.productPrice || 0,
            amount: PurchaseDetail.amount || 0,
            fbrTaxRateId: PurchaseDetail.fbrTaxRateId || 0,
            taxRate: PurchaseDetail.taxRate || 0,
            taxAmount: PurchaseDetail.taxAmount || 0,
            furtherTax: PurchaseDetail.furtherTax || 0,
            furtherTaxAmount: PurchaseDetail.furtherTaxAmount || 0,
            valueExclPurchaseMainTax: PurchaseDetail.valueExclPurchaseMainTax || 0,
            discount: PurchaseDetail.discount || 0,
            discountAmount: PurchaseDetail.discountAmount || 0,
            taxCharged: PurchaseDetail.taxCharged || 0,
            valueIncPurchaseMainTax: PurchaseDetail.valueIncPurchaseMainTax || 0,
            measuringUnitsId: PurchaseDetail.measuringUnitsId || 0,
            productVariantMainId: PurchaseDetail.productVariantMainId || 0,
            purchaseMainId: PurchaseDetail.purchaseMainId || 0,
          });
        } else {
          console.error("Failed to load Product PurchaseDetail data.");
        }
      } catch (error) {
        console.error("Error fetching Product PurchaseDetail:", error.message);
      }
    };

    if (selectedPurchaseDetailId) {
      fetchPurchaseDetail();
    }
  }, [selectedPurchaseDetailId]);


  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditPurchaseDetailModal"
        ref={props.open}
      >
        Edit PurchaseDetail
      </button>

      <div
        className="modal fade"
        id="EditPurchaseDetailModal"
        tabIndex="-1"
        aria-labelledby="EditPurchaseDetailModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditPurchaseDetailModalLabel">
                Edit Product PurchaseDetail
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleModalClose}
                ref={props.close}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
            <form onSubmit={formik.handleSubmit}>
            <div className="row p-2">
                 
                 <div className="col-md-4 mt-3">
               <label htmlFor="productDefinitionId" className="form-label">
                 Product Definition ID
               </label>
               <input
                 type="number"
                 id="productDefinitionId"
                 name="productDefinitionId"
                 className={`form-control ${formik.touched.productDefinitionId && formik.errors.productDefinitionId ? 'is-invalid' : ''
                   }`}
                 value={formik.values.productDefinitionId}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.productDefinitionId && formik.errors.productDefinitionId && (
                 <div className="invalid-feedback">{formik.errors.productDefinitionId}</div>
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
                   checked={formik.values.product3rdSchedule === true}
                   onChange={() => formik.setFieldValue('product3rdSchedule', true)}
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
                   checked={formik.values.product3rdSchedule === false}
                   onChange={() => formik.setFieldValue('product3rdSchedule', false)}
                 />
                 <label htmlFor="product3rdScheduleFalse" className="form-check-label">
                   No
                 </label>
               </div>
               {formik.touched.product3rdSchedule && formik.errors.product3rdSchedule && (
                 <div className="text-danger mt-1">{formik.errors.product3rdSchedule}</div>
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
                 className={`form-control ${formik.touched.itemCode && formik.errors.itemCode ? 'is-invalid' : ''
                   }`}
                 value={formik.values.itemCode}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.itemCode && formik.errors.itemCode && (
                 <div className="invalid-feedback">{formik.errors.itemCode}</div>
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
                 className={`form-control ${formik.touched.itemName && formik.errors.itemName ? 'is-invalid' : ''
                   }`}
                 value={formik.values.itemName}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.itemName && formik.errors.itemName && (
                 <div className="invalid-feedback">{formik.errors.itemName}</div>
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
                 className={`form-control ${formik.touched.fbrProductDesctiptionId && formik.errors.fbrProductDesctiptionId ? 'is-invalid' : ''
                   }`}
                 value={formik.values.fbrProductDesctiptionId}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.fbrProductDesctiptionId && formik.errors.fbrProductDesctiptionId && (
                 <div className="invalid-feedback">{formik.errors.fbrProductDesctiptionId}</div>
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
                 className={`form-control ${formik.touched.fbrProductDesctiptionCode && formik.errors.fbrProductDesctiptionCode ? 'is-invalid' : ''
                   }`}
                 value={formik.values.fbrProductDesctiptionCode}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.fbrProductDesctiptionCode && formik.errors.fbrProductDesctiptionCode && (
                 <div className="invalid-feedback">{formik.errors.fbrProductDesctiptionCode}</div>
               )}
             </div>
 
             <div className="col-md-4 mt-3">
               <label htmlFor="batchId" className="form-label">Batch ID</label>
               <input
                 type="number"
                 id="batchId"
                 name="batchId"
                 className={`form-control ${formik.touched.batchId && formik.errors.batchId ? 'is-invalid' : ''
                   }`}
                 value={formik.values.batchId}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.batchId && formik.errors.batchId && (
                 <div className="invalid-feedback">{formik.errors.batchId}</div>
               )}
             </div>
 
             <div className="col-md-4 mt-3">
               <label htmlFor="storeId" className="form-label">Store ID</label>
               <input
                 type="number"
                 id="storeId"
                 name="storeId"
                 className={`form-control ${formik.touched.storeId && formik.errors.storeId ? 'is-invalid' : ''
                   }`}
                 value={formik.values.storeId}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.storeId && formik.errors.storeId && (
                 <div className="invalid-feedback">{formik.errors.storeId}</div>
               )}
             </div>
 
             <div className="col-md-4 mt-3">
               <label htmlFor="fbrMuId" className="form-label">FBR MU ID</label>
               <input
                 type="number"
                 id="fbrMuId"
                 name="fbrMuId"
                 className={`form-control ${formik.touched.fbrMuId && formik.errors.fbrMuId ? 'is-invalid' : ''
                   }`}
                 value={formik.values.fbrMuId}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.fbrMuId && formik.errors.fbrMuId && (
                 <div className="invalid-feedback">{formik.errors.fbrMuId}</div>
               )}
             </div>
 
             <div className="col-md-4 mt-3">
               <label htmlFor="muCode" className="form-label">MU Code</label>
               <input
                 type="text"
                 id="muCode"
                 name="muCode"
                 className={`form-control ${formik.touched.muCode && formik.errors.muCode ? 'is-invalid' : ''
                   }`}
                 value={formik.values.muCode}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.muCode && formik.errors.muCode && (
                 <div className="invalid-feedback">{formik.errors.muCode}</div>
               )}
             </div>
 
             <div className="col-md-4 mt-3">
               <label htmlFor="quantity" className="form-label">Quantity</label>
               <input
                 type="number"
                 id="quantity"
                 name="quantity"
                 className={`form-control ${formik.touched.quantity && formik.errors.quantity ? 'is-invalid' : ''
                   }`}
                 value={formik.values.quantity}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.quantity && formik.errors.quantity && (
                 <div className="invalid-feedback">{formik.errors.quantity}</div>
               )}
             </div>
 
             <div className="col-md-4 mt-3">
               <label htmlFor="productPrice" className="form-label">Product Price</label>
               <input
                 type="number"
                 id="productPrice"
                 name="productPrice"
                 className={`form-control ${formik.touched.productPrice && formik.errors.productPrice ? 'is-invalid' : ''
                   }`}
                 value={formik.values.productPrice}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.productPrice && formik.errors.productPrice && (
                 <div className="invalid-feedback">{formik.errors.productPrice}</div>
               )}
             </div>
 
             <div className="col-md-4 mt-3">
               <label htmlFor="amount" className="form-label">Amount</label>
               <input
                 type="number"
                 id="amount"
                 name="amount"
                 className={`form-control ${formik.touched.amount && formik.errors.amount ? 'is-invalid' : ''
                   }`}
                 value={formik.values.amount}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.amount && formik.errors.amount && (
                 <div className="invalid-feedback">{formik.errors.amount}</div>
               )}
             </div>
 
             <div className="col-md-4 mt-3">
               <label htmlFor="fbrTaxRateId" className="form-label">FBR Tax Rate ID</label>
               <input
                 type="number"
                 id="fbrTaxRateId"
                 name="fbrTaxRateId"
                 className={`form-control ${formik.touched.fbrTaxRateId && formik.errors.fbrTaxRateId ? 'is-invalid' : ''
                   }`}
                 value={formik.values.fbrTaxRateId}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.fbrTaxRateId && formik.errors.fbrTaxRateId && (
                 <div className="invalid-feedback">{formik.errors.fbrTaxRateId}</div>
               )}
             </div>
 
             <div className="col-md-4 mt-3">
               <label htmlFor="taxRate" className="form-label">Tax Rate</label>
               <input
                 type="number"
                 id="taxRate"
                 name="taxRate"
                 className={`form-control ${formik.touched.taxRate && formik.errors.taxRate ? 'is-invalid' : ''
                   }`}
                 value={formik.values.taxRate}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.taxRate && formik.errors.taxRate && (
                 <div className="invalid-feedback">{formik.errors.taxRate}</div>
               )}
             </div>
 
             <div className="col-md-4 mt-3">
               <label htmlFor="taxRate" className="form-label">Tax Rate</label>
               <input
                 type="number"
                 id="taxRate"
                 name="taxRate"
                 className={`form-control ${formik.touched.taxRate && formik.errors.taxRate ? 'is-invalid' : ''
                   }`}
                 value={formik.values.taxRate}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.taxRate && formik.errors.taxRate && (
                 <div className="invalid-feedback">{formik.errors.taxRate}</div>
               )}
             </div>
 
 
 
             <div className="col-md-4 mt-3">
               <label htmlFor="taxAmount" className="form-label">Tax Amount</label>
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
 
             <div className="col-md-4 mt-3">
               <label htmlFor="furtherTax" className="form-label">Further Tax</label>
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
 
             <div className="col-md-4 mt-3">
               <label htmlFor="furtherTaxAmount" className="form-label">Further Tax Amount</label>
               <input
                 type="number"
                 id="furtherTaxAmount"
                 name="furtherTaxAmount"
                 className={`form-control ${formik.touched.furtherTaxAmount && formik.errors.furtherTaxAmount ? 'is-invalid' : ''
                   }`}
                 value={formik.values.furtherTaxAmount}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.furtherTaxAmount && formik.errors.furtherTaxAmount && (
                 <div className="invalid-feedback">{formik.errors.furtherTaxAmount}</div>
               )}
             </div>
 
 
             <div className="col-md-4 mt-3">
               <label htmlFor="valueExclPurchaseMainTax" className="form-label">Value Excl. Purchase Main Tax</label>
               <input
                 type="number"
                 id="valueExclPurchaseMainTax"
                 name="valueExclPurchaseMainTax"
                 className={`form-control ${formik.touched.valueExclPurchaseMainTax && formik.errors.valueExclPurchaseMainTax ? 'is-invalid' : ''
                   }`}
                 value={formik.values.valueExclPurchaseMainTax}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.valueExclPurchaseMainTax && formik.errors.valueExclPurchaseMainTax && (
                 <div className="invalid-feedback">{formik.errors.valueExclPurchaseMainTax}</div>
               )}
             </div>
 
             <div className="col-md-4 mt-3">
               <label htmlFor="discount" className="form-label">Discount</label>
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
 
 
             <div className="col-md-4 mt-3">
               <label htmlFor="discountAmount" className="form-label">Discount Amount</label>
               <input
                 type="number"
                 id="discountAmount"
                 name="discountAmount"
                 className={`form-control ${formik.touched.discountAmount && formik.errors.discountAmount ? 'is-invalid' : ''
                   }`}
                 value={formik.values.discountAmount}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.discountAmount && formik.errors.discountAmount && (
                 <div className="invalid-feedback">{formik.errors.discountAmount}</div>
               )}
             </div>
 
             <div className="col-md-4 mt-3">
               <label htmlFor="taxCharged" className="form-label">Tax Charged</label>
               <input
                 type="number"
                 id="taxCharged"
                 name="taxCharged"
                 className={`form-control ${formik.touched.taxCharged && formik.errors.taxCharged ? 'is-invalid' : ''
                   }`}
                 value={formik.values.taxCharged}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.taxCharged && formik.errors.taxCharged && (
                 <div className="invalid-feedback">{formik.errors.taxCharged}</div>
               )}
             </div>
 
             <div className="col-md-4 mt-3">
               <label htmlFor="valueIncPurchaseMainTax" className="form-label">Value Including Purchase Main Tax</label>
               <input
                 type="number"
                 id="valueIncPurchaseMainTax"
                 name="valueIncPurchaseMainTax"
                 className={`form-control ${formik.touched.valueIncPurchaseMainTax && formik.errors.valueIncPurchaseMainTax ? 'is-invalid' : ''
                   }`}
                 value={formik.values.valueIncPurchaseMainTax}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
               />
               {formik.touched.valueIncPurchaseMainTax && formik.errors.valueIncPurchaseMainTax && (
                 <div className="invalid-feedback">{formik.errors.valueIncPurchaseMainTax}</div>
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
                 value={formik.values.measuringUnitsId}
                 onChange={(e) => {
                   formik.setFieldValue(
                     "measuringUnitsId",
                     Number(e.target.value)
                   );
                 }}
                 onBlur={formik.handleBlur}
               >
                 <option value={0}>Select Unit</option>
                 {measuringUnits.map((unit) => (
                   <option key={unit.id} value={unit.id}>
                     {unit.name}
                   </option>
                 ))}
               </select>
               {formik.touched.measuringUnitsId &&
                 formik.errors.measuringUnitsId && (
                   <div className="text-danger">
                     {formik.errors.measuringUnitsId}
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
                 value={formik.values.productVariantMainId}
                 onChange={(e) => {
                   formik.setFieldValue(
                     "productVariantMainId",
                     Number(e.target.value)
                   );
                 }}
                 onBlur={formik.handleBlur}
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
               {formik.touched.productVariantMainId &&
                 formik.errors.productVariantMainId ? (
                 <div className="text-danger">
                   {formik.errors.productVariantMainId}
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
                 value={formik.values.purchaseMainId}
                 onChange={(e) => {
                   formik.setFieldValue(
                     "purchaseMainId",
                     Number(e.target.value)
                   );
                 }}
                 onBlur={formik.handleBlur}
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
               {formik.touched.grnMainId &&
                 formik.errors.grnMainId ? (
                 <div className="text-danger">
                   {formik.errors.grnMainId}
                 </div>
               ) : null}
             </div>
 
 
                   <div className="d-flex justify-content-between modal-footer mt-2">
                     <button
                       type="button"
                       className="btn btn-secondary"
                       data-bs-dismiss="modal"
                       onClick={handleModalClose}
                     >
                       Close
                     </button>
                     <button
                       type="submit"
                       className="btn"
                       style={{ backgroundColor: "#ff9f43", color: "white" }}
                     >
                       Save changes
                     </button>
                   </div>
                 </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPurchaseDetail;
