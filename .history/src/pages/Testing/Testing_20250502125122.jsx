import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import ApiCall from '../../Apicall/ApiCall';

const Testing = () => {
  const [originalData, setOriginalData] = useState(null); // store full API response

  const formik = useFormik({
    initialValues: {
      poQuantity: 0,
      grnQuantity: 0,
    },
    onSubmit: async (values) => {
      if (!originalData) return;

      // merge only updated fields into original object
      const updatedData = {
        ...originalData,
        poQuantity: values.poQuantity,
        grnQuantity: values.grnQuantity,
      };

      console.log("Final Data to Send:", updatedData);

      // API call to save/update can go here
    },
  });

  const handleEdit = async () => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchseOrderDetails/GetByPurchaseOrderMainId?id=3018&organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response?.data && Array.isArray(response.data)) {
        const data = response.data[0];

        if (data) {
          setOriginalData(data); // store full response

          // only bind editable fields to Formik
          formik.setValues({
            poQuantity: data.poQuantity || 0,
            grnQuantity: data.grnQuantity || 0,
          });
        } else {
          Swal.fire({ icon: 'error', title: 'Oops...', text: 'No detail found!' });
        }
      } else {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Invalid response format!' });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch data!' });
    }
  };

  useEffect(() => {
    handleEdit(); // fetch on mount
  }, []);

  return (
    <div className="container mt-4">
      <h3>Edit PO Details</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label>PO Quantity</label>
          <input
            type="number"
            name="poQuantity"
            className="form-control"
            value={formik.values.poQuantity}
            onChange={formik.handleChange}
          />
        </div>

        <div className="mb-3">
          <label>GRN Quantity</label>
          <input
            type="number"
            name="grnQuantity"
            className="form-control"
            value={formik.values.grnQuantity}
            onChange={formik.handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success">Save Changes</button>
      </form>
    </div>
  );
};

export default Testing;
