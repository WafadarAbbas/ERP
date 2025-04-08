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

    const [grnDetails, setGrnDetails] = useState([]);
    const addGrnDetail = (detail) => {
       setGrnDetails([...grnDetails, detail]);
     };
   
     const removeGrnDetail = (index) => {
       setGrnDetails(grnDetails.filter((_, i) => i !== index));
     };
     const validationSchema = Yup.object({

     });
   
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

 
     const formik = useFormik({
       initialValues: {
       },
       validationSchema: validationSchema,
       onSubmit: async (values) => {
         const finalData = {
           grnInvoiceDate: values.grnInvoiceDate,
           branchId: values.branchId,
           branchName: values.branchName,
           organizationId: 1,
           companyId: 1,
           grnDetails,
         };
         console.log("Final Data Submitted:", finalData);
     
   
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

      <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>
        <h5 className="mt-1 ">Add GRN Details :</h5>
        <form onSubmit={grnFormik.handleSubmit}>
          <div className="row border p-2">


         


            <div className="col-md-4 mb-3">
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

            <div className="col-md-4 mb-3">
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
 
           
         




            <div>
              <button
                type="submit"
                className="btn btn-success mt-3 col-2 "

              >
                Add Detail
              </button>
            </div>
          </div>

          {grnDetails.length > 0 && (
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>Action</th>
                  </tr>

                </thead>
                <tbody>
                  {grnDetails.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.itemCode}</td>
                      <td>{detail.itemName}</td>
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
                </tbody>
              </table>
            </div>
          )}
        
        </form>


        {/* --------------------------------------- */}
        <br />
        <br />
        <form onSubmit={formik.handleSubmit}>

          <div className="row ">
       
            <div className="col-md-4 mb-3">
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


      <Footer />
    </div>
  );
}

export default EditGRNMain;

