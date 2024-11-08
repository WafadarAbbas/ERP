import React, { useRef, useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { useTestPanel } from '../../Compo/TestPanelContext';
import { TestPanel, TestPanelHeader, TestPanelBody, TestPanelFooter } from '../../Compo/TestPanel';
import Footer from '../../Compo/Footer';
import CreateUser from './createUser';
import ApiCall from '../../Apicall/ApiCall';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';  
import 'bootstrap-icons/font/bootstrap-icons.css';  
import EditUser from './EditUser';
 
const Users = () => {
    const navigate = useNavigate();
    const createRef = useRef(null);
    const refClose = useRef(null);
    const editRef = useRef(null);  
    const editClose = useRef(null); 
    const { MaxResultCount } = useTestPanel();
    const [skipCount, setSkipCount] = useState(0);
    const [users, setUsers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [keyword, setKeyword] = useState('');   
    const [selectedUserId, setSelectedUserId] = useState(null);
    const debouncedKeyword = useRef(_.debounce((value) => setKeyword(value), 300)).current;  // Debounced function
    
    const fetchUsers = async () => {
        const response = await ApiCall({
            url: `https://localhost:44311/api/services/app/User/GetAll?skipCount=${skipCount}&maxResultCount=${MaxResultCount}&Keyword=${keyword}`,
            method: 'GET',
        });

        if (response?.data?.result) {
            setUsers(response.data.result.items);
            setTotalCount(response.data.result.totalCount);
        } else {
            Swal.fire('Error', 'Failed to fetch users', 'error');
        }
    };

    useEffect(() => {
        fetchUsers(keyword); 
    }, [skipCount, MaxResultCount, keyword]);

    const handlePrevious = () => {
        if (skipCount > 0) {
            setSkipCount(skipCount - MaxResultCount);
        }
    };

    const handleNext = () => {
        if (skipCount + MaxResultCount < totalCount) {
            setSkipCount(skipCount + MaxResultCount);
        }
    };

    const handleClick = () => {
        refClose.current.click();
    };

    const handleEdit = (userId) => {
        setSelectedUserId(userId);  
        editRef.current.click();  
    };

    const handleDelete = async (userId) => {
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
                    url: `https://localhost:44311/api/services/app/User/Delete?Id=${userId}`,
                    method: 'DELETE',
                });
    
              
                console.log('Delete response:', response);
    
                 
                if (response?.data?.success || response?.status === 200) {
                    Swal.fire('Deleted');
                    fetchUsers();  
                } else {
                    Swal.fire('Error', 'Failed to delete user', 'error');
                }
            } catch (error) {
                console.error('Error during delete:', error);
                Swal.fire('Error', 'An error occurred while deleting the user', 'error');
            }
        }
    };
 
    const fetch = () => {
    fetchUsers();
    };


    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                <h1 className="mb-0">Users</h1>
            </div>

            <div className="bg-white p-3 rounded-3 border">
                <div className="row mb-3">
                    <div className="col-md-8">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => {
                                createRef.current.click();
                            }}
                        >
                            <i></i>
                            Create new
                        </button>
                    </div>
                    <div className="col-md-4 d-flex">
                        <div className="input-group">
                            <span className="input-group-text bg-primary text-white">
                                <i className="bi bi-funnel"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search users..."
                                onChange={(e) => debouncedKeyword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <hr className="line-separator mb-3" />

                <TestPanel>
                    <TestPanelHeader>Users</TestPanelHeader>
                    <TestPanelBody>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Active</th>
                                        <th>Created</th>
                                        <th>Actions</th>  
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.fullName}</td>
                                            <td>{user.emailAddress}</td>
                                            <td>{user.roleNames.join(', ')}</td>
                                            <td>{user.isActive ? 'Yes' : 'No'}</td>
                                            <td>{new Date(user.creationTime).toLocaleDateString()}</td>
                                            <td>
                                            <button
                                                    className="btn btn-secondary me-2"
                                                    onClick={() => handleEdit(user.id)} // Handle edit button click
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </TestPanelBody>
                    <TestPanelFooter>
                        <div className="d-flex justify-content-between align-items-center p-3">
                            <button
                                className="btn"
                                style={{ border: '1px solid #c9c9c9' }}
                                onClick={handlePrevious}
                                disabled={skipCount === 0}
                            >
                                <i className="bi bi-arrow-left"></i> Previous
                            </button>
                            <button
                                className="btn"
                                style={{ border: '1px solid #c9c9c9' }}
                                onClick={handleNext}
                                disabled={skipCount + MaxResultCount >= totalCount}
                            >
                                <i className="bi bi-arrow-right"></i> Next
                            </button>
                        </div>
                    </TestPanelFooter>
                </TestPanel>
            </div>
            <CreateUser open={createRef} close={refClose} onclick={ fetch}  />
            <EditUser userId={selectedUserId} open={editRef} close={editClose} />
            <Footer />
        </div>
    );
};

export default Users;
