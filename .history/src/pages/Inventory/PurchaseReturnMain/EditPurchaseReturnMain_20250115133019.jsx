

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Buton from '../../../Compo/Buton';
function EditPurchaseReturnMain() {

  const location = useLocation();
  const PurchaseReturnMainId = location.state?.id;
  const navigate = useNavigate();


  console.log(PurchaseReturnMainId);



  const fetchpurchaseDetails = async (PurchaseReturnMainId) => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchaseDetail/GetByPurchaseReturnMainId?id=${PurchaseReturnMainId}&organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response?.data) {

        const modifiedData = response.data.map(
          ({
            measuringUnitsMeasuringUnitsName,
            productVariantMainProductName,
            ...rest
          }) => ({
            ...rest,
            measuringUnitsName: measuringUnitsMeasuringUnitsName ?? "",
            productName: productVariantMainProductName ?? "",
          })
        );

        setpurchseDetails(modifiedData);
      } else {
        setpurchseDetails([]);
      }
    } catch (error) {
      console.error("Error fetching GRN details:", error);
    }
  };


  useEffect(() => {
    if (PurchaseReturnMainId) {
      fetchpurchaseDetails(PurchaseReturnMainId);
    }
  }, [PurchaseReturnMainId]);

  useEffect(() => {
    const fetchPurchaseReturnMain = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/PurchaseReturnMain/GetyId?id=${PurchaseReturnMainId}&organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const purchase = response.data[0];
          formik.setValues({
            PurchaseReturnMainInvoiceDate: purchase.PurchaseReturnMainInvoiceDate || "",
            branchId: purchase.branchId || "",
            branchName: purchase.branchName || "",
            PurchaseReturnMainDocNo: purchase.PurchaseReturnMainDocNo || "",
            totalPurchaseReturnMainVest: purchase.totalPurchaseReturnMainVest || 0,
            totalPurchaseReturnMainValue: purchase.totalPurchaseReturnMainValue || 0,
            taxAmount: purchase.taxAmount || 0,
            furtherTax: purchase.furtherTax || 0,
            totalTaxCharged: purchase.totalTaxCharged || 0,
            discount: purchase.discount || 0,
            totalPurchaseReturnMainAmount: purchase.totalPurchaseReturnMainAmount || 0,
            rvMainId: purchase.rvMainId || 0,
            term: purchase.term || "",
            narration: purchase.narration || "",
            supplierNTNNo: purchase.supplierNTNNo || "",
            supplierSTRNo: purchase.supplierSTRNo || "",
            taxChargePlusAmount: purchase.taxChargePlusAmount || 0,
            fillerStatus: purchase.fillerStatus !== undefined ? purchase.fillerStatus : false,
            tax236Amount: purchase.tax236Amount || 0,
            tax236Rate: purchase.tax236Rate || 0,
            tax236Status: purchase.tax236Status !== undefined ? purchase.tax236Status : true,
            totalAmountWith236: purchase.totalAmountWith236 || 0,
            grnMainId: purchase.grnMainId || 0,
            supplierId: purchase.supplierId || 0,



          });
        } else {
          console.error("Failed to load po Main data.");
        }
      } catch (error) {
        console.error("Error fetching po Main:", error.message);
      }
    };

    if (PurchaseReturnMainId) {
      fetchPurchaseReturnMain();
    }
  }, [PurchaseReturnMainId]);

 


  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row mb-3'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Create Purchase Main</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Purchase Main creation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate("/PurchaseReturnMain/PurchaseReturnMain")}>Move to Purchase Main</Buton>
        </div>
      </div>


      <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>
        <h5 className="mt-1 ">Add Purchase Details :</h5>
        


        {/* --------------------------------------- */}
        <br />
        <br />
        <form onSubmit={formik.handleSubmit}>
          

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

export default EditPurchaseReturnMain;
