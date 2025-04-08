import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup';
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import Buton from '../../../Compo/Buton';

function EditGRNMain() {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    grnDetails: [{
      itemCode: "",
      itemName: ""
    }]
  });

  const validationSchema = Yup.object({
    grnDetails: Yup.array().of(
      Yup.object({
        itemCode: Yup.string().required("Item Code is required"),
        itemName: Yup.string().required("Item Name is required"),
      })
    )
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await ApiCall("PUT", "/api/grn/update", values);
        Swal.fire("Success", "GRN updated successfully", "success");
        navigate("/GRNMain/GRNMain");
      } catch (error) {
        Swal.fire("Error", "Failed to update GRN", "error");
      }
    },
  });

  useEffect(() => {
    async function fetchGRNData() {
      try {
        const response = await ApiCall("GET", "/api/grn/details");
        setInitialValues(response.data);
      } catch (error) {
        console.error("Error fetching GRN data", error);
      }
    }
    fetchGRNData();
  }, []);

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
      <form onSubmit={formik.handleSubmit}>
        {formik.values.grnDetails.map((detail, index) => (
          <div key={index} className="mb-3">
            <label>Item Code</label>
            <input
              type="text"
              name={`grnDetails[${index}].itemCode`}
              value={formik.values.grnDetails[index].itemCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
            {formik.touched.grnDetails?.[index]?.itemCode && formik.errors.grnDetails?.[index]?.itemCode && (
              <div className="text-danger">{formik.errors.grnDetails[index].itemCode}</div>
            )}
            
            <label>Item Name</label>
            <input
              type="text"
              name={`grnDetails[${index}].itemName`}
              value={formik.values.grnDetails[index].itemName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
            {formik.touched.grnDetails?.[index]?.itemName && formik.errors.grnDetails?.[index]?.itemName && (
              <div className="text-danger">{formik.errors.grnDetails[index].itemName}</div>
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Update GRN</button>
      </form>
      <Footer />
    </div>
  );
}

export default EditGRNMain;


