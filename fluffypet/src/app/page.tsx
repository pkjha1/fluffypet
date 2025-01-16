export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to FluffyPet!</h1>
            <p className="text-lg mb-8">Your one-stop platform for all pet services.</p>
            <div className="mb-6">
                <SearchBar />
            </div>
            <div className="flex space-x-4">
                <Button label="Find Services" />
                <Button label="Find Vets" />
                <Button label="Explore Places" />
                <Button label="Volunteer" />
            </div>
        </div>
    );
}

function SearchBar() {
    return (
        <input
            type="text"
            placeholder="Search for services, vets, or places..."
            className="p-2 border border-gray-300 rounded"
        />
    );
}

function Button({ label }) {
    return (
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {label}
        </button>
    );
}