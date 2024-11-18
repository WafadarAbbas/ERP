import React from 'react';

const ViewModal = (props) => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#ViewModalModal"
        ref={props.open}
      >
        View Product
      </button>

      <div
        className="modal fade"
        id="ViewModalModal"
        tabIndex="-1"
        aria-labelledby="ViewModalModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ViewModalModalLabel">
                Product Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={props.close}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
            
              {/* <p><strong>Product Name:</strong> Example Product</p>
              <p><strong>Category:</strong> Example Category</p>
              <p><strong>Brand:</strong> Example Brand</p>
              <p><strong>Price:</strong> $100</p>
              <p><strong>Description:</strong> This is a detailed description of the product.</p> */}


            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn"
                style={{backgroundColor:'#ff9f43',color:'white'}}
                onClick={props.onSave} 
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
