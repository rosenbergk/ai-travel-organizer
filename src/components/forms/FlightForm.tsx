import React from 'react';
import { X } from 'lucide-react';
import type { Flight } from '../../types';

interface FlightFormProps {
  onSubmit: (flight: Omit<Flight, 'id'>) => void;
  onClose: () => void;
  initialData?: Flight;
}

export function FlightForm({ onSubmit, onClose, initialData }: FlightFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const flightData: Omit<Flight, 'id'> = {
      airline: formData.get('airline') as string,
      flightNumber: formData.get('flightNumber') as string,
      departure: formData.get('departure') as string,
      arrival: formData.get('arrival') as string,
      departureTime: formData.get('departureTime') as string,
      arrivalTime: formData.get('arrivalTime') as string,
    };

    onSubmit(flightData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Flight' : 'Add Flight'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="airline" className="block text-sm font-medium text-gray-700">
              Airline
            </label>
            <input
              type="text"
              id="airline"
              name="airline"
              required
              defaultValue={initialData?.airline}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700">
              Flight Number
            </label>
            <input
              type="text"
              id="flightNumber"
              name="flightNumber"
              required
              defaultValue={initialData?.flightNumber}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="departure" className="block text-sm font-medium text-gray-700">
                Departure Airport
              </label>
              <input
                type="text"
                id="departure"
                name="departure"
                required
                defaultValue={initialData?.departure}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="arrival" className="block text-sm font-medium text-gray-700">
                Arrival Airport
              </label>
              <input
                type="text"
                id="arrival"
                name="arrival"
                required
                defaultValue={initialData?.arrival}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700">
                Departure Time
              </label>
              <input
                type="datetime-local"
                id="departureTime"
                name="departureTime"
                required
                defaultValue={initialData?.departureTime}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700">
                Arrival Time
              </label>
              <input
                type="datetime-local"
                id="arrivalTime"
                name="arrivalTime"
                required
                defaultValue={initialData?.arrivalTime}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {initialData ? 'Save Changes' : 'Add Flight'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}