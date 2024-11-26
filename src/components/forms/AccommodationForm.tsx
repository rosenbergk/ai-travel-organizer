import React from 'react';
import { X } from 'lucide-react';
import type { Accommodation } from '../../types';

interface AccommodationFormProps {
  onSubmit: (accommodation: Omit<Accommodation, 'id'>) => void;
  onClose: () => void;
  initialData?: Accommodation;
}

export function AccommodationForm({ onSubmit, onClose, initialData }: AccommodationFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const accommodationData: Omit<Accommodation, 'id'> = {
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      checkIn: formData.get('checkIn') as string,
      checkOut: formData.get('checkOut') as string,
      confirmationNumber: (formData.get('confirmationNumber') as string) || undefined,
    };

    onSubmit(accommodationData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Accommodation' : 'Add Accommodation'}
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={initialData?.name}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              defaultValue={initialData?.address}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                Check-in Date
              </label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                required
                defaultValue={initialData?.checkIn}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                Check-out Date
              </label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                required
                defaultValue={initialData?.checkOut}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmationNumber" className="block text-sm font-medium text-gray-700">
              Confirmation Number (optional)
            </label>
            <input
              type="text"
              id="confirmationNumber"
              name="confirmationNumber"
              defaultValue={initialData?.confirmationNumber}
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
              {initialData ? 'Save Changes' : 'Add Accommodation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}