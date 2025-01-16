import React from 'react';

const ArticlesPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pet Care Articles</h1>
            <p className="mb-4">Explore our collection of articles to help you take care of your furry friends.</p>
            {/* Article list will be rendered here */}
        </div>
    );
};

export default ArticlesPage;