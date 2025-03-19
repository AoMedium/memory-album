export type EventCreateRequest = {
  title: string;
  description: string;
  timestamp: number;
  location: Location;
};

export type EventGetResponse = {
  id: string;
  title: string;
  description: string;
  timestamp: number;
  location: Location;
  personIds: string[];
  tagIds: string[];
  photoIds: string[];
  videoIds: string[];
};
