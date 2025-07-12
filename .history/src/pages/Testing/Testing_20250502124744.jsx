import React, { useEffect, useState } from 'react';
import ApiCall from '../../Apicall/ApiCall';

const Testing = () => {
 

   
  return (
    <div className="container mt-4">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Purchase Order Details</h2>
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>PO Number:</strong> {data.poNumber}</p>
          <p><strong>PO Date:</strong> {data.poDate}</p>
          <p><strong>Issue Date:</strong> {data.poIssueDate}</p>
          <p><strong>Expected Delivery:</strong> {data.poExpectedDeliveryDate}</p>
          <p><strong>Reference Number:</strong> {data.poReferenceNumber}</p>
          <p><strong>Days:</strong> {data.poDays}</p>
          <p><strong>Due Date:</strong> {data.poDueDate}</p>
          <p><strong>Number of Items:</strong> {data.poNumberOfItems}</p>
          <p><strong>Cashier:</strong> {data.cashierName}</p>
          <p><strong>Supplier:</strong> {data.supplierSupplerName} (ID: {data.supplierId})</p>
          <p><strong>Status:</strong> {data.purchaseOrderStatusPoStatus}</p>
          <p><strong>Terms:</strong> {data.purchseOrderTermsPoTerms}</p>
          <p><strong>Is Cancelled:</strong> {data.isCancel ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default Testing;
