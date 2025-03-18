// TODO: consider syncing frontend and backend types with OpenAPI generators

export type EntityCreatedResponse = {
  id: string;
};

export type AlbumResponse = {
  id: string;
  title: string;
  description: string;
  coverPhotoId: string;
  eventIds: string[];
};

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

export type Location = {
  latitude: number;
  longitude: number;
};
