import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall'; // Assuming you have an ApiCall function
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import CreateSupplier from "../Supplier/CreateSupplier";
import Buton from '../../../Compo/Buton';
import { Spinner } from "react-bootstrap";

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
        grnDetails,

      };
      console.log("Final Data Submitted:", finalData);


    },
  });

  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
  const [purchaseOrderDetails, setPurchaseOrderDetails] = useState(null);
const [loading, setLoading] = useState(true);

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
      console.log("API Response for selected Purchase Order:", response.data);

    } catch (error) {
      console.error("Error fetching Purchase Order details:", error);
    }finally {
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


  
  const grnFormik = useFormik({
    initialValues: {
      productDefinitionId: 0,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
 
      const grnDetail = {
        ...values,

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
        setSelectedProductVariantId(grnFormik.values.productDefinitionId);
      }
    }, [grnFormik.values.productDefinitionId]);
    
    console.log("Selected Product Variant ID:", selectedProductVariantId);
    

    

    const [poBalanceQuantity, setPoBalanceQuantity] = useState(null); 
    const [poQuantity, setPoQuantity] = useState(null); 
  
    const fetchPoBalanceQuantity = async () => {
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
    };
  
    useEffect(() => {
      fetchPoBalanceQuantity();
    }, [selectedProductVariantId]);
  
     
  


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
 {loading ? (
      <div className="d-flex justify-content-center">
        <div className="spinner-border " role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : (
       <span className="visually-hidden">Loading...</span>
    )}

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
          </div>
          )}


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
         Product Defination Id:
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
              {item.productName}
            </option>
          ))}
        </select>
            </div>
    <div className="col-md-4 mb-3">
              <label htmlFor="branchName" className="form-label">poQuantity</label>
              <input
                disabled
                className={`form-control "is-invalid" : ""}`}
                value={poQuantity}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="branchName" className="form-label">PO Balance Quantity</label>
              <input
                disabled
                className={`form-control ${formik.touched.branchName && formik.errors.branchName ? "is-invalid" : ""}`}
                value={poBalanceQuantity}
              />
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
  )}
  );
}

export default CreateGRNMain;
