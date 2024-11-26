import React from 'react';
import { X } from 'lucide-react';
import type { Todo } from '../../types';

interface TodoFormProps {
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
  onClose: () => void;
  initialData?: Todo;
}

export function TodoForm({ onSubmit, onClose, initialData }: TodoFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const todoData: Omit<Todo, 'id'> = {
      task: formData.get('task') as string,
      completed: false,
      dueDate: (formData.get('dueDate') as string) || undefined,
    };

    onSubmit(todoData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Todo' : 'Add Todo'}
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
            <label htmlFor="task" className="block text-sm font-medium text-gray-700">
              Task
            </label>
            <input
              type="text"
              id="task"
              name="task"
              required
              defaultValue={initialData?.task}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date (optional)
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              defaultValue={initialData?.dueDate}
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
              {initialData ? 'Save Changes' : 'Add Todo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}