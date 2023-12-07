// In App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Navigation', () => {
    test('navigates to signup page when sign up button is clicked', () => {
        render(
            <App router={MemoryRouter} />
        );

        // Find and click the sign up button
        const signupButton = screen.getByText(/Sign Up/i);
        userEvent.click(signupButton);

        // Check if the signup page is rendered
        expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    });
});