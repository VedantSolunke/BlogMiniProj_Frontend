import React, { useState } from 'react';

export default function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function register(ev) {
        ev.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const userData = {
            fullName,
            username,
            email,
            phoneNo,
            password,
            confirmPassword, // Include confirmPassword in the request for server-side validation
        };

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            alert('Registration successful');
        } else {
            const errorData = await response.json();
            alert(`Registration failed: ${errorData.error}`);
        }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={ev => setFullName(ev.target.value)}
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={ev => setUsername(ev.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={ev => setEmail(ev.target.value)}
            />
            <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNo}
                onChange={ev => setPhoneNo(ev.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={ev => setConfirmPassword(ev.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    );
}
