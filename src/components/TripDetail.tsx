import React, { useState } from 'react';
import { format } from 'date-fns';
import { ArrowLeft, Plane, Hotel, Map, CheckSquare, Plus, Edit2, Trash2 } from 'lucide-react';
import type { Trip, Flight, Accommodation, Activity, Todo } from '../types';
import { FlightForm } from './forms/FlightForm';
import { AccommodationForm } from './forms/AccommodationForm';
import { ActivityForm } from './forms/ActivityForm';
import { TodoForm } from './forms/TodoForm';

interface TripDetailProps {
  trip: Trip;
  onBack: () => void;
  onUpdate: (updatedTrip: Trip) => void;
}

type FormType = 'flight' | 'accommodation' | 'activity' | 'todo' | null;
type EditingItem = { type: FormType; id: string } | null;

export function TripDetail({ trip, onBack, onUpdate }: TripDetailProps) {
  const [activeForm, setActiveForm] = useState<FormType>(null);
  const [editingItem, setEditingItem] = useState<EditingItem>(null);

  const handleAddFlight = (flight: Omit<Flight, 'id'>) => {
    onUpdate({
      ...trip,
      flights: [...(trip.flights || []), { ...flight, id: crypto.randomUUID() }],
    });
    setActiveForm(null);
  };

  const handleEditFlight = (flight: Flight) => {
    onUpdate({
      ...trip,
      flights: trip.flights?.map((f) => (f.id === flight.id ? flight : f)),
    });
    setEditingItem(null);
  };

  const handleDeleteFlight = (id: string) => {
    if (confirm('Are you sure you want to delete this flight?')) {
      onUpdate({
        ...trip,
        flights: trip.flights?.filter((f) => f.id !== id),
      });
    }
  };

  const handleAddAccommodation = (accommodation: Omit<Accommodation, 'id'>) => {
    onUpdate({
      ...trip,
      accommodations: [...(trip.accommodations || []), { ...accommodation, id: crypto.randomUUID() }],
    });
    setActiveForm(null);
  };

  const handleEditAccommodation = (accommodation: Accommodation) => {
    onUpdate({
      ...trip,
      accommodations: trip.accommodations?.map((a) => (a.id === accommodation.id ? accommodation : a)),
    });
    setEditingItem(null);
  };

  const handleDeleteAccommodation = (id: string) => {
    if (confirm('Are you sure you want to delete this accommodation?')) {
      onUpdate({
        ...trip,
        accommodations: trip.accommodations?.filter((a) => a.id !== id),
      });
    }
  };

  const handleAddActivity = (activity: Omit<Activity, 'id'>) => {
    onUpdate({
      ...trip,
      activities: [...(trip.activities || []), { ...activity, id: crypto.randomUUID() }],
    });
    setActiveForm(null);
  };

  const handleEditActivity = (activity: Activity) => {
    onUpdate({
      ...trip,
      activities: trip.activities?.map((a) => (a.id === activity.id ? activity : a)),
    });
    setEditingItem(null);
  };

  const handleDeleteActivity = (id: string) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      onUpdate({
        ...trip,
        activities: trip.activities?.filter((a) => a.id !== id),
      });
    }
  };

  const handleAddTodo = (todo: Omit<Todo, 'id'>) => {
    onUpdate({
      ...trip,
      todos: [...(trip.todos || []), { ...todo, id: crypto.randomUUID() }],
    });
    setActiveForm(null);
  };

  const handleEditTodo = (todo: Todo) => {
    onUpdate({
      ...trip,
      todos: trip.todos?.map((t) => (t.id === todo.id ? todo : t)),
    });
    setEditingItem(null);
  };

  const handleDeleteTodo = (id: string) => {
    if (confirm('Are you sure you want to delete this todo?')) {
      onUpdate({
        ...trip,
        todos: trip.todos?.filter((t) => t.id !== id),
      });
    }
  };

  const handleToggleTodo = (todoId: string) => {
    onUpdate({
      ...trip,
      todos: trip.todos?.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Dashboard
      </button>

      <div className="relative h-64 overflow-hidden rounded-xl">
        <img
          src={trip.image}
          alt={trip.destination}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 p-6 text-white">
          <h1 className="text-3xl font-bold">{trip.destination}</h1>
          <p className="mt-2">
            {format(new Date(trip.startDate), 'MMM d')} -{' '}
            {format(new Date(trip.endDate), 'MMM d, yyyy')}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <section className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Plane className="mr-2 h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold">Flights</h2>
            </div>
            <button
              onClick={() => setActiveForm('flight')}
              className="rounded-full p-1 hover:bg-gray-100"
              title="Add Flight"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          {trip.flights?.map((flight) => (
            <div key={flight.id} className="group mb-4 border-b pb-4 last:border-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{flight.airline} {flight.flightNumber}</p>
                  <p className="text-sm text-gray-600">
                    {flight.departure} → {flight.arrival}
                  </p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(flight.departureTime), 'MMM d, h:mm a')}
                  </p>
                </div>
                <div className="flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => setEditingItem({ type: 'flight', id: flight.id })}
                    className="rounded p-1 hover:bg-gray-100"
                    title="Edit Flight"
                  >
                    <Edit2 className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDeleteFlight(flight.id)}
                    className="rounded p-1 hover:bg-gray-100"
                    title="Delete Flight"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Hotel className="mr-2 h-5 w-5 text-green-500" />
              <h2 className="text-xl font-semibold">Accommodations</h2>
            </div>
            <button
              onClick={() => setActiveForm('accommodation')}
              className="rounded-full p-1 hover:bg-gray-100"
              title="Add Accommodation"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          {trip.accommodations?.map((acc) => (
            <div key={acc.id} className="group mb-4 border-b pb-4 last:border-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{acc.name}</p>
                  <p className="text-sm text-gray-600">{acc.address}</p>
                  <p className="text-sm text-gray-600">
                    Check-in: {format(new Date(acc.checkIn), 'MMM d')}
                  </p>
                </div>
                <div className="flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => setEditingItem({ type: 'accommodation', id: acc.id })}
                    className="rounded p-1 hover:bg-gray-100"
                    title="Edit Accommodation"
                  >
                    <Edit2 className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDeleteAccommodation(acc.id)}
                    className="rounded p-1 hover:bg-gray-100"
                    title="Delete Accommodation"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Map className="mr-2 h-5 w-5 text-purple-500" />
              <h2 className="text-xl font-semibold">Activities</h2>
            </div>
            <button
              onClick={() => setActiveForm('activity')}
              className="rounded-full p-1 hover:bg-gray-100"
              title="Add Activity"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          {trip.activities?.map((activity) => (
            <div key={activity.id} className="group mb-4 border-b pb-4 last:border-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{activity.name}</p>
                  <p className="text-sm text-gray-600">{activity.location}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(activity.date), 'MMM d')}
                    {activity.time && `, ${activity.time}`}
                  </p>
                </div>
                <div className="flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => setEditingItem({ type: 'activity', id: activity.id })}
                    className="rounded p-1 hover:bg-gray-100"
                    title="Edit Activity"
                  >
                    <Edit2 className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="rounded p-1 hover:bg-gray-100"
                    title="Delete Activity"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <CheckSquare className="mr-2 h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-semibold">To-Do List</h2>
            </div>
            <button
              onClick={() => setActiveForm('todo')}
              className="rounded-full p-1 hover:bg-gray-100"
              title="Add Todo"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          {trip.todos?.map((todo) => (
            <div key={todo.id} className="group mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="mr-2 h-4 w-4 rounded border-gray-300"
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <span className={todo.completed ? 'text-gray-400 line-through' : ''}>
                  {todo.task}
                </span>
              </div>
              <div className="flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => setEditingItem({ type: 'todo', id: todo.id })}
                  className="rounded p-1 hover:bg-gray-100"
                  title="Edit Todo"
                >
                  <Edit2 className="h-4 w-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="rounded p-1 hover:bg-gray-100"
                  title="Delete Todo"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>

      {activeForm === 'flight' && (
        <FlightForm onSubmit={handleAddFlight} onClose={() => setActiveForm(null)} />
      )}
      {activeForm === 'accommodation' && (
        <AccommodationForm onSubmit={handleAddAccommodation} onClose={() => setActiveForm(null)} />
      )}
      {activeForm === 'activity' && (
        <ActivityForm onSubmit={handleAddActivity} onClose={() => setActiveForm(null)} />
      )}
      {activeForm === 'todo' && (
        <TodoForm onSubmit={handleAddTodo} onClose={() => setActiveForm(null)} />
      )}

      {editingItem?.type === 'flight' && (
        <FlightForm
          initialData={trip.flights?.find((f) => f.id === editingItem.id)}
          onSubmit={(flight) => handleEditFlight({ ...flight, id: editingItem.id })}
          onClose={() => setEditingItem(null)}
        />
      )}
      {editingItem?.type === 'accommodation' && (
        <AccommodationForm
          initialData={trip.accommodations?.find((a) => a.id === editingItem.id)}
          onSubmit={(acc) => handleEditAccommodation({ ...acc, id: editingItem.id })}
          onClose={() => setEditingItem(null)}
        />
      )}
      {editingItem?.type === 'activity' && (
        <ActivityForm
          initialData={trip.activities?.find((a) => a.id === editingItem.id)}
          onSubmit={(activity) => handleEditActivity({ ...activity, id: editingItem.id })}
          onClose={() => setEditingItem(null)}
        />
      )}
      {editingItem?.type === 'todo' && (
        <TodoForm
          initialData={trip.todos?.find((t) => t.id === editingItem.id)}
          onSubmit={(todo) => handleEditTodo({ ...todo, id: editingItem.id })}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}