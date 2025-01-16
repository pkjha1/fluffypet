import React from 'react';

const VolunteerPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Volunteer with FluffyPet</h1>
            <p className="mb-4">We appreciate your interest in volunteering with us! Please fill out the form below to apply.</p>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <input type="text" id="name" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input type="email" id="email" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium">Why do you want to volunteer?</label>
                    <textarea id="message" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows={4}></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit Application</button>
            </form>
        </div>
    );
};

export default VolunteerPage;