import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';  
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import CreateSupplier from "../Supplier/CreateSupplier";
import Buton from '../../../Compo/Buton';

function CreateGRNMain() {

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
 const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({

  });


  const formik = useFormik({
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
      taxAmount:0,
      taxRate:0,
      taxStatus: false,
      discount:0,
    furtherTax:0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const selectedsupplierId= suppliers.find(
     (supplier) => supplier.id === values.supplierId
   );
      const finalData = {
        grnInvoiceDate: values.grnInvoiceDate,
        branchId: values.branchId,
        branchName: values.branchName,
        grnDocNo: values.grnDocNo,
        totalGRNVest: values.totalGRNVest,
        totalGRNValue: values.totalGRNValue,
        taxAmount: values.taxAmount,
        furtherTax: values.furtherTax,
        totalTaxCharged: values.totalTaxCharged,
        discount: values.discount,
        totalGRNAmount: values.totalGRNAmount,
        rvMainId: values.rvMainId,
        term: values.term,
        narration: values.narration,
        supplierNTNNo: values.supplierNTNNo,
        supplierSTRNo: values.supplierSTRNo,
        taxChargePlusAmount: values.taxChargePlusAmount,
        fillerStatus: values.fillerStatus,
        tax236Amount: values.tax236Amount,
        tax236Rate: values.tax236Rate,
        tax236Status: values.tax236Status,
        totalAmountWith236: values.totalAmountWith236,
        supplierId: values.supplierId,
        purchaseOrderMainId: values.purchaseOrderMainId,
        grnInvoiceNo: "string",
        organizationId: 1,
        companyId: 1,
        grnDetails,
        
      };
     
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/GRNMain/SaveGRNMain",
          method: "POST",
          data: finalData,
        });
    
        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "GRN saved successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
          formik.resetForm(); 
     
        } else {
          throw new Error("Failed to save the GRN");
        }
      } catch (error) {
        console.error("Error during GRN save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the GRN",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Close",
        });
      } finally {
        setIsLoading(false);
      }
      

    },
  });

  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
  const [purchaseOrderDetails, setPurchaseOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [poBalanceQuantity, setPoBalanceQuantity] = useState(null);
  const [poQuantity, setPoQuantity] = useState(null);

  const handlePurchaseOrderChange = async (e) => {
    const selectedId = Number(e.target.value);
    setSelectedPurchaseOrder(selectedId);
    setLoading(true);
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchaseOrderMain/GetyId?id=${selectedId}&organizationId=1&companyId=1`,
        method: "GET",
      });

      setPurchaseOrderDetails(response.data);
      console.log("API Response for BAVAVAVAVAVVA:", response.data);

    } catch (error) {
      console.error("Error fetching Purchase Order details:", error);
    } finally {
      setLoading(false);
    }
  };

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


  const [supplierId, setSupplierId] = useState(null);
  const [term, setterm] = useState(null);

  useEffect(() => {
    if (purchaseOrderDetails && Array.isArray(purchaseOrderDetails) && purchaseOrderDetails.length > 0) {
      const newSupplierId = purchaseOrderDetails[0].supplierId;
      const newTerm = purchaseOrderDetails[0].purchseOrderTermsPoTerms;
      setSupplierId(newSupplierId);
      setterm(newTerm);
      formik.setFieldValue("supplierId", newSupplierId);
      formik.setFieldValue("term", newTerm);
    }

  }, [purchaseOrderDetails]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (selectedPurchaseOrder) {
          const response = await ApiCall({
            url: `http://localhost:5022/api/v1/PurchseOrderDetails/GetDetailsByPurchaseOrderMainId/details-by-main-id/${selectedPurchaseOrder}`,
            method: "GET",
          });

          if (Array.isArray(response.data)) {
             
            
            setData(response.data);
          } else {
            console.error("Unexpected data format");
          }
        }
      } catch (err) {
        console.error("Unexpected data format", err);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPurchaseOrder]);


  const validationSchemagrn = Yup.object().shape({
    quantity: Yup.number()
    .required("Quantity is required")
    .min(1, "Quantity must be greater than 0")
    .test(
      "max-balance",
      `Quantity cannot be more than PO Balance Quantity`,
      function (value) {
        const { poBalanceQuantity } = this.options.context;
        return value <= poBalanceQuantity;
      }
    ),
  });

  const grnFormik = useFormik({
    initialValues: {
      productDefinitionId: 0,
      quantity: 0,
      productPrice: 0,
      amount: 0,
      discount: 0,
      discountAmount: 0,
      valueExclGRNTax: 0,
      taxRate: 0,              
      taxAmount: 0,
      valueIncGRNTax: 0,
      furtherTax: 0,            
      furtherTaxAmount: 0,
      product3rdSchedule: true,
      itemCode: "",
      itemName: "",
      fbrProductDesctiptionId: 0,
      fbrProductDesctiptionCode: "",
      batchId: 0,
      storeId: 0,
      fbrMuId: 0,
      muCode: "",
      taxCharged: 0,
      fbrTaxRateId: 0,
      measuringUnitsId:0,
      grnMainId:0,
    },
    validationSchema: validationSchemagrn,
    validateOnChange: false,
    validateOnBlur: false,
    context: { poQuantity, poBalanceQuantity },
    onSubmit: (values, { resetForm }) => {
      const selectedmeasuringUnitsName = measuringUnits.find(
        (unit) => unit.id === values.measuringUnitsId
      );
      const selectedProductVariantMain = productVariantMains.find(
        (variant) => variant.id === values.productVariantMainId
      );
      const selectedgrnInvoiceNo = GRNMain.find(
        (grn) => grn.id === values.grnMainId
      );

      const grnDetail = {
        ...values,
        measuringUnitsName: selectedmeasuringUnitsName?.name || '',
        productName: selectedProductVariantMain?.name || '',
        grnInvoiceNo: selectedgrnInvoiceNo?.name || '',
        companyId:1,
        organizationId:1,
      };
      addGrnDetail(grnDetail);
      resetForm();
    },
  });

  const [grnDetails, setGrnDetails] = useState([]);




  const addGrnDetail = (detail) => {
    setGrnDetails([...grnDetails, detail]);
  };

  const removeGrnDetail = (index) => {
    setGrnDetails(grnDetails.filter((_, i) => i !== index));
  };


  const [selectedProductVariantId, setSelectedProductVariantId] = useState(null);

  useEffect(() => {
    if (grnFormik.values.productDefinitionId) {
      setSelectedProductVariantId(Number(grnFormik.values.productDefinitionId));
    }
  }, [grnFormik.values.productDefinitionId]);
  

  useEffect(() => {
    const fetchProductPrice = async () => {
      if (selectedProductVariantId) {
        try {
          const response = await ApiCall({
            url: `http://localhost:5022/api/v1/ProductPrice/GetProductPriceByProductVariantMainIdQuery/GetByProductVariantMainId?id=${selectedProductVariantId}&organizationId=1&companyId=1`,
            method: 'GET',
          });
  
          if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
            const price = response.data[0].price;
            console.log('Product Price:', price);
  
            grnFormik.setFieldValue("productPrice", price);
          } else {
            console.warn('No price data found');
          }
        } catch (error) {
          console.error('Error fetching product price:', error);
        }
      }
    };
  
    fetchProductPrice();
  }, [selectedProductVariantId]);
  
  useEffect(() => {
    if (selectedProductVariantId) {
      grnFormik.setFieldValue("productVariantMainId", Number(selectedProductVariantId));
    }
  }, [selectedProductVariantId]);
  const fetchPoBalanceQuantity = async () => {
    setLoading2(true);
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchseOrderDetails/GetPoBalanceQuantityAndPoQuantity?purchaseOrderMainId=${selectedPurchaseOrder}&productVariantMainId=${selectedProductVariantId}`,
        method: "GET",
      });

      if (response?.data && response.data.length > 0) {
        const data = response.data[0]; // Assuming the response is an array 
        setPoBalanceQuantity(data.poBalanceQuantity);
        setPoQuantity(data.poQuantity);
        console.log("API Response:", response.data);
      } else {
        throw new Error("Failed to fetch PO balance quantity.");
      }
    } catch (error) {
      console.error("Error fetching PO balance quantity:", error);
      setPoBalanceQuantity(null);
      setPoQuantity(null);
    }
    finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    fetchPoBalanceQuantity();
  }, [selectedProductVariantId]);



  useEffect(() => {
  
    const quantity = Number(grnFormik.values.quantity) || 0;
    const productPrice = Number(grnFormik.values.productPrice) || 0;
    const discount = Number(grnFormik.values.discount) || 0;
    const taxRate = Number(grnFormik.values.taxRate) || 0;
    const furtherTax = Number(grnFormik.values.furtherTax) || 0;

    // Calculate the base amount (Quantity * Product Price)
    const calculatedAmount = quantity * productPrice;

    // Calculate the discount amount
    const calculatedDiscountAmount = calculatedAmount * (discount / 100);

    // Calculate value excluding GRN Tax after discount deduction
    const calculatedValueExclGRNTax = calculatedAmount - calculatedDiscountAmount;

    // Calculate tax amount as taxRate% of valueExclGRNTax
    const calculatedTaxAmount = calculatedValueExclGRNTax * (taxRate / 100);

    // Calculate the value including GRN tax as Amount + Tax Amount
    const calculatedValueIncGRNTax = calculatedAmount + calculatedTaxAmount;

    // Calculate furtherTaxAmount based on the base amount and furtherTax percentage
    const calculatedFurtherTaxAmount = calculatedAmount * (furtherTax / 100);

    // Update the form values (only update if the value is different to avoid unnecessary re-renders)
    if (calculatedAmount !== grnFormik.values.amount) {
      grnFormik.setFieldValue("amount", calculatedAmount, false);
    }
    if (calculatedDiscountAmount !== grnFormik.values.discountAmount) {
      grnFormik.setFieldValue("discountAmount", calculatedDiscountAmount, false);
    }
    if (calculatedValueExclGRNTax !== grnFormik.values.valueExclGRNTax) {
      grnFormik.setFieldValue("valueExclGRNTax", calculatedValueExclGRNTax, false);
    }
    if (calculatedTaxAmount !== grnFormik.values.taxAmount) {
      grnFormik.setFieldValue("taxAmount", calculatedTaxAmount, false);
    }
    if (calculatedValueIncGRNTax !== grnFormik.values.valueIncGRNTax) {
      grnFormik.setFieldValue("valueIncGRNTax", calculatedValueIncGRNTax, false);
    }
    if (calculatedFurtherTaxAmount !== grnFormik.values.furtherTaxAmount) {
      grnFormik.setFieldValue("furtherTaxAmount", calculatedFurtherTaxAmount, false);
    }
  }, [
    grnFormik.values.quantity,
    grnFormik.values.discount,
    grnFormik.values.productPrice,
    grnFormik.values.taxRate,
    grnFormik.values.furtherTax,
  ]);

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




  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row mb-4'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Create GRNMain</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your GRNMain creation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate("/GRNMain/GRNMain")}>Move to GRN Main</Buton>
        </div>
      </div>


      <div style={{ backgroundColor: 'white', padding: 10 ,boxShadow: "0 0 4px 4px rgba(206, 204, 204, 0.5)"  }}>


        <form onSubmit={formik.handleSubmit}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
              <div className="spinner-border " role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (

            <div className="row ">

              <div className="col-md-2 mt-2">
                <label htmlFor="purchaseOrderMainId" className="form-label">
                  Purchase Order Main
                </label>
                <select
                  id="purchaseOrderMainId"
                  name="purchaseOrderMainId"
                  className="form-control"
                  value={formik.values.purchaseOrderMainId}
                  onChange={(e) => {
                    formik.setFieldValue("purchaseOrderMainId", Number(e.target.value));
                    handlePurchaseOrderChange(e);
                  }}
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

              <div className=" col-md-2 mt-2 d-flex">
                <div className="col-10   ">
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
                <div style={{ display: "flex", alignItems: "center", marginTop: 10, marginLeft: 5, }}>
                <button style={buttonStyle} type="button" onClick={() => createRef.current.click()} >+</button>
                
              </div>
              </div>
        

              <div className="col-md-2 mb-4">
                <label htmlFor="term" className="form-label">Term</label>
                <input
                  type="text"
                  id="term"
                  name="term"
                  className={`form-control ${formik.touched.term && formik.errors.term ? "is-invalid" : ""}`}
                  value={formik.values.term}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled
                />
                {formik.touched.term && formik.errors.term && (
                  <div className="invalid-feedback">{formik.errors.term}</div>
                )}
                 
              </div>

              <div className="col-md-2 mb-4">
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
  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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
  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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
  <div className="col-md-2 mb-4">
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

  

  <div className="col-md-2 mb-4">
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

  <div className="col-md-2 mb-4">
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
 



            </div>
          )}


   
        </form>


      </div>

      <div style={{ backgroundColor: 'white', padding: 10,  }}>
        <form onSubmit={grnFormik.handleSubmit}>
          {loading2 ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
              <div className="spinner-border " role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
        

            <div className="row p-2" style={{ boxShadow: "0 0 4px 4px rgba(206, 204, 204, 0.5)"}}>

<h4 className='mt-3'>Add GRN Details:</h4>
<div className="col-md-2 mb-4">
  <label className="form-label">
    Product Definition Id:
  </label>
  <select
    name="productDefinitionId"
    onChange={(e) =>
      grnFormik.setFieldValue("productDefinitionId", Number(e.target.value))
    }
    onBlur={grnFormik.handleBlur}
    value={grnFormik.values.productDefinitionId}
    className="form-control"
  >
    <option value="" label="Select a variant" />
    {data.map((item) => (
      <option
        key={item.productVariantMainId}
        value={item.productVariantMainId}
      >
        {item.productName}
      </option>
    ))}
  </select>
  {grnFormik.touched.productDefinitionId &&
    grnFormik.errors.productDefinitionId && (
      <div className="text-danger">
        {grnFormik.errors.productDefinitionId}
      </div>
    )}
</div>

              <div className="col-md-1 mb-4">
                <label htmlFor="branchName" className="form-label">poQuantity</label>
                <input
                  disabled
                  className={`form-control "is-invalid" : ""}`}
                  value={poQuantity}
                />
              </div>

              <div className="col-md-1 mb-4">
                <label htmlFor="branchName" className="form-label">Balance Qnt</label>
                <input
                  disabled
                  className={`form-control ${formik.touched.branchName && formik.errors.branchName ? "is-invalid" : ""}`}
                  value={poBalanceQuantity}
                />
              </div>

              <div className="col-md-1 mb-4">
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
              <div className="col-md-1 mb-4">
                <label htmlFor="productPrice" className="form-label">Product Price</label>
                <input
                  type="number"
                  id="productPrice"
                  name="productPrice"
                  className="form-control"
                  disabled
                  value={grnFormik.values.productPrice}

                />
              </div>
              <div className="col-md-1 mb-4">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="form-control"
                  value={grnFormik.values.amount}
                  readOnly
                />
              </div>

     
              <div className="col-md-1 mb-4">
                <label htmlFor="discount" className="form-label">Discount (%)</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  className="form-control"
                  value={grnFormik.values.discount}
                  onChange={grnFormik.handleChange}
                  onBlur={grnFormik.handleBlur}
                />
                {grnFormik.touched.discount && grnFormik.errors.discount && (
                  <div className="text-danger">{grnFormik.errors.discount}</div>
                )}
              </div>

    
              <div className="col-md-1 mb-4">
                <label htmlFor="discountAmount" className="form-label">Dis Amount</label>
                <input
                  type="number"
                  id="discountAmount"
                  name="discountAmount"
                  className="form-control"
                  value={grnFormik.values.discountAmount}
                  readOnly
                  disabled
                />
              </div>

     
              <div className="col-md-1 mb-4">
                <label htmlFor="valueExclGRNTax" className="form-label">VEGT</label>
                <input
                  type="number"
                  id="valueExclGRNTax"
                  name="valueExclGRNTax"
                  className="form-control"
                  value={grnFormik.values.valueExclGRNTax}
                  readOnly
                  disabled
                />
              </div>
              <div className="col-md-1 mb-4">
                <label htmlFor="taxRate" className="form-label">Tax Rate (%)</label>
                <input
                  type="number"
                  id="taxRate"
                  name="taxRate"
                  className="form-control"
                  value={grnFormik.values.taxRate}

                />
              </div>

         
              <div className="col-md-1 mb-4">
                <label htmlFor="taxAmount" className="form-label">Tax Amount</label>
                <input
                  type="number"
                  id="taxAmount"
                  name="taxAmount"
                  className="form-control"
                  value={grnFormik.values.taxAmount}
                  readOnly
                  disabled
                />
              </div>
              <div className="col-md-1 mb-4">
                <label htmlFor="valueIncGRNTax" className="form-label">VIGT</label>
                <input
                  type="number"
                  id="valueIncGRNTax"
                  name="valueIncGRNTax"
                  className="form-control"
                  value={grnFormik.values.valueIncGRNTax}
                  readOnly
                  disabled
                />
              </div>
              <div className="col-md-1 mb-4">
                <label htmlFor="furtherTax" className="form-label">Further Tax (%)</label>
                <input
                  type="number"
                  id="furtherTax"
                  name="furtherTax"
                  className="form-control"
                  value={grnFormik.values.furtherTax}
                  onChange={grnFormik.handleChange}
                  onBlur={grnFormik.handleBlur}
                />
                {grnFormik.touched.furtherTax && grnFormik.errors.furtherTax && (
                  <div className="text-danger">{grnFormik.errors.furtherTax}</div>
                )}
              </div>

      
              <div className="col-md-1 mb-4">
                <label htmlFor="furtherTaxAmount" className="form-label">F.Tax Amount</label>
                <input
                  type="number"
                  id="furtherTaxAmount"
                  name="furtherTaxAmount"
                  className="form-control"
                  value={grnFormik.values.furtherTaxAmount}
                  readOnly
                  disabled
                />
              </div>
              <div className="col-md-1 mb-4">
              <label htmlFor="fbrTaxRateId" className="form-label">FBR Tax ID</label>
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

            <div className="col-md-1 mb-4">
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

              <div className="col-md-1 mb-4">
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


              <div className="col-md-1 mb-4">
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

              <div className="col-md-1 mb-4">
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

              <div className="col-md-1 mb-4">
                <label htmlFor="fbrProductDesctiptionId" className="form-label"> P.Description ID</label>
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

              <div className="col-md-1 mb-4">
                <label htmlFor="fbrProductDesctiptionCode" className="form-label">FBR P.Code</label>
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

              <div className="col-md-1 mb-4">
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

              <div className="col-md-1 mb-4">
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

              <div className="col-md-1 mb-4">
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

              <div className="col-md-1 mb-4">
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

              <div className="col-md-2">
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

            <div className="col-md-2">
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

            <div className="col-md-2">
              <label
                htmlFor="productVariantMainId"
                className="form-label"
              >
                Product Variant MainId
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
















              <div>
                <button
                  type="submit"
                  className="btn btn-success mt-3 col-1 "

                >
                  Add Detail
                </button>
              </div>
            </div>

          )}
 

{grnDetails.length > 0 && (
  <div className="table-responsive mt-4">
    <h5>Selected Details</h5>
    <table className="table table-bordered table-hover table-striped">
      <thead className="thead-dark">
        <tr>
          <th>Product Def Id</th>
          <th>Quantity</th>
          <th>Product Price</th>
          <th>Discount (%)</th>
          <th>Discount Amount</th>
          <th>Tax (%)</th>
          <th>Tax Amount</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {grnDetails.map((detail, index) => (
          <tr key={index}>
            <td>{detail.productDefinitionId}</td>
            <td>{detail.quantity}</td>
            <td>{detail.productPrice}</td>
            <td>{detail.discount}</td>
            <td>{detail.discountAmount}</td>
            <td>{detail.taxRate}</td>
            <td>{detail.taxAmount}</td>
            <td>{detail.amount}</td>
            
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
        {/* Totals row */}
        <tr className="table-primary font-weight-bold">
          <td>Total</td>
          <td>
            {grnDetails.reduce(
              (acc, cur) => acc + Number(cur.quantity || 0),
              0
            )}
          </td>
          <td>
            {grnDetails.reduce(
              (acc, cur) => acc + Number(cur.productPrice || 0),
              0
            )}
          </td>
          <td>
            {grnDetails.reduce(
              (acc, cur) => acc + Number(cur.discount || 0),
              0
            )}
          </td>
          <td>
            {grnDetails.reduce(
              (acc, cur) => acc + Number(cur.discountAmount || 0),
              0
            )}
          </td>
          <td>
            {grnDetails.reduce(
              (acc, cur) => acc + Number(cur.taxRate || 0),
              0
            )}
          </td>
          <td>
            {grnDetails.reduce(
              (acc, cur) => acc + Number(cur.taxAmount || 0),
              0
            )}
          </td>
          <td>
            {grnDetails.reduce(
              (acc, cur) => acc + Number(cur.amount || 0),
              0
            )}
          </td>
          <td />
        </tr>
      </tbody>
    </table>
  </div>
)}

        </form>

        
        <div className="text-end  pt-5 pb-3 mb-1 ">
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

export default CreateGRNMain;
