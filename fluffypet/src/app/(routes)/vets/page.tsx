import React from 'react';

const VetsPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Available Veterinarians</h1>
            <p className="mb-4">Here you can find a list of veterinarians available for your pets.</p>
            {/* List of veterinarians will be rendered here */}
        </div>
    );
};

export default VetsPage;