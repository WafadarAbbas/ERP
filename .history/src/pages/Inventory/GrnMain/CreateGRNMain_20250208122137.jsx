import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall'; // Assuming you have an ApiCall function
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import CreateSupplier from "../Supplier/CreateSupplier";
import Buton from '../../../Compo/Buton';

function CreateGRNMain() {

  const createRef = useRef(null);
  const refClose = useRef(null);

  const buttonStyle = {
    backgroundColor: "#e3e1e1",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#ccc",
    borderRadius: 10,
    fontWeight: 'bold',
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


  const validationSchema = Yup.object({

  });


  const formik = useFormik({
    initialValues: {

      purchaseOrderMainId: 0,
      grnInvoiceDate: "",
      branchId: 0,
      branchName: "",
      grnDocNo: "",
      totalGRNVest: 0,
      totalGRNValue: 0,
      totalTaxCharged: 0,
      totalGRNAmount: 0,
      rvMainId: 0,

      narration: "",
      supplierNTNNo: "",
      supplierSTRNo: "",
      taxChargePlusAmount: 0,
      fillerStatus: false,
      tax236Amount: 0,
      tax236Rate: 0,
      tax236Status: false,
      totalAmountWith236: 0,


    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const finalData = {
        ...values,
        organizationId: 1,
        companyId: 1,

      };
      console.log("Final Data Submitted:", finalData);


    },
  });

  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
  const [purchaseOrderDetails, setPurchaseOrderDetails] = useState(null);

  const handlePurchaseOrderChange = async (e) => {
    const selectedId = Number(e.target.value);
    setSelectedPurchaseOrder(selectedId);

    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchaseOrderMain/GetyId?id=${selectedId}&organizationId=1&companyId=1`,
        method: "GET",
      });

      setPurchaseOrderDetails(response.data);
      console.log("API Response for selected Purchase Order:", response.data);

    } catch (error) {
      console.error("Error fetching Purchase Order details:", error);
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
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/PurchseOrderDetails/GetDetailsByPurchaseOrderMainId/details-by-main-id/${selectedId}",
          method: "GET",
        });

      

        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Unexpected data format");
        }
      } catch (err) {
        console.error("Unexpected data format", err);
      }  
    };

    fetchData();
  }, []);


  
  const grnFormik = useFormik({
    initialValues: {
      productDefinitionId: 0,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
 
      const grnDetail = {
        ...values,

      };
      
      resetForm();
    },
  });



  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row mb-3'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Create GRNMain</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your GRNMain creation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate("/GRNMain/GRNMain")}>Move to GRN Main</Buton>
        </div>
      </div>


      <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>


        <form onSubmit={formik.handleSubmit}>

          <div className="row ">

            <div className="col-md-4 mt-2">
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

            <div className=" col-md-4 d-flex">
              <div className="col-10 mt-1 ">
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

      <div>
      <form onSubmit={grnFormik.handleSubmit}>
          <div className="row border p-2">


            <div className="col-md-4 mb-3">
            <label className="block text-sm font-medium mb-1">
          Select Product Variant:
        </label>
        <select
          name="productDefinitionId"
          onChange={grnFormik.handleChange}
          onBlur={grnFormik.handleBlur}
          value={grnFormik.values.productDefinitionId}
          className="border p-2 rounded w-full"
        >
          <option value="" label="Select a variant" />
          {data.map((item) => (
            <option key={item.productVariantMainId} value={item.productVariantMainId}>
              {item.productVariantMainId}
            </option>
          ))}
        </select>
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

      
        </form>

      </div>

      <Footer />
      <CreateSupplier open={createRef} onclick={fetchSuppliers} />
    </div>
  );
}

export default CreateGRNMain;
