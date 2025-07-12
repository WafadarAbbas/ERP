import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import ApiCall from '../../Apicall/ApiCall';

const Testing = () => {
  const [purchaseOrderDetails, setPurchaseOrderDetails] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchpurchaseOrderDetails = async (POMain) => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchseOrderDetails/GetByPurchaseOrderMainId?id=${POMain}&organizationId=1&companyId=1`,
        method: 'GET',
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
            measuringUnitsName: measuringUnitsMeasuringUnitsName ?? '',
            productName: productVariantMainsProductName ?? '',
            poNumber: purchaseOrderMainsPoNumber ?? '',
          })
        );

        setPurchaseOrderDetails(modifiedData);
      } else {
        setPurchaseOrderDetails([]);
      }
    } catch (error) {
      console.error('Error fetching GRN details:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchseOrderDetails/GetByPurchaseOrderMainId?id=${id}&organizationId=1&companyId=1`,
        method: 'GET',
      });

      if (response?.data && Array.isArray(response.data)) {
        const data = response.data[0];

        if (data) {
          setEditingId(id); // store the current editing ID

          PurchaseOrderFormik.setValues({
            poQuantity: data.poQuantity || 0,
            grnQuantity: data.grnQuantity || 0,
            poBalanceQuantity: data.poBalanceQuantity || 0,
            grnBatchId: data.grnBatchId || 0,
            grnStoreId: data.grnStoreId || 0,
            measuringUnitsId: data.measuringUnitsId || '',
            productVariantMainId: data.productVariantMainId || '',
            purchaseOrderMainId: data.purchaseOrderMainId || '',
id:data.id||0

            "id": 0,
            "poQuantity": 0,
            "grnQuantity": 0,
            "poBalanceQuantity": 0,
            "grnBatchId": 0,
            "grnStoreId": 0,
            "productVariantMainId": 0,
            "purchaseOrderMainId": 0,
            "measuringUnitsId": 0,
            "productName": "string",
            "measuringUnitsName": "string",
            "poNumber": "string",
            "organizationId": 0,
            "companyId": 0
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No detail found for this ID!',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid response format!',
        });
      }
    } catch (error) {
      console.error('Error fetching details:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch the data!',
      });
    }
  };

  const PurchaseOrderFormik = useFormik({
    initialValues: {
      poQuantity: '',
      grnQuantity: '',
      poBalanceQuantity: '',
      grnBatchId: '',
      grnStoreId: '',
      measuringUnitsId: '',
      productVariantMainId: '',
      purchaseOrderMainId: '',
    },
    onSubmit: async (values) => {
    console.log(values);
    
    },
  });

  useEffect(() => {
    const defaultPoMainId = 3018;
    fetchpurchaseOrderDetails(defaultPoMainId);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Purchase Order Details</h2>

      {purchaseOrderDetails.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Measuring Unit</th>
              <th>PO Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrderDetails.map((item, index) => (
              <tr key={item.id || index}>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td>{item.measuringUnitsName}</td>
                <td>{item.poQuantity}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(item.purchaseOrderMainId)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No purchase order details found.</p>
      )}

      {editingId && (
        <form onSubmit={PurchaseOrderFormik.handleSubmit} className="mt-4 border p-3">
          <h4>Edit PO Quantity</h4>
          <div className="form-group">
            <label htmlFor="poQuantity">PO Quantity</label>
            <input
              type="number"
              id="poQuantity"
              name="poQuantity"
              className="form-control"
              value={PurchaseOrderFormik.values.poQuantity}
              onChange={PurchaseOrderFormik.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default Testing;
