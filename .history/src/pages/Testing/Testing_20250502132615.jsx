import React, { useEffect, useState } from 'react';
import ApiCall from '../../Apicall/ApiCall';

const Testing = () => {
  const [purchaseOrderDetails, setPurchaseOrderDetails] = useState([]);

  const fetchpurchaseOrderDetails = async (POMain) => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchseOrderDetails/GetByPurchaseOrderMainId?id=${POMain}&organizationId=1&companyId=1`,
        method: "GET",
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
            measuringUnitsName: measuringUnitsMeasuringUnitsName ?? "",
            productName: productVariantMainsProductName ?? "",
            poNumber: purchaseOrderMainsPoNumber ?? "",
          })
        );

        setPurchaseOrderDetails(modifiedData);
      } else {
        setPurchaseOrderDetails([]);
      }
    } catch (error) {
      console.error("Error fetching GRN details:", error);
    }
  };

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
              <th>PO Number</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Total</th>
              {/* Add more columns if needed */}
            </tr>
          </thead>
          <tbody>
            {purchaseOrderDetails.map((item, index) => (
              <tr key={item.id || index}>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td>{item.measuringUnitsName}</td>
                <td>{item.poNumber}</td>
                <td>{item.poQuantity
                }</td>
                <td>{item.rate}</td>
                <td>{item.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No purchase order details found.</p>
      )}
    </div>
  );
};

export default Testing;
