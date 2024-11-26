import React from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin } from 'lucide-react';
import type { Trip } from '../types';

interface TripCardProps {
  trip: Trip;
  onClick: (id: string) => void;
}

export function TripCard({ trip, onClick }: TripCardProps) {
  return (
    <div
      onClick={() => onClick(trip.id)}
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl cursor-pointer"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={trip.image}
          alt={trip.destination}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{trip.destination}</h3>
        <div className="mt-2 flex items-center text-gray-600">
          <Calendar className="mr-2 h-4 w-4" />
          <span className="text-sm">
            {format(new Date(trip.startDate), 'MMM d')} -{' '}
            {format(new Date(trip.endDate), 'MMM d, yyyy')}
          </span>
        </div>
        <div className="mt-1 flex items-center text-gray-600">
          <MapPin className="mr-2 h-4 w-4" />
          <span className="text-sm">{trip.destination}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}