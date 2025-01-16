export function requireAuth(req, res, next) {
    // Check if the user is authenticated
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}

export function logRequest(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}