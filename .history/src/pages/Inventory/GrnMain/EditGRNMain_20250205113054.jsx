import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import Buton from '../../../Compo/Buton';

function EditGRNMain() {
  const navigate = useNavigate();

    const addGrnDetail = (detail) => {
       setGrnDetails([...grnDetails, detail]);
     };
   
     const removeGrnDetail = (index) => {
       setGrnDetails(grnDetails.filter((_, i) => i !== index));
     };
   
     const grnFormik = useFormik({
       initialValues: {
         taxAmount: 0,
         furtherTax: 0,
         discount: 0,
         productDefinitionId: 0,
         product3rdSchedule: true,
         itemCode: "",
         itemName: "",
         fbrProductDesctiptionId: 0,
         fbrProductDesctiptionCode: "",
         batchId: 0,
         storeId: 0,
         fbrMuId: 0,
         muCode: "",
         quantity: 0,
         productPrice: 0,
         amount: 0,
         fbrTaxRateId: 0,
         taxRate: 0,
         furtherTaxAmount: 0,
         valueExclGRNTax: 0,
         discountAmount: 0,
         taxCharged: 0,
         valueIncGRNTax: 0,
         measuringUnitsId: 0,
         productVariantMainId: 0,
       },
       validationSchema,
       onSubmit: (values, { resetForm }) => {
     
         const grnDetail = {
           ...values,
           organizationId: 1,
           companyId: 1,
           measuringUnitsName: selectedmeasuringUnitsName?.name || null,
           productName: selectedProductVariantMain?.name || null,
           grnInvoiceNo: selectedgrnInvoiceNo?.name || null,
   
         };
         addGrnDetail(grnDetail);
         resetForm();
       },
     });
   

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
      <Footer />
    </div>
  );
}

export default EditGRNMain;

