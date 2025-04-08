

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Buton from '../../../Compo/Buton';
function EditPurchaseReturn() {

  const location = useLocation();
  const PurchaseReturnId = location.state?.id;
  const navigate = useNavigate();


  console.log(PurchaseReturnId);



  const fetchpurchaseDetails = async (PurchaseReturnId) => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchaseDetail/GetByPurchaseReturnId?id=${PurchaseReturnId}&organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response?.data) {

        const modifiedData = response.data.map(
          ({
            measuringUnitsMeasuringUnitsName,
            productVariantMainProductName,
            ...rest
          }) => ({
            ...rest,
            measuringUnitsName: measuringUnitsMeasuringUnitsName ?? "",
            productName: productVariantMainProductName ?? "",
          })
        );

        setpurchaseReturnDetails(modifiedData);
      } else {
        setpurchaseReturnDetails([]);
      }
    } catch (error) {
      console.error("Error fetching GRN details:", error);
    }
  };


  useEffect(() => {
    if (PurchaseReturnId) {
      fetchpurchaseDetails(PurchaseReturnId);
    }
  }, [PurchaseReturnId]);

  useEffect(() => {
    const fetchPurchaseReturn = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/PurchaseReturn/GetyId?id=${PurchaseReturnId}&organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const purchase = response.data[0];
          formik.setValues({
            PurchaseReturnInvoiceDate: purchase.PurchaseReturnInvoiceDate || "",
            branchId: purchase.branchId || "",
            branchName: purchase.branchName || "",
            PurchaseReturnDocNo: purchase.PurchaseReturnDocNo || "",
            totalPurchaseReturnVest: purchase.totalPurchaseReturnVest || 0,
            totalPurchaseReturnValue: purchase.totalPurchaseReturnValue || 0,
            taxAmount: purchase.taxAmount || 0,
            furtherTax: purchase.furtherTax || 0,
            totalTaxCharged: purchase.totalTaxCharged || 0,
            discount: purchase.discount || 0,
            totalPurchaseReturnAmount: purchase.totalPurchaseReturnAmount || 0,
            rvMainId: purchase.rvMainId || 0,
            term: purchase.term || "",
            narration: purchase.narration || "",
            supplierNTNNo: purchase.supplierNTNNo || "",
            supplierSTRNo: purchase.supplierSTRNo || "",
            taxChargePlusAmount: purchase.taxChargePlusAmount || 0,
            fillerStatus: purchase.fillerStatus !== undefined ? purchase.fillerStatus : false,
            tax236Amount: purchase.tax236Amount || 0,
            tax236Rate: purchase.tax236Rate || 0,
            tax236Status: purchase.tax236Status !== undefined ? purchase.tax236Status : true,
            totalAmountWith236: purchase.totalAmountWith236 || 0,
            grnMainId: purchase.grnMainId || 0,
            supplierId: purchase.supplierId || 0,



          });
        } else {
          console.error("Failed to load po Main data.");
        }
      } catch (error) {
        console.error("Error fetching po Main:", error.message);
      }
    };

    if (PurchaseReturnId) {
      fetchPurchaseReturn();
    }
  }, [PurchaseReturnId]);

  const [purchaseReturnDetails, setpurchaseReturnDetails] = useState([]);
    const [purchaseReturnDetails, setpurchaseReturnDetails] = useState([]);

  const validationSchema = Yup.object({

  });


  const formik = useFormik({
    initialValues: {
      
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      // const selectedSupplierName = suppliers.find(
      //   (supplier) => supplier.id === values.supplierId
      // );
      // const selectedgrnInvoiceNo = GRNMain.find(
      //   (grn) => grn.id === values.grnMainId
      // );
      const finalData = {
        ...values,
        // supplerName: selectedSupplierName?.name || '',
        // grnInvoiceNo: selectedgrnInvoiceNo?.name || '',
        PurchaseReturnInvoiceNo: "string",
        organizationId: 1,
        companyId: 1,
        id: PurchaseReturnId,
        purchaseReturnDetails,
      };
      console.log("Final Data Submitted:", finalData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/PurchaseReturn/UpdatePurchaseReturn",
          method: "PUT",
          data: finalData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Purchase Main Updated successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
          formik.resetForm();

        } else {
          throw new Error("Failed to Update the Purchase Main");
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text:
            error.message || "An error occurred while Updating the Purchase Main",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Close",
        });
      }
    },
  });





  const addpurchaseReturnDetails = (detail) => {
    setpurchaseReturnDetails([...purchaseReturnDetails, detail]);
  };

  const removepurchaseReturnDetails = (index) => {
    setpurchaseReturnDetails(purchaseReturnDetails.filter((_, i) => i !== index));
  };

  const PurchaseFormik = useFormik({
    initialValues: {
      
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // const selectedmeasuringUnitsName = measuringUnits.find(
      //   (unit) => unit.id === values.measuringUnitsId
      // );
      // const selectedProductVariantMain = productVariantMains.find(
      //   (variant) => variant.id === values.productVariantMainId
      // );

      // const selectedPurchaseReturn = PurchaseReturn.find(
      //   (PurchaseReturn) => PurchaseReturn.id === values.PurchaseReturnId
      // );
      const purchaseReturnDetails = {
        ...values,
        id: PurchaseReturnId,
        // measuringUnitsName: selectedmeasuringUnitsName?.name || null,
        // productName: selectedProductVariantMain?.name || null,
        // PurchaseReturnInvoiceNo: selectedPurchaseReturn?.name || null,
        organizationId: 1,
        companyId: 1,

      };
      addpurchaseReturnDetails(purchaseReturnDetails);
      resetForm();
    },
  });

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row mb-3'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Create Purchase Main</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Purchase Main creation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate("/PurchaseReturn/PurchaseReturn")}>Move to Purchase Main</Buton>
        </div>
      </div>


      <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>
        <h5 className="mt-1 ">Add Purchase Details :</h5>
        <form onSubmit={PurchaseFormik.handleSubmit}>
       

          {purchaseReturnDetails.length > 0 && (
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th>Mu Code</th>
                    <th>Product Def Id</th>
                    <th>Purchase</th>
                    <th>Measuring Unit</th>
                    <th>Product Variant</th>
                    <th>Tax</th>
                    <th>Further Tax</th>
                    <th>Discount</th>
                    <th>Action</th>
                  </tr>

                </thead>
                <tbody>
                  {purchaseReturnDetails.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.muCode}</td>
                      <td>{detail.productDefinitionId}</td>
               
                      <td>{detail.discount}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removepurchaseReturnDetails(index)}
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
        

          <div className="d-flex justify-content-end modal-footer mt-3">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: '#ff9f33', color: 'white' }}
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

export default EditPurchaseReturn;
