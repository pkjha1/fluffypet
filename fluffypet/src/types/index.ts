export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

export interface Pet {
    id: string;
    name: string;
    type: string; // e.g., dog, cat
    breed: string;
    age: number;
    medicalInfo?: string;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    bookingUrl: string;
}

export interface Vet {
    id: string;
    name: string;
    specialties: string[];
    availability: string;
    rating: number;
}

export interface Place {
    id: string;
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
    reviews: Review[];
}

export interface Review {
    id: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

export interface Booking {
    id: string;
    userId: string;
    serviceId: string;
    vetId?: string;
    date: Date;
    status: 'confirmed' | 'pending' | 'canceled';
}