import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import Buton from '../../../Compo/Buton';

function EditGRNMain() {
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      branchName: '',
      grnDetails: [
        {
          itemCode: '',
          itemName: ''
        }
      ]
    },
    validationSchema: Yup.object({
      branchName: Yup.string().required('Branch Name is required'),
      grnDetails: Yup.array().of(
        Yup.object().shape({
          itemCode: Yup.string().required('Item Code is required'),
          itemName: Yup.string().required('Item Name is required')
        })
      )
    }),
    onSubmit: async (values) => {
      try {
        const response = await ApiCall('/api/grn/update', 'POST', values);
        Swal.fire('Success', 'GRN updated successfully!', 'success');
      } catch (error) {
        Swal.fire('Error', 'Something went wrong!', 'error');
      }
    }
  });

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row mb-3'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Edit GRNMain</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your GRNMain Updation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate('/GRNMain/GRNMain')}>Move to GRN Main</Buton>
        </div>
      </div>
      
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Branch Name:</label>
          <input
            type='text'
            name='branchName'
            value={formik.values.branchName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.branchName && formik.errors.branchName ? (
            <div className='error'>{formik.errors.branchName}</div>
          ) : null}
        </div>
        
        <div>
          <h5>GRN Details</h5>
          {formik.values.grnDetails.map((detail, index) => (
            <div key={index}>
              <input
                type='text'
                name={`grnDetails[${index}].itemCode`}
                value={detail.itemCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Item Code'
              />
              <input
                type='text'
                name={`grnDetails[${index}].itemName`}
                value={detail.itemName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Item Name'
              />
              {formik.touched.grnDetails?.[index]?.itemCode && formik.errors.grnDetails?.[index]?.itemCode && (
                <div className='error'>{formik.errors.grnDetails[index].itemCode}</div>
              )}
              {formik.touched.grnDetails?.[index]?.itemName && formik.errors.grnDetails?.[index]?.itemName && (
                <div className='error'>{formik.errors.grnDetails[index].itemName}</div>
              )}
            </div>
          ))}
        </div>
        
        <button type='submit'>Update GRN</button>
      </form>
      
      <Footer />
    </div>
  );
}

export default EditGRNMain;


