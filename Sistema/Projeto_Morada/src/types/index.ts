export interface IEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  registrationUrl?: string;
}

export interface IService {
  id: string;
  title: string;
  date: string;
  time: string;
  description?: string;
}

export interface IDevotional {
  id: string;
  title: string;
  date: string;
  reference: string;
  verse: string;
  content: string;
  author: string;
}