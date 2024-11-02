import React, { useState, useEffect } from 'react';
import {
    createuser,
    getAlluser,
    updateuser,
    deleteuser,
} from '../http/contactApi'; // Adjust the import according to your API location
import '../style/ProductBuyForm.css'; // Import the CSS file

const UserForm = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', post: '', img: null }); // State for new user

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const data = await getAlluser();
        setUsers(data);
    };

    const handleUserChange = (id, field, value) => {
        setUsers(users.map(user => 
            user.id === id ? { ...user, [field]: value } : user
        ));
    };

    const handleNewUserChange = (field, value) => {
        setNewUser(prevState => ({ ...prevState, [field]: value }));
    };

    const handleUserSubmit = async (user) => {
        const userFormData = new FormData();
        userFormData.append('name', user.name);
        userFormData.append('post', user.post);
        if (user.img) userFormData.append('img', user.img);

        if (user.id) {
            await updateuser(user.id, userFormData); // Update existing user
        } else {
            await createuser(userFormData); // Create new user
        }

        fetchUsers(); // Refresh the user list after submission
    };

    const handleDeleteUser = async (id) => {
        await deleteuser(id);
        fetchUsers(); // Refresh the user list
    };

    return (
        <div className="userForm_container">
            <h2>Добавить нового сотрудника</h2>
            <input
                type="text"
                value={newUser.name}
                onChange={(e) => handleNewUserChange('name', e.target.value)}
                placeholder="Имя"
            />
            <input
                type="text"
                value={newUser.post}
                onChange={(e) => handleNewUserChange('post', e.target.value)}
                placeholder="Должность"
            />
            <input
                type="file"
                onChange={(e) => handleNewUserChange('img', e.target.files[0])} // Handle image upload
            />
            <button onClick={() => handleUserSubmit(newUser)}>Добавить сотрудника</button>

            <h2>Сотрудники</h2>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => handleUserChange(user.id, 'name', e.target.value)}
                            placeholder="Имя"
                        />
                        <input
                            type="text"
                            value={user.post}
                            onChange={(e) => handleUserChange(user.id, 'post', e.target.value)}
                            placeholder="Должность"
                        />
                        <input
                            type="file"
                            onChange={(e) => handleUserChange(user.id, 'img', e.target.files[0])} // Handle image upload
                        />
                        <button onClick={() => handleUserSubmit(user)}>Сохранить</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserForm;
