import React, { useState } from 'react';
import { ClerkProvider, useSignUp } from '@clerk/clerk-react';
import { useRouter } from 'next/router';

const SignUp: React.FC = () => {
    const { signUp, isLoaded } = useSignUp();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await signUp.create({
                emailAddress: email,
                password,
                firstName,
                lastName,
            });
            await signUp.prepareEmailAddressVerification();
            router.push('/auth/sign-in');
        } catch (err) {
            setError('Failed to sign up. Please try again.');
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Sign Up</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="border p-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border p-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border p-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Sign Up
                </button>
            </form>
            <p className="mt-4">
                Already have an account? <a href="/auth/sign-in" className="text-blue-500">Sign In</a>
            </p>
        </div>
    );
};

export default SignUp;