# FluffyPet

FluffyPet is a comprehensive pet services platform built with Next.js 13, providing a variety of features for pet owners, service providers, and volunteers. This application leverages Clerk for authentication, Vercel Postgres for database management, Notion for blob storage, Meilisearch Cloud for search functionality, and Google Maps for location services.

## Features

- **Authentication**: User registration and login using Clerk, with protected routes for authenticated users.
- **Home Page**: A welcoming interface with a search bar and quick access buttons for main features.
- **Responsive Navigation**: A navigation component with links to main sections and user menu options.
- **Services**: A dedicated page for listing various pet services, including booking options and reviews.
- **Veterinarians**: A page for available vets with individual profiles and booking options.
- **Pet-Friendly Places**: A page showcasing pet-friendly locations integrated with Google Maps.
- **Pet Profiles**: Users can create and manage profiles for their pets.
- **Booking System**: A system for managing service and vet appointment bookings.
- **Review System**: Users can leave reviews and ratings for services, vets, and places.
- **Volunteer Application**: A form for users to apply for volunteer opportunities.
- **Search Functionality**: Fast and relevant search results across services, vets, and places using Meilisearch.
- **Notifications**: A system for booking confirmations, reminders, and updates.
- **Articles/Blog**: A section for pet care articles and tips.
- **Admin Dashboard**: An interface for managing services, vets, places, and user accounts.
- **Responsive Design**: Fully responsive application for mobile devices.
- **Error Handling and Loading States**: Proper error handling and loading states throughout the application.
- **SEO Optimization**: Optimized for search engines using Next.js features.
- **Performance Optimization**: Code splitting and lazy loading for optimal performance.
- **Accessibility**: Follows WCAG guidelines for accessibility.
- **Environment Variables**: Uses environment variables for sensitive information and API keys.
- **Database Schema**: Designed with Prisma ORM for Vercel Postgres.
- **API Routes**: CRUD operations for services, vets, places, bookings, and reviews.
- **Testing**: Unit and integration tests for critical components.
- **Deployment**: Continuous deployment setup using Vercel.

## Getting Started

To get started with FluffyPet, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd fluffypet
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the necessary environment variables for Clerk, database connection, and other services.

### Running the Application

To run the application in development mode, use:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to see the application in action.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.