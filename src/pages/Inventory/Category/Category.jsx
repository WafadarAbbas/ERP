import React, { useRef, useState, useEffect } from 'react';
import { FaFilter, FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Buton from '../../../Compo/Buton';
import CreateCategory from './CreateCategory';
import ApiCall from '../../../Apicall/ApiCall';
import EditCategory from './EditCategory';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';

function Category() {
 
  // ================== STATE & REFS ==================
const createRef = useRef(null);           // Reference for create modal trigger
const refClose = useRef(null);            // Reference to close create modal
const createEditRef = useRef(null);       // Reference for edit modal trigger
const refEditClose = useRef(null);        // Reference to close edit modal

const [categories, setCategories] = useState([]);                 // List of product categories
const [sortColumn, setSortColumn] = useState('productCategoryName'); // Current sorting column
const [sortOrder, setSortOrder] = useState('asc');               // Sorting order: asc/desc
const [error, setError] = useState(null);                        // Error state for fetching
const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Currently selected category for edit
const [searchQuery, setSearchQuery] = useState('');              // Search input
 const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 6;  
// ================== UTILITY FUNCTIONS ==================

/**
 * Reset selected category ID to 0
 */
const handleIdReset = () => {
  setSelectedCategoryId(0);
};

/**
 * Fetch categories from API with optional search query
 */
const fetchCategories = async (query = '') => {
  try {
    const url = query
      ? `http://localhost:5022/api/v1/ProductCategory/GetProductCategoryByName?name=${query}&organizationId=1&companyId=1`
      : 'http://localhost:5022/api/v1/ProductCategory/GetAllAppModal/list?organizationId=1&companyId=1';

    const response = await ApiCall({ url, method: 'GET' });

    if (response?.data) {
      setCategories(response.data);
    } else {
      throw new Error('Failed to load categories.');
    }
  } catch (error) {
    setError(error.message || 'An error occurred while fetching data');
  }
};

/**
 * Triggers fetch with current search query
 */
const fetch = () => {
  fetchCategories(searchQuery);
};

/**
 * Handles sorting logic on column header click
 */
const handleSort = (column) => {
  const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  setSortColumn(column);
  setSortOrder(newSortOrder);
};

/**
 * Handles category deletion with confirmation
 */
const handleDelete = async (categoryId) => {
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
        url: `http://localhost:5022/api/v1/ProductCategory/DeleteProductCategory/${categoryId}?organizationId=1&companyId=1`,
        method: 'DELETE',
      });

      if (response?.status === 200 || response?.status === 204) {
        Swal.fire('Deleted', 'The category has been deleted.', 'success');
        setCategories(categories.filter(category => category.id !== categoryId));
      } else {
        Swal.fire('Error', 'Failed to delete category', 'error');
      }
    } catch (error) {
      console.error('Error during delete:', error);
      Swal.fire('Error', 'An error occurred while deleting the category', 'error');
    }
  }
};

/**
 * Opens edit modal and sets selected category
 */
const handleEdit = (categoryId) => {
  setSelectedCategoryId(categoryId);
  createEditRef.current.click(); // Simulates click to open modal
};

/**
 * Filters categories based on search input
 */
const handleSearch = (event) => {
  const query = event.target.value;
  setSearchQuery(query);
  fetchCategories(query);
};

// ================== EFFECT HOOKS ==================

/**
 * Load all categories on component mount
 */
useEffect(() => {
  fetchCategories();
}, []);

// ================== SORTED DATA ==================

/**
 * Sort categories based on selected column and order
 */
const sortedCategories = [...categories].sort((a, b) => {
  if (sortOrder === 'asc') {
    return a[sortColumn] > b[sortColumn] ? 1 : -1;
  } else {
    return a[sortColumn] < b[sortColumn] ? 1 : -1;
  }
});



// Calculate total pages
const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);

// Slice data for current page
const paginatedCategories = sortedCategories.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

// Pagination handler
const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages) {
    setCurrentPage(newPage);
  }
};

 

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Category List</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Categories</h5>
        </div>
        <div className='col-sm-5' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <i className="fa fa-print text-primary fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Print button clicked!')} ></i>
          <i className="fa-solid fa-file-pdf text-danger fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer " onClick={() => alert('PDF button clicked!')} ></i>
          <i className="fa fa-file-excel-o fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Excel button clicked!')} style={{ color: 'green' }}></i>
          <Buton onClick={() => createRef.current.click()}>Add Category</Buton>
        </div>
      </div>

      <div className="p-4 mt-4" style={{ backgroundColor: 'white', borderRadius: 5, border: '1px solid #d9d9d9' }}>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            value={searchQuery}
            onChange={handleSearch}
            style={{ maxWidth: '300px' }}
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
                      Category Name
                      <button onClick={() => handleSort('productCategoryName')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'productCategoryName' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 ,textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
             <tbody>
  {paginatedCategories.map((category) => (
    <tr key={category.id}>
      <td style={{ fontSize: 16 }}>{category.productCategoryName}</td>
      <td style={{ fontSize: 16, textAlign: 'center' }}>
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn" onClick={() => handleDelete(category.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <FaTrash size={16} title="Delete" color='red' />
          </button>
          <button className="btn" onClick={() => handleEdit(category.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
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
    className="btn"
    style={{ backgroundColor: "#ff9f43", color: "white" }}
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>
  <span className="mx-3 align-self-center">Page {currentPage} of {totalPages}</span>
  <button
    className="btn"
    style={{ backgroundColor: "#ff9f43", color: "white" }}
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>
      </div>
      <Footer/>
      <CreateCategory open={createRef} close={refClose} onclick={ fetch}   />
      <EditCategory open={createEditRef} close={refEditClose} selectedCategoryId={selectedCategoryId} onclick={ fetch} onIdReset={handleIdReset} />
    </div>
  );
}

export default Category;

