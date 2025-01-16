export const handler = async (req, res) => {
    switch (req.method) {
        case 'GET':
            // Handle GET requests for fetching data
            res.status(200).json({ message: 'GET request successful' });
            break;
        case 'POST':
            // Handle POST requests for creating new entries
            res.status(201).json({ message: 'POST request successful' });
            break;
        case 'PUT':
            // Handle PUT requests for updating existing entries
            res.status(200).json({ message: 'PUT request successful' });
            break;
        case 'DELETE':
            // Handle DELETE requests for removing entries
            res.status(204).json({ message: 'DELETE request successful' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};