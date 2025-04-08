import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Buton from '../../../Compo/Buton';
function EditPurchaseOrderMain() {


  const location = useLocation();
  const POMain = location.state?.id;
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/PurchaseOrderMain/GetyId?id=${POMain}&organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const Purchase = response.data[0];
          formik.setValues({
            poDays: Purchase.poDays || "",
            poNumber: Purchase.poNumber || "",
            poDate: Purchase.poDate || "",
            poIssueDate: Purchase.poIssueDate || "",
            poExpectedDeliveryDate: Purchase.poExpectedDeliveryDate || "",
            poReferenceNumber: Purchase.poReferenceNumber || "",
            poDueDate: Purchase.poDueDate || "",
            poNumberOfItems: Purchase.poNumberOfItems || 0,
            cashierName: Purchase.cashierName || "",
            supplierId: Purchase.supplierId || "",
            isCancel:Purchase.isCancel || false,
            purchaseOrderStatusId: Purchase.purchaseOrderStatusId || "",
            purchseOrderTermsId: Purchase.purchseOrderTermsId || "",
            
          });
        } else {
          console.error("Failed to load po Main data.");
        }
      } catch (error) {
        console.error("Error fetching po Main:", error.message);
      }
    };

    if (POMain) {
      fetchPurchase();
    }
  }, [POMain]);

  console.log(POMain);

  const [purchseOrderDetails, setpurchseOrderDetails] = useState([]);
  const validationSchema = Yup.object({

  });
  const formik = useFormik({
    initialValues: {
    
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const finalData = {
        ...values,
        purchseOrderDetails,
        organizationId: 1,
        companyId: 1,
        
        id: POMain,
      };
      console.log("Final Data Submitted:", finalData);
 
      // try {
      //   const response = await ApiCall({
      //     url: "http://localhost:5022/api/v1/PurchaseOrderMain/UpdatePurchaseOrderMain",
      //     method: "PUT",
      //     data: finalData,
      //   });

      //   if (response?.status === 200) {
      //     Swal.fire({
      //       title: "Success!",
      //       text: "PurchaseOrderMain Edit successfully.",
      //       icon: "success",
      //       confirmButtonColor: "#3085d6",
      //       confirmButtonText: "OK",
      //     });
      //     formik.resetForm();

      //   } else {
      //     throw new Error("Failed to Edit the PurchaseOrderMain");
      //   }
      // } catch (error) {
      //   Swal.fire({
      //     title: "Error",
      //     text:
      //       error.message || "An error occurred while saving the PurchaseOrderMain",
      //     icon: "error",
      //     confirmButtonColor: "#d33",
      //     confirmButtonText: "Close",
      //   });
      // }

    },
  });

  const addpurchseOrderDetails = (detail) => {
    setpurchseOrderDetails([...purchseOrderDetails, detail]);
  };

  const removepurchseOrderDetails = (index) => {
    setpurchseOrderDetails(purchseOrderDetails.filter((_, i) => i !== index));
  };

  const PurchaseOrderFormik = useFormik({
    initialValues: {
      poQuantity: 0,
      grnQuantity: 0,
      poBalanceQuantity: 0,
      grnBatchId: 0,
      grnStoreId: 0,
      productVariantMainId: 0,
      measuringUnitsId: 0,
      purchaseOrderMainId: 0,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const selectedmeasuringUnitsName = measuringUnits.find(
        (unit) => unit.id === values.measuringUnitsId
      );
      const selectedProductVariantMain = productVariantMainId.find(
        (variant) => variant.id === values.productVariantMainId
      );

      const selectedPurchaseMain = purchaseOrderMains.find(
        (PurchaseMain) => PurchaseMain.id === values.purchaseOrderMainId
      );
      const purchseOrderDetails = {
        ...values,
        measuringUnitsName: selectedmeasuringUnitsName?.name || '',
        productName: selectedProductVariantMain?.name || '',
        poNumber: selectedPurchaseMain?.name || '',
        id: POMain,
        organizationId: 1,
        companyId: 1,

      };
      addpurchseOrderDetails(purchseOrderDetails);
      resetForm();
    },
  });

  const [suppliers, setSuppliers] = useState([]);
  const [purchaseOrderStatuses, setPurchaseOrderStatuses] = useState([]);
  const [purchaseOrderTerms, setPurchaseOrderTerms] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/Supplier/GetSupplierBoxItems/combobox?organizationId=1&companyId=1",
          method: "GET",
        });
        if (response?.data) {
          setSuppliers(response.data);
        } else {
          throw new Error("Failed to fetch suppliers.");
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    const fetchPurchaseOrderStatuses = async () => {
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/PurchaseOrderStatus/GetcomboBoxItems/combobox?organizationId=1&companyId=1",
          method: "GET",
        });
        if (response?.data) {
          setPurchaseOrderStatuses(response.data);
        } else {
          throw new Error("Failed to fetch purchase order statuses.");
        }
      } catch (error) {
        console.error("Error fetching purchase order statuses:", error);
      }
    };

    const fetchPurchaseOrderTerms = async () => {
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/PurchseOrderTerms/GetcomboBoxItems/combobox?organizationId=1&companyId=1",
          method: "GET",
        });
        if (response?.data) {
          setPurchaseOrderTerms(response.data);
        } else {
          throw new Error("Failed to fetch purchase order terms.");
        }
      } catch (error) {
        console.error("Error fetching purchase order terms:", error);
      }
    };

    fetchSuppliers();
    fetchPurchaseOrderStatuses();
    fetchPurchaseOrderTerms();
  }, []);

  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [productVariantMainId, setproductVariantMainId] = useState([]);
  const [purchaseOrderMains, setPurchaseOrderMains] = useState([]);
  const fetchMeasuringUnits = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/MeasuringUnits/GetMeasuringUnitsBoxItems/combobox?organizationId=1&companyId=1",
        method: "GET",
      });
      setMeasuringUnits(response.data);
    } catch (error) {
      console.error("Error fetching measuring units:", error);
    }
  };
  const fetchproductVariantMainId = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/ProductVariantMain/GetProductVariantMainBoxItems/combobox?organizationId=1&companyId=1",
        method: "GET",
      });
      setproductVariantMainId(response.data);
    } catch (error) {
      console.error("Error fetching Purchase variant mains:", error);
    }
  };
  const fetchPurchaseOrderMains = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/PurchaseOrderMain/GetPurchaseOrderMainBoxItems?organizationId=1&companyId=1",
        method: "GET",
      });
      setPurchaseOrderMains(response.data);
    } catch (error) {
      console.error("Error fetching purchase order mains:", error);
    }
  };

  useEffect(() => {
    fetchMeasuringUnits();
    fetchproductVariantMainId();
    fetchPurchaseOrderMains();
  }, []);


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

        setpurchseOrderDetails(modifiedData);
      } else {
        setpurchseOrderDetails([]);
      }
    } catch (error) {
      console.error("Error fetching GRN details:", error);
    }
  };


  useEffect(() => {
    if (POMain) {
      fetchpurchaseOrderDetails(POMain);
    }
  }, [POMain]);





  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row mb-3'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Create Purchase Order Main</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Purchase Order Main creation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate("/PurchaseOrderMain/PurchaseOrderMain")}>Move to Purchase Order Main</Buton>
        </div>
      </div>


      <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>
        <h5 className="mt-1 ">Add Purchase Order Details :</h5>
        <form onSubmit={PurchaseOrderFormik.handleSubmit}>
          <div className="row border p-2">
            {/* Add form inputs for the new fields */}
            <div className="col-md-4 mb-3">
              <label htmlFor="poQuantity" className="form-label">
                PO Quantity
              </label>
              <input
                type="number"
                id="poQuantity"
                name="poQuantity"
                className={`form-control ${PurchaseOrderFormik.touched.poQuantity && PurchaseOrderFormik.errors.poQuantity
                  ? "is-invalid"
                  : ""
                  }`}
                value={PurchaseOrderFormik.values.poQuantity}
                onChange={PurchaseOrderFormik.handleChange}
                onBlur={PurchaseOrderFormik.handleBlur}
              />
              {PurchaseOrderFormik.touched.poQuantity && PurchaseOrderFormik.errors.poQuantity && (
                <div className="invalid-feedback">{PurchaseOrderFormik.errors.poQuantity}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="grnQuantity" className="form-label">
                GRN Quantity
              </label>
              <input
                type="number"
                id="grnQuantity"
                name="grnQuantity"
                className={`form-control ${PurchaseOrderFormik.touched.grnQuantity && PurchaseOrderFormik.errors.grnQuantity
                  ? "is-invalid"
                  : ""
                  }`}
                value={PurchaseOrderFormik.values.grnQuantity}
                onChange={PurchaseOrderFormik.handleChange}
                onBlur={PurchaseOrderFormik.handleBlur}
              />
              {PurchaseOrderFormik.touched.grnQuantity && PurchaseOrderFormik.errors.grnQuantity && (
                <div className="invalid-feedback">{PurchaseOrderFormik.errors.grnQuantity}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="poBalanceQuantity" className="form-label">
                PO Balance Quantity
              </label>
              <input
                type="number"
                id="poBalanceQuantity"
                name="poBalanceQuantity"
                className={`form-control ${PurchaseOrderFormik.touched.poBalanceQuantity && PurchaseOrderFormik.errors.poBalanceQuantity
                  ? "is-invalid"
                  : ""
                  }`}
                value={PurchaseOrderFormik.values.poBalanceQuantity}
                onChange={PurchaseOrderFormik.handleChange}
                onBlur={PurchaseOrderFormik.handleBlur}
              />
              {PurchaseOrderFormik.touched.poBalanceQuantity && PurchaseOrderFormik.errors.poBalanceQuantity && (
                <div className="invalid-feedback">{PurchaseOrderFormik.errors.poBalanceQuantity}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="grnBatchId" className="form-label">
                GRN Batch ID
              </label>
              <input
                type="number"
                id="grnBatchId"
                name="grnBatchId"
                className={`form-control ${PurchaseOrderFormik.touched.grnBatchId && PurchaseOrderFormik.errors.grnBatchId
                  ? "is-invalid"
                  : ""
                  }`}
                value={PurchaseOrderFormik.values.grnBatchId}
                onChange={PurchaseOrderFormik.handleChange}
                onBlur={PurchaseOrderFormik.handleBlur}
              />
              {PurchaseOrderFormik.touched.grnBatchId && PurchaseOrderFormik.errors.grnBatchId && (
                <div className="invalid-feedback">{PurchaseOrderFormik.errors.grnBatchId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="grnStoreId" className="form-label">
                GRN Store ID
              </label>
              <input
                type="number"
                id="grnStoreId"
                name="grnStoreId"
                className={`form-control ${PurchaseOrderFormik.touched.grnStoreId && PurchaseOrderFormik.errors.grnStoreId
                  ? "is-invalid"
                  : ""
                  }`}
                value={PurchaseOrderFormik.values.grnStoreId}
                onChange={PurchaseOrderFormik.handleChange}
                onBlur={PurchaseOrderFormik.handleBlur}
              />
              {PurchaseOrderFormik.touched.grnStoreId && PurchaseOrderFormik.errors.grnStoreId && (
                <div className="invalid-feedback">{PurchaseOrderFormik.errors.grnStoreId}</div>
              )}
            </div>
            <div className="col-md-4 mt-3">
              <label htmlFor="measuringUnitsId" className="form-label">
                Measuring Unit
              </label>
              <select
                id="measuringUnitsId"
                name="measuringUnitsId"
                className="form-control"
                value={PurchaseOrderFormik.values.measuringUnitsId}
                onChange={(e) => {
                  PurchaseOrderFormik.setFieldValue(
                    "measuringUnitsId",
                    Number(e.target.value)
                  );
                }}
                onBlur={PurchaseOrderFormik.handleBlur}
              >
                <option value="">Select Measuring Unit</option>
                {Array.isArray(measuringUnits) && measuringUnits.length > 0 ? (
                  measuringUnits.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))
                ) : (
                  <option value="">
                    No Measuring Units Available
                  </option>
                )}
              </select>
              {PurchaseOrderFormik.touched.measuringUnitsId &&
                PurchaseOrderFormik.errors.measuringUnitsId && (
                  <div className="text-danger">
                    {PurchaseOrderFormik.errors.measuringUnitsId}
                  </div>
                )}
            </div>
            <div className="col-md-4 mt-3">
              <label
                htmlFor="productVariantMainId"
                className="form-label"
              >
                Product Variant Main
              </label>
              <select
                name="productVariantMainId"
                className="form-control"
                value={PurchaseOrderFormik.values.productVariantMainId}
                onChange={(e) => {
                  PurchaseOrderFormik.setFieldValue(
                    "productVariantMainId",
                    Number(e.target.value)
                  );
                }}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Product Variant Main</option>
                {Array.isArray(productVariantMainId) &&
                  productVariantMainId.length > 0 ? (
                  productVariantMainId.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.name}
                    </option>
                  ))
                ) : (
                  <option value="">
                    No Product Variant Mains Available
                  </option>
                )}
              </select>
              {PurchaseOrderFormik.touched.productVariantMainId &&
                PurchaseOrderFormik.errors.productVariantMainId ? (
                <div className="text-danger">
                  {PurchaseOrderFormik.errors.productVariantMainId}
                </div>
              ) : null}
            </div>
            <div className="col-md-4 mt-3">
              <label htmlFor="purchaseOrderMainId" className="form-label">
                Purchase Order Main
              </label>
              <select
                id="purchaseOrderMainId"
                name="purchaseOrderMainId"
                className="form-control"
                value={PurchaseOrderFormik.values.purchaseOrderMainId}
                onChange={(e) =>
                  PurchaseOrderFormik.setFieldValue(
                    "purchaseOrderMainId",
                    Number(e.target.value)
                  )
                }
                onBlur={PurchaseOrderFormik.handleBlur}
              >
                <option value="">Select Purchase Order</option>
                {Array.isArray(purchaseOrderMains) &&
                  purchaseOrderMains.length > 0 ? (
                  purchaseOrderMains.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.name}
                    </option>
                  ))
                ) : (
                  <option value="">No Purchase Orders Available</option>
                )}
              </select>
              {PurchaseOrderFormik.touched.purchaseOrderMainId &&
                PurchaseOrderFormik.errors.purchaseOrderMainId && (
                  <div className="text-danger">
                    {PurchaseOrderFormik.errors.purchaseOrderMainId}
                  </div>
                )}
            </div>

            <div>
              <button type="submit" className="btn btn-success mt-3 col-2">
                Add Detail
              </button>
            </div>
          </div>

          {/* Display table if there are purchase order details */}
          {purchseOrderDetails.length > 0 && (
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>Po Quantity</th>
                    <th>grnQuantity</th>
                    <th>grnBatchId</th>
                    <th>grnStoreIdt</th>
                    <th>purchaseOrderMainId</th>
                    <th>measuringUnitsId</th>
                    <th>productVariantMainId</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {purchseOrderDetails.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.poQuantity}</td>
                      <td>{detail.grnQuantity}</td>
                      <td>{detail.grnBatchId}</td>
                      <td>{detail.grnStoreId}</td>
                      <td>{detail.purchaseOrderMainId}</td>
                      <td>{detail.measuringUnitsId}</td>
                      <td>{detail.productVariantMainId}</td>


                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removepurchseOrderDetails(index)}
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
      







      </div>

      <Footer />
    </div>
  );
}

export default EditPurchaseOrderMain;