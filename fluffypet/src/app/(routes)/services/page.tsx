import React from 'react';

const ServicesPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pet Services</h1>
            <p className="mb-4">Explore various pet services available for your furry friends.</p>
            <ul className="list-disc pl-5">
                <li>
                    <a href="/services/grooming" className="text-blue-500 hover:underline">Grooming</a>
                </li>
                <li>
                    <a href="/services/training" className="text-blue-500 hover:underline">Training</a>
                </li>
                <li>
                    <a href="/services/walking" className="text-blue-500 hover:underline">Walking</a>
                </li>
                {/* Add more services as needed */}
            </ul>
        </div>
    );
};

export default ServicesPage;