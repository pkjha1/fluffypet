import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/nextjs';

const SignIn = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Sign In to FluffyPet</h1>
            <ClerkSignIn
                path="/sign-in"
                routing="path"
                signInUrl="/sign-in"
                afterSignInUrl="/"
                appearance={{
                    elements: {
                        formField: 'border border-gray-300 rounded-md p-2',
                        button: 'bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600',
                    },
                }}
            />
        </div>
    );
};

export default SignIn;