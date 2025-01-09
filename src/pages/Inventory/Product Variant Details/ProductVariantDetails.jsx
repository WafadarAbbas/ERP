
import React, { useRef, useState, useEffect } from 'react';
import { FaFilter, FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Buton from '../../../Compo/Buton';
import CreateProductVariantDetails from './CreateProductVariantDetails';
import ApiCall from '../../../Apicall/ApiCall';
import EditProductVariantDetails from './EditProductVariantDetails';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';

function ProductVariantDetails() {
  const createRef = useRef(null);
  const refClose = useRef(null);
  const createEditRef = useRef(null);
  const refEditClose = useRef(null);

  const [ProductVariantDetails, setProductVariantDetails] = useState([]);
  const [sortColumn, setSortColumn] = useState('productName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);
  const [selectedProductVariantDetailsId, setSelectedProductVariantDetailsId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 6;

  const handleIdReset = () => {
    setSelectedProductVariantDetailsId(0);
  };
  const fetchProductVariantDetails = async (query = '') => {
    try {
      const url = query
      ? `http://localhost:5022/api/v1/ProductVariantDetails/GetProductVariantDetailsByName?name=${query}&organizationId=1&companyId=1`
      : 'http://localhost:5022/api/v1/ProductVariantDetails/GetAllProductVariantDetails/list?organizationId=1&companyId=1';

      const response = await ApiCall({
        url: url,
        method: 'GET',
      });

      if (response && response.data) {
        setProductVariantDetails(response.data);
      } else {
        throw new Error('Failed to load ProductVariantDetails.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data');
    }
  };

  useEffect(() => {
    fetchProductVariantDetails();
  }, []);

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleDelete = async (ProductVariantDetailsId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/ProductVariantDetails/DeleteProductVariantDetails/${ProductVariantDetailsId}?organizationId=1&companyId=1`,
          method: 'DELETE',
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire('Deleted', 'The ProductVariantDetails has been deleted.', 'success');
          setProductVariantDetails(ProductVariantDetails.filter(ProductVariantDetails => ProductVariantDetails.id !== ProductVariantDetailsId));
        } else {
          Swal.fire('Error', 'Failed to delete ProductVariantDetails', 'error');
        }
      } catch (error) {
        console.error('Error during delete:', error);
        Swal.fire('Error', 'An error occurred while deleting the ProductVariantDetails', 'error');
      }
    }
  };

  const handleEdit = (ProductVariantDetailsId) => {
    setSelectedProductVariantDetailsId(ProductVariantDetailsId);
    createEditRef.current.click();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchProductVariantDetails(query);
  };

  const sortedProductVariantDetails = [...ProductVariantDetails].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedProductVariantDetails.length / itemsPerPage);
  const paginatedProductVariantDetails = sortedProductVariantDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>ProductVariantDetails List</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your ProductVariantDetails</h5>
        </div>
        <div className='col-sm-5' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <i className="fa fa-print text-primary fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Print button clicked!')} ></i>
          <i className="fa-solid fa-file-pdf text-danger fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer " onClick={() => alert('PDF button clicked!')} ></i>
          <i className="fa fa-file-excel-o fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Excel button clicked!')} style={{ color: 'green' }}></i>
          <Buton onClick={() => createRef.current.click()}>Add Product Variant</Buton>
        </div>
      </div>

      <div className="p-4 mt-4" style={{ backgroundColor: 'white', borderRadius: 5, border: '1px solid #d9d9d9' }}>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            style={{ maxWidth: '300px' }}
            value={searchQuery}
      
            onChange={handleSearch}
          />
        
          <button className="btn" style={{ backgroundColor: '#ff9f43', color: 'white', padding: '8px 10px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center' }}>
            <FaFilter size={16} />
          </button>
        </div>
        <hr />

        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Variant Details
                      <button onClick={() => handleSort('productName')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'productName' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Product Product Name
                      <button onClick={() => handleSort('productProductName')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'productProductName' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Measuring Units 
                      <button onClick={() => handleSort('measuringUnitsMeasuringUnitsName')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'measuringUnitsMeasuringUnitsName' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                     HS Code  
                      <button onClick={() => handleSort('hsCodeHSCodeName1')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'hsCodeHSCodeName1' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
         
                  <th scope="col" style={{ fontSize: 16, textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProductVariantDetails.map((ProductVariantDetails) => (
                  <tr key={ProductVariantDetails.id}>
                    <td style={{ fontSize: 16 }}>{ProductVariantDetails.productVariantDetailsName}</td>
                    <td style={{ fontSize: 16 }}>{ProductVariantDetails.productVariantMainProductName}</td>
                    <td style={{ fontSize: 16 }}>{ProductVariantDetails.variantDetailsVariantDetailsName}</td>
                    <td style={{ fontSize: 16 }}>{ProductVariantDetails.variantDetailsDescription}</td>
                    
                    <td style={{ fontSize: 16, textAlign: 'center' }}>
                      <div className="d-flex gap-2 justify-content-center">
                        <button className="btn" onClick={() => handleDelete(ProductVariantDetails.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <FaTrash size={16} title="Delete" color='red' />
                        </button>
                        <button className="btn" onClick={() => handleEdit(ProductVariantDetails.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <FaEdit size={16} title="Edit" color='#ff9f43' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn "
            style={{ backgroundColor: "#ff9f43", color: "white" }}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-3 align-self-center">Page {currentPage} of {totalPages}</span>
          <button
            className="btn "
            style={{ backgroundColor: "#ff9f43", color: "white" }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer/>
      <CreateProductVariantDetails open={createRef} close={refClose} onclick={fetchProductVariantDetails} />
      <EditProductVariantDetails open={createEditRef} close={refEditClose} selectedProductVariantDetailsId={selectedProductVariantDetailsId} onclick={fetchProductVariantDetails} onIdReset={handleIdReset}/>
    </div>
  );
}

export default ProductVariantDetails;
