// TODO: consider syncing frontend and backend types with OpenAPI generators

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
  timestamp: Date;
  location: Location;
};

export type Location = {
  latitude: number;
  longitude: number;
};
