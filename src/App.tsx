import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TripCard } from './components/TripCard';
import { TripDetail } from './components/TripDetail';
import { TripForm } from './components/TripForm';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Trip } from './types';

const initialTrips: Trip[] = [
  {
    id: '1',
    destination: 'Paris, France',
    startDate: '2024-06-15',
    endDate: '2024-06-22',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80',
    flights: [
      {
        id: 'f1',
        airline: 'Air France',
        flightNumber: 'AF123',
        departure: 'JFK',
        arrival: 'CDG',
        departureTime: '2024-06-15T22:00:00',
        arrivalTime: '2024-06-16T11:30:00',
      },
    ],
    accommodations: [
      {
        id: 'a1',
        name: 'Le Petit Hotel',
        checkIn: '2024-06-15',
        checkOut: '2024-06-22',
        address: '123 Rue de Rivoli, Paris',
      },
    ],
    activities: [
      {
        id: 'act1',
        name: 'Eiffel Tower Visit',
        date: '2024-06-16',
        time: '10:00 AM',
        location: 'Champ de Mars',
      },
    ],
    todos: [
      {
        id: 't1',
        task: 'Exchange currency',
        completed: false,
      },
      {
        id: 't2',
        task: 'Buy travel insurance',
        completed: true,
      },
    ],
  },
];

function App() {
  const [trips, setTrips] = useLocalStorage<Trip[]>('trips', initialTrips);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const selectedTrip = trips.find((trip) => trip.id === selectedTripId);

  const handleAddTrip = (tripData: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: crypto.randomUUID(),
    };
    setTrips([...trips, newTrip]);
    setIsFormOpen(false);
  };

  const handleUpdateTrip = (updatedTrip: Trip) => {
    setTrips(trips.map((trip) => 
      trip.id === updatedTrip.id ? updatedTrip : trip
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isFormOpen && (
        <TripForm
          onSubmit={handleAddTrip}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {selectedTrip ? (
        <TripDetail
          trip={selectedTrip}
          onBack={() => setSelectedTripId(null)}
          onUpdate={handleUpdateTrip}
        />
      ) : (
        <div className="mx-auto max-w-[2000px] p-6">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add New Trip
            </button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onClick={() => setSelectedTripId(trip.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;