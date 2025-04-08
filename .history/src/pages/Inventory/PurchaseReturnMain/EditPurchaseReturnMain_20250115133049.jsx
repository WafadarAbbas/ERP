

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Buton from '../../../Compo/Buton';
function EditPurchaseReturnMain() {

  const location = useLocation();
  const PurchaseReturnMainId = location.state?.id;
  const navigate = useNavigate();


  console.log(PurchaseReturnMainId);



  const fetchpurchaseDetails = async (PurchaseReturnMainId) => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchaseDetail/GetByPurchaseReturnMainId?id=${PurchaseReturnMainId}&organizationId=1&companyId=1`,
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

        setpurchseDetails(modifiedData);
      } else {
        setpurchseDetails([]);
      }
    } catch (error) {
      console.error("Error fetching GRN details:", error);
    }
  };


  useEffect(() => {
    if (PurchaseReturnMainId) {
      fetchpurchaseDetails(PurchaseReturnMainId);
    }
  }, [PurchaseReturnMainId]);

  useEffect(() => {
    const fetchPurchaseReturnMain = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/PurchaseReturnMain/GetyId?id=${PurchaseReturnMainId}&organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const purchase = response.data[0];
          formik.setValues({
            PurchaseReturnMainInvoiceDate: purchase.PurchaseReturnMainInvoiceDate || "",
            branchId: purchase.branchId || "",
            branchName: purchase.branchName || "",
            PurchaseReturnMainDocNo: purchase.PurchaseReturnMainDocNo || "",
            totalPurchaseReturnMainVest: purchase.totalPurchaseReturnMainVest || 0,
            totalPurchaseReturnMainValue: purchase.totalPurchaseReturnMainValue || 0,
            taxAmount: purchase.taxAmount || 0,
            furtherTax: purchase.furtherTax || 0,
            totalTaxCharged: purchase.totalTaxCharged || 0,
            discount: purchase.discount || 0,
            totalPurchaseReturnMainAmount: purchase.totalPurchaseReturnMainAmount || 0,
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

    if (PurchaseReturnMainId) {
      fetchPurchaseReturnMain();
    }
  }, [PurchaseReturnMainId]);

 
  const [purchaseReturnDetails, setpurchaseReturnDetails] = useState([]);

  const validationSchema = Yup.object({

  });
  const formik = useFormik({
    initialValues: {
      purchaseReturnMainInvoiceDate: '',
      branchId: 0,
      branchName: '',
      purchaseReturnMainDocNo: '',
      totalPurchaseReturnMainVest: 0,
      totalPurchaseReturnMainValue: 0,
      taxAmount: 0,
      furtherTax: 0,
      totalTaxCharged: 0,
      discount: 0,
      totalPurchaseReturnMainAmount: 0,
      rvMainId: 0,
      term: '',
      narration: '',
      supplierNTNNo: '',
      supplierSTRNo: '',
      taxChargePlusAmount: 0,
      fillerStatus: false,
      tax236Amount: 0,
      tax236Rate: 0,
      tax236Status: true,
      totalAmountWith236: 0,
      reference: '',
      grnMainId: 0,
      supplierId: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const finalData = {
        ...values,
        purchaseReturnMainInvoiceNo: "string",
        organizationId: 1,
        companyId: 1,
        purchaseReturnDetails,
      };
      console.log("Final Data Submitted:", finalData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/PurchaseReturnMain/SavePurchaseReturnMain",
          method: "POST",
          data: finalData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Purchase Main saved successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
          formik.resetForm();

        } else {
          throw new Error("Failed to save the Purchase Main");
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text:
            error.message || "An error occurred while saving the Purchase Main",
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
      productDefinitionId: 0,
      product3rdSchedule: false,
      itemCode: '',
      itemName: '',
      fbrProductDesctiptionId: 0,
      fbrProductDesctiptionCode: '',
      batchId: 0,
      storeId: 0,
      fbrMuId: 0,
      muCode: '',
      quantity: 0,
      productPrice: 0,
      amount: 0,
      fbrTaxRateId: 0,
      taxRate: 0,
      taxAmount: 0,
      furtherTax: 0,
      furtherTaxAmount: 0,
      valueExclPurchaseMainTax: 0,
      discount: 0,
      discountAmount: 0,
      taxCharged: 0,
      valueIncPurchaseMainTax: 0,
      measuringUnitsId: 0,
      productVariantMainId: 0,
      purchaseReturnMainId: 0,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const selectedmeasuringUnitsName = measuringUnits.find(
        (unit) => unit.id === values.measuringUnitsId
      );
      const selectedProductVariantMain = productVariantMains.find(
        (variant) => variant.id === values.productVariantMainId
      );

      const selectedPurchaseReturnMain = PurchaseReturnMain.find(
        (PurchaseReturnMain) => PurchaseReturnMain.id === values.purchaseReturnMainId
      );
      const purchaseReturnDetails = {
        ...values,
        measuringUnitsName: selectedmeasuringUnitsName?.name || null,
        productName: selectedProductVariantMain?.name || null,
        PurchaseReturnMainInvoiceNo: selectedPurchaseReturnMain?.name || null,
        organizationId: 1,
        companyId: 1,

      };
      addpurchaseReturnDetails(purchaseReturnDetails);
      resetForm();
    },
  });


  const [suppliers, setSuppliers] = useState([]);
  const [GRNMain, setGRNMain] = useState([]);
  const fetchGRNMain = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/GRNMain/GetGRNMainBoxItems?organizationId=1&companyId=1",
        method: "GET",
      });
      setGRNMain(response.data);
    } catch (error) {
      console.error("Error fetching GRN main:", error);
    }
  };

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

  useEffect(() => {
    fetchSuppliers();
    fetchGRNMain();

  }, []);


  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [productVariantMains, setProductVariantMains] = useState([]);
  const [PurchaseReturnMain, setPurchaseReturnMain] = useState([]);

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
  const fetchProductVariantMains = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/ProductVariantMain/GetProductVariantMainBoxItems/combobox?organizationId=1&companyId=1",
        method: "GET",
      });
      setProductVariantMains(response.data);
    } catch (error) {
      console.error("Error fetching Purchase main:", error);
    }
  };
  const fetchPurchaseReturnMain = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/PurchaseReturnMain/GetPurchaseReturnMainBoxItems?organizationId=1&companyId=1",
        method: "GET",
      });
      setPurchaseReturnMain(response.data);
    } catch (error) {
      console.error("Error fetching Purchase main:", error);
    }
  };


  useEffect(() => {
    fetchPurchaseReturnMain();
    fetchMeasuringUnits();
    fetchProductVariantMains();

  }, []);


  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row mb-3'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Create Purchase Main</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Purchase Main creation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate("/PurchaseReturnMain/PurchaseReturnMain")}>Move to Purchase Main</Buton>
        </div>
      </div>


      <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>
        <h5 className="mt-1 ">Add Purchase Details :</h5>
        


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

export default EditPurchaseReturnMain;
