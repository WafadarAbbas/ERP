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
         itemCode: "",
         itemName: "",
       },
       validationSchema,
       onSubmit: (values, { resetForm }) => {
     
         const grnDetail = {
           ...values,
           organizationId: 1,
           companyId: 1,
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

