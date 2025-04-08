import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Footer from '../../../Compo/Footer';
import Buton from '../../../Compo/Buton';

function EditGRNMain() {
  const navigate = useNavigate();

   

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

      <form onSubmit={grnFormik.handleSubmit} style={{ backgroundColor: 'white', padding: 20, border: "1px solid #d6d4d4", marginBottom: 20 }}>
        <h4>GRN Main Form</h4>
        <div className='row'>
 
     
 

  

</div>

        <button type='submit' className='btn btn-success'>Submit</button>
      </form>

    

      {editingDetail && (
        <div style={{ backgroundColor: 'white', padding: 20, marginTop: 20, border: "1px solid #d6d4d4" }}>
          <h4>Edit GRN Detail</h4>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Item Code</label>
              <input
                type='text'
                className='form-control'
                name='itemCode'
                onChange={formik.handleChange}
                value={formik.values.itemCode}
              />
              {formik.errors.itemCode && <div className='text-danger'>{formik.errors.itemCode}</div>}
            </div>

            <div className='mb-3'>
              <label className='form-label'>Item Name</label>
              <input
                type='text'
                className='form-control'
                name='itemName'
                onChange={formik.handleChange}
                value={formik.values.itemName}
              />
              {formik.errors.itemName && <div className='text-danger'>{formik.errors.itemName}</div>}
            </div>

            <button type='submit' className='btn btn-success'>Update</button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default EditGRNMain;

