import React from 'react';
import { X } from 'lucide-react';
import type { Trip } from '../types';

interface TripFormProps {
  onSubmit: (trip: Omit<Trip, 'id'>) => void;
  onClose: () => void;
  initialData?: Trip;
}

export function TripForm({ onSubmit, onClose, initialData }: TripFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const tripData: Omit<Trip, 'id'> = {
      destination: formData.get('destination') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      image: formData.get('image') as string || 
        `https://source.unsplash.com/featured/1600x900/?${encodeURIComponent(formData.get('destination') as string)}`,
      flights: [],
      accommodations: [],
      activities: [],
      todos: []
    };

    onSubmit(tripData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Trip' : 'Add New Trip'}
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
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              required
              defaultValue={initialData?.destination}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              required
              defaultValue={initialData?.startDate}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              required
              defaultValue={initialData?.endDate}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL (optional)
            </label>
            <input
              type="url"
              id="image"
              name="image"
              defaultValue={initialData?.image}
              placeholder="Leave empty for automatic image"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
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
              {initialData ? 'Save Changes' : 'Add Trip'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}