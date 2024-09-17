import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import './UserList.css';
import { fetchUserData } from '../BackendCalls';

const UserList = ({ courseId }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUserData(courseId);
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    const handleMoreInfo = (user) => {
        setSelectedUser(user);
    };

    const handleClose = () => {
        setSelectedUser(null);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching data: {error.message}</p>;
    }

    return (
        <div>
    <h3>User List</h3>
    <ul className="user-list">
        {users.map(user => (
            <li key={user.id} className="user-item">
                <div className="user-info">
                    <span className="user-name">{user.firstName} {user.lastName}</span>
                    <span className="user-email">       ({user.email})</span>
                    <button onClick={() => handleMoreInfo(user)}>More Info</button>
                </div>
            </li>
        ))}
    </ul>
    {selectedUser && <UserDetails user={selectedUser} onClose={handleClose} />}
</div>

    );
};

export default UserList;
