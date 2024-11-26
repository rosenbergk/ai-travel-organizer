export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  image: string;
  flights?: Flight[];
  accommodations?: Accommodation[];
  activities?: Activity[];
  todos?: Todo[];
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
}

export interface Accommodation {
  id: string;
  name: string;
  checkIn: string;
  checkOut: string;
  address: string;
  confirmationNumber?: string;
}

export interface Activity {
  id: string;
  name: string;
  date: string;
  time?: string;
  location: string;
  notes?: string;
}

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
  dueDate?: string;
}