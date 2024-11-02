import React, { useState, useEffect } from 'react';
import { createinfo, getAllinfo, updateinfo, deleteinfo } from '../http/contactApi';
import '../style/ProductBuyForm.css'; // Import the CSS file for styles

const ContactForm = () => {
    const [contacts, setContacts] = useState([]);
    const [currentContact, setCurrentContact] = useState({ name: '', adress: '', telephone: '', email: '', id: null }); // Fixed initial state
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        const data = await getAllinfo();
        setContacts(data);
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            id: currentContact.id,
            name: e.target.name.value,
            adress: e.target.adress.value, // Ensure this matches the state
            telephone: e.target.telephone.value,
            email: e.target.email.value,
        };

        if (currentContact.id) {
            await updateinfo(formData.id, formData);
        } else {
            await createinfo(formData);
        }

        resetForm();
        fetchContacts();
    };

    const handleEditContact = (contact) => {
        setCurrentContact(contact);
        setIsEditing(true);
    };

    const handleDeleteContact = async (id) => {
        await deleteinfo(id);
        fetchContacts();
    };

    const resetForm = () => {
        setCurrentContact({ name: '', adress: '', telephone: '', email: '', id: null }); // Reset the form fields
        setIsEditing(false);
    };

    return (
        <div className="userForm_container">
            <h2>{isEditing ? 'Редактировать контакт' : 'Добавить контакт'}</h2>
            <form onSubmit={handleContactSubmit}>
                <div className="userForm_group">
                    <label htmlFor="name">Имя</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={currentContact.name}
                        onChange={(e) => setCurrentContact({ ...currentContact, name: e.target.value })}
                        required
                    />
                </div>
                <div className="userForm_group">
                    <label htmlFor="adress">Адрес</label>
                    <input
                        type="text"
                        name="adress" // Ensure this matches the state
                        id="adress"
                        value={currentContact.adress} // Fixed to address
                        onChange={(e) => setCurrentContact({ ...currentContact, adress: e.target.value })}
                        required
                    />
                </div>
                <div className="userForm_group">
                    <label htmlFor="telephone">Телефон</label>
                    <input
                        type="tel"
                        name="telephone"
                        id="telephone"
                        value={currentContact.telephone}
                        onChange={(e) => setCurrentContact({ ...currentContact, telephone: e.target.value })}
                        required
                    />
                </div>
                <div className="userForm_group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={currentContact.email}
                        onChange={(e) => setCurrentContact({ ...currentContact, email: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="userForm_submitButton">
                    {isEditing ? 'Обновить' : 'Добавить контакт'}
                </button>
                {isEditing && <button type="button" onClick={resetForm}>Отмена</button>}
            </form>
            <h2>Список контактов</h2>
            <ul className="user-list">
                {contacts.map(contact => (
                    <li key={contact.id} className="user-item">
                        {contact.name} - {contact.address} - {contact.telephone} - {contact.email}
                        <button onClick={() => handleEditContact(contact)}>Редактировать</button>
                        <button onClick={() => handleDeleteContact(contact.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactForm;
