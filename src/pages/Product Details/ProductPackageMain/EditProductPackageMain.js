import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";
 


const EditProductPackageMain = (props) => {

  const { selectedProductPackageMainId } = props;
 
  const validationSchema = Yup.object({
 
  });

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      price: 0,
      isCurrentPrice: false,
      productPackageMainId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        branchId: 1,
        id:selectedProductPackageMainId,
      };
      console.log(formData);

      // try {
      //   const response = await ApiCall({
      //     url: "http://localhost:5022/api/v1/ProductPackageMain/UpdateProductPackageMain",
      //     method: "PUT",
      //     data: formData,
      //   });

      //   if (response?.status === 200 || response?.status === 204) {
      //     Swal.fire({
      //       title: "Success!",
      //       text: "Product Price saved successfully.",
      //       icon: "success",
      //       confirmButtonColor: "#3085d6",
      //       confirmButtonText: "OK",
      //     });
    

      //     formik.resetForm();
      //     if (props.close && props.close.current) {
      //       props.close.current.click();  
      //     }
      //     if (typeof props.onclick === "function" ) {
      //       props.onclick();
      //     }
      //   } else {
      //     throw new Error("Failed to save the product Price");
      //   }
      // } catch (error) {
      //   console.error("Error during product Price save:", error);
      //   Swal.fire({
      //     title: "Error",
      //     text: error.message || "An error occurred while saving the product Price",
      //     icon: "error",
      //     confirmButtonColor: "#d33",
      //     confirmButtonText: "Close",
      //   });
      // }
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [props.open]);

  const handleModalClose = () => {
    formik.resetForm();
  };

// useEffect(() => {
//   const fetchProductPackageMain = async () => {
//     try {
//       const response = await ApiCall({
//         url: `http://localhost:5022/api/v1/ProductPackageMain/GetProductPackageMainByIdQuery/GetById/${selectedProductPackageMainId}?organizationId=1&companyId=1`,
//         method: "GET",
//       });

//       if (response && response.data && response.data.length > 0) {
//         const ProductPackageMain = response.data[0];
        
        
//         formik.setValues({
          
//           startDate: ProductPackageMain.startDate || "",
//           endDate: ProductPackageMain.endDate || "",
//           price: ProductPackageMain.price || "",
//           isCurrentPrice: ProductPackageMain.isCurrentPrice|| "",
//           productPackageMainId: ProductPackageMain.productPackageMainId || "",
          
    
//         });
//       } else {
//         console.error("Failed to load Product Price data.");
//       }
//     } catch (error) {
//       console.error("Error fetching Product Price:", error.message);
//     }
//   };

//   if (selectedProductPackageMainId) {
//     fetchProductPackageMain();
//   }
// }, [selectedProductPackageMainId]);


 

    return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditProductPackageMainModal"
        ref={props.open}
      >
        Edit ProductPackageMain
      </button>

      <div
        className="modal fade"
        id="EditProductPackageMainModal"
        tabIndex="-1"
        aria-labelledby="EditProductPackageMainModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditProductPackageMainModalLabel">
                Edit Main
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleModalClose}
                ref={props.close}
                aria-label="Close"
              ></button>
            </div>

        
            <div className="modal-body">
              
            </div>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default EditProductPackageMain;