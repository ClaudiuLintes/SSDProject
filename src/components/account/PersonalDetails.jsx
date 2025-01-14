import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase'; // Import Firebase auth and Firestore
import '../../css/account/PersonalDetails.css';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const PersonalDetails = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const user = auth.currentUser;

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setFirstName(data.firstName || '');
                        setLastName(data.lastName || '');
                        setAddress(data.address || '');
                        setPhone(data.phone || '');
                        setEmail(data.email || '');
                    } else {
                        console.log('No such document!');
                    }
                } catch (error) {
                    console.error('Error fetching document:', error);
                    setErrorMessage('Failed to load your personal details.');
                }
            }
        };
        fetchData();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setErrorMessage('User not logged in.');
            return;
        }

        const docRef = doc(db, 'users', user.uid);

        try {
            await setDoc(
                docRef,
                {
                    firstName,
                    lastName,
                    address,
                    phone,
                    email,
                },
                { merge: true } // Merge with existing data
            );
            setSuccessMessage('Personal details updated successfully!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error updating document:', error);
            setErrorMessage('Failed to update your personal details.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="personalDetails-container">
            <h1>Personal Details</h1>
            <form onSubmit={handleSubmit}>
                <div className="personalDetails-form-group">
                    <label>
                        <h2>First Name</h2>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <label>
                        <h2>Last Name</h2>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                </div>
                <div className="personalDetails-form-group">
                    <label>
                        <h2>Address</h2>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                </div>
                <div className="personalDetails-form-group">
                    <label>
                        <h2>Phone</h2>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </label>
                </div>
                <div className="personalDetails-form-group">
                    <label>
                        <h2>Email</h2>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit" className="personalDetails-submit-button">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default PersonalDetails;
