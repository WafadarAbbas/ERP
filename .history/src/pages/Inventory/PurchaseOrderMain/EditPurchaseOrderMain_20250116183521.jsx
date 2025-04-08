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
      
      </div>

      <Footer />
    </div>
  );
}

export default EditPurchaseOrderMain;