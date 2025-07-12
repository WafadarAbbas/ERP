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
    const defaultPoMainId = 3018; // Replace with actual ID or dynamic value
    fetchpurchaseOrderDetails(defaultPoMainId);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Purchase Order Details</h2>
      <pre>{JSON.stringify(purchaseOrderDetails, null, 2)}</pre>
    </div>
  );
};

export default Testing;
