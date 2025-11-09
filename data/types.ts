export type Project = {
  id: number;
  title: string;
  slug: string;
  tags: string[];
  shortDescription: string;
  description: string;
  partsList: string[];
  images: string[];
  repoLink: string;
  pdfLink: string;
  youtubeId?: string | null;
};

export type Mentor = {
  id: number;
  name: string;
  title: string;
  bio: string;
  officeHours: string;
  imageUrl: string;
};

export type TeamMember = {
  id: number;
  name: string;
  title: string;
  imageUrl: string;
};

export type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
  contact: string;
};