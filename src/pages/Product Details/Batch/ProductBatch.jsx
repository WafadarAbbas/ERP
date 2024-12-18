
import React, { useRef, useState, useEffect } from 'react';
import { FaFilter, FaEdit, FaTrash, FaArrowUp, FaArrowDown ,FaSync} from 'react-icons/fa';
import Buton from '../../../Compo/Buton';
import CreateProductBatch from './CreateProductBatch';
import ApiCall from '../../../Apicall/ApiCall';
import EditProductBatch from './EditProductBatch';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';

function ProductBatch() {
  const createRef = useRef(null);
  const refClose = useRef(null);
  const createEditRef = useRef(null);
  const refEditClose = useRef(null);

  const [Batch, setBatch] = useState([]);
  const [sortColumn, setSortColumn] = useState('productBatchNumber');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);
  const [selectedProductBatchId, setSelectedProductBatchId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 6;

  const fetchProductBatch = async (query = '') => {
    try {
      const url = query
        ? `http://localhost:5022/api/v1/ProductBatch/GetProductBatchByName?name=${query}&organizationId=1&companyId=1`
        : `http://localhost:5022/api/v1/ProductBatch/GetAllAppModal/list?organizationId=1&companyId=1`;

      const response = await ApiCall({
        url: url,
        method: 'GET',
      });

      if (response && response.data) {
        setBatch(response.data);
      } else {
        throw new Error('Failed to load Batch.');     
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data');
    }
  };

  useEffect(() => {
    fetchProductBatch();
  }, []);

 
  const handleRefresh = () => {
    window.location.reload();   
  };

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleDelete = async (ProductBatchId) => {
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
          url: `http://localhost:5022/api/v1/ProductBatch/DeleteProductBatch/${ProductBatchId}?organizationId=1&companyId=1`,
          method: 'DELETE',
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire('Deleted', 'The ProductBatch has been deleted.', 'success');
          setBatch(Batch.filter(ProductBatch => ProductBatch.id !== ProductBatchId));
        } else {
          Swal.fire('Error', 'Failed to delete ProductBatch', 'error');
        }
      } catch (error) {
        console.error('Error during delete:', error);
        Swal.fire('Error', 'An error occurred while deleting the ProductBatch', 'error');
      }
    }
  };

  const handleEdit = (ProductBatchId) => {
    setSelectedProductBatchId(ProductBatchId);
    createEditRef.current.click();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchProductBatch(query);
  };

  const sortedBatch = [...Batch].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedBatch.length / itemsPerPage);
  const paginatedBatch = sortedBatch.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>ProductBatch List</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Batch</h5>
        </div>
        <div className='col-sm-5' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <i className="fa fa-print text-primary fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Print button clicked!')} ></i>
          <i className="fa-solid fa-file-pdf text-danger fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer " onClick={() => alert('PDF button clicked!')} ></i>
          <i className="fa fa-file-excel-o fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Excel button clicked!')} style={{ color: 'green' }}></i>
          <Buton onClick={() => createRef.current.click()}>Add   Batch</Buton>
        </div>
      </div>

      <div className="p-4 mt-4" style={{ backgroundColor: 'white', borderRadius: 5, border: '1px solid #d9d9d9' }}>
        <div className="d-flex justify-content-between align-items-center">
          <input
            Batch="text"
            placeholder="Search..."
            className="form-control"
            style={{ maxWidth: '300px' }}
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="d-flex justify-content-between align-items-center ">
            <button  onClick={handleRefresh} className="btn me-2" style={{ backgroundColor: '#ff9f43', color: 'white', padding: '8px 10px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center' }}>
            <FaSync  size={16} />
          </button>
          <button className="btn" style={{ backgroundColor: '#ff9f43', color: 'white', padding: '8px 10px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center' }}>
            <FaFilter size={16} />
          </button>
          </div>
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
                       Batch Name
                      <button onClick={() => handleSort('productBatchNumber')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'productBatchNumber' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                     Batch Code
                      <button onClick={() => handleSort('productBatchCode')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'productBatchCode' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Batch Detils
                      <button onClick={() => handleSort('productBatchDetils')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'productBatchDetils' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  
                  
                  <th scope="col" style={{ fontSize: 16, textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBatch.map((ProductBatch) => (
                  <tr key={ProductBatch.id}>
                    <td style={{ fontSize: 16 }}>{ProductBatch.productBatchNumber}</td>
                    <td style={{ fontSize: 16 }}>{ProductBatch.productBatchCode}</td>
                    <td style={{ fontSize: 16 }}>{ProductBatch.productBatchDetils}</td>
                    <td style={{ fontSize: 16, textAlign: 'center' }}>
                      <div className="d-flex gap-2 justify-content-center">
                        <button className="btn" onClick={() => handleDelete(ProductBatch.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <FaTrash size={16} title="Delete" color='red' />
                        </button>
                        <button className="btn" onClick={() => handleEdit(ProductBatch.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
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
      <CreateProductBatch open={createRef} close={refClose} onclick={fetchProductBatch} />
      <EditProductBatch open={createEditRef} close={refEditClose} selectedProductBatchId={selectedProductBatchId} onclick={fetchProductBatch} />
    </div>
  );
}

export default ProductBatch;
