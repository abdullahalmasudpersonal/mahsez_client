import React from 'react';
import './AllUsers.css';
import { toast } from 'react-toastify';

const UserRow = ({ user, index, refetch }) => {
    const { email, role } = user;

    const makeAdmin = () => {
        const proceed = window.confirm(`Are You Sure Create Admin ${email}`);
        if (proceed) {
            fetch(`http://localhost:5000/user/admin/${email}`, {
                method: 'PUT',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 403) {
                        toast.error('Field to create an admin');
                    }
                    return res.json()
                })
                .then(data => {
                    if (data.result.modifiedCount > 0) {
                        refetch();
                        toast.success('Successfully create an admin');
                    }
                });
        }
    };

    return (
        <>
            <tr>
                <th scope="row">{index + 1}</th>

                <td>{email}</td>

                <td> {role !== 'admin' && <button onClick={makeAdmin} className='create-admin-btn px-2 py-1'>Create Admin</button>}</td>

                <td>{role === 'admin' && <p className='text-success fw-bold'></p>}7:48 PM<br />Friday, April 14, 2023 </td>

                <td className='text-end '><button /* onClick={() => handleUserDelete(order._id)} */ className=' delete-user-btn px-2 py-1'>Delete</button></td>
            </tr>
        </>
    );
};

export default UserRow;
