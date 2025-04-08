import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
import CreateSupplier from "../Supplier/CreateSupplier";
import Buton from '../../../Compo/Buton';

function CreateGRNMain() {

    const createRef = useRef(null);
    const navigate = useNavigate();
  
    const [purchaseOrderMains, setPurchaseOrderMains] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

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
        fetchSuppliers();
        fetchPurchaseOrderMains();
    }, []);

    // ✅ Formik Configuration
    const formik = useFormik({
        initialValues: {
            grnInvoiceDate: "",
            term: "",
            purchaseOrderMainId: "",
            supplierId: "",
        },
        onSubmit: async (values) => {
            const finalData = {
                grnInvoiceDate: values.grnInvoiceDate,
                term: values.term,
                supplierId: values.supplierId,
                purchaseOrderMainId: values.purchaseOrderMainId,
                grnInvoiceNo: "string",
                organizationId: 1,
                companyId: 1,
            };
            console.log("Final Data Submitted:", finalData);
        },
    });

 const fetchPurchaseOrderDetails = async (id) => {
  if (!id) return;

  try {
    const response = await ApiCall({
      url: `http://localhost:5022/api/v1/PurchaseOrderMain/GetyId?id=${id}&organizationId=1&companyId=1`,
      method: "GET",
    });

    if (response?.data) {
      const { poDate, supplierId, purchseOrderTermsPoTerms } = response.data;

      // Setting values in Formik
      formik.setValues((prevValues) => ({
        ...prevValues,
        grnInvoiceDate: poDate,
        supplierId: supplierId,
        term: purchseOrderTermsPoTerms,
      }));
    }
  } catch (error) {
    console.error("Error fetching purchase order details:", error);
  }
};

// Trigger API call when purchaseOrderMainId changes
useEffect(() => {
  fetchPurchaseOrderDetails(formik.values.purchaseOrderMainId);
}, [formik.values.purchaseOrderMainId]);


    return (
        <div style={{ marginTop: 10 }}>
            <div className='d-flex justify-content-between row mb-3'>
                <div className='d-flex flex-column col-sm-7'>
                    <h3>Create GRNMain</h3>
                    <h5 style={{ fontWeight: 400 }}>Manage your GRNMain creation</h5>
                </div>
                <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Buton onClick={() => navigate("/GRNMain/GRNMain")}>Move to GRN Main</Buton>
                </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        {/* Purchase Order Dropdown */}
                        <div className="col-md-4 mt-2">
                            <label htmlFor="purchaseOrderMainId" className="form-label">
                                Purchase Order Main
                            </label>
                            <select
                                id="purchaseOrderMainId"
                                name="purchaseOrderMainId"
                                className="form-control"
                                value={formik.values.purchaseOrderMainId}
                                onChange={(e) => formik.setFieldValue("purchaseOrderMainId", e.target.value)}
                            >
                                <option value="">Select Purchase Order</option>
                                {purchaseOrderMains.length > 0 ? (
                                    purchaseOrderMains.map((order) => (
                                        <option key={order.id} value={order.id}>
                                            {order.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No Purchase Orders Available</option>
                                )}
                            </select>
                        </div>

                        {/* Supplier Dropdown */}
                        <div className="col-md-4 d-flex">
                            <div className="col-10 mt-1">
                                <label htmlFor="supplierId" className="form-label">Supplier</label>
                                <select
                                    id="supplierId"
                                    name="supplierId"
                                    className="form-select"
                                    value={formik.values.supplierId}
                                    disabled
                                >
                                    <option value="">Select Supplier</option>
                                    {suppliers.map((supplier) => (
                                        <option key={supplier.id} value={supplier.id}>
                                            {supplier.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Invoice Date */}
                        <div className="col-md-4 mb-3">
                            <label htmlFor="grnInvoiceDate" className="form-label">
                                Invoice Date
                            </label>
                            <input
                                type="datetime-local"
                                id="grnInvoiceDate"
                                name="grnInvoiceDate"
                                className="form-control"
                                value={formik.values.grnInvoiceDate}
                                disabled
                            />
                        </div>

                        {/* Term */}
                        <div className="col-md-4 mb-3">
                            <label htmlFor="term" className="form-label">Term</label>
                            <input
                                type="text"
                                id="term"
                                name="term"
                                className="form-control"
                                value={formik.values.term}
                                disabled
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-end modal-footer mt-3">
                        <button type="submit" className="btn" style={{ backgroundColor: "#ff9f33", color: "white" }}>
                            Save changes
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
            <CreateSupplier open={createRef} onclick={fetchSuppliers} />
        </div>
    );
}

export default CreateGRNMain;
