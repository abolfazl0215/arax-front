/**
 * Local Tours Data
 * Contains special tours and regular tours available for booking
 */

export const specialTours = [
  {
    id: '1',
    title: 'Istanbul tour - January and February 2026',
    provider: 'Arax',
    airline: 'Iran airtour',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop',
    description: 'Experience the beauty of Istanbul with our special winter tour package.',
    duration: '7 days',
    location: 'Istanbul, Turkey',
  },
  {
    id: '2',
    title: 'Istanbul tour - March and April 2026',
    provider: 'Arax',
    airline: 'Iran airtour',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop',
    description: 'Spring tour to Istanbul with amazing weather and beautiful scenery.',
    duration: '7 days',
    location: 'Istanbul, Turkey',
  },
  {
    id: '3',
    title: 'Paris tour - May 2026',
    provider: 'Arax',
    airline: 'Air France',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    description: 'Discover the City of Light with our exclusive Paris tour.',
    duration: '5 days',
    location: 'Paris, France',
  },
  {
    id: '4',
    title: 'Tokyo tour - June 2026',
    provider: 'Arax',
    airline: 'Japan Airlines',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    description: 'Explore the vibrant culture and technology of Tokyo.',
    duration: '10 days',
    location: 'Tokyo, Japan',
  },
];

export const allTours = [
  ...specialTours,
  {
    id: '5',
    title: 'Dubai tour - Year round',
    provider: 'Arax',
    airline: 'Emirates',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    description: 'Luxury tour to Dubai with world-class accommodations.',
    duration: '6 days',
    location: 'Dubai, UAE',
  },
  {
    id: '6',
    title: 'Barcelona tour - Summer 2026',
    provider: 'Arax',
    airline: 'Iberia',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop',
    description: 'Experience the art and architecture of Barcelona.',
    duration: '5 days',
    location: 'Barcelona, Spain',
  },
];

