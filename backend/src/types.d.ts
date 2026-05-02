export interface User {
    _id: string;
    email: string;
    password: string;
    displayName: string;
    token: string;
    role: 'user' | 'admin';
}

export interface Place {
    _id: string;
    user: string;
    title: string;
    description: string;
    mainImage: string;
}

export interface Review {
    _id: string;
    user: string;
    place: string;
    text: string;
    foodQuality: number;
    serviceQuality: number;
    interior: number;
    createdAt: string;
}

export interface Image {
    _id: string;
    user: string;
    place: string;
    image: string;
}