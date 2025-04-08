import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

const Testing2 = () => {
  const [purchseOrderDetails, setPurchseOrderDetails] = useState([
    {
      id: 1,
      poQuantity: 10,
      grnQuantity: 5,
      poBalanceQuantity: 5,
      grnBatchId: "Batch-001",
      grnStoreId: "Store-001",
    },
    {
      id: 2,
      poQuantity: 20,
      grnQuantity: 15,
      poBalanceQuantity: 5,
      grnBatchId: "Batch-002",
      grnStoreId: "Store-002",
    },
    {
      id: 3,
      poQuantity: 50,
      grnQuantity: 25,
      poBalanceQuantity: 25,
      grnBatchId: "Batch-003",
      grnStoreId: "Store-003",
    },
  ]);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleEdit = (row) => {
    setSelectedRow(row);
  };

  const handleRowUpdate = (values) => {
    const updatedDetails = purchseOrderDetails.map((detail) =>
      detail.id === values.id ? { ...values } : detail
    );
    setPurchseOrderDetails(updatedDetails);
    setSelectedRow(null); // Clear the selected row after update
  };

  const handleFinalSubmit = (values) => {
    const finalData = {
      customerName: values.customerName,
      purchseOrderDetails: purchseOrderDetails.map(({ id, ...rest }) => rest), // Remove IDs
    };

    console.log("Submitted Data:", finalData);

    // Example: Replace console.log with an API call
    // axios.post('/api/endpoint', finalData).then(response => console.log(response));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Purchase Order Details</h1>

      {/* Table Display */}
      <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">PO Quantity</th>
            <th className="border border-gray-300 px-4 py-2">GRN Quantity</th>
            <th className="border border-gray-300 px-4 py-2">PO Balance Quantity</th>
            <th className="border border-gray-300 px-4 py-2">GRN Batch ID</th>
            <th className="border border-gray-300 px-4 py-2">GRN Store ID</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchseOrderDetails.map((detail) => (
            <tr key={detail.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{detail.id}</td>
              <td className="border border-gray-300 px-4 py-2">{detail.poQuantity}</td>
              <td className="border border-gray-300 px-4 py-2">{detail.grnQuantity}</td>
              <td className="border border-gray-300 px-4 py-2">
                {detail.poBalanceQuantity}
              </td>
              <td className="border border-gray-300 px-4 py-2">{detail.grnBatchId}</td>
              <td className="border border-gray-300 px-4 py-2">{detail.grnStoreId}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(detail)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formik Form for Row Edit */}
      {selectedRow && (
        <Formik
          initialValues={selectedRow}
          onSubmit={(values) => handleRowUpdate(values)}
        >
          {() => (
            <Form className="mb-4 border p-4 rounded bg-gray-50">
              <h2 className="text-lg font-bold mb-2">Edit Row</h2>
              <div className="mb-2">
                <label>PO Quantity:</label>
                <Field
                  name="poQuantity"
                  type="number"
                  className="border px-2 py-1 w-full"
                />
              </div>
              <div className="mb-2">
                <label>GRN Quantity:</label>
                <Field
                  name="grnQuantity"
                  type="number"
                  className="border px-2 py-1 w-full"
                />
              </div>
              <div className="mb-2">
                <label>PO Balance Quantity:</label>
                <Field
                  name="poBalanceQuantity"
                  type="number"
                  className="border px-2 py-1 w-full"
                />
              </div>
              <div className="mb-2">
                <label>GRN Batch ID:</label>
                <Field
                  name="grnBatchId"
                  type="text"
                  className="border px-2 py-1 w-full"
                />
              </div>
              <div className="mb-2">
                <label>GRN Store ID:</label>
                <Field
                  name="grnStoreId"
                  type="text"
                  className="border px-2 py-1 w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Update Row
              </button>
            </Form>
          )}
        </Formik>
      )}

      {/* Formik Form for Customer Name and Final Submission */}
      <Formik
        initialValues={{ customerName: "" }}
        onSubmit={(values) => handleFinalSubmit(values)}
      >
        {() => (
          <Form className="mb-4 border p-4 rounded bg-gray-50">
            <h2 className="text-lg font-bold mb-2">Customer Information</h2>
            <div className="mb-2">
              <label>Customer Name:</label>
              <Field
                name="customerName"
                type="text"
                className="border px-2 py-1 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit All Data
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Testing2;

