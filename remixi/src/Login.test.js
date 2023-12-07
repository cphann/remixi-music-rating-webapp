import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {
    // Renders login form with all fields and text
    it('renders login form with all fields and text', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByText(/login/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    // Allows entering a username
    it('allows entering a username', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const usernameInput = screen.getByPlaceholderText('Username');
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        expect(usernameInput.value).toBe('testuser');
    });

    // Allows entering a password
    it('allows entering a password', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(passwordInput.value).toBe('password123');
    });

    it('displays an error message for incorrect credentials', async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        // Fill in the username and password fields
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'n' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '1234567899' } });

        // Click the sign-in button
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        // Check for the error message
        const errorMessage = await screen.findByText(/Invalid credentials/i);
        expect(errorMessage).toBeInTheDocument();
    });
});